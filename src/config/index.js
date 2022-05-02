/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  dev: {
    baseApi: '/api',
    // mockApi: 'https://www.fastmock.site/mock/fee937e1715028d2d12089b393e7790a/api',
    mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
  },
  test: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/fee937e1715028d2d12089b393e7790a/api',
  },
  prod: {
    baseApi: '/',
    mockApi: '',
  },
}

export default {
  env: 'dev',
  mock: false,
  namespace: 'admin',
  ...EnvConfig[env],
}
