<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-950">
    <NavBar />

    <main class="flex-1 flex flex-col items-center justify-center px-6">
      <div class="max-w-3xl w-full text-center space-y-8">
        <div class="space-y-4">
          <h1 class="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Code Runner
          </h1>
          <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Improve your programming skills using our AI teacher
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/signin"
            class="w-full sm:w-auto bg-white text-gray-950 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Sign In
          </router-link>
          <router-link to="/signup"
            class="w-full sm:w-auto bg-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 border border-gray-700 transition-colors">
            Sign Up
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>