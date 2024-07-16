<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-8">
      <div class="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h1 class="text-2xl font-bold mb-4">Profile</h1>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <div class="mt-1 p-2 border rounded bg-gray-50">{{ profile.username }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1 p-2 border rounded bg-gray-50">{{ profile.email }}</div>
          </div>
        </div>
        <button @click="home" class="mt-6 w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-indigo-200">Home</button>
        <button @click="logout" class="mt-6 w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  middleware: [
    'auth',
  ],
  data() {
    return {
      profile: {}
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8000/api/user/me', {
        headers: {
          Authorization: `${token}`
        }
      })
      this.profile = response.data
    } catch (err) {
      console.error('Error fetching profile:', err)
      // Handle error, e.g., redirect to login page if not authenticated
      this.$router.push('/login')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    home() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
/* Custom styles if needed */
</style>
