<template>
  <title>Home</title>
  
      
      <div class="w-full md:container px-4 bg-[#191A1A] pt-[100px] mx-auto">
        <div class="w-full py-2 bg-[#455DFF] rounded-md text-white text-lg md:text-xl font-bold items-center justify-center flex mb-4">
          เลือกห้อง
        </div>
        <div class="overflow-x-auto 2xl:overflow-x-hidden">
          <div class="flex md:grid md:grid-cols-8  pb-2 md:pb-0 gap-3" style="min-width: max-content;">
            <div
              v-for="category in categories"
              :key="category.name"
              class="bg-[#3A3939] rounded-lg flex-shrink-0 w-[100px]  md:w-full  md:h-full p-2 md:p-4 items-center justify-center flex flex-col gap-1"
            >
              <img class="w-[40px] md:w-[60px]" :src="'/_nuxt/public/categories/'+category.img" :alt="category.name" />
              <p class="text-lg md:text-xl text-white font-bold text-center">{{ category.name }}</p>
            </div>
          </div>
        </div>
        <div class="w-full h-[4px] bg-[#3A3939] my-4 rounded-md"></div>
        <div class="w-full flex flex-col md:flex-row gap-4 md:gap-8">
          <div class="w-full md:w-[60%] flex flex-col gap-4">
            <Preview
             v-for="post in posts"
              :key="post.post_id"
              :title="post.title"
              :user_name="post.user_name"
              :img="post.user_img"
              :id="post.post_id"
              :postIMG="post.img"
            />
          </div>
          <div class="w-full md:w-[40%]">
            <div class="w-full py-2 bg-[#455DFF] rounded-md text-white text-lg md:text-xl font-bold items-center justify-center flex">
              ยอดนิยม
            </div>
            <ul class="w-full bg-[#3A3939] rounded-lg mt-3 text-white text-lg md:text-xl font-bold flex flex-col">
              <NuxtLink v-for="popular in popularPosts" :key="popular" class="hover:bg-[#585757] delay-50 p-2 md:p-3 rounded-sm" :to="'tags/'+popular">
                {{ popular }}
              </NuxtLink>
            </ul>
          </div>
        </div>
      </div>
      
    
</template>

  <script setup>
  const config = useRuntimeConfig()
  import axios from "axios";
  const profile = ref([]);
  const posts = ref([]);
  const categories = ref([
    { name: "อาหาร", img: "food.png" },
    { name: "หนังสือ", img: "book.png" },
    { name: "กีฬา", img: "sport.png" },
    { name: "สัตว์เลี้ยง", img: "pet.png" },
    { name: "เมคอัพ", img: "makeup.png" },
    { name: "ศิลปะ", img: "art.png" },
    { name: "วิทยาศาสตร์", img: "wit.png" },
    { name: "ต่างประเทศ", img: "world.png" },
    { name: "ธรรมชาติ", img: "nature.png" },
    { name: "ศิลปิน", img: "artist.png" },
    { name: "เกม", img: "game.png" },
    { name: "หนัง", img: "movie.png" },
    { name: "เพลง", img: "music.png" },
    { name: "ความรัก", img: "love.png" },
    { name: "คณิตศาสตร์", img: "math.png" },
    { name: "ท่องเที่ยว", img: "travel.png" }
  ]);
  
  const popularPosts = ref([
    "วิศวกรรมซอฟต์แวร์",
    "การ์ตูน",
    "รถเมย์มอ",
    "ร้านเด็ดหน้ามอ",
    "เรื่องหลอนมพ",
    "หาหอพัก",
    "รถรับส่ง",
    "คาเฟ่หน้ามอ",
    "รับหิ้ว",
  ]);
  
  onMounted(async () => {
    try {
      const response = await axios.get(config.public.ApiBase+"/api/posts"); // ใช้ endpoint ของ API ที่คุณมี
      posts.value = response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      
    }
    
  });

  </script>


  