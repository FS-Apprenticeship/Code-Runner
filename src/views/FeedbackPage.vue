<script setup>
import { computed } from 'vue';
import NavBar from '@/components/NavBar.vue';
import BaseButton from '@/components/BaseButton.vue';
import router from '@/router';

import { useChallengeStore } from '@/stores/challenge';
const challengeStore = useChallengeStore();

// Placeholder for OpenAI feedback text
// const feedbackText = ref('Your feedback will appear here...');
const feedbackText = computed(() => {
    return challengeStore.challenge.feedback || "Feedback is loading..."
});
feedbackText.value = challengeStore.challenge.feedback;

const handleTryHarder = () => {
    // TODO: Implement try harder challenge logic
};

const handleRetrySimilar = () => {
    // TODO: Implement retry similar challenge logic
};

const handleReturnToSelection = () => {
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
                    <div class="text-gray-300 text-lg leading-relaxed">
                        {{ feedbackText }}
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <BaseButton @click="handleTryHarder" variant="primary">
                        Try Harder Challenge
                    </BaseButton>

                    <BaseButton @click="handleRetrySimilar" variant="secondary">
                        Retry Something Similar
                    </BaseButton>

                    <BaseButton @click="handleReturnToSelection" variant="secondary">
                        Return to Selection Page
                    </BaseButton>
                </div>
            </div>
        </main>
    </div>
</template>
