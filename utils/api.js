const config = require('./config.js');

// 存储JWT token
let authToken = '';

// 设置认证token
const setAuthToken = (token) => {
  authToken = token;
  // 可以同时存储到本地存储
  wx.setStorageSync('authToken', token);
};

// 获取认证token
const getAuthToken = () => {
  if (!authToken) {
    authToken = wx.getStorageSync('authToken') || '';
  }
  return authToken;
};

// 清除认证token
const clearAuthToken = () => {
  authToken = '';
  wx.removeStorageSync('authToken');
};

// 通用请求方法
const request = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    const token = getAuthToken();
    
    wx.request({
      url: `${config.baseURL}${url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.header
      },
      timeout: config.timeout,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          // 处理认证错误
          if (res.statusCode === 401) {
            clearAuthToken();
            wx.showToast({
              title: '登录已过期，请重新登录',
              icon: 'none'
            });
            // 跳转到登录页
            wx.reLaunch({
              url: '/pages/login/login'
            });
          }
          reject(new Error(res.data.message || '请求失败'));
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络错误，请检查网络连接',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};

// 用户认证相关API
const authAPI = {
  // 用户登录
  login: (data) => {
    return request('/auth/login', {
      method: 'POST',
      data
    }).then(res => {
      if (res.token) {
        setAuthToken(res.token);
      }
      return res;
    });
  },

  // 用户注册
  register: (data) => {
    return request('/auth/register', {
      method: 'POST',
      data
    });
  },

  // 获取用户信息
  getProfile: () => {
    return request('/auth/profile');
  },

  // 更新用户信息
  updateProfile: (data) => {
    return request('/auth/profile', {
      method: 'PUT',
      data
    });
  },

  // 退出登录
  logout: () => {
    clearAuthToken();
    return Promise.resolve();
  }
};

// 校友相关API
const alumniAPI = {
  // 获取校友列表
  getAlumniList: (params = {}) => {
    const queryString = Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    return request(`/alumni?${queryString}`);
  },

  // 获取校友详情
  getAlumniDetail: (id) => {
    return request(`/alumni/${id}`);
  },

  // 搜索校友
  searchAlumni: (keyword, params = {}) => {
    return request('/alumni/search', {
      method: 'POST',
      data: {
        keyword,
        ...params
      }
    });
  },

  // 获取校友统计信息
  getAlumniStats: () => {
    return request('/alumni/stats');
  }
};

// 导出API模块
module.exports = {
  auth: authAPI,
  alumni: alumniAPI,
  setAuthToken,
  getAuthToken,
  clearAuthToken
}; 