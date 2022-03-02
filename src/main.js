import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router";

import App from './App.vue'
import request from "./utils/request";

const app = createApp(App)
app.config.globalProperties.$requset = request


app.use(router).use(ElementPlus).mount('#app')
