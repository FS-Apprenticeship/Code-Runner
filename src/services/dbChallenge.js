export async function uploadChallenge(supa, user_id, prompt, difficulty_level, topic) {
    if (difficulty_level > 3 || difficulty_level < 1) {
        throw new Error("Difficulty level is undefined");
    }

    const { data, error } = await supa
    .from('challenge')
    .insert({ user_id: user_id, prompt: prompt, difficulty_level: difficulty_level, topic: topic })
    .select()
    if (error) throw error;
    return data[0]
}

// get challenge id and other information from challengeStore
export async function uploadChallengeResponse(supa, challenge_id, user_id, response) {
    const { data, error } = await supa
    .from('response')
    .insert({ challenge_id: challenge_id, user_id: user_id, response: response })
    .select()
    if (error) throw error;
    return data[0]
}