import { ref, computed } from "vue";

import { defineStore } from "pinia";
import { supa, dbSignIn, dbSignOut, dbSignUp } from "@/services/auth";
import { dbGetProfileStats, dbUploadLearnerProfile } from "@/services/dbProfile";

export const useUserStore = defineStore("userStore", () => {
    const user = ref(null);
    const session = ref(null);
    const profile = ref({
        id: null,
        difficulty_level: null,
        average_time_taken: null,
        success_percentage: null,
        number_completed: null,
    });

    const isLoggedIn = computed(() => user.value != null);

    async function signUp(email, password) {
        const { data, error } = await dbSignUp(supa, email, password);
        if (error) throw error;
        return data;
    }

    async function signIn(email, password) {
        const { data, error } = await dbSignIn(supa, email, password);
        if (error) throw error;
        this.user.value = data.user;
        this.profile.value.id = data.user.id;
        console.log("checking id: ", this.user.value.id);
        this.session.value = data.session;
        return data;
    }

    async function signOut() {
        const { error } = await dbSignOut(supa);
        if (error) throw error;
        // might not need to return anything here
        return true;
    }

    // add function here to get aggregates from other tables
    async function uploadProfile() {
        const stats = await dbGetProfileStats(supa, profile.value.id);
        this.profile.value.difficulty_level = stats[0].recent_challenge_difficulty;
        this.profile.value.average_time_taken = stats[0].average_time_taken;
        this.profile.value.success_percentage = stats[0].success_percentage;
        this.profile.value.number_completed =  stats[0].total_challenges_completed;

        const data = await dbUploadLearnerProfile(supa, profile.value.id, profile.value.difficulty_level, profile.value.average_time_taken, profile.value.success_percentage, profile.value.number_completed);
        console.log("checking profile user id ", profile.value.id);
        return data;
    }

    return { user, session, profile, isLoggedIn, signUp, signIn, signOut, uploadProfile }
})