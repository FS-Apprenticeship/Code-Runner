<script setup>
import { syncStoreUsers } from "@/services/auth";
import { useChallengeStore } from "@/stores/challenge";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const userStore = useUserStore();
const challengeStore = useChallengeStore();

// function for WHEN to display the sign out button
const showSignOut = userStore.isLoggedIn;

// helper function to actually sign the person out
async function signOutHelper() {
  await userStore.signOut();
  syncStoreUsers(userStore, challengeStore);
  router.push('/')
}
</script>

<template>
  <nav class="bg-gray-900 border-b border-gray-800 text-white px-6 py-4 flex justify-between items-center">
    <div class="font-bold text-xl">My Todo App</div>
    <button v-if="showSignOut" @click="signOutHelper()"
      class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors font-medium">
      Sign Out
    </button>
  </nav>
</template>
