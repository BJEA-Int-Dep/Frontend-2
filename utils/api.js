// utils/api.js
// API服务模块，统一管理所有与后端的交互

const config = require('./config.js');

// 基础配置
const BASE_URL = config.getBaseUrl();
const TIMEOUT = config.getTimeout();

// 请求封装
const request = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    // 获取token
    const token = wx.getStorageSync('token');
    
    // 设置请求头
    const header = {
      'Content-Type': 'application/json',
      ...options.header
    };
    
    // 如果有token，添加到请求头
    if (token) {
      header.Authorization = `Bearer ${token}`;
    }
    
    wx.request({
      url: `${BASE_URL}${url}`,
      timeout: TIMEOUT,
      header,
      ...options,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          // token过期，清除本地存储并跳转到登录页
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('token');
          wx.reLaunch({
            url: '/pages/login/login'
          });
          reject(new Error('登录已过期，请重新登录'));
        } else {
          reject(new Error(`请求失败: ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(new Error(`网络错误: ${err.errMsg}`));
      }
    });
  });
};

// API接口定义
const api = {
  // 用户相关
  user: {
    // 用户登录
    login: (data) => request('/user/login', {
      method: 'POST',
      data
    }),
    
    // 用户注册
    register: (data) => request('/user/register', {
      method: 'POST',
      data
    }),
    
    // 获取用户信息
    getProfile: () => request('/user/profile'),
    
    // 更新用户信息
    updateProfile: (data) => request('/user/profile', {
      method: 'PUT',
      data
    }),
    
    // 用户登出
    logout: () => request('/user/logout', {
      method: 'POST'
    })
  },
  
  // 校友相关
  alumni: {
    // 获取校友列表
    getList: (params = {}) => request('/alumni/list', {
      method: 'GET',
      data: params
    }),
    
    // 获取校友详情
    getDetail: (id) => request(`/alumni/detail/${id}`),
    
    // 搜索校友
    search: (keyword) => request('/alumni/search', {
      method: 'GET',
      data: { keyword }
    }),
    
    // 获取校友统计信息
    getStats: () => request('/alumni/stats')
  },
  
  // 系统相关
  system: {
    // 获取系统配置
    getConfig: () => request('/system/config'),
    
    // 获取版本信息
    getVersion: () => request('/system/version')
  }
};

// 错误处理
const handleError = (error) => {
  console.error('API Error:', error);
  wx.showToast({
    title: error.message || '请求失败',
    icon: 'none',
    duration: 2000
  });
  throw error;
};

// 导出
module.exports = {
  api,
  request,
  handleError
}; 