/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'
console.log(env)
const EnvConfig = {
    dev: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/fee937e1715028d2d12089b393e7790a/api'
    },
    test: {
        baseApi: '/',
        mockApi: 'https://www.fastmock.site/mock/fee937e1715028d2d12089b393e7790a/api'
    },
    prod: {
        baseApi: '/',
        mockApi: ''
    }
}


export default {
    env: 'dev',
    mock: false,
    namespace: 'admin',
    ...EnvConfig[env]
}