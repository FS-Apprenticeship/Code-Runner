import { supa } from "../database/auth";
import { ifStatementPython } from "./examples";

export async function createChallenge(language, topic, difficulty) {
    var instructions = `You are a course instructor trying to teach students basic programming fundamentals.
    As part of the user prompt, you will be given a language (javascript or python), a topic, and a difficulty level (from 1-3).
    The difficulty level is either Easy (1), Medium (2), Hard(3).
    Easy level focuses on mostly syntax.
    Medium will be slightly more advanced, focusing on testing syntax and introducing a new layer to the topic.
    Hard will be testing the mastery the student has over this topic.
    
    Make sure that you use clear, concise language. 
    Here is an example to help you create challenges for the student, but make the challenge different from examples:
    
    `

    if (difficulty === 1) {
        instructions = instructions + ifStatementPython[0] + "\n\n" + ifStatementPython[1] + "\n";
    } else if (difficulty === 2) {
        instructions = instructions + ifStatementPython[2] + "\n\n" + ifStatementPython[3] + "\n";
    } else if (difficulty == 3) {
        instructions = instructions + ifStatementPython[4] + "\n\n" + ifStatementPython[6] + "\n";
    } else {
        throw new Error("difficulty isnt defined");
    }

    const userPrompt = `I want a challenge with difficulty ${difficulty} on the topic ${topic}. 
    The language I want to use is ${language}. Do not give me the solution or any examples.
    Create a challenge for me.`

    const prompt = [
        {
            role: "user",
            content: userPrompt,
        },
        {
            role: "developer",
            content: instructions,
        }
    ];
    const { data, error } = await supa.functions.invoke("create-challenge", {
        body: { prompt },
    })

    if (error) throw error;
    return data;
}

// call this with const resp = await callCodeEvaluation(JSON.stringify({ prompt }))
export async function callCodeEvaluation(prompt) {
    const { data, error } = await supa.functions.invoke("code-evaluation", {
        body: { prompt },
    })

    if (error) throw error;
    return data;
}