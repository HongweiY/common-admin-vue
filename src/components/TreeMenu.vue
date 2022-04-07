<template>
  <template v-for="menu in userMenu">
    <el-sub-menu
      v-if="menu.children && menu.children.length>0 && menu.children[0].menuType==1"
      :key="menu._id"
      :index="menu.path"
    >
      <template #title>
        <el-icon>
          <setting />
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :user-menu="menu.children" />
    </el-sub-menu>
    <el-menu-item
      v-else-if="menu.menuType==1"
      :key="menu._id"
      :index="menu.path"
    >
      {{ menu.menuName }}
    </el-menu-item>
  </template>
</template>

<script>
import { ArrowRight, Bell, Expand, Fold, Location, Reading, Right, Setting } from '@element-plus/icons-vue'

export default {
  name: 'TreeMenu',
  components: { Expand, Reading, Location, Setting, ArrowRight, Right, Bell, Fold },

  props: {
    userMenu: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>