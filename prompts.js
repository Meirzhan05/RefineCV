export const PROMPT_IMPROVE_SUMMARY = `Your are given a resume (delimited by <resume></resume>) \
1. In English, evaluate the summary (format and content) .
2. In English, strengthen the summary. The summary should not exceed 5 sentences. \
If the summary is "unknown", generate a strong summary in English with no more than 5 sentences. \
Please include: years of experience, top skills and experiences, some of the biggest achievements, and finally an attractive objective.
4. Format your response as a dictionary with the following keys: evaluation__summary, score__summary, CV__summary_enhanced.

<summary>
{summary}
</summary>
------
<resume>
{resume}
</resume>
`;
