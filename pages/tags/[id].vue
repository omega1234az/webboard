<template>
    <div class="pt-[80px] md:container mx-auto w-full">
        <div class="overflow-x-auto 2xl:overflow-x-hidden ">
            <!-- แสดงหมวดหมู่ย่อย -->
            <div v-if="category" class="mb-2">
                <h2 class="text-2xl text-white font-bold mb-4">{{ category.name }}</h2>
                <title>{{ category.name }}</title>
            </div>
            <div class="w-full h-[4px] bg-[#3A3939] my-4 rounded-md"></div>
            <div v-if="posts.length" class="w-full flex flex-col md:flex-row gap-4 md:gap-8">
                <div class="w-full md:w-[60%] flex flex-col gap-4">
                    <Preview 
                        v-for="post in posts" 
                        :key="post.post_id" 
                        :title="post.title"
                        :user_name="post.user_name" 
                        :img="post.user_img" 
                        :id="post.post_id" 
                        :postIMG="post.img"
                        :create_at="dayjs(post.create_at).fromNow()" />
                </div>
                <div class="w-full md:w-[40%] ">
                    <Popular />
                </div>
            </div>
            <div v-else class="w-full flex">
                <div class="w-full  md:w-[60%] text-center text-xl text-white">ไม่มีกระทู้ใหม่</div>
                <div class="w-full md:w-[40%] ">
                    <Popular />
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
const posts = ref([]);

// ฟังก์ชันดึงข้อมูลหมวดหมู่ย่อยและโพสต์ตาม sub_cate_id
const fetchCategoryAndPosts = async (subCateId) => {
    try {
        // ดึงข้อมูลหมวดหมู่ย่อย
        const responseCategory = await axios.get(`http://localhost:8000/api/categories/subcategories/${subCateId}`);
        category.value = responseCategory.data;

        // ดึงโพสต์ตาม sub_cate_id
        const responsePosts = await axios.get(`http://localhost:8000/api/posts/subcategory/${subCateId}`);
        posts.value = responsePosts.data;
        console.log(posts.value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// ใช้ useRoute เพื่อรับ ID จาก URL
onMounted(() => {
    const subCateId = route.params.id;
    console.log(subCateId);
    if (subCateId) {
        fetchCategoryAndPosts(subCateId);
    }
});
</script>
