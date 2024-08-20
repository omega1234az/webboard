<template>
  <title>สร้างโพส</title>
  <div class="bg-[#191A1A] min-h-screen flex items-center pt-[100px]">
    <div class="w-full container mx-auto px-4 text-white">
      <div class="bg-[#455DFF] w-full p-2 font-bold text-xl rounded-md">
        <div class="flex justify-center">Create Post</div>
      </div>

      <div class="py-3">
        <div class="rounded-lg py-2 px-5 bg-[#3A3939]">
          <div class="font-bold py-2 text-xl">หัวข้อ</div>
          <input
            required
            type="text"
            v-model="title"
            class="w-full p-2 border border-gray-300 rounded-2xl text-md bg-[#3A3939]"
            placeholder="โปรดระบุหัวข้อ"
          />
        </div>
      </div>

      <div class="">
        <div class="rounded-lg py-2 px-5 bg-[#3A3939]">
          <div class="font-bold py-2 text-xl">รายละเอียด</div>
          <textarea
            v-model="content"
            id="project-details"
            rows="6"
            class="w-full text-md p-4 border bg-[#3A3939] border-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3A3939]"
            placeholder="โปรดระบุรายละเอียด"
          ></textarea>
        </div>
      </div>

      <!-- Add Image Button -->
      <div class="py-2">
        <div class="rounded-lg p-2 bg-[#3A3939]">
          <label for="image-upload" class="block text-lg text-white font-bold">กดเพิ่มรูปภาพ</label>
          <input type="file" ref="imageUpload" id="image-upload" class="hidden" @change="handleImageUpload" />
          <!-- Display selected image -->
          <div v-if="selectedImage" class="mt-4">
            <img :src="selectedImage" alt="Selected Image" class="max-w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>

      <!-- Display Selected Category and Subcategory -->
      <div class="bg-[#3A3939] shadow-md rounded-lg p-6 mt-4">
        <div class="font-bold py-2 text-2xl w-full">Auto-Tag</div>
        <div v-for="(tag, index) in selectedTags" :key="index" class="flex gap-2 border border-1 border-dashed border-[#8B8B8B] p-1.5 text-lg font-bold items-center mb-2">
          <img src="../public/img/label.png" class="w-10" alt="label">
          <div class="text-white">
            <span class="rounded-lg">{{ tag.categoryName }}</span>
            <span class="mx-2">></span>
            <span class="rounded-lg">{{ tag.subCategoryName }}</span>
          </div>
          <button @click="removeTag(index)" class="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Remove</button>
        </div>

        <div class="grid grid-cols-4 mt-5">
          <!-- หมวดหมู่หลัก (Column 1) -->
          <div class="flex-1 bg-[#484848] rounded-xl text-center">
            <ul class="list-none p-0 text-lg font-bold max-h-[480px] overflow-y-auto no-scrollbar ">
              <li
                v-for="category in mainCategories"
                :key="category.category_id"
                @click="selectCategory(category.category_id, category.category_name)"
                :class="{
                  'bg-[#525050]': selectedCategory === category.category_id,
                }"
                class="text-white px-3 py-3 rounded-lg cursor-pointer mb-2 transition-colors duration-300 hover:bg-[#525050]"
              >
                {{ category.category_name }}
              </li>
            </ul>
          </div>

          <!-- หมวดหมู่ย่อย (Column 2) -->
          <div class="flex-1 ml-4 h-fit overflow-y-auto max-h-[480px] no-scrollbar bg-[#484848] p-2 rounded-xl" v-if="selectedCategory">
            <ul class="list-none text-lg font-bold">
              <li
                v-for="subcategory in subcategories"
                :key="subcategory.sub_cate_id"
                @click="selectSubCategory(subcategory.sub_cate_id, subcategory.name)"
                :class="{
                  'bg-[#525050]': isSelectedTag(subcategory.sub_cate_id),
                }"
                class="text-white px-4 py-3 rounded-lg cursor-pointer mb-2 transition-colors duration-300 hover:bg-[#525050]"
              >
                {{ subcategory.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-end py-3">
        <div class="flex flex-row gap-2 max-w-max text-xl">
          <button @click="resetForm" class="bg-[#3A3939] text-white px-20 py-4 rounded-lg cursor-pointer font-bold">Cancel</button>
          <button @click="submitPost" class="bg-[#3A3939] text-white px-20 py-4 rounded-lg cursor-pointer font-bold">Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const config = useRuntimeConfig();

const router = useRouter();

const title = ref('');
const content = ref('');
const mainCategories = ref([]);
const subcategories = ref([]);
const selectedCategory = ref(null);
const selectedSubCategory = ref(null);
const selectedImage = ref(null);
const selectedCategoryName = ref('');
const selectedSubCategoryName = ref('');
const selectedTags = ref([]);
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


const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/categories');
    mainCategories.value = response.data;
    subcategories.value = [];
  } catch (error) {
    console.error('ข้อผิดพลาดในการดึงหมวดหมู่:', error);
  }
};

const selectCategory = (categoryId, categoryName) => {
  selectedCategory.value = categoryId;
  selectedCategoryName.value = categoryName;
  selectedSubCategory.value = null;
  selectedSubCategoryName.value = '';
  const selectedCategoryData = mainCategories.value.find(cat => cat.category_id === categoryId);
  subcategories.value = selectedCategoryData ? selectedCategoryData.subcategories : [];
};

const selectSubCategory = (subCategoryId, subCategoryName) => {
  const tagIndex = selectedTags.value.findIndex(tag => tag.subCategoryId === subCategoryId);

  if (tagIndex !== -1) {
    selectedTags.value.splice(tagIndex, 1);
    selectedSubCategory.value = null;
    selectedSubCategoryName.value = '';
  } else if (selectedTags.value.length < 5) {
    selectedTags.value.push({
      categoryId: selectedCategory.value,
      categoryName: selectedCategoryName.value,
      subCategoryId: subCategoryId,
      subCategoryName: subCategoryName,
    });
    selectedSubCategory.value = null;
    selectedSubCategoryName.value = '';
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'เลือกได้สูงสุด 5 tags',
      confirmButtonText: 'ตกลง',
    });
  }
};

const isSelectedTag = (subCategoryId) => {
  return selectedTags.value.some(tag => tag.subCategoryId === subCategoryId);
};

const removeTag = (index) => {
  selectedTags.value.splice(index, 1);
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitPost = async () => {
  if (!title.value || !content.value) {
    await Swal.fire({
      icon: 'warning',
      title: 'ข้อมูลไม่ครบถ้วน',
      text: 'กรุณากรอกข้อมูลให้ครบถ้วนก่อนส่งโพสต์',
      confirmButtonText: 'ตกลง',
    });
    return;
  }

  const fileInput = document.querySelector('#image-upload');
  if (fileInput.files[0] && fileInput.files[0].size > 5 * 1024 * 1024) { // 5MB
    await Swal.fire({
      icon: 'error',
      title: 'ไฟล์มีขนาดใหญ่เกินไป',
      text: 'กรุณาเลือกไฟล์ขนาดไม่เกิน 5MB',
      confirmButtonText: 'ตกลง',
    });
    return;
  }

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('content', content.value);
  if (fileInput.files[0]) {
    formData.append('img', fileInput.files[0]);
  }
  formData.append('sub_cate_ids', JSON.stringify(selectedTags.value.map(tag => tag.subCategoryId)));

  try {
    const response = await axios.post('http://localhost:8000/api/posts', formData, {
      headers: {
        'Authorization': token,
        'Content-Type': 'multipart/form-data'
      },
    });
    await Swal.fire({
      icon: 'success',
      title: 'โพสต์สำเร็จ',
      confirmButtonText: 'ตกลง',
    });
    resetForm();
    router.push({ path: `/posts/${response.data.post_id}` });
  } catch (error) {
    console.error('ข้อผิดพลาดในการส่งโพสต์:', error.response ? error.response.data : error.message);
    await Swal.fire({
      icon: 'error',
      title: 'ส่งโพสต์ล้มเหลว',
      text: error.response ? error.response.data.error : 'ไม่สามารถส่งโพสต์ได้',
      confirmButtonText: 'ตกลง',
    });
  }
};

const resetForm = () => {
  title.value = '';
  content.value = '';
  selectedCategory.value = null;
  selectedSubCategory.value = null;
  selectedTags.value = [];
  selectedImage.value = null;
  const fileInput = document.querySelector('#image-upload');
  if (fileInput) {
    fileInput.value = ''; // รีเซ็ต input file
  }
};

onMounted(() => {
  if (!token) {
    router.push({ path: "/login" });
  }
  fetchCategories();
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>