<template>
  <el-dropdown class="mr-30px" trigger="click">
    <div class="relative mt-5px">
      <img :src="avatarUrl" alt="avatar" class="cursor-pointer h-40px w-40px rounded" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item> Home </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout">Logout</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store/index'
export default defineComponent({
  name: 'AvatarDropdownMenu',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const avatarUrl = computed(() => store.getters.avatar)
    async function logout() {
      await store.dispatch('user/logout')
      router.push(`/login?redirect=${route.fullPath}`)
    }
    return {
      avatarUrl,
      // fnc
      logout,
    }
  },
})
</script>

<style lang="scss" scoped></style>
