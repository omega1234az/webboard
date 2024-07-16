<template>
  <div class="w-full  text-white bg-[#0F0F0F] flex items-center px-5 py-5">
    <div class="w-[15%] font-bold text-2xl text-center">
      <div>UP WEBBOARD</div>
    </div>
    <div class="w-[55%] text-center font-bold text-xl grid grid-cols-3">
      <div>HOME</div>
      <div>POPULAR</div>
      <div>CREATE</div>
    </div>
    <div class="w-[15%] text-center font-bold text-2xl text-black">
      <div class="relative">
          <input type="text" class="w-full rounded-full pl-10 pr-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-400 focus:outline-none focus:border-blue-500 h-10 " placeholder="Search...">
          <img src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/search-260.png" class="absolute left-3 top-2 w-6 h-6">
        </div>
    </div>
    <div class="w-[15%] flex justify-center">
        <img class="object-contain rounded-full w-[50px] h-[50px] bg-white" src="https://images.immediate.co.uk/production/volatile/sites/3/2023/03/Jujutsu-Kaisen-Cropped-dbe733b.jpg?quality=90&resize=844,563" ></img>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    this.checkAuth();
  },
  watch: {
    $route() {
      this.checkAuth();
    },
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        // Decode JWT to check expiration
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
        if (tokenData.exp < now) {
          // Token has expired, remove it
          localStorage.removeItem('token');
          this.isLoggedIn = false;
        } else {
          // Token is valid
          this.isLoggedIn = true;
        }
      } else {
        this.isLoggedIn = false;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
    login() {
      this.$router.push('/login');
    },
    profile() {
      this.$router.push('/profile');
    }
  }
};
</script>
<style>
/* Add your custom styles here */
</style>
