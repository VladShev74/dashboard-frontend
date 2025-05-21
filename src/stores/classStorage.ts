import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export type FitnessClass = {
  id: number
  name: string
  time: string
  day: string
  trainer: string
}

export const useClassStore = defineStore('classStore', () => {
  const fitness_classes = ref<FitnessClass[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchClasses = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${API_URL}/classes`)
      fitness_classes.value.splice(0, fitness_classes.value.length, ...response.data.classes)
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Failed to fetch classes'
      }
    } finally {
      loading.value = false
    }
  }

  const addClass = async (newClass: Omit<FitnessClass, 'id'>) => {
    try {
      await axios.post<FitnessClass>(`${API_URL}/classes`, newClass)
      await fetchClasses()
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Failed to add class'
      }
    }
  }

  const editClass = async (id: number, updated: Omit<FitnessClass, 'id'>) => {
    try {
      await axios.put<FitnessClass>(`${API_URL}/classes/${id}`, updated)
      await fetchClasses()
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Failed to edit class'
      }
    }
  }

  const deleteClass = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/classes/${id}`)
      await fetchClasses()
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Failed to delete class'
      }
    }
  }

  return {
    fitness_classes,
    addClass,
    editClass,
    deleteClass,
    fetchClasses,
    loading,
    error
  }
})
