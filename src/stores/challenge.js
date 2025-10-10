import { ref } from "vue";
import { defineStore } from "pinia";

export const useChallengeStore = defineStore("challenge", () => {
    const challenge = ref(null)

    return { challenge }
})