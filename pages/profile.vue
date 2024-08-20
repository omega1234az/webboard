<template>
  <title>โปรไฟล์ของฉัน</title>
  
  <div class="container md:w-container pt-[100px] mx-auto">
    <div class="relative">
      <!-- Background image -->
      <div class="h-72 overflow-hidden rounded-t-xl">
        <img src="../public/img/bg.jpg" class="w-full h-full object-cover" alt="Background">
      </div>
      
      <!-- Profile image container -->
      <div class="absolute bottom-0 left-8 transform translate-y-1/2">
        <div class="w-32 h-32 rounded-full border-[6px] border-[#3A3939] overflow-hidden">
          <img v-if="profile.img" :src="getProfileImageUrl" class="w-full h-full object-cover" alt="Profile">
          <img v-else src="../public/img/default-profile.jpg" class="w-full h-full object-cover" alt="Default Profile">
        </div>
      </div>
    </div>
    
    <!-- Dark background for name -->
    <div class="bg-[#3A3939] p-5 pt-16">
      <div class="ml-5 mt-2 text-white grid grid-cols-2 gap-4">
        <div>
          <h2 class="text-2xl font-bold">{{ profile.name || 'User Name' }}</h2>
          <p class="mt-2 text-md">You can not be sad when Daisy is around, she will not let you.</p>
        </div>
        <div class="flex justify-end items-start">
          <div class="bg-[#455DFF] text-md px-10 py-2 rounded-xl cursor-pointer">แก้ไขข้อมูล</div>
        </div>
      </div>
    </div>

    <div class="mt-5 bg-[#3A3939] p-3 rounded-t-md grid md:grid-cols-5 grid-cols-1 gap-5 text-white text-center text-md font-bold">
      <div class="bg-[#272626] p-4 rounded-xl">กระทู้ที่ฉันตั้ง</div>
      <div class="bg-[#272626] p-4 rounded-xl">กระทู้ที่ตอบ</div>
      <div class="bg-[#272626] p-4 rounded-xl">กระทู้โปรด</div>
    </div>

    <div class="mt-3 bg-[#3A3939] h-72 flex flex-col md:flex-row justify-center items-center gap-3 text-white">
      <div class="text-md text-center">คุณยังไม่ได้ตั้งกระทู้</div>
    <NuxtLink :to="'createpost'">
      <div class="bg-[#455DFF] text-md px-10 py-2 rounded-xl cursor-pointer">ตั้งกระทู้แรกของคุณ</div>
    </NuxtLink>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const router = useRouter()
const profile = ref({})
const useLocalStorage = () => {
  const getItem = (key) => {
    if (process.client) {
      return localStorage.getItem(key);
    }
    return null;
  };

  const setItem = (key, value) => {
    if (process.client) {
      localStorage.setItem(key, value);
    }
  };

  const removeItem = (key) => {
    if (process.client) {
      localStorage.removeItem(key);
    }
  };

  return { getItem, setItem, removeItem };
};

const { getItem, setItem, removeItem } = useLocalStorage();


// Computed property to get profile image URL
const getProfileImageUrl = computed(() => {
  return profile.value.img ? `${config.public.ApiBase}/uploads/profile/${profile.value.img}` : null
})

// Function to fetch profile
const fetchProfile = async () => {
  try {
    const token = getItem('token')
    const response = await axios.get('http://localhost:8000/api/user/me', {
      headers: {
        Authorization: `${token}`
      }
    })
    profile.value = response.data
  } catch (err) {
    console.error('Error fetching profile:', err)
    router.push('/login')
  }
}

// Function to handle logout
const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

// Function to navigate to home
const home = () => {
  router.push('/')
}

// Fetch profile on component mount
onMounted(fetchProfile)
</script>

<style scoped>
.container {
  z-index: 1;
}
</style>


<style scoped>
.container {
  z-index: 1;
}
</style>