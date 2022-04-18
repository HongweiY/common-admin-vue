import { createRouter, createWebHashHistory } from 'vue-router'

import storage from '../utils/storage'
import Api from '../api'
import utils from '../utils/utils'
import Home from '@/components/Home.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页',
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welc ome',
        path: '/welcome',
        meta: {
          title: '欢迎使用后台管理系统',
        },
        component: () => import('@/views/Welcome.vue'),
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登陆',
    },
    component: () => import('../views/Login.vue'),
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '404',
    },
    component: () => import('@/views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

async function loadAsyncRoutes() {
  const userInfo = storage.getItem('userInfo') || {}
  if (userInfo.token) {
    const { menuList } = await Api.getPermission()
    const userRoutes = utils.generateRoute(menuList)

    userRoutes.forEach(route => {
      const url = `./../views/${route.component}.vue`
      route.component = () => import(url /* @vite-ignore */)
      router.addRoute('home', route)
    })
  }
}

await loadAsyncRoutes()

// 导航守卫
router.beforeEach((to, from, next) => {
  if (router.hasRoute(to.name)) {
    document.title = to.meta.title
    next()
  } else {
    next('/404')
  }
})

export default router
