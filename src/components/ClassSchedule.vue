<script setup lang="ts">
import { useClassStore } from '@/stores/classStorage'
import type { FitnessClass } from '@/stores/classStorage'
import { ref, onMounted } from 'vue'

function formatDay(day: string) {
  const map: Record<string, string> = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  }
  return map[day] || day
}

const store = useClassStore()
const { fitness_classes, addClass, editClass, deleteClass, fetchClasses, loading, error } = store

const classData = ref({
  name: '',
  time: '',
  day: '',
  trainer: '',
})
const editingClassId = ref<string | null>(null)

onMounted(() => {
  fetchClasses()
})

async function handleClassSubmit() {
  if (editingClassId.value !== null) {
    await editClass(editingClassId.value, classData.value)
  } else {
    await addClass(classData.value)
  }

  classData.value = { name: '', time: '', day: '', trainer: '' }
  editingClassId.value = null
}

function handleClassEdit(classItem: FitnessClass) {
  const { id, ...rest } = classItem
  classData.value = { ...rest }
  editingClassId.value = id
}

async function handleClassDelete(id: string) {
  await deleteClass(id)
}
</script>

<template>
  <section class="bg-white p-6 mb-6 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">
      {{ editingClassId ? 'Edit Class' : 'Add New Class' }}
    </h2>
    <form @submit.prevent="handleClassSubmit" id="class-form">
      <div class="mb-4">
        <label for="class-name" class="block font-bold mb-1">Class Name:</label>
        <input
          v-model="classData.name"
          type="text"
          id="class-name"
          name="name"
          required
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="mb-4">
        <label for="class-time" class="block font-bold mb-1">Time:</label>
        <input
          v-model="classData.time"
          type="time"
          id="class-time"
          name="time"
          required
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="mb-4">
        <label for="class-day" class="block font-bold mb-1">Day of the Week:</label>
        <select
          v-model="classData.day"
          id="class-day"
          name="day"
          required
          class="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="class-trainer" class="block font-bold mb-1">Trainer:</label>
        <input
          v-model="classData.trainer"
          type="text"
          id="class-trainer"
          name="trainer"
          required
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        class="w-full md:w-1/4 bg-purple-200 text-black p-2 rounded border border-gray-300 hover:bg-orange-400"
        :disabled="loading"
      >
        {{ editingClassId ? 'Save Changes' : 'Add Class' }}
      </button>
    </form>
    <div v-if="loading" class="mt-2 text-blue-600">Loading...</div>
    <div v-if="error" class="mt-2 text-red-600">{{ error }}</div>
  </section>

  <section class="bg-white p-6 mb-6 rounded shadow">
    <h2 id="class-schedule" class="text-xl font-semibold mb-4">Current Classes</h2>
    <div class="overflow-x-auto">
      <template v-if="!loading && !error && fitness_classes.length === 0">
        <div class="text-gray-600 py-4 text-center">No data is available at the moment.</div>
      </template>
      <template v-else>
        <table v-if="fitness_classes.length > 0" class="w-full border border-gray-300">
          <thead>
            <tr class="bg-gray-800 text-white">
              <th class="p-2 border">Name</th>
              <th class="p-2 border">Time</th>
              <th class="p-2 border">Day</th>
              <th class="p-2 border">Trainer</th>
              <th class="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fitnessClass in fitness_classes" :key="fitnessClass.id">
              <td class="p-2 border">{{ fitnessClass.name }}</td>
              <td class="p-2 border text-center">{{ fitnessClass.time }}</td>
              <td class="p-2 border text-center">{{ formatDay(fitnessClass.day) }}</td>
              <td class="p-2 border">{{ fitnessClass.trainer }}</td>
              <td class="p-2 border space-y-1">
                <button
                  @click="handleClassEdit(fitnessClass)"
                  class="w-full bg-blue-500 text-white p-2 rounded hover:opacity-90"
                >
                  Edit
                </button>
                <button
                  @click="handleClassDelete(fitnessClass.id)"
                  class="w-full bg-red-600 text-white p-2 rounded hover:opacity-90"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <div v-if="loading" class="mt-2 text-blue-600">Loading...</div>
      <div v-if="error" class="mt-2 text-red-600">{{ error }}</div>
    </div>
  </section>
</template>
