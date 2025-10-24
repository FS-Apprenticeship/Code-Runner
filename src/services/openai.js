import { supa } from "./auth";

export async function createChallenge(language, topic, difficulty) {
    var instructions = `You are a programming instructor creating coding challenges for students learning programming fundamentals.
    As part of the user prompt, you will be given a language (javascript or python), a topic, and a difficulty level (from 1-3).
    The difficulty level is either Easy (1), Medium (2), Hard(3).

    Use Blooms Taxonomy to define the cognitive depth of each difficulty level:
    1. Easy — Remember/Understand: Test the students basic understanding or recall of syntax for the topic.
    2. Medium — Apply/Analyze: Have the student combine multiple simple concepts or apply logic to solve a small practical problem.
    3. Hard — Evaluate/Create: Have the student design or implement a more complex solution involving multiple steps or connected ideas.
    
    Follow these rules:
    - Use clear, beginner-friendly language.
    - Keep the problem relevant to the provided topic.
    - Make sure the difficulty is appropriate and *doable* for someone learning fundamentals.
    - If it requires a variable/list of information to do the challenge with, tell them to assume it (e.g "Assume you have a list of numbers called num...")
    - Always integrate the topic into a simple, **real-world or playful context**.
    - Each difficulty level should use a **different context** (e.g., counting scores, analyzing text, simulating events, etc.).
    - Avoid reusing the same framing or goal across difficulties.

    Output the challenge in the following format:

    **Challenge Title**

    Language: [Language] \n
    Topic: [Topic] \n

    **Description**
    A description of the problem they are trying to solve. Try to keep it around 3-5 lines. Can be shorter based on difficulty.

    **Requirements**
    List anywhere from 2-5 requirements for the challenge (can vary based on difficulty and challenge).

    **Example Input/Output**
    Example input: xyz \n
    Example output: abc \n

    Return the output in markdown format.

    `

    const userPrompt = `I want a challenge with difficulty ${difficulty} on the topic ${topic}. 
    The language I want to use is ${language}. 
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
export async function callCodeEvaluation(msg) {
    const instructions = `You are an instructor for a coding class teaching basic fundamentals.
    You will be given the challenge prompt and its details, as well as a response from the student. You have to evaluate the code response
    and give feedback.
    
    You MUST return the evaluation in json format.
    Example:
    
    {
      score: 9,
      successful: true,
      feedback: "This was a good attempt and the thought process was in the right direction, however the syntax had an error at line 8 ... (more feedback)",
    }`
    const prompt = [
        {
            role: "user",
            content: msg
        },
        {
            role: "developer",
            content: instructions
        }
    ]
    const { data, error } = await supa.functions.invoke("code-evaluation", {
        body: { prompt },
    })

    if (error) throw error;
    return data;
}