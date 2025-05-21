<script setup lang="ts">
import { ref } from 'vue'

type MembershipPlan = {
  id: number
  name: string
  duration: number
  price: number
}

const membership_plans = ref<MembershipPlan[]>([
  { id: Date.now() - 1, name: 'Basic Plan', duration: 1, price: 30 },
  { id: Date.now() - 2, name: 'Annual Plan', duration: 12, price: 300 },
])

const planData = ref<MembershipPlan>({ name: '', duration: 0, price: 0, id: 0 })
const editingPlanId = ref<number | null>(null)

function handlePlanSubmit() {
  if (editingPlanId.value) {
    const index = membership_plans.value.findIndex((p) => p.id === editingPlanId.value)
    if (index !== -1) {
      membership_plans.value[index] = { ...planData.value, id: editingPlanId.value }
    }
  } else {
    const newPlan = { ...planData.value, id: Date.now() }
    membership_plans.value.push(newPlan)
  }

  planData.value = { name: '', duration: 0, price: 0, id: 0 }
  editingPlanId.value = null
}

function handlePlanEdit(plan: MembershipPlan) {
  planData.value = { ...plan }
  editingPlanId.value = plan.id
}

function handlePlanDelete(id: number) {
  membership_plans.value = membership_plans.value.filter((p) => p.id !== id)
}
</script>

<template>
  <section class="bg-white p-6 mb-6 rounded shadow">
    <h2 id="member-plans" class="text-xl font-semibold mb-4">Member Plans</h2>
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

    <div class="overflow-x-auto mt-6">
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
    </div>
  </section>
</template>
