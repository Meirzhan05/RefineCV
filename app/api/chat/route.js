'use server'
import { ChatGroq } from "@langchain/groq";
import { HumanMessage,  SystemMessage} from "@langchain/core/messages";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import { Pinecone } from "@pinecone-database/pinecone";
import { NextResponse } from "next/server";
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters"
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PROMPT_IMPROVE_SUMMARY } from "@/prompts";
async function splitDocuments(docs) {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1500,
        chunkOverlap: 200,
        separators: [" ", "\n\n", "\n", "\t"]
    })
    const splitDocs = await textSplitter.createDocuments([docs])
    return splitDocs
}  

async function vectorizeDocuments(docs, embeddings, pinecone, name) {
    const pineconeIndex = pinecone.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX)
    const namespace = `user_${name}_resumes`;
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
        maxConcurrency: 5,
        namespace: namespace,
    })
    await vectorStore.addDocuments(docs, name)
    const retriever = vectorStore.asRetriever({k: 2})
    return retriever
}

async function queryPinecone(pinecone, query, name, chat_history) {
    const namespace = `user_${name}_resumes`;
    const index = pinecone.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX)
    const queryEmbedding = await new OpenAIEmbeddings({
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    }).embedQuery(query)
    let queryResponse = await index.namespace(namespace).query({
        topK: 2,
        vector: queryEmbedding,
        includeValues: true,
        includeMetadata: true,
    })

    console.log(`Found ${queryResponse.matches.length} matches...`);;
    if (queryResponse.matches.length) {
        const concatenatedText = queryResponse.matches.map((match) => match.metadata.text).join(" ")

        const llm = new ChatGroq({
            apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
            model: "llama3-groq-70b-8192-tool-use-preview",
        });
        const prompt = ChatPromptTemplate.fromMessages([
            [
              "system",
              `You are a Resumer Reviewer. Evaluate a resume using a score between 0 and 100. And then give a feedback on the resume and suggest improvements.`,
            ],
    
            ["placeholder", "{chat_history}"],
            ["human", "{input}"],
            ["system", `The resume is: ${concatenatedText}`],
        ]);
        const chain = prompt.pipe(llm, concatenatedText)
        
        console.log(await   chain.invoke({ chat_history: [], input: query }))
    }

}


async function invokeLLM(prompt, chat_history, input) {
    const llm = new ChatGroq({
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
        model: "llama3-groq-70b-8192-tool-use-preview",
        temperature: 0,
    });
    
    const chain = prompt.pipe(llm)
    return await chain.invoke({ chat_history, input: input });
}

async function response(userMessage, chat_history, docs) {
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    })
    const pinecone = new Pinecone({
        apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY,
    })
    chat_history = chat_history.map((message) => {
        console.log(message)
        if (message.user === "user" || message.user === "system") {
            return new HumanMessage(message.message);
        } else {
            return new SystemMessage(message.message);
        }
    });
    let modifiedText = "";
    if (docs !== null) {
        modifiedText = docs.text.split(/[\n\t ]+/).join(" ");
    }
    // if (docs) {
    //     
    //     const documents = await splitDocuments(modifiedText)
    //     const retriever = await vectorizeDocuments(documents, embeddings, pinecone, docs.name)
    //     // queryPinecone(pinecone, userMessage, docs.name, chat_history)
    // }
    let prompt = null;
    if (modifiedText === "") {
        prompt = ChatPromptTemplate.fromMessages([
            [
              "system",
              `You are a Resumer Reviewer. Evaluate a resume using a score between 0 and 100. And then give a feedback on the resume and suggest improvements.
               DO WHAT USER ASKS YOU TO DO RELEVANT TO RESUME REVIEWING. 
              DO NOT USE MARKDOWN.`,
            ],
    
            ["placeholder", "{chat_history}"],
            ["human", "{input}"],
            // ["system", `The resume is: ${modifiedText}`],
        ]);
    } else {
        prompt = ChatPromptTemplate.fromMessages([
            [
              "system",
              `You are a Resumer Reviewer. Evaluate a resume using a score between 0 and 100. And then give a feedback on the resume and suggest improvements.`,
            ],
    
            ["placeholder", "{chat_history}"],
            ["human", "{input}"],
            ["system", `The resume is: ${modifiedText}`],
        ]);
    }

    return await invokeLLM(prompt, chat_history, userMessage)

}


export async function POST(request) {

    const body = await request.formData();
    const question = body.get('query') ?? [];
    let index = 0
    let docs = null;
    const history = []

    if (body.get('docs')) {
        docs = JSON.parse(body.get('docs'))[0] ?? [];
    }
    while (body.has(`history[${index}]`)) {
        if (body.get(`history[${index}]`) !== null) {
            try {
                history.push(JSON.parse(body.get(`history[${index}]`)));
            } catch (error) {
                console.error(`Error parsing history[${index}]: ${error}`);
            }
        }
        index += 1
    }
    const res = await response(question, history, docs);
    return NextResponse.json({content: res.content});
}