<template>
  <title>{{ post.title }}</title>
  <div class="w-full flex bg-[#191A1A] min-h-screen pt-[80px]">
    <div class="w-[15%]"></div>
    <div class="container px-4 md:px-0 flex mt-5 gap-5">
      <!-- Post Content -->
      <div class="bg-[#3A3939] w-[65%] rounded-2xl text-white p-7">
        <!-- User Profile -->
        <div class="flex items-center mb-3">
  <img v-if="post.user_img"
       class="w-12 h-12 rounded-full object-cover bg-slate-500"
       :src="`http://localhost:8000/uploads/profile/${post.user_img}`"
       alt="User Image" />
  <img v-else
       class="w-12 h-12 rounded-full object-cover"
       src="../public/profile/default.jpg"
       alt="Default User Image" />
  <p class="ml-3 text-lg font-bold">{{ post.user_name }}</p>
  <div class="ml-5 rounded-full w-2 h-2 bg-white"></div>
  <p class="ml-3">{{ dayjs(post.create_at).fromNow() }}</p>
</div>

<h2 class="text-2xl font-bold mb-3">{{ post.title }}</h2>
<div v-if="post.sub_cate_info" class="post-info flex gap-2">
      <div v-for="(sub, index) in post.sub_cate_info" :key="index" class="sub-category">
        <p class="bg-gray-800 inline-block px-3 py-1 text-white rounded-lg">
          {{ sub.subcatename }}
        </p>
      </div>
    </div>

<div class="mb-3 w-full items-center justify-start flex mt-2  py-1 rounded-xl">
  <img v-if="post.img"
       class="object-contain rounded-3xl  h-96 "
       :src="`http://localhost:8000/uploads/posts/${post.img}`"
       alt="Post Image" />
</div>

<p class="text-xl">{{ post.content }}</p>

<!-- Actions -->
<div class="flex mt-5 gap-4 justify-center items-center">
  <img @click="showCommentInput = !showCommentInput" class="w-8 h-8 cursor-pointer" src="public/img/comment.png" alt="Comment Icon">
  <img class="w-6 h-6 cursor-pointer" src="public/img/share.png" alt="Share Icon">
  <img class="w-7 h-7 ml-auto cursor-pointer" src="public/img/save.png" alt="Save Icon">
</div>

        <!-- Comment Input -->
        <div v-if="showCommentInput" class="mt-5">
          <textarea v-model="newComment" class="w-full p-3 rounded-lg bg-[#2A2A2A] text-white border border-[#555]"
            rows="3" placeholder="เขียนข้อความ..."></textarea>
          <div class="w-full flex items-end justify-end gap-2">
            <button @click="showCommentInput = false"
              class="bg-[#0F0F0F] mt-2 px-4 py-2 rounded-2xl text-white font-semibold">
              Cancel
            </button>
            <button @click="submitComment" class="bg-[#0F0F0F] mt-2 px-4 py-2 rounded-2xl text-white font-semibold">
              Submit
            </button>

          </div>
        </div>


        <!-- Filter Dropdown -->


        <!-- Comments Section -->
        <div class="mt-10">
          <div class="grid grid-cols-2">
            <h3 class="text-2xl font-bold mb-4">Comments ({{ comments.length }})</h3>
            <select v-model="filter" @change="fetchComments"
              class="bg-[#2A2A2A] text-white border border-[#555] rounded-lg p-2">
              <option value="newest">ใหม่ที่สุด</option>
              <option value="popular">ยอดนิยม</option>
            </select>

          </div>

          <div v-for="comment in sortedComments" :key="comment.comment_id" class="mb-4">
            <div class="p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <img v-if="comment.user_img" class="w-8 h-8 rounded-full object-cover bg-slate-500"
                  :src="`http://localhost:8000/uploads/profile/${comment.user_img}`" alt="User Image" />
                <img v-else class="w-7 h-7 rounded-full object-cover" src="../public/profile/default.jpg"
                  alt="Default User Image" />
                <p class="ml-3 font-bold text-lg">{{ comment.user_name }}</p>
                <p class="ml-3">{{ dayjs(comment.create_at).fromNow() }}</p>
              </div>

              <p class="text-base ml-3.5 border-l-[1px] pl-5 ">{{ comment.content }}</p>
              <div class="flex">
                    <img @click="toggleReplyInput(comment.comment_id)" class="w-8 h-8 mt-2 ml-5 cursor-pointer"
                src="public/img/comment.png" alt="Reply Icon">
                <img class="w-6 h-6 mt-3 ml-3 cursor-pointer"
                src="public/img/share.png" alt="Reply Icon">
                <img class="w-6 h-6 mt-2.5 ml-auto cursor-pointer" src="public/img/save.png" alt="Save Icon">
                  </div>

              <!-- Replies -->
              <div v-if="activeReplyId === comment.comment_id" class="mt-4">
                <textarea v-model="replyContent"
                  class="w-full p-3 rounded-lg bg-[#2A2A2A] text-white border border-[#555]" rows="2"
                  placeholder="เขียนข้อความ..."></textarea>
                <div class="flex justify-end items-end gap-2">
                  <button @click="activeReplyId = 0"
                    class="bg-[#0F0F0F] mt-2 px-4 py-2 rounded-2xl text-white font-semibold">
                    Cancel
                  </button>
                  <button @click="submitReply(comment.comment_id)"
                    class="bg-[#0F0F0F] mt-2 px-4 py-2 rounded-2xl text-white font-semibold">
                    Reply
                  </button>
                </div>
              </div>

              <!-- Display Replies -->
              <div v-if="comment.replies && comment.replies.length" class=" pl-4">
                <div v-for="reply in comment.replies" :key="reply.reply_id" class="bg-[#3A3939] p-3 rounded-lg ">
                  <div class="flex items-center mb-2">
                    <img v-if="reply.user_img" class="w-7 h-7 rounded-full object-cover bg-slate-500"
                      :src="`http://localhost:8000/uploads/profile/${reply.user_img}`" alt="User Image" />
                    <img v-else class="w-8 h-8 rounded-full object-cover" src="../public/profile/default.jpg"
                      alt="Default User Image" />
                    <p class="ml-3 font-bold text-base">{{ reply.user_name }}</p>
                    <p class="ml-3">{{ dayjs(reply.create_at).fromNow() }}</p>
                    
                  </div>
                  <p class="text-base ml-3 border-l-[1px] pl-5 border-bl">{{ reply.content }}</p>
                  <div class="flex">
                    <img @click="toggleReplyInput(comment.comment_id)" class="w-8 h-8 mt-2 ml-4 cursor-pointer"
                src="public/img/comment.png" alt="Reply Icon">
                <img class="w-6 h-6 mt-3 ml-2 cursor-pointer"
                src="public/img/share.png" alt="Reply Icon">
                <img class="w-6 h-6 mt-2.5 ml-auto cursor-pointer" src="public/img/save.png" alt="Save Icon">
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Posts Section -->
      <div class="w-[35%]">
        <Popular/>
      </div>
    </div>
    <div class="w-[15%]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

import axios from 'axios'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // นำเข้า locale ภาษาไทย
import relativeTime from 'dayjs/plugin/relativeTime';
const config = useRuntimeConfig()
dayjs.extend(relativeTime); // ใช้งานปลั๊กอิน relativeTime
dayjs.locale('th');



const route = useRoute()
const postId = route.params.id
const post = ref({})
const comments = ref([])
const newComment = ref('')
const replyContent = ref('')

const showCommentInput = ref(true)
const activeReplyId = ref(null)
const filter = ref('popular') // Default filter is 'newest'


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

const token = getItem('token')
const fetchPost = async () => {
  try {
    const response = await axios.get(config.public.ApiBase+`/api/posts/${postId}`)
    post.value = response.data
  } catch (error) {
    console.error('Error fetching post:', error)
  }
}

// Fetch comments for the post
const fetchComments = async () => {
  try {
    const response = await axios.get(config.public.ApiBase+`/api/comments/${postId}`)
    let commentsData = response.data

    // Fetch replies for each comment
    for (const comment of commentsData) {
      const replies = await fetchReplies(comment.comment_id)
      comment.replies = replies
    }

    // Sort comments based on filter
    if (filter.value === 'newest') {
      commentsData.sort((a, b) => new Date(b.create_at) - new Date(a.create_at)) // Sort by recency
    } else if (filter.value === 'popular') {
      commentsData.sort((a, b) => b.reply_count - a.reply_count) // Sort by popularity
    }

    comments.value = commentsData
  } catch (error) {
    console.error('Error fetching comments:', error)
  }
}

// Fetch replies for a comment
const fetchReplies = async (commentId) => {
  try {
    const response = await axios.get(config.public.ApiBase+`/api/comments/replies/${commentId}/`)
    return response.data
  } catch (error) {
    console.error('Error fetching replies:', error)
    return []
  }
}

// Submit a new comment
const submitComment = async () => {
  if (newComment.value.trim() === '') {
    alert('กรุณากรอกความคิดเห็น.')
    return
  }

  try {
    await axios.post(
      config.public.ApiBase+`/api/comments/${postId}/`,
      { content: newComment.value },
      { headers: { Authorization: `${token}` } }
    )

    await Swal.fire({
      icon: 'success',
      title: 'คอมเม้นได้แล้ว',
      showConfirmButton: false,
      timer: 500,
    })
    newComment.value = ''
    showCommentInput.value = false
    await fetchComments()
  } catch (error) {
    console.error('Error submitting comment:', error.response ? error.response.data : error.message)
    await Swal.fire({
      icon: 'error',
      title: 'กรุณาเข้าสู่ระบบ',
      showConfirmButton: false,
      timer: 500,
    })
  }
}

// Toggle reply input
const toggleReplyInput = (commentId) => {
  activeReplyId.value = activeReplyId.value === commentId ? null : commentId
}

// Submit a reply to a comment
const submitReply = async (commentId) => {
  if (replyContent.value.trim() === '') {
    alert('กรุณากรอกความคิดเห็น.')
    return
  }

  try {
    await axios.post(
      config.public.ApiBase+`/api/comments/${commentId}/replies`,
      { content: replyContent.value },
      { headers: { Authorization: `${token}` } }
    )

    await Swal.fire({
      icon: 'success',
      title: 'ตอบกลับสำเร็จ',
      showConfirmButton: false,
      timer: 500,
    })
    replyContent.value = ''
    activeReplyId.value = null
    await fetchComments()
  } catch (error) {
    console.error('Error submitting reply:', error.response ? error.response.data : error.message)
    await Swal.fire({
      icon: 'error',
      title: 'กรุณาเข้าสู่ระบบ',
      showConfirmButton: false,
      timer: 500,
    })
  }
}

// Computed property for sorted comments based on the selected filter
const sortedComments = computed(() => {
  return comments.value
})

onMounted(() => {

  fetchPost()
  fetchComments()

})
</script>

<style scoped>
/* Add your styles here */
</style>