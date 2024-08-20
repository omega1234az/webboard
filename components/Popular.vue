<template>
  <div class="sticky top-[80px]">
    <div class="w-full py-2 bg-[#455DFF] rounded-md text-white text-md md:text-lg font-bold items-center justify-center flex">
      ยอดนิยม
    </div>
    <ul class="w-full bg-[#3A3939] rounded-lg mt-3 text-white text-md md:text-lg font-bold flex flex-col">
      <NuxtLink
        v-for="category in categories"
        :key="category.sub_cate_id"
        class="hover:bg-[#585757] delay-50 p-2 md:p-3 rounded-sm"
        :to="`/tags/${category.sub_cate_id}`">
        {{ category.name }}
      </NuxtLink>
    </ul>
  </div>
</template>

<script setup>

import axios from 'axios';

const config = useRuntimeConfig();
const categories = ref([]);

onMounted(async () => {
  try {
    const responseCategories = await axios.get(`${config.public.ApiBase}/api/categories/popular`);
    categories.value = responseCategories.data;
    console.log(categories.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>
