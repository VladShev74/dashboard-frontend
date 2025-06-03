<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useClassStore } from '@/stores/classStorage'
import axios from 'axios'

const { fitness_classes, fetchClasses } = useClassStore()

const membership_plans = ref<{ id: string; name: string; duration: number; price: number }[]>([])
const API_URL = import.meta.env.VITE_API_URL

async function fetchPlans() {
  const res = await axios.get(`${API_URL}/plans`)
  membership_plans.value = res.data.plans
}

const dayOrder: Record<string, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
}

function getTodayWeekday(): string {
  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ][new Date().getDay()]
}

const todayWeekday = computed(getTodayWeekday)

const classesToday = computed(() =>
  fitness_classes.filter(c => c.day === todayWeekday.value).length
)

const totalPlans = computed(() => membership_plans.value.length)

const upcomingClasses = computed(() => {
  return [...fitness_classes]
    .filter(c => c.day && c.time)
    .sort((a, b) => {
      const dayDiff = dayOrder[a.day] - dayOrder[b.day]
      if (dayDiff !== 0) return dayDiff
      return a.time.localeCompare(b.time)
    })
    .slice(0, 5)
})

onMounted(async () => {
  await fetchClasses()
  await fetchPlans()
})
</script>

<template>
  <div id="app">
    <main class="p-6 max-w-4xl mx-auto">
      <section class="bg-white p-6 rounded shadow mb-6">
        <h3 class="text-lg font-semibold mb-4">Stats Overview</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="bg-white shadow rounded-lg p-4 text-center">
            <p class="text-gray-500">Classes Today ({{ todayWeekday }})</p>
            <p class="text-2xl font-bold text-gray-800">{{ classesToday }}</p>
          </div>
          <div class="bg-white shadow rounded-lg p-4 text-center">
            <p class="text-gray-500">Active Plans</p>
            <p class="text-2xl font-bold text-gray-800">{{ totalPlans }}</p>
          </div>
        </div>
      </section>

      <section class="bg-white p-6 rounded shadow mb-6">
        <h3 class="text-lg font-semibold mb-4">Upcoming Classes</h3>
        <ul class="space-y-2">
          <template v-if="upcomingClasses.length === 0">
            <li class="text-gray-600 py-4 text-center">No data is available at the moment.</li>
          </template>
          <template v-else>
            <li
              v-for="classItem in upcomingClasses"
              :key="classItem.id"
              class="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p class="font-semibold text-gray-800">{{ classItem.name }}</p>
                <p class="text-sm text-gray-500">
                  {{ classItem.day }} – {{ classItem.time }} – {{ classItem.trainer }}
                </p>
              </div>
            </li>
          </template>
        </ul>
      </section>

      <section class="bg-white p-6 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Management Tasks</h3>
        <details class="mb-2 p-4 border border-gray-300 rounded">
          <summary class="font-bold cursor-pointer">Weekly Tasks</summary>
          <ul class="list-disc pl-6 mt-2">
            <li>Review class schedule</li>
            <li>Check trainer availability</li>
          </ul>
        </details>
        <details class="mb-2 p-4 border border-gray-300 rounded">
          <summary class="font-bold cursor-pointer">Monthly Tasks</summary>
          <ul class="list-disc pl-6 mt-2">
            <li>Update trainer availability</li>
            <li>Review feedback from members</li>
          </ul>
        </details>
        <details class="mb-2 p-4 border border-gray-300 rounded">
          <summary class="font-bold cursor-pointer">Quarterly Tasks</summary>
          <ul class="list-disc pl-6 mt-2">
            <li>Introduce new fitness programs</li>
            <li>Analyze class attendance trends</li>
          </ul>
        </details>
        <details class="mb-2 p-4 border border-gray-300 rounded">
          <summary class="font-bold cursor-pointer">Seasonal Tasks</summary>
          <ul class="list-disc pl-6 mt-2">
            <li>Promote health campaigns</li>
            <li>Organize special fitness events</li>
          </ul>
        </details>
      </section>
    </main>
  </div>
</template>
