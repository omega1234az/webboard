<template>
    <title>Register</title>
    <div class="w-full h-screen grid grid-cols-3">
      <div class="col-span-1">
        <img
          class="object-cover h-full w-full"
          src="/img/background.png"
          alt="Background"
        />
      </div>
      <div class="col-span-2 bg-[#141414] flex flex-col items-center justify-center space-y-4 text-white p-8">
        <!-- Register Heading -->
        <h1 class="text-4xl font-bold">Create Account</h1>
  
        <!-- Social Media Login Icons -->
        <div class="flex gap-2">
          <img
            class="w-20"
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google"
          />
          <img
            class="w-12 object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
            alt="Facebook"
          />
        </div>
  
        <!-- OR Divider -->
        <div class="flex items-center justify-center">
          <div class="border-t w-10 border-gray-600 flex-grow"></div>
          <span class="px-4 text-gray-400">OR</span>
          <div class="border-t w-10 border-gray-600 flex-grow"></div>
        </div>
  
        <!-- Name Input Field -->
        <div class="relative mt-1 w-[400px]">
          <input
            v-model="name"
            type="text"
            id="name"
            class="border-1 text-white peer block w-full appearance-none rounded-xl border-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-xl focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label
            for="name"
            class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-[#141414] px-2 text-[#B4B4B4] duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 font-bold text-md"
            >Name</label
          >
        </div>
  
        <!-- Email Input Field -->
        <div class="relative mt-2 w-[400px]">
          <input
            v-model="email"
            type="text"
            id="email"
            class="border-1 text-white peer block w-full appearance-none rounded-xl border-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-xl focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label
            for="email"
            class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-[#141414] px-2 text-[#B4B4B4] duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 font-bold text-md"
            >Email</label
          >
        </div>
  
        <!-- Password Input Field -->
        <div class="relative mt-2 w-[400px]">
          <input
            v-model="password"
            type="password"
            id="password"
            class="border-1 text-white peer block w-full appearance-none rounded-xl border-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-xl focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label
            for="password"
            class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-[#141414] px-2 text-[#B4B4B4] duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 font-bold text-md"
            >Password</label
          >
        </div>
  
        <!-- Error Message -->
        <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
  
        <!-- Register Button -->
        <button
          @click="register"
          class="w-[400px] mt-6 px-8 py-3 bg-blue-500 text-2xl text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Create Account
        </button>
        
        <p class="text-left w-[400px] text-[#B4B4B4] text-lg">Already have an account? <NuxtLink class="font-bold text-decoration-line: underline" to="login">Login</NuxtLink></p>
        
      </div>
      
    </div>
  </template>
  <style>
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #1b1b1b inset !important;
    -webkit-text-fill-color: white !important;
  }
  </style>
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        error: null,
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post("http://localhost:8000/api/register", {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          if (response.status === 201) {
            await Swal.fire({
              icon: "success",
              title: "สมัครสมาชิกสำเร็จ",
              showConfirmButton: false,
              timer: 1000,
            });
            await this.$router.push("/login");
          } else {
            this.error = response.data.error || "ข้อมูลที่กรอกไม่ถูกต้อง";
          }
        } catch (err) {
          if (err.response && err.response.data && err.response.data.error) {
            this.error = err.response.data.error;
          } else {
            this.error = "เกิดข้อผิดพลาดในการสมัครสมาชิก";
          }
        }
      },
    },
    mounted() {
      const token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/");
      }
    },
  };
  </script>
  
  <style scoped></style>
  