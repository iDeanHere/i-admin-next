<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper" class="h-full">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="false"
        :background-color="variables.menuBgColor"
        :text-color="variables.menuBgColor"
        :active-text-color="variables.menuBgColor"
        mode="vertical"
        router
        class="border-none h-full w-full !bg-transparent"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :routeItem="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import SidebarItem from '@/layout/Sidebar/SidebarItem/index.vue'
import Variables from '@/styles/variables.scss'

export default defineComponent({
  name: 'Sidebar',
  components: { SidebarItem },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const showLogo = computed(() => {
      return true
    })
    const activeMenu = computed(() => {
      const { meta, path } = toRefs(route)
      if (meta.value.activeMenu) {
        return meta.value.activeMenu
      }
      return path.value
    })
    const isCollapse = computed(() => !store.getters.sidebar.isOpen)
    const routes = computed(() => {
      return router.options.routes
    })
    const variables = computed(() => {
      console.log('Variables', Variables)

      return Variables
    })
    return {
      routes,
      showLogo,
      activeMenu,
      isCollapse,
      variables,
    }
  },
})
</script>

<style lang="scss">
.el-menu,
.el-submenu,
.el-menu-item {
  @apply bg-transparent;
}

.el-menu-item,
.el-submenu__title {
  &:hover,
  &:focus {
    @apply bg-menu-lit;
  }
}
</style>
