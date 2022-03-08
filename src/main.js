import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router";
import store from "./store";


import App from './App.vue'
import request from "./utils/request";
import storage from "./utils/storage";
import api from "./api";

const app = createApp(App)
app.config.globalProperties.$requset = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api
app.use(router).use(ElementPlus).use(store).mount('#app')
