<template>
  <title>สร้างโพส</title>
  <div class="bg-[#191A1A] min-h-screen flex items-center pt-[100px]">
    <div class="w-full container mx-auto px-4 text-white">
      <div class="bg-[#455DFF] w-full p-2 font-bold text-2xl rounded-md">
        <div class="flex justify-center">Create Post</div>
      </div>

      <div class="py-3">
        <div class="rounded-lg py-2 px-5 bg-[#3A3939]">
          <div class="font-bold py-2 text-2xl">หัวข้อ</div>
          <input required
            type="text"
            v-model="title"
            class="w-full p-2 border border-gray-300 rounded-2xl text-xl bg-[#3A3939]"
            placeholder="โปรดระบุหัวข้อ"
          />
        </div>
      </div>

      <div class="py-2">
        <div class="rounded-lg py-2 px-5 bg-[#3A3939]">
          <div class="font-bold py-2 text-2xl">รายละเอียด</div>
          <textarea
            v-model="content"
            id="project-details"
            rows="6"
            class="w-full text-xl p-4 border bg-[#3A3939] border-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3A3939]"
            placeholder="โปรดระบุรายละเอียด"
          ></textarea>
        </div>
      </div>
      
      <!-- Add Image Button -->
      <div class="py-2">
        <div class="rounded-lg p-2 bg-[#3A3939]">
          <label for="image-upload" class="block text-lg text-white mb-2 font-bold">กดเพิ่มรูปภาพ</label>
          <input type="file" ref="imageUpload" id="image-upload" class="hidden" @change="handleImageUpload" />
          <!-- Display selected image -->
          <div v-if="selectedImage" class="mt-4">
            <img :src="selectedImage" alt="Selected Image" class="max-w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>

      <!-- Display Selected Category and Subcategory -->
      <div class="bg-[#3A3939] shadow-md rounded-lg p-6 mt-4">
        <div class="font-bold py-2 text-3xl w-full">Auto-Tag</div>
        <div class="flex gap-2 border border-1 border-dashed border-[#8B8B8B] p-3 text-xl font-bold items-center">
          <img src="../public/img/label.png" class="w-10" alt="label">
          <div v-if="selectedCategory" class="text-white">
            <span class="rounded-lg">{{ selectedCategoryName }}</span>
          </div>
          <div v-if="selectedSubCategory" class="text-white">
            <span class="rounded-lg"><span class="mx-2">></span> {{ selectedSubCategoryName }}</span>
          </div>
        </div>
      
        <div class="grid grid-cols-4 mt-5">
          <!-- หมวดหมู่หลัก (Column 1) -->
          <div class="flex-1 bg-[#484848] rounded-xl text-center">
            <ul class="list-none p-0 text-xl font-bold">
              <li
                v-for="category in categories"
                :key="category.cate_id"
                @click="selectCategory(category.cate_id, category.name)"
                :class="{
                  'bg-[#525050]': selectedCategory === category.cate_id,
                }"
                class="text-white px-3 py-3 rounded-lg cursor-pointer mb-2 transition-colors duration-300 hover:bg-[#525050]"
              >
                {{ category.name }}
              </li>
            </ul>
          </div>

          <!-- หมวดหมู่ย่อย (Column 2) -->
          <div class="flex-1 ml-4 h-fit overflow-y-auto bg-[#484848] p-2 rounded-xl" v-if="selectedCategory && subcategories.length > 0">
            <ul class="list-none text-xl font-bold">
              <li
                v-for="subcategory in subcategories"
                :key="subcategory.sub_cate_id"
                @click="selectSubCategory(subcategory.sub_cate_id, subcategory.name)"
                :class="{
                  'bg-[#525050]': selectedSubCategory === subcategory.sub_cate_id,
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
        <div class="flex flex-row gap-2 max-w-max">
          <button @click="resetForm" class="bg-blue-500 text-white px-16 py-2 rounded-lg cursor-pointer font-bold">Cancel</button>
          <button @click="submitPost" class="bg-blue-500 text-white px-16 py-2 rounded-lg cursor-pointer font-bold">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  data() {
    return {
      categories: [], 
      subcategories: [], 
      selectedCategory: null, 
      selectedSubCategory: null, 
      selectedImage: null,
      selectedCategoryName: '', 
      selectedSubCategoryName: '', 
      title: '',
      content: '',
    };
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost:8000/api/categories/')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    fetchSubCategories() {
      if (this.selectedCategory) {
        axios.get(`http://localhost:8000/api/categories/${this.selectedCategory}`)
          .then(response => {
            this.subcategories = response.data;
          })
          .catch(error => {
            console.error('Error fetching subcategories:', error);
          });
      }
    },
    selectCategory(categoryId, categoryName) {
      this.selectedCategory = categoryId;
      this.selectedCategoryName = categoryName;
      this.selectedSubCategory = null; 
      this.selectedSubCategoryName = ''; 
      this.fetchSubCategories();
    },
    selectSubCategory(subCategoryId, subCategoryName) {
      this.selectedSubCategory = subCategoryId;
      this.selectedSubCategoryName = subCategoryName;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async submitPost() {
      if (!this.title || !this.content || !this.selectedCategory || !this.selectedSubCategory) {
        await Swal.fire({
          icon: 'warning',
          title: 'ข้อมูลไม่ครบถ้วน',
          text: 'กรุณากรอกข้อมูลให้ครบถ้วนก่อนส่งโพสต์',
          confirmButtonText: 'ตกลง',
        });
        return;
      }

      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('content', this.content);
      formData.append('sub_cate_ids', JSON.stringify([this.selectedSubCategory])); // Use array directly
      if (this.$refs.imageUpload.files[0]) {
        formData.append('img', this.$refs.imageUpload.files[0]);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
        return;
      }

      await axios.post('http://localhost:8000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        }
      })
      .then(async response => {
        await Swal.fire({
          icon: "success",
          title: "สร้างโพสสำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        });
        await this.$router.push("/");
      })
      .catch(error => {
        console.error('Error creating post:', error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถสร้างโพสต์ได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonText: 'ตกลง',
        });
      });
    },
    resetForm() {
      this.title = '';
      this.content = '';
      this.selectedCategory = null;
      this.selectedSubCategory = null;
      this.selectedImage = null;
      this.selectedCategoryName = '';
      this.selectedSubCategoryName = '';
      this.$refs.imageUpload.value = null;
    }
  },
  mounted() {
    this.fetchCategories();
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
    }
  }
};
</script>
