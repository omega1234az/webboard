<template>
  <title>Home</title>
  
  <div class="w-full xl:container px-4 bg-[#191A1A] pt-[100px] mx-auto">
    <div class="w-full py-2 bg-[#455DFF] rounded-md text-white text-md md:text-xl font-bold items-center justify-center flex mb-3">
      หมวดหมู่
    </div>
    <div class="overflow-x-auto 2xl:overflow-x-hidden">
  <div class="flex md:grid md:md:grid-cols-10 gap-y-2 gap-x-3  pb-2 md:pb-0 " style="min-width: max-content;">
    <NuxtLink
      v-for="category in categories"
      :key="category.category_id"
      :to="`/categories/${category.category_id}`"
      class="bg-[#3A3939]  rounded-lg flex-shrink-0 w-32 md:w-full  md:h-32 p-2 md:p-4 items-center justify-center flex flex-col gap-1 hover:bg-[#585757] cursor-pointer"
    >
      <img 
        class="w-[40px] md:w-[60px]" 
        :src="`http://localhost:8000/uploads/categories/${category.category_img}`" 
        :alt="category.category_name" 
      />
      <p class="text-md md:text-lg text-white font-bold text-center">{{ category.category_name }}</p>
    </NuxtLink>
  </div>
</div>

    <div class="w-full h-[4px] bg-[#3A3939] my-4 rounded-md"></div>
    <div class="w-full flex flex-col md:flex-row gap-4 md:gap-8">
      <div class="w-full md:w-[60%] flex flex-col gap-4">
        <Preview
        v-if="posts.length"
          v-for="post in posts"
          :key="post.post_id"
          :title="post.title"
          :user_name="post.user_name"
          :img="post.user_img"
          :id="post.post_id"
          :postIMG="post.img"
          :create_at="dayjs(post.create_at).fromNow()"
        />
        <div v-else class="w-full flex">
                <div class="w-full  text-center text-xl text-white">ไม่มีกระทู้ใหม่</div>
            </div>
      </div>
      <div class="w-full md:w-[40%] ">
        <Popular/>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // นำเข้า locale ภาษาไทย
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime); // ใช้งานปลั๊กอิน relativeTime
dayjs.locale('th');

const config = useRuntimeConfig();
import axios from "axios";
import { ref, onMounted } from 'vue';

const posts = ref([]);
const categories = ref([]);


// ดึงข้อมูลหมวดหมู่หลักจาก API
onMounted(async () => {
  try {
    const responseCategories = await axios.get(`${config.public.ApiBase}/api/categories`);
    categories.value = responseCategories.data;
    
    const responsePosts = await axios.get(`${config.public.ApiBase}/api/posts`);
    posts.value = responsePosts.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>
