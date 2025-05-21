<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

type MembershipPlan = {
  id: number
  name: string
  duration: number
  price: number
}

const membership_plans = ref<MembershipPlan[]>([])

const planData = ref<MembershipPlan>({ name: '', duration: 0, price: 0, id: 0 })
const editingPlanId = ref<number | null>(null)
const errorMsg = ref<string | null>(null)

async function fetchPlans() {
  try {
    const res = await axios.get(`${API_URL}/plans`)
    membership_plans.value = res.data.plans
    errorMsg.value = null
  } catch (err) {
    axiosErrorHandling(err)
  }
}

async function handlePlanSubmit() {
  try {
    if (editingPlanId.value) {
      // Edit plan (PUT)
      await axios.put(`${API_URL}/plan/${editingPlanId.value}`, {
        name: planData.value.name,
        duration: planData.value.duration,
        price: planData.value.price,
      })
    } else {
      // Add plan (POST)
      await axios.post(`${API_URL}/plan`, {
        name: planData.value.name,
        duration: planData.value.duration,
        price: planData.value.price,
      })
    }
    planData.value = { name: '', duration: 0, price: 0, id: 0 }
    editingPlanId.value = null
    await fetchPlans()
    errorMsg.value = null
  } catch (err) {
    axiosErrorHandling(err)
    errorMsg.value = 'Failed to save plan.'
  }
}

function handlePlanEdit(plan: MembershipPlan) {
  planData.value = { ...plan }
  editingPlanId.value = plan.id
}

async function handlePlanDelete(id: number) {
  try {
    await axios.delete(`${API_URL}/plan/${id}`)
    await fetchPlans()
    errorMsg.value = null
  } catch (err) {
    axiosErrorHandling(err)
    errorMsg.value = 'Failed to delete plan.'
  }
}

function axiosErrorHandling(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('Error response:', error.response.data)
      console.error('Error status:', error.response.status)
      console.error('Error headers:', error.response.headers)
    } else if (error.request) {
      console.error('Error request:', error.request)
    } else {
      console.error('Error message:', error.message)
    }
    console.error('Error config:', error.config)
  } else {
    // Not an Axios error
    console.error('Unknown error:', error)
  }
}

onMounted(() => {
  fetchPlans()
})
</script>

<template>
  <!-- Form Section -->
  <section class="bg-white p-6 mb-6 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">
      {{ editingPlanId ? 'Edit Member Plan' : 'Add Member Plan' }}
    </h2>
    <form @submit.prevent="handlePlanSubmit" id="plan-form">
      <div class="mb-4">
        <label for="plan-name" class="block font-bold mb-1">Plan Name:</label>
        <input
          v-model="planData.name"
          type="text"
          id="plan-name"
          name="plan-name"
          required
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="mb-4">
        <label for="plan-duration" class="block font-bold mb-1">Duration (months):</label>
        <input
          v-model="planData.duration"
          type="number"
          id="plan-duration"
          name="plan-duration"
          min="1"
          required
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="mb-4">
        <label for="plan-price" class="block font-bold mb-1">Price (€):</label>
        <input
          v-model="planData.price"
          type="number"
          id="plan-price"
          name="plan-price"
          min="0"
          step="0.01"
          required
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        class="w-full md:w-1/4 bg-purple-200 text-black p-2 rounded border border-gray-300 hover:bg-orange-400"
      >
        {{ editingPlanId ? 'Edit Plan' : 'Add Plan' }}
      </button>
    </form>
    <div v-if="errorMsg" class="mt-2 text-red-600">{{ errorMsg }}</div>
  </section>

  <!-- Table Section -->
  <section class="bg-white p-6 mb-6 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Current Member Plans</h2>
    <div class="overflow-x-auto">
      <template v-if="membership_plans.length === 0">
        <div class="text-gray-600 py-4 text-center">No data is available at the moment.</div>
      </template>
      <template v-else>
        <table class="w-full border border-gray-300">
          <thead>
            <tr class="bg-gray-800 text-white">
              <th class="p-2 border">Plan Name</th>
              <th class="p-2 border">Duration (Months)</th>
              <th class="p-2 border">Price (€)</th>
              <th class="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="plan in membership_plans" :key="plan.id">
              <td class="p-2 border">{{ plan.name }}</td>
              <td class="p-2 border text-center">{{ plan.duration }}</td>
              <td class="p-2 border text-center">€{{ plan.price }}</td>
              <td class="p-2 border space-y-1">
                <button
                  @click="handlePlanEdit(plan)"
                  class="w-full bg-blue-500 text-white p-2 rounded hover:opacity-90"
                >
                  Edit
                </button>
                <button
                  @click="handlePlanDelete(plan.id)"
                  class="w-full bg-red-600 text-white p-2 rounded hover:opacity-90"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </section>
</template>
