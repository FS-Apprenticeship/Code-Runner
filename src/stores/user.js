import { ref, computed, reactive } from "vue";

import { defineStore } from "pinia";
import router from "@/router";
import { supa, dbSignIn, dbSignOut, dbSignUp } from "@/services/auth";
import { dbGetLearnerStats, dbUploadLearnerStats } from "@/services/dbProfile";

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

    async function loadUser() {
        // const { data } = await supa.auth.getSession()
        const { data } = await supa.auth.getUser()
        this.user = data.user || null
        if (this.user !== null) {
            console.log("user already logged in")
        } else {
            console.log("user not logged in")
        }
    }

    async function signUp(email, password) {
        const { data, error } = await dbSignUp(supa, email, password);
        return { data, error };
        // if (error) throw error;
        // return data;
    }

    async function signIn(email, password) {
        const { data, error } = await dbSignIn(supa, email, password);
        if (error) throw error;
        this.user = data.user;
        this.profile.id = data.user.id;
        // console.log("checking id: ", this.user.id);
        this.session = data.session;
        router.push('/selection');
        // return { data, error };
    }

    async function signOut() {
        const { error } = await dbSignOut(supa);
        this.user = null;
        this.session = null;
        if (error) throw error;
        router.push('/');
    }

    // add function here to get aggregates from other tables
    async function uploadProfile(difficulty) {
        const data = await dbGetLearnerStats(supa, this.user.id);
        return await dbUploadLearnerStats(supa, this.user.id, difficulty, data.average_time_taken, data.success_percentage, data.total_challenges_completed);
    }

    return { user, session, profile, isLoggedIn, loadUser, signUp, signIn, signOut, uploadProfile }
})