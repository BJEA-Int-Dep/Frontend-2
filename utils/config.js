// 环境配置
const config = {
  // 开发环境
  development: {
    baseURL: 'http://localhost:3000/api',
    timeout: 10000
  },
  // 生产环境
  production: {
    baseURL: 'https://your-production-api.com/api',
    timeout: 10000
  },
  // 测试环境
  test: {
    baseURL: 'https://your-test-api.com/api',
    timeout: 10000
  }
};

// 当前环境（可以根据需要修改）
const currentEnv = 'development';

// 导出当前环境的配置
module.exports = {
  baseURL: config[currentEnv].baseURL,
  timeout: config[currentEnv].timeout,
  env: currentEnv
}; 