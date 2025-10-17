import { supa } from "../database/auth";

export function createPrompt(language, topic) {
    const prompt = [
        {
            role: "user",
            content: "say pineapple 3 times",
        },
        {
            role: "developer",
            content: "say it in a pirate accent",
        }
    ];
    return prompt
}

// call this with const resp = await callCodeEvaluation(JSON.stringify({ prompt }))
export async function callCodeEvaluation(prompt) {
    const { data, error } = await supa.functions.invoke("code-evaluation", {
        body: prompt,
    })

    if (error) throw error;
    return data;
}