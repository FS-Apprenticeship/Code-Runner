import { supa } from "./auth";

export async function createChallenge(language, topic, difficulty) {
    var instructions = `You are a programming instructor creating coding challenges for students learning programming fundamentals.
    As part of the user prompt, you will be given a language (javascript or python), a topic, and a difficulty level (from 1-3).
    The difficulty level is either Easy (1), Medium (2), Hard(3).

    Use Blooms Taxonomy to define the cognitive depth of each difficulty level:
    1. Easy — Remember/Understand: Test the students basic understanding or recall of syntax for the topic.
    2. Medium — Apply/Analyze: Have the student combine multiple simple concepts or apply logic to solve a small practical problem.
    3. Hard — Evaluate/Create: Have the student design or implement a more complex solution involving multiple steps or connected ideas.
    
    Make sure that you use clear language. Output the challenge in the following format:

    Follow these rules:
    - Keep the problem relevant to the provided topic.
    - Make sure the difficulty is appropriate and *doable* for someone learning fundamentals.
    - Use clear, beginner-friendly language.
    - Don't external libraries or advanced topics not directly tied to the concept.

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

    if (topic === "if statement") {
        if (difficulty == 1) {
            // instructions = instructions + `Examples for if statements at difficulty level 1 are:

            // - check if a number is even or odd
            // - check if a string is a substring of another, print output accordingly
            // - assume you have a variable age, check if the user is eligible to vote in elections`
        } else if (difficulty == 2) {
            // instructions = instructions + `Examples for if statements at difficulty level 2 are:

            // - write a program to find the total cost of electricity where the first 10 units cost differently from the rest
            // - 
            // - `
        }
    } else if (topic === "loops") {
        // empty
    } else if (topic === "arithmetic") {
        // empty
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