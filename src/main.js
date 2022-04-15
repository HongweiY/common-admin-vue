import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'

import App from './App.vue'
import request from './utils/request'
import storage from './utils/storage'
import api from './api'

const app = createApp(App)

// 指令控制按钮显示
app.directive('has', {
  beforeMount: (el, binding) => {
    const userAction = storage.getItem('actionList') || []
    const { value } = binding
    const hasPermission = userAction.includes(value)
    if (!hasPermission) {
      el.style = 'display:none'
      setTimeout(() => {
        el.parentNode.removeChild(el)
      }, 0)
    }
  },
})

app.config.globalProperties.$requset = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api
app.use(router).use(ElementPlus).use(store).mount('#app')
