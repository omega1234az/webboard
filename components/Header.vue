<template>
  <div>
    <div class="w-full text-white bg-[#0F0F0F] flex items-center ">
      <div class="justify-center font-bold text-2xl text-center w-[10%]">
        <div class="">LOGO</div>
      </div>
      <!-- Updated container class to properly contain the menu -->
      <div class="flex-1 ">
        <div class="container mx-auto text-center py-2 px-2 font-bold text-xl grid grid-cols-3">
          <NuxtLink to="/" class="p-5 hover:bg-[#525050] rounded-md">Home</NuxtLink>
          <NuxtLink to="/" class="p-5 hover:bg-[#525050] rounded-md">Popular</NuxtLink>
          <NuxtLink to="/" class="p-5 hover:bg-[#525050] rounded-md">Create</NuxtLink>
        </div>
      </div>
      <div class="px-2 text-center font-bold text-2xl text-black relative">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            class="w-full rounded-full pl-10 pr-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-400 focus:outline-none focus:border-blue-500 h-10"
            placeholder="ค้นหา..."
            @focus="dropdownVisible = true"
            @blur="hideDropdown"
          />
          <img
            src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/search-260.png"
            class="absolute left-3 top-2 w-6 h-6"
          />
          <ul
            v-show="dropdownVisible && searchQuery"
            class="absolute w-full bg-white border border-gray-400 rounded mt-1 z-10"
          >
            <li
              v-for="item in filteredItems"
              :key="item.id"
              class="p-2 hover:bg-gray-200 cursor-pointer"
              @mousedown.prevent="selectItem(item)"
            >
              {{ item.title }}
            </li>
            <li v-if="filteredItems.length === 0" class="p-2 text-gray-500">
              ไม่พบข้อมูล
            </li>
          </ul>
        </div>
      </div>
      <div class="w-[10%] flex justify-center relative">
        <div v-if="!isLoggedIn">
          <button
            @click="redirectToLogin"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
        <div v-else class="relative">
          <img
            @click="toggleProfileDropdown"
            class="object-contain rounded-full w-[50px] h-[50px] bg-white cursor-pointer"
            :src="`http://localhost:8000/uploads/profile/${profile.img}`"
          />
          <ul
            v-show="profileDropdownVisible"
            class="absolute right-0 mt-2 w-48 bg-[#3A3939] rounded-lg text-xl font-bold"
          >
            <li
              @click="navigateTo('/profile')"
              class="px-4 py-2 hover:bg-[#525050] cursor-pointer"
            >
              หน้าของฉัน
            </li>
            <li
              @click="navigateTo('settings')"
              class="px-4 py-2 hover:bg-[#525050] cursor-pointer"
            >
              การตั้งค่า
            </li>
            <li
              @click="logout"
              class="px-4 py-2 hover:bg-[#525050] cursor-pointer"
            >
              ออกจากระบบ
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';


const searchQuery = ref('');
const dropdownVisible = ref(false);
const profileDropdownVisible = ref(false);
const items = ref([]);
const isLoggedIn = ref(false);
const profile = ref({});

const router = useRouter();
const route = useRoute();

async function checkAuthAndFetchProfile() {
  await checkAuth();
  if (isLoggedIn.value) {
    await fetchProfile();
  }
}

function checkAuth() {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
}

async function fetchProfile() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    const response = await axios.get('http://localhost:8000/api/user/me', {
      headers: {
        Authorization: `${token}`,
      },
    });
    profile.value = response.data;   
  } catch (error) {
    console.error('Error fetching profile:', error);
    localStorage.removeItem('token');
    isLoggedIn.value=false;
  }
}

function logout() {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  profile.value = {};
  router.push('/login');
}

function selectItem(item) {
  searchQuery.value = item.title;
  dropdownVisible.value = false;
}

function hideDropdown() {
  setTimeout(() => {
    dropdownVisible.value = false;
  }, 100);
}

function toggleProfileDropdown() {
  profileDropdownVisible.value = !profileDropdownVisible.value;
}

function redirectToLogin() {
  resetData();
  router.push({ name: 'login' });
}

const filteredItems = computed(() => {
  return items.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function resetData() {
  searchQuery.value = '';
  dropdownVisible.value = false;
  profileDropdownVisible.value = false;
  items.value = [];
  profile.value = {};
}

onMounted(async () => {
  await checkAuthAndFetchProfile();
});

watchEffect(async () => {
  // ตรวจสอบการเปลี่ยนแปลงของ route
  route.path; // เพิ่มบรรทัดนี้เพื่อให้ watchEffect ทำงานเมื่อ route เปลี่ยน
  await checkAuthAndFetchProfile();
});
</script>

<style scoped>
/* ใส่สไตล์เพิ่มเติมตามต้องการ */
</style>
