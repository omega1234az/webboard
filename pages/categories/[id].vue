<template>
    <div class="pt-[80px] md:container mx-auto w-full">
        <div class="overflow-x-auto 2xl:overflow-x-hidden mt-10">
            <!-- แสดงหมวดหมู่หลัก -->
            <div v-if="category" class="mb-2">
                <h2 class="text-2xl text-white font-bold mb-4">{{ category.category_name }}</h2>
                <title>{{ category.category_name }}</title>
            </div>

            <div v-if="subCategories.length">
                <div class="overflow-x-auto 2xl:overflow-x-hidden">
                    <div class="flex md:grid md:grid-cols-10 gap-3">
                        <div v-for="subCategory in subCategories" :key="subCategory.sub_cate_id"
                            class="bg-[#3A3939] rounded-lg flex-shrink-0 p-2 h-32 w-full items-center justify-center flex flex-col gap-1 hover:bg-[#585757] cursor-pointer">
                            <NuxtLink :to="`/tags/${subCategory.sub_cate_id}`" class="flex items-center flex-col">
                                <img class="w-[40px] md:w-[60px]"
                                    :src="`http://localhost:8000/uploads/subcategories/${subCategory.img}`"
                                    :alt="subCategory.name" />
                                <p class="text-lg md:text-xl text-white font-bold text-center">{{ subCategory.name }}
                                </p>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="w-full h-[4px] bg-[#3A3939] my-3 rounded-md"></div>
                <div v-if="posts.length" class="w-full flex flex-col md:flex-row gap-4 md:gap-8">
                    <div class="w-full md:w-[60%] flex flex-col gap-4">
                        <Preview v-for="post in posts" :key="post.post_id" :title="post.title"
                            :user_name="post.user_name" :img="post.user_img" :id="post.post_id" :postIMG="post.img"
                            :create_at="dayjs(post.create_at).fromNow()" />
                    </div>

                    <div class="w-full md:w-[40%] ">
                        <Popular />
                    </div>
                </div>
                <div v-else class="w-full ">

                    <div class="w-full flex">
                        <div class="w-full  md:w-[60%] text-center text-xl text-white">ไม่มีกระทู้ใหม่</div>
                        <div class="w-full md:w-[40%] ">
                            <Popular />
                        </div>
                    </div>
                </div>

            </div>
            <div v-else class="w-full ">
                <div class="w-full h-[4px] bg-[#3A3939] my-3 rounded-md"></div>
<div class="w-full flex">
    
    <div class="w-full  md:w-[60%] text-center text-xl text-white">ไม่มีกระทู้ใหม่</div>
    <div class="w-full md:w-[40%] ">
        <Popular />
    </div>
</div>
</div>


        </div>
    </div>
</template>


<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // นำเข้า locale ภาษาไทย
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime); // ใช้งานปลั๊กอิน relativeTime
dayjs.locale('th');
const route = useRoute();
const category = ref(null);
const subCategories = ref([]);
const posts = ref([]);

// ฟังก์ชันดึงข้อมูลหมวดหมู่หลักและหมวดหมู่ย่อยตาม ID
const fetchCategory = async (categoryId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/categories/${categoryId}`);
        const data = response.data[0]; // Assuming the API returns an array with one object
        category.value = {
            category_id: data.category_id,
            category_name: data.category_name
        };
        subCategories.value = data.subcategories;
    } catch (error) {
        console.error('Error fetching category and subcategories:', error);
    }
};
const fecthPost = async (categoryId) => {
    try {
        const responsePosts = await axios.get(`http://localhost:8000/api/posts/category/${categoryId}`);
        posts.value = responsePosts.data;
        console.log(posts.value);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
// ใช้ useRoute เพื่อรับ ID จาก URL
onMounted(async () => {

    const categoryId = route.params.id;
    if (categoryId) {
        fetchCategory(categoryId);
        fecthPost(categoryId);
    }

});
</script>