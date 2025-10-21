<script setup>
import CodeMirrorEditor from "@/components/CodeEditor.vue";
import { ref, computed } from "vue";
import { marked } from "marked";
import BaseButton from "@/components/BaseButton.vue";

import { useChallengeStore } from "@/stores/challenge";

const challengeStore = useChallengeStore();

const formattedPrompt = computed(() =>
  marked.parse(challengeStore.challenge.prompt || "")
);

const code = ref(
  `console.log("Hello World!")\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`
);

const handleSubmit = async () => {
  challengeStore.challenge.response = code.value;
  const data = await challengeStore.uploadChallengeResponse();
  console.log("response uploaded to db")
  const resp = await challengeStore.aiEvaluteCode();
  console.log("evaluation: ", resp.text)
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
          <BaseButton @click="handleSubmit" class="bg-green-600 hover:bg-green-700 text-white">
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