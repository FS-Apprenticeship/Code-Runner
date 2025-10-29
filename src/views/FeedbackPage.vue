<script setup>
import { computed, onMounted, ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import BaseButton from '@/components/BaseButton.vue';
import router from '@/router';

import { useUserStore } from '@/stores/user';
import { useChallengeStore } from '@/stores/challenge';
const userStore = useUserStore();
const challengeStore = useChallengeStore();

// isLoading for button
const isLoading = ref(false)
const showCorrectCode = ref(false)
const correctCode = ref("")
const gif = ref("")

// store the evaluation stats in database
onMounted(async () => {
    await challengeStore.uploadChallengeResult();
    showCorrectCode.value = !challengeStore.challenge.feedback.successful

    // if unsuccessful, show correct code
    correctCode.value = challengeStore.challenge.feedback.correctCode

    // get gif 
    if (challengeStore.challenge.feedback.successful) {
        gif.value = await getGif("success!")
    } else {
        gif.value = await getGif("failure")
    }
})

async function getGif(query) {
    const key = import.meta.env.VITE_APP_KLIPY_WEB;
    try {
        const response = await fetch(
            `https://api.klipy.com/api/v1/${key}/gifs/search?q=${encodeURIComponent(query)}`,
            { headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        const firstGif = result?.data?.data?.[0]?.file?.hd?.gif?.url;

        if (!firstGif) throw new Error("No GIF found");
        return firstGif;
    } catch (err) {
        console.error("Error fetching GIF:", err);
        return null;
    }
}

const feedbackText = computed(() => {
    if (challengeStore.challenge.feedback) {
        return `
        Score : ${challengeStore.challenge.feedback.score} \n
        Successful : ${challengeStore.challenge.feedback.successful} \n
        Feedback : ${challengeStore.challenge.feedback.feedback}\n`
    } else {
        return "Feedback is loading..."
    }
});

const handleTryHarder = async () => {
    if (challengeStore.challenge.feedback.successful && challengeStore.challenge.difficulty_level < 3) {
        // if successful and (1, 2) then make it +1
        await userStore.uploadProfile(challengeStore.challenge.difficulty_level + 1);
    }
    // reset challenge-specific items in object so we can create new challenge
    // things remaining same: user_id, topic, language
    challengeStore.challenge.feedback = null;
    challengeStore.challenge.id = null;
    challengeStore.challenge.prompt = null;
    challengeStore.challenge.response = null;
    challengeStore.challenge.time_taken = null;

    // get difficulty level from db again
    const diff = await challengeStore.getRecentDifficulty();
    challengeStore.challenge.difficulty_level = parseInt(diff);

    const prompt = await challengeStore.aiCreateChallenge();
    challengeStore.challenge.prompt = prompt.text;

    challengeStore.uploadChallenge();
    isLoading.value = false;

    router.push("/challenge");
};

const handleRetrySimilar = async () => {
    await userStore.uploadProfile(challengeStore.challenge.difficulty_level);

    // reset challenge-specific items in object so we can create new challenge
    // things remaining same: user_id, topic, language
    challengeStore.challenge.feedback = null;
    challengeStore.challenge.id = null;
    challengeStore.challenge.prompt = null;
    challengeStore.challenge.response = null;
    challengeStore.challenge.time_taken = null;

    // get difficulty level from db again
    const diff = await challengeStore.getRecentDifficulty();
    challengeStore.challenge.difficulty_level = parseInt(diff);

    const prompt = await challengeStore.aiCreateChallenge();
    challengeStore.challenge.prompt = prompt.text;

    challengeStore.uploadChallenge();
    isLoading.value = false;

    router.push("/challenge");
};

const handleReturnToSelection = async () => {
    isLoading.value = true
    // we are not trying harder or similar difficulty here, so just decrement the difficulty
    if (!challengeStore.challenge.feedback.successful && challengeStore.challenge.difficulty_level > 1) {
        // not successful and (2, 3) then make it -1
        await userStore.uploadProfile(challengeStore.challenge.difficulty_level - 1);
    }
    router.push('/selection')
};
</script>

<template>
    <div class="flex flex-col min-h-screen bg-gray-950">
        <NavBar />

        <main class="flex-1 flex items-center justify-center px-6 py-12">
            <div class="max-w-3xl w-full space-y-8">
                <!-- Feedback Display Area -->
                <div class="bg-gray-900 border border-gray-700 rounded-lg p-8">
                    <h2 class="text-2xl font-bold text-white mb-4 text-center">
                        Feedback
                    </h2>
                    <div class="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                        <div class="flex flex-col items-center justify-center my-4">
                            <img :src="gif" alt="GIF result" class="rounded-xl shadow-lg max-w-xs md:max-w-md" />
                        </div>
                        {{ feedbackText }}
                    </div>
                </div>

                <!-- show code if successful is false -->
                <div v-if="showCorrectCode" class="bg-gray-900 border border-gray-700 rounded-lg p-8">
                    <h3 class="text-xl font-bold text-white mb-4">
                        Correct Implementation:
                    </h3>
                    <div class="bg-gray-950 border border-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre class="text-sm"><code class="text-green-400 font-mono">{{ correctCode }}</code></pre>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <BaseButton :loading="isLoading" @click="handleTryHarder" variant="primary">
                        Try Harder Challenge
                    </BaseButton>

                    <BaseButton :loading="isLoading" @click="handleRetrySimilar" variant="secondary">
                        Retry Something Similar
                    </BaseButton>

                    <BaseButton :loading="isLoading" @click="handleReturnToSelection" variant="secondary">
                        Return to Selection Page
                    </BaseButton>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.gif-container {
    text-align: center;
    margin-top: 2rem;
}

.gif-image {
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>