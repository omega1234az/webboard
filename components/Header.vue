<template>
  <div>
    <div class="w-full text-white bg-[#0F0F0F] flex items-center px-5 py-5">
      <div class="w-[15%] font-bold text-2xl text-center">
        <div>UP WEBBOARD</div>
      </div>
      <div class="w-[55%] text-center font-bold text-xl grid grid-cols-3">
        <div>หน้าแรก</div>
        <div>ยอดนิยม</div>
        <div>ตั้งกระทู้</div>
      </div>
      <div class="w-[15%] text-center font-bold text-2xl text-black relative">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            class="w-full rounded-full pl-10 pr-3 bg-white text-gray-900 placeholder-gray-400 border border-gray-400 focus:outline-none focus:border-blue-500 h-10"
            placeholder="ค้นหา..."
            @focus="dropdownVisible = true"
            @blur="hideDropdown"
          />
          <img
            src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/search-260.png"
            class="absolute left-3 top-2 w-6 h-6"
          />
          <ul
            v-show="dropdownVisible && searchQuery"
            class="absolute w-full bg-white border border-gray-400 rounded mt-1 z-10"
          >
            <li
              v-for="item in filteredItems"
              :key="item.id"
              class="p-2 hover:bg-gray-200 cursor-pointer"
              @mousedown.prevent="selectItem(item)"
            >
              {{ item.title }}
            </li>
            <li v-if="filteredItems.length === 0" class="p-2 text-gray-500">ไม่พบข้อมูล</li>
          </ul>
        </div>
      </div>
      <div class="w-[15%] flex justify-center">
        <img
          class="object-contain rounded-full w-[50px] h-[50px] bg-white"
          src="https://images.immediate.co.uk/production/volatile/sites/3/2023/03/Jujutsu-Kaisen-Cropped-dbe733b.jpg?quality=90&resize=844,563"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      dropdownVisible: false,
      items: [
        
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    selectItem(item) {
      this.searchQuery = item.title;
      this.dropdownVisible = false;
    },
    hideDropdown() {
      // Delay hiding the dropdown to allow click events to register
      setTimeout(() => {
        this.dropdownVisible = false;
      }, 100);
    }
  },
};
</script>

<style scoped>
/* ใส่สไตล์เพิ่มเติมตามต้องการ */
</style>
