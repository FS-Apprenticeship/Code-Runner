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

// store the evaluation stats in database
onMounted(async () => {
    await challengeStore.uploadChallengeResult();
    if (challengeStore.challenge.feedback.successful && challengeStore.challenge.difficulty_level < 3) {
        // if successful and (1, 2) then make it +1
        await userStore.uploadProfile(challengeStore.challenge.difficulty_level + 1);
    } else if (!challengeStore.challenge.feedback.successful && challengeStore.challenge.difficulty_level > 1) {
        // not successful and (2, 3) then make it -1
        await userStore.uploadProfile(challengeStore.challenge.difficulty_level - 1);
    } else {
        // if unsuccessful and 1 keep it same
        // if successful and 3 keep it same
        await userStore.uploadProfile(challengeStore.challenge.difficulty_level);
    }
})

const feedbackText = computed(() => {
    if (challengeStore.challenge.feedback) {
        return `
        Score : ${challengeStore.challenge.feedback.score} \n
        Successful : ${challengeStore.challenge.feedback.successful} \n
        Feedback : ${challengeStore.challenge.feedback.feedback}\n`
    } else {
        return "Feedback is loading..."
    }
    // return challengeStore.challenge.feedback || "Feedback is loading..."
});

const handleTryHarder = () => {
    // TODO: Implement try harder challenge logic
};

const handleRetrySimilar = () => {
    // TODO: Implement retry similar challenge logic
};

const handleReturnToSelection = () => {
    isLoading.value = true
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
                        {{ feedbackText }}
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
