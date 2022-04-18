<template>
  <div class="base-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- 系统LOGO -->
      <div class="logo">
        <img src="./../assets/logo.png" />
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :router="true"
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse"
        class="left-menu"
        :default-active="activeMenu"
      >
        <tree-menu :user-menu="userMenu" />
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle">
            <el-icon :size="20">
              <expand v-show="isCollapse" />
              <Fold v-show="!isCollapse" />
            </el-icon>
          </div>
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>
        <div class="user-info">
          <el-badge class="notice" :is-dot="noticeCount > 0">
            <el-icon :size="20">
              <Bell />
            </el-icon>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userinfo.userName }}
              <el-icon>
                <ArrowRight />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"> 邮箱：{{ userinfo.userEmail }} </el-dropdown-item>
                <el-dropdown-item command="logout"> 退出 </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { ArrowRight, Bell, Expand, Fold, Location, Reading, Right, Setting } from '@element-plus/icons-vue'
import TreeMenu from './TreeMenu.vue'
import BreadCrumb from './BreadCrumb.vue'

export default {
  name: 'Home',
  components: { Expand, Reading, ArrowRight, Right, Bell, Fold, TreeMenu, BreadCrumb },
  data() {
    return {
      // eslint-disable-next-line no-restricted-globals
      activeMenu: location.hash.slice(1),
      isCollapse: false,
      userinfo: this.$store.state.userInfo,
      noticeCount: 0,
      userMenu: [],
    }
  },
  mounted() {
    this.getNoticeCount()
    this.getMenuList()
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    // 退出
    handleLogout(key) {
      if (key === 'email') return
      this.$store.commit('saveUserInfo', '')
      this.userinfo = {}
      this.$router.push('/login')
    },
    // 获取通知数量
    async getNoticeCount() {
      const count = await this.$api.getNoticeCount()
      this.noticeCount = count
    },
    // 获取菜单
    async getMenuList() {
      const { menuList, actionList } = await this.$api.getPermission()

      this.$store.commit('saveUserMenu', menuList)
      this.$store.commit('saveUserAction', actionList)
      this.userMenu = menuList
    },
  },
}
</script>

<style scoped lang="scss">
.base-layout {
  position: relative;

  .nav-side {
    background: #001529;
    position: fixed;
    width: 200px;
    height: 100vh;
    color: white;
    overflow: hidden;
    transition: width 0.5s;

    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;

      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }

    .left-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }

    &.fold {
      width: 64px;
    }

    &.unfold {
      width: 200px;
    }
  }

  .content-right {
    transition: width 0.5s;

    &.fold {
      margin-left: 64px;
    }

    &.unfold {
      margin-left: 200px;
    }

    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;

      .nav-left {
        display: flex;
        align-items: center;

        .menu-fold {
          margin-right: 15px;
        }

        .bread {
        }
      }

      .user-info {
        display: flex;
        align-items: center;

        .notice {
          line-height: 28px;
          margin-right: 15px;
        }

        .user-link {
          cursor: pointer;
          color: #337ed9;
        }
      }
    }

    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);

      .main-content {
        background: #ffffff;
        height: 100%;
      }
    }
  }
}
</style>
