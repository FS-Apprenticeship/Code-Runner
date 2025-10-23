
//we can just use userStore to pass in the user_id here
//since we can't access it from challengeStore
export async function dbUploadChallenge(supa, user_id, prompt, difficulty_level, topic, created, language) {
    if (difficulty_level > 3 || difficulty_level < 1) {
        throw new Error("Difficulty level is undefined");
    }

    const { data, error } = await supa
        .from('challenge')
        .insert({ user_id: user_id, prompt: prompt, difficulty_level: difficulty_level, topic: topic, created: created, language: language })
        .select()
    if (error) throw error;
    return data[0]
}

// get challenge id and other information from challengeStore
export async function dbUploadChallengeResponse(supa, user_id, challenge_id, response) {
    const { data, error } = await supa
        .from('response')
        .insert({ user_id: user_id, challenge_id: challenge_id, response: response })
        .select()
    if (error) throw error;
    return data[0]
}

export async function dbUploadChallengeResult(supa, challenge_id, success, feedback, time_taken, user_id) {
    const { data, error } = await supa
        .from('challenge_result')
        .insert({ challenge_id: challenge_id, successful: success, feedback: feedback, time_taken: time_taken, user_id: user_id })
        .select()
    if (error) throw error;
    return data[0]
}

export async function dbGetRecentDifficulty(supa, user_id) {
    const { data, error } = await supa
        .rpc('getrecentdifficultylevel', { p_user_id: user_id });
    if (error) throw error;
    return data;
}

export async function dbUpdateDifficulty(supa, user_id, difficulty) {
    const { data, error } = await supa
        .from('learner_profile')
        .update({ difficulty_level: difficulty })
        .eq('user_id', user_id);

    if (error) throw error;
    return data;
}