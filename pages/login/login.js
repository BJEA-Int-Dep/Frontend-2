// pages/login/login.js
const api = require('../../utils/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    identity: 'student', // 默认学生
    studentId: '', // 用户输入的学号
    password: '',   // 用户输入的密码
    loading: false  // 登录状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 检查是否已经登录
    const token = api.getAuthToken();
    if (token) {
      this.autoLogin();
    }
  },

  // 自动登录
  autoLogin() {
    wx.showLoading({
      title: '自动登录中...'
    });

    api.auth.getProfile()
      .then(res => {
        wx.hideLoading();
        if (res.success) {
          // 登录成功，跳转到校友列表页
          wx.switchTab({
            url: '/pages/alumniList/alumniList'
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.log('自动登录失败:', err);
        // 清除无效token
        api.clearAuthToken();
      });
  },

  // 监听学号输入框内容变化
  onStudentIdInput(e) {
    this.setData({ studentId: e.detail.value });
  },

  // 监听密码输入框内容变化
  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  // 登录按钮点击事件处理
  handleLogin() {
    const { studentId, password, identity, loading } = this.data;
    
    // 防止重复点击
    if (loading) return;

    // 输入验证
    if (!studentId.trim()) {
      wx.showToast({
        title: '请输入学号/工号',
        icon: 'none'
      });
      return;
    }

    if (!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });
    wx.showLoading({
      title: '登录中...'
    });

    // 调用登录API
    api.auth.login({
      studentId: studentId.trim(),
      password: password,
      identity: identity
    })
    .then(res => {
      wx.hideLoading();
      this.setData({ loading: false });
      
      if (res.success) {
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 跳转到tabBar页面（校友列表）
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/alumniList/alumniList'
          });
        }, 1000);
      } else {
        wx.showToast({
          title: res.message || '登录失败',
          icon: 'none'
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      this.setData({ loading: false });
      
      console.error('登录错误:', err);
      wx.showToast({
        title: err.message || '网络错误，请重试',
        icon: 'none'
      });
    });
  },

  // 注册按钮点击事件处理
  goToRegister() {
    wx.redirectTo({
      url: `/pages/register/register?identity=${this.data.identity}`
    });
  },

  chooseIdentity(e) {
    this.setData({
      identity: e.currentTarget.dataset.type
    });
  }
})