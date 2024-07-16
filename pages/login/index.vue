<template>
  <div class="flex items-center justify-center bg-gray-100 py-[265px]">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" v-model="username" id="username" required class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" v-model="password" id="password" required class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
        </div>
        <button type="submit" class="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">Login</button>
      </form>
      <div v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const token = localStorage.getItem('token');
if (token) {
  window.location.href = '/';
}


export default {
  
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:8000/api/login', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        if (response.data.success) {
          // Save the token and redirect to another page
          localStorage.setItem('token', response.data.token)
          navigateTo('/profile')
        } else {
          this.error = 'Login failed. Please check your credentials.'
        }
      })
      .catch(err => {
        this.error = 'An error occurred. Please try again.'
      })
    }
  },

    
  }

</script>


