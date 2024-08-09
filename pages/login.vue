<template>
  <title>Login</title>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Background Image for large screens -->
    <div class="hidden lg:block lg:w-1/3">
      <img
        class="object-cover h-full"
        src="/img/background.png"
        alt="Background"
      />
    </div>
    <div class="flex-1 flex flex-col items-center justify-center space-y-6 text-white p-8 bg-[#141414]">
      <!-- Login Heading -->
      <h1 class="text-4xl font-bold">Login</h1>

      <!-- Social Media Login Icons -->
      <div class="flex space-x-4">
        <img
          class="w-16 md:w-20"
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="Google"
        />
        <img
          class="w-10 md:w-12 object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
          alt="Facebook"
        />
      </div>

      <!-- OR Divider -->
      <div class="flex items-center justify-center w-full max-w-sm">
        <div class="border-t w-10 border-gray-600 flex-grow"></div>
        <span class="px-4 text-gray-400">OR</span>
        <div class="border-t w-10 border-gray-600 flex-grow"></div>
      </div>

      <!-- Email Input Field -->
      <div class="relative mt-2 w-full max-w-sm">
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
      <div class="relative mt-2 w-full max-w-sm">
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

      <!-- Login Button -->
      <button
        @click="login"
        class="w-full max-w-sm mt-6 px-8 py-3 bg-blue-500 text-2xl text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>
      
      <p class="text-left w-full max-w-sm text-[#B4B4B4] text-lg">
        No Account?
        <NuxtLink
          class="font-bold text-decoration-line: underline"
          to="register"
        >
          Sign up
        </NuxtLink>
      </p>
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
      email: "", // ใช้ email แทน username
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8000/api/login", {
          email: this.email,
          password: this.password,
        });
        if (response.data.success) {
          await localStorage.setItem("token", response.data.token);
          await Swal.fire({
            icon: "success",
            title: "เข้าสู่ระบบสำเร็จ",
            showConfirmButton: false,
            timer: 1000,
          });
          await this.$router.push("/");
        } else {
          this.error = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        }
      } catch (err) {
        this.error = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
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
