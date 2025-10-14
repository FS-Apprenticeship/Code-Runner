import { ref } from "vue";
import { defineStore } from "pinia";

import { supa } from "@/services/auth";
import { dbUploadChallenge, dbUploadChallengeResponse, dbUploadChallengeResult } from "@/services/dbChallenge";

export const useChallengeStore = defineStore("challenge", () => {
    // this challenge stores only the current challenge with all properties
    const challenge = ref({
        id: null,
        user_id: null,
        prompt: null,
        difficulty_level: null,
        topic: null,
        response: null,
        success: null, 
        time_taken: null,
        feedback: null,
    });

    // call these functions AFTER
    async function uploadChallenge() {
        const data = await dbUploadChallenge(supa, challenge.value.user_id, challenge.value.prompt, challenge.value.difficulty_level, challenge.value.topic);
        challenge.value.id = data.id;
        console.log("checking challenge id ", challenge.value.id);
        return data;
    }

    // check if we need response id from here for later? not storing it right now
    async function uploadChallengeResponse() {
        const data = await dbUploadChallengeResponse(supa, challenge.value.user_id, challenge.value.id, challenge.value.response);
        return data;
    }

    // check if we need response id from here for later? not storing it right now
    async function uploadChallengeResult() {
        const data = await dbUploadChallengeResult(supa, challenge.value.id, challenge.value.success, challenge.value.feedback, challenge.value.time_taken);
        return data;
    }

    // use these functions to store the value first
    function storeChallengeId(id) {
        challenge.value.id = id;
    }

    function storeChallengeUserId(user_id) {
        challenge.value.user_id = user_id;
    }

    function storeChallengePrompt(prompt) {
        challenge.value.prompt = prompt;
    }

    function storeChallengeDifficulty(difficulty) {
        challenge.value.difficulty_level = difficulty;
    }

    function storeChallengeTopic(topic) {
        challenge.value.topic = topic;
    }

    function storeChallengeResponse(resp) {
        challenge.value.response = resp;
    }

    function storeChallengeSuccess(success) {
        challenge.value.success = success;
    }

    function storeChallengeTimeTaken(time_taken) {
        challenge.value.time_taken = time_taken;
    }

    function storeChallengeFeedback(feedback) {
        challenge.value.feedback = feedback;
    }

    return {
        challenge, 
        uploadChallenge, 
        uploadChallengeResponse,
        uploadChallengeResult,
        storeChallengeId,
        storeChallengeUserId,
        storeChallengePrompt,
        storeChallengeTopic,
        storeChallengeDifficulty, 
        storeChallengeResponse,
        storeChallengeSuccess, 
        storeChallengeTimeTaken, 
        storeChallengeFeedback
    }
})