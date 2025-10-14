import { ref, computed } from "vue";

import { defineStore } from "pinia";
import { supa, dbSignIn, dbSignOut, dbSignUp } from "@/services/auth";

export const useUserStore = defineStore("userStore", () => {
    const user = ref(null);
    const session = ref(null);

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
        this.session.value = data.session;
        return data;
    }

    async function signOut() {
        const { error } = await dbSignOut(supa);
        if (error) throw error;
        // might not need to return anything here
        return true;
    }

    return { user, session, isLoggedIn, signUp, signIn, signOut }
})