<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterItem from './components/FooterItem.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <header class="bg-gray-800 text-white p-6 text-center">
        <img
          src="./assets/logo.png"
          alt="Fitness Center Logo"
          class="mx-auto w-24 mb-2"
        />
        <h1 class="text-2xl font-bold">Fitness Center Dashboard</h1>
        <p class="text-sm">
          Open every day (incl. holidays): <time datetime="06:00-22:00">6:00 AM - 10:00 PM</time>
        </p>
      </header>

      <nav class="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow">
        <ul class="flex flex-wrap justify-center gap-4">
          <li>
            <RouterLink to="/" class="text-white font-bold hover:underline">Home Page</RouterLink>
          </li>
          <li>
            <RouterLink to="/class-schedule" class="text-white font-bold hover:underline">Class Schedule</RouterLink>
          </li>
          <li>
            <RouterLink to="/member-plans" class="text-white font-bold hover:underline">Member Plans</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <div class="min-h-screen bg-sky-50 flex flex-col">
    <main class="flex-grow">
      <RouterView />
    </main>
  </div>


  <FooterItem />
</template>

<style scoped></style>
