import { supa } from "../database/auth";

export async function callCodeEvaluation(prompt) {
    const { data, error } = await supa.functions.invoke("code-evaluation", {
        body: prompt,
    })

    if (error) throw error;
    return data;
}