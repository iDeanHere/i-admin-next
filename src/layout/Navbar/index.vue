<template>
  <div class="relative flex h-50px w-full shadow">
    <Hamburger
      class="h-full leading-12 cursor-pointer transition-all duration-300 hover:bg-gray-50"
      :isActive="sidebar.isOpen"
      @toggleClick="toggleSidebar"
    />
    <Breadcrumb class="flex-grow" />
    <AvatarDropdownMenu class="flex-grow-0" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Hamburger from './Hamburger/index.vue'
import Breadcrumb from './Breadcrumb/index.vue'
import AvatarDropdownMenu from './AvatarDropdownMenu/index.vue'
import { useStore } from '@/store/index'
export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
    AvatarDropdownMenu,
  },
  setup() {
    const store = useStore()
    const sidebar = computed(() => store.getters.sidebar)
    function toggleSidebar() {
      store.dispatch('app/toggleSidebarCollapse')
    }
    return {
      sidebar,
      // func
      toggleSidebar,
    }
  },
})
</script>

<style lang="scss" scoped></style>
