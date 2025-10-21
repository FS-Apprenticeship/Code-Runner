<script setup>
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import router from "@/router";

import { useUserStore } from "@/stores/user";
import { useChallengeStore } from "@/stores/challenge";

// const userStore = useUserStore();
const challengeStore = useChallengeStore();

const selectedLanguage = ref(null);
const selectedTopic = ref(null);

const languages = ["Javascript", "Python"];

const selectLanguage = (language) => {
  selectedLanguage.value = language;
};

const topics = ["If Statements", "Arithmetic", "Functions", "Loops"];

const selectTopic = (topic) => {
  selectedTopic.value = topic;
};

const handleSubmit = async () => {
  if (!selectedLanguage.value || !selectedTopic.value) {
    alert("Please select both a language and a topic");
    return null;
  }

  console.log("Selected:", {
    language: selectedLanguage.value,
    topic: selectedTopic.value,
  });

  // store lang and topic
  challengeStore.challenge.language = selectedLanguage.value;
  challengeStore.challenge.topic = selectedTopic.value;

  // get recent difficulty level and store in challenge
  const diff = await challengeStore.getRecentDifficulty();
  challengeStore.challenge.difficulty_level = diff;

  // create prompt and load into challenge BEFORE we go to challenge page
  const prompt = await challengeStore.aiCreateChallenge();
  challengeStore.prompt = prompt;

  // todo add routing
  router.push("/challenge");
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-950">
    <NavBar />

    <main class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="max-w-4xl w-full space-y-12">
        <!-- language sectiion-->
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-white text-center">
            Choose Language
          </h2>
          <div class="flex justify-center">
            <div class="grid grid-cols-2 gap-5 max-w-2xl">
              <!-- <div class="grid grid-cols-2 gap-5 max-w-2xl"> -->
              <button
                v-for="language in languages"
                :key="language"
                @click="selectLanguage(language)"
                :class="[
                  'px-6 py-4 rounded-lg font-medium transition-all',
                  'border-2',
                  selectedLanguage === language
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600',
                ]"
              >
                {{ language }}
              </button>
            </div>
          </div>
        </div>

        <!-- topic section -->
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-white text-center">
            Choose Topic
          </h2>
          <div class="flex justify-center">
            <!-- <div class="grid grid-cols-2 gap-4 max-w-2xl"> -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
              <button
                v-for="topic in topics"
                :key="topic"
                @click="selectTopic(topic)"
                :class="[
                  'px-6 py-4 rounded-lg font-medium transition-all',
                  'border-2',
                  selectedTopic === topic
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600',
                ]"
              >
                {{ topic }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-center pt-6">
          <BaseButton
            @click="handleSubmit"
            :disabled="!selectedLanguage || !selectedTopic"
            class="min-w-[200px]"
          >
            Submit
          </BaseButton>
        </div>
      </div>
    </main>
  </div>
</template>
