<template>
  <template v-if="!routeItem.meta || !routeItem.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(routeItem.children, routeItem) &&
        (!theOnlyChild.children || theOnlyChild.noShowingChildren) &&
        !routeItem.alwaysShow
      "
    >
      <el-menu-item
        :index="resolvePath(theOnlyChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <template v-if="theOnlyChild.meta.icon">
          <i v-if="theOnlyChild.meta.icon.includes('el-icon')" class="{[icon, 'sub-el-icon']}" />
          <icon-svg v-else :icon-name="theOnlyChild.meta.icon" />
        </template>
        <template v-if="theOnlyChild.meta.title" #title> {{ theOnlyChild.meta.title }}</template>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="resolvePath(routeItem.path)" popper-append-to-body>
      <template #title>
        <template v-if="routeItem.meta.icon">
          <i v-if="routeItem.meta.icon.includes('el-icon')" class="{[icon, 'sub-el-icon']}" />
          <icon-svg v-else :icon-name="routeItem.meta.icon" />
        </template>
        <template v-if="routeItem.meta.title">
          <span>{{ routeItem.meta.title }}</span>
        </template>
      </template>
      <sidebar-item
        v-for="child in routeItem.children"
        :key="child.path"
        :routeItem="child"
        :base-path="resolvePath(child.path)"
        :isNest="true"
        class="nest-menu"
      />
    </el-submenu>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
export default defineComponent({
  name: 'SidebarItem',
  props: {
    routeItem: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { basePath } = toRefs(props)
    const theOnlyChild = ref()
    function hasOneShowingChild(children: any[], parent: any) {
      // children maybe undefined
      if (!children) {
        theOnlyChild.value = {
          ...parent,
          path: '',
          noShowingChildren: true,
        }
        return true
      }
      const showingChildren = children.filter((child) => !child.meta.hidden)
      if (showingChildren.length === 1) {
        theOnlyChild.value = showingChildren[0]
        return true
      }
      if (showingChildren.length === 0) {
        theOnlyChild.value = {
          ...parent,
          path: '',
          noShowingChildren: true,
        }
        return true
      }
      return false
    }
    function resolvePath(routePath: string) {
      let tmpPath = (basePath.value + '/' + routePath).replaceAll('//', '/')
      if (tmpPath.endsWith('/')) {
        tmpPath = tmpPath.substring(0, tmpPath.length - 1)
      }
      return tmpPath
    }
    return {
      theOnlyChild,
      // func
      hasOneShowingChild,
      resolvePath,
    }
  },
})
</script>

<style lang="scss" scoped>
// .el-menu {
//   @apply bg-transparent;
// }
// .is-active > .el-submenu__title {
//   // @apply text-menu-txt-active;
//   // color: $subMenuActiveTextColor !important;
// }
// .el-submenu.el-menu {
//   background-color: transparent !important;
// }
// .el-menu .el-submenu .el-menu-item {
//   background-color: transparent !important;
// }
// .el-menu .el-submenu {
//   .el-menu-item {
//     background-color: pink;
//     &:hover {
//       background-color: red !important;
//     }
//   }
// }
// .nest-menu .el-submenu > .el-submenu__title {
//   background-color: green !important;
//   // @apply bg-yellow-100;
//   &:hover {
//     background-color: pink !important;
//   }
// }
</style>
