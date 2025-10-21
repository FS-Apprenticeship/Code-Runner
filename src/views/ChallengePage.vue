<script setup>
import CodeMirrorEditor from "@/components/CodeEditor.vue";
import { ref, computed } from "vue";
import { marked } from "marked";

import { useChallengeStore } from "@/stores/challenge";

const challengeStore = useChallengeStore();
// console.log("checker: ", challengeStore.challenge.prompt);

const formattedPrompt = computed(() =>
  marked.parse(challengeStore.challenge.prompt || "")
);

const code = ref(
  `console.log("Hello World!")\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`
);
</script>

<template>
  <div class="flex h-screen bg-gray-950 text-gray-100">
    <!-- LEFT PANE -->
    <div class="w-1/3 border-r border-gray-700 bg-gray-900 p-6 space-y-4 overflow-auto">
      <h1 class="text-2xl font-bold mb-4 text-white">Challenge</h1>

      <p class="text-gray-300">🍍 Pineapple</p>
      <p class="text-gray-300">🍍 Pineapple</p>
      <p class="text-gray-300">🍍 Pineapple</p>

      <div class="text-gray-300 prose prose-invert max-w-none break-words whitespace-pre-wrap overflow-hidden"
        v-html="formattedPrompt"></div>
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
      </div>
    </div>
  </div>
</template>
