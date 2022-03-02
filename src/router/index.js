import {createRouter, createWebHashHistory} from "vue-router";

import Login from "@/components/Login.vue";
import Welcome from "@/components/Welcome.vue";
import Home from '@/components/Home.vue'

const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: 'home'
        },
        component: Home,
        redirect: '/welcome',
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                meta: {
                    title: 'welcome'
                },
                component: Welcome,
            },
            {
                name: 'login',
                path: '/login',
                meta: {
                    title: 'login'
                },
                component: Login,
            }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router