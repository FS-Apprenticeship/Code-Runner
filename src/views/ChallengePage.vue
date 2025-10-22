<script setup>
import CodeMirrorEditor from "@/components/CodeEditor.vue";
import { ref, computed, onMounted } from "vue";
import { marked } from "marked";
import BaseButton from "@/components/BaseButton.vue";
import router from "@/router";

import { useChallengeStore } from "@/stores/challenge";

const challengeStore = useChallengeStore();

let startTime = null;

onMounted(() => {
  startTime = Date.now();
})

// isLoading for button
const isLoading = ref(false)

const formattedPrompt = computed(() =>
  marked.parse(challengeStore.challenge.prompt || "")
);

const code = ref(
  `console.log("Hello World!")\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`
);

const handleSubmit = async () => {
  isLoading.value = true;

  // store time taken on this page
  const endTime = Date.now()
  const timeElapsedMilli = endTime - startTime;
  const timeElapsedSeconds = Math.round(timeElapsedMilli / 1000);
  challengeStore.challenge.time_taken = timeElapsedSeconds;

  challengeStore.challenge.response = code.value;
  await challengeStore.uploadChallengeResponse();
  const resp = await challengeStore.aiEvaluteCode();
  // resp contains score, successful, and feedback
  challengeStore.challenge.feedback = resp;
  isLoading.value = false;
  router.push('/feedback')
}
</script>

<template>
  <div class="flex h-screen bg-gray-950 text-gray-100">
    <!-- LEFT PANE -->
    <div class="w-1/3 border-r border-gray-700 bg-gray-900 p-6 space-y-4 overflow-y-auto overflow-x-hidden">
      <h1 class="text-2xl font-bold mb-4 text-white">Challenge</h1>

      <div class="prose prose-invert max-w-full mt-6" v-html="formattedPrompt"></div>
    </div>

    <!-- RIGHT PANE -->
    <div class="flex-1 flex flex-col">
      <div class="border-b border-gray-700 bg-gray-900 p-4">
        <h2 class="text-xl font-semibold text-white">Your Code</h2>
      </div>

      <div class="flex-1 p-4">
        <div class="h-[80%] mb-6">
          <CodeMirrorEditor v-model="code" />
        </div>

        <div class="absolute bottom-6 right-6">
          <BaseButton :loading="isLoading" @click="handleSubmit" class="bg-green-600 hover:bg-green-700">
            Submit
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.prose {
  max-width: 100%;
}

.prose,
.prose * {
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;
}

.prose pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
  overflow-x: auto;
  max-width: 100%;
}
</style>