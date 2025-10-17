<script setup>
import CodeMirrorEditor from '@/components/CodeEditor.vue';
import { ref } from 'vue';

const code = ref(`console.log("Hello World!")\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`)
</script>

<template>
  <div class="flex h-screen bg-[#1e1e1e] text-gray-100">
    <!-- LEFT PANE -->
    <div class="w-1/3 border-r border-gray-700 p-6 space-y-4 overflow-auto">
      <h1 class="text-2xl font-bold mb-4 text-yellow-400">Challenge</h1>
      <p>🍍 Pineapple</p>
      <p>🍍 Pineapple</p>
      <p>🍍 Pineapple</p>
    </div>

    <!-- RIGHT PANE -->
    <div class="flex-1 flex flex-col">
      <div class="border-b border-gray-700 p-4">
        <h2 class="text-xl font-semibold text-yellow-400">Your Code</h2>
      </div>

      <div class="flex-1 p-4">
        <div class="h-[80%] mb-6">
        <CodeMirrorEditor v-model="code" />
        </div>
      </div>
    </div>
  </div>
</template>