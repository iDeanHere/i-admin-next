<template>
  <section class="relative w-full bg-gray-100 p-12px">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'AppMain',
  setup() {
    const route = useRoute()
    const key = computed(() => {
      return route.path
    })
    return {
      key,
    }
  },
})
</script>

<style lang="scss" scoped>
/* fade-transform */
.fade-transform-enter-active {
  transition: all 0.4s;
}
.fade-transform-leave-active {
  transition: all 0.5s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
