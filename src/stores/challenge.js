import { ref } from "vue";
import { defineStore } from "pinia";

export const useChallengeStore = defineStore("challenge", () => {
    // this challenge stores only the current challenge with all properties
    const challenge = ref(null)

    return { challenge }
})