# RefineCV 📄✨

RefineCV is an AI-powered resume review application that helps users improve their resumes and increase their chances of landing their dream job.

## Live Demo 🌐

Experience RefineCV in action! Visit our live demo:

[**Try RefineCV Now**](https://resume-reviewer-six.vercel.app/)

## Features 🚀

- **AI-Powered Resume Analysis**: Utilizes advanced language models to evaluate resumes.
- **Instant Feedback**: Provides immediate suggestions for improvement.
- **Score System**: Rates resumes on a scale of 0-100.
- **File Upload**: Supports .docx file uploads for easy resume submission.
- **Chat Interface**: User-friendly chat-based interaction for a seamless experience.
- **Google Authentication**: Secure sign-in process using Google accounts.

## Tech Stack 💻

- **Frontend**: Next.js, React
- **Backend**: Node.js
- **AI/ML**: LangChain, Groq, OpenAI
- **Database**: Pinecone (Vector Database)
- **Authentication**: Firebase
- **Styling**: Material-UI (MUI)

## Getting Started 🏁

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account
- Pinecone account
- Groq API key
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/refinecv.git
   ```

2. Install dependencies:
   ```
   cd refinecv
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_PINECONE_API_KEY=your_pinecone_api_key
   NEXT_PUBLIC_PINECONE_INDEX=your_pinecone_index_name
   NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage 📝

1. Sign in using your Google account.
2. Upload your resume (.docx format) or type your resume content into the chat.
3. Ask questions or request feedback about your resume.
4. Receive AI-generated suggestions and a score for your resume.
5. Implement the suggestions to improve your resume.

## Acknowledgments 🙏

- [LangChain](https://github.com/hwchase17/langchain) for the powerful language model tools.
- [Pinecone](https://www.pinecone.io/) for vector database capabilities.
- [Firebase](https://firebase.google.com/) for authentication services.
- [Material-UI](https://mui.com/) for the sleek UI components.


Happy job hunting! 🎉
