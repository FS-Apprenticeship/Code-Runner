import { reactive } from "vue";
import { defineStore } from "pinia";

import { supa } from "@/services/auth";
import { dbGetRecentDifficulty, dbUploadChallenge, dbUploadChallengeResponse, dbUploadChallengeResult } from "@/services/dbChallenge";
import { callCodeEvaluation, createChallenge } from "@/services/openai";

// to create challenge, we need language, topic, difficulty

export const useChallengeStore = defineStore("challenge", () => {
    // this challenge stores only the current challenge with all properties
    const challenge = reactive({
        id: null,
        user_id: null,
        prompt: null,
        language: null,
        // created: null,
        difficulty_level: null,
        topic: null,
        response: null,
        success: null,
        time_taken: null,
        feedback: null,
    });
    // success, feedback not stored

    // call these functions AFTER
    async function uploadChallenge() {
        const data = await dbUploadChallenge(supa, challenge.user_id, challenge.prompt, challenge.difficulty_level, challenge.topic, challenge.created, challenge.language);
        challenge.id = data.id;
        console.log("checking challenge id ", challenge.id);
        return data;
    }

    // check if we need response id from here for later? not storing it right now
    async function uploadChallengeResponse() {
        const data = await dbUploadChallengeResponse(supa, challenge.user_id, challenge.id, challenge.response);
        return data;
    }

    // check if we need response id from here for later? not storing it right now
    async function uploadChallengeResult() {
        const data = await dbUploadChallengeResult(supa, challenge.id, challenge.success, challenge.feedback, challenge.time_taken);
        return data;
    }

    async function getRecentDifficulty() {
        const data = await dbGetRecentDifficulty(supa, challenge.user_id);
        if (data === null) {
            // console.log("recent is null, setting to 1")
            return 1;
        }
        return data;
    }

    async function aiCreateChallenge() {
        if (challenge.difficulty_level == null) {
            return new Error("diff level not available")
        }
        if (challenge.language == null) {
            return new Error("language not available")
        }
        if (challenge.topic == null) {
            return new Error("topic not available")
        }

        const data = await createChallenge(challenge.language, challenge.topic, challenge.difficulty_level)
        // challenge.prompt = data.text;
        return data;
    }

    async function aiEvaluteCode() {
        if (challenge.response == null) {
            return new Error("response not available");
        }

        const msg = `I am the student. I was given the following challenge to do in ${challenge.language}.
        The topic was ${challenge.topic}. Here is the challenge:
        ${challenge.prompt}
        
        In response, here is my answer to this challenge:
        
        ${challenge.response}
        
        Please evaluate my code, and tell me the following things:
        
        How much would you mark this out of 10? (newline)
        Is this a successfull attempt? Yes or no. (newline)
        Is there any feedback you can give me to improve on in the future?`;

        const data = await callCodeEvaluation(msg);
        return JSON.parse(data.text);
    }

    return {
        challenge,
        uploadChallenge,
        uploadChallengeResponse,
        uploadChallengeResult,
        getRecentDifficulty,
        aiCreateChallenge,
        aiEvaluteCode
    }
})