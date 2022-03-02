/**
 * axios 二次封装
 */

import axios from "axios";
import config from "../config";
import {ElMessage} from "element-plus";
import router from "../router";

const TOKEN_INVALID = 'token异常，请重新登录'
const NETWORK_ERROR = '网络异常，稍后再试'

//添加全局配置
const serve = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})

//请求拦截
serve.interceptors.request.use(function (req) {
    const headers = req.headers
    if (!headers.Authorization) headers.Authorization = 'Bear hello'
    return req
})

//响应拦截
serve.interceptors.response.use(function (res) {
    const {code, data, msg} = res.data
    debugger
    if (code === 200) {
        return data
    } else if (code === 40001) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(function () {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }

})

/**
 *
 * @param options 请求配置
 * @returns {AxiosPromise}
 */
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }
    //生产环境强制使用baseAPI
    if (config.env === 'prod') {
        serve.defaults.baseURL = config.baseApi
    } else {
        serve.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
    }
    return serve(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})

export default request