<template>
  
    <div class="w-full bg-[#3A3939] rounded-3xl px-5 py-5">
      
      <div class="text-white flex w-full">
        <img v-if="img!=null && img!=''" class="w-[40px] object-cover rounded-full h-[40px] bg-slate-500"
          :src="'http://localhost:8000/uploads/profile/'+img"
          alt="">
        <img v-else class="w-[40px] object-contain rounded-full h-[40px] bg-white"
          src="../public/profile/default.jpg"
          alt="">
        <p class="text-white ml-3 justify-center items-center flex">{{ user_name }}</p>
        
      </div>
      <NuxtLink :to="'posts/'+id" >
      <div class="text-white flex w-full text-2xl mt-2">{{ title }}</div>
    
    <img v-if="postIMG" class="h-72 rounded-2xl mt-5 mb-5" :src="'http://localhost:8000/uploads/posts/'+postIMG" alt="">
  </NuxtLink>
      <div class="flex mt-3 gap-4 text-lg">
          <img @click.stop class="rounded-full w-10 h-10" src="../public/img/comment.png" alt="">
          <img class="w-8 h-8 mt-1" src="../public/img/share.png" alt="">
          
          <img class="w-8 h-8 mt-1 ml-auto" src="../public/img/save.png" alt="">  
              
      </div>
    </div>
  </template>
  <script setup>
  const props = defineProps({
    user_name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 0,
    },
    postIMG:{
      type: String,
      default: '',
    }
  })
  </script>
