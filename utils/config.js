// utils/config.js
// 配置文件

const config = {
  // API配置
  api: {
    // 开发环境
    development: {
      baseUrl: 'http://localhost:3000/api',
      timeout: 10000
    },
    // 生产环境
    production: {
      baseUrl: 'https://your-production-api.com/api',
      timeout: 10000
    }
  },
  
  // 当前环境
  env: 'development', // 可以改为 'production'
  
  // 获取当前环境的配置
  getCurrentConfig() {
    return this.api[this.env];
  },
  
  // 获取API基础URL
  getBaseUrl() {
    return this.getCurrentConfig().baseUrl;
  },
  
  // 获取超时时间
  getTimeout() {
    return this.getCurrentConfig().timeout;
  }
};

module.exports = config; 