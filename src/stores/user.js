import { ref, computed, reactive } from "vue";

import { defineStore } from "pinia";
import { supa, dbSignIn, dbSignOut, dbSignUp } from "@/services/auth";
import { dbGetProfileStats, dbUploadLearnerProfile } from "@/services/dbProfile";

export const useUserStore = defineStore("userStore", () => {
    const user = ref(null);
    const session = ref(null);
    const profile = reactive({
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
        this.profile.id = data.user.id;
        console.log("checking id: ", this.user.value.id);
        this.session.value = data.session;
        return data;
    }

    async function signOut() {
        const { error } = await dbSignOut(supa);
        user.value = null;
        session.value = null;
        if (error) throw error;
        // might not need to return anything here
        return true;
    }

    // add function here to get aggregates from other tables
    async function uploadProfile() {
        const stats = await dbGetProfileStats(supa, profile.id);
        this.profile.difficulty_level = stats[0].recent_challenge_difficulty;
        this.profile.average_time_taken = stats[0].average_time_taken;
        this.profile.success_percentage = stats[0].success_percentage;
        this.profile.number_completed =  stats[0].total_challenges_completed;

        const data = await dbUploadLearnerProfile(supa, profile.id, profile.difficulty_level, profile.average_time_taken, profile.success_percentage, profile.number_completed);
        console.log("checking profile user id ", profile.id);
        return data;
    }

    return { user, session, profile, isLoggedIn, signUp, signIn, signOut, uploadProfile }
})