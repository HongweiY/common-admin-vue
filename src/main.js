import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router";
import config from "./config";

import App from './App.vue'
import axios from "axios";

const app = createApp(App)

axios.get(config.mockApi+'/login').then((res) => {
    console.log(res)
})

app.use(router).use(ElementPlus).mount('#app')
