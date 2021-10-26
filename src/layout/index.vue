<template>
  <div class="relative h-full w-full">
    <Sidebar
      class="fixed h-full top-0 bottom-0 left-0 overflow-hidden z-1001 shadow bg-menu-main transition-w duration-300"
      :class="isSidebarCollapse ? 'w-aside-collapse' : 'w-aside-open'"
    />
    <div
      class="relative h-full flex flex-col transition-ml duration-300"
      :class="[
        [isSidebarCollapse ? 'ml-aside-collapse' : 'ml-aside-open'],
        [fixedHeader ? 'overflow-hidden' : 'overflow-auto'],
      ]"
    >
      <div class="flex-grow-0">
        <Navbar />
      </div>
      <AppMain class="flex-grow" :class="{ 'overflow-auto': fixedHeader }" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import AppMain from '@/layout/AppMain/index.vue'
import Navbar from '@/layout/Navbar/index.vue'
import Sidebar from '@/layout/Sidebar/index.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
  },
  setup() {
    const store = useStore()
    const sidebar = computed(() => store.getters.sidebar)
    const isSidebarCollapse = computed(() => !sidebar.value.isOpen)
    // const dynamicClasses = computed(() => {
    //   return {
    //     'hide-sidebar': !sidebar.value.isOpen,
    //     'without-animation': sidebar.value.withoutAnimation,
    //   }
    // })
    const fixedHeader = computed(() => {
      return true
    })
    return {
      // dynamicClasses,
      isSidebarCollapse,
      fixedHeader,
    }
  },
})
</script>
<style></style>
<style lang="scss" scoped></style>
