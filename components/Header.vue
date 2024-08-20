<template>
  <div class="relative">
    <div class="w-full text-white bg-[#0F0F0F] flex items-center fixed z-20">
      <div class="justify-center font-bold text-2xl text-center w-[10%]">
        <div class="">LOGO</div>
      </div>
      <div class="flex-1">
        <div class="container mx-auto text-center py-1 px-2 font-bold text-md grid grid-cols-3">
          <NuxtLink to="/" class="p-5 hover:bg-[#525050] rounded-md">หน้าแรก</NuxtLink>
          <NuxtLink to="/popular" class="p-5 hover:bg-[#525050] rounded-md">ยอดนิยม</NuxtLink>
          <NuxtLink to="/createpost" class="p-5 hover:bg-[#525050] rounded-md">ตั้งกระทู้</NuxtLink>
        </div>
      </div>
      
      <div class="px-2 text-center text-xl text-black relative">
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
            v-show="dropdownVisible && searchQuery.length >= 2"
            class="absolute w-full bg-white border border-gray-400 rounded mt-1 z-30"
          >
            <li
              v-for="item in filteredItems"
              :key="item.id"
              class="p-2 hover:bg-gray-200 cursor-pointer"
            >
            
              <NuxtLink :to="getLink(item)">
                <div class='flex items-center justify-center gap-2'>
                <img class="w-6 h-6   cursor-pointer" :src="item.img_url" alt="Save Icon">
                <p class="mt-1">{{ item.name }}</p>
              </div>
              </NuxtLink>
            </li>
            <li v-if="filteredItems.length === 0" class="p-2 text-gray-500">
              ไม่พบข้อมูล
            </li>
            <NuxtLink :to="'/search/'+searchQuery">
              <li class="p-2 bg-transparent hover:bg-gray-200 cursor-pointer">ค้นหา {{ searchQuery }} ใน โพสต์ทั้งหมด</li>
            </NuxtLink>
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
            class="object-cover rounded-full w-[50px] h-[50px] bg-slate-500 cursor-pointer"
            :src="`http://localhost:8000/uploads/profile/${profile.img}`"
          />
          <ul
            v-show="profileDropdownVisible"
            class="absolute right-0 mt-2 w-48 bg-[#3A3939] rounded-lg text-xl font-bold z-30"
          >
            <li
              @click="navigateTo('/profile')"
              class="px-4 py-2 hover:bg-[#525050] cursor-pointer"
            >
              หน้าของฉัน
            </li>
            <li
              @click="navigateTo('/settings')"
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

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

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
    isLoggedIn.value = false;
  }
}

function logout() {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  profile.value = {};
  router.push('/login');
}

function selectItem(item) {
  searchQuery.value = item.name;
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
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function resetData() {
  searchQuery.value = '';
  dropdownVisible.value = false;
  profileDropdownVisible.value = false;
  items.value = [];
  profile.value = {};
}

async function fetchSubCategories() {
  if (searchQuery.value.length < 2) {
    items.value = []; // Clear items if the query is too short
    return;
  }

  try {
    const response = await axios.get('http://localhost:8000/api/categories/search/'+searchQuery.value, {
    });
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
  }
}

// Watch searchQuery and fetch subcategories when it changes
watch(searchQuery, async (newQuery) => {
  if (newQuery.length >= 2) {
    await fetchSubCategories();
  } else {
    items.value = []; // Clear items if the query is too short
  }
});

onMounted(async () => {
  await checkAuthAndFetchProfile();
});

function getLink(item) {
  return item.type === 'category' ? `/categories/${item.id}` : `/tags/${item.id}`;
}
</script>
