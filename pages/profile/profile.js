// pages/profile/profile.js
const { api, handleError } = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      avatar: '',
      name: '',
      studentId: '',
      major: '',
      contact: '',
      email: '',
      phone: ''
    },
    logoutBtnActive: false // 退出按钮按下状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadUserProfile();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 退出按钮按下效果
  onLogoutBtnTouchStart() {
    this.setData({
      logoutBtnActive: true
    });
  },

  // 退出按钮松开效果
  onLogoutBtnTouchEnd() {
    this.setData({
      logoutBtnActive: false
    });
  },

  /**
   * 加载用户信息
   */
  async loadUserProfile() {
    try {
      const result = await api.user.getProfile();
      
      if (result.success) {
        this.setData({
          user: result.data
        });
      } else {
        wx.showToast({
          title: result.message || '获取用户信息失败',
          icon: 'none'
        });
      }
    } catch (error) {
      handleError(error);
    }
  },

  // 退出登录按钮事件
  async logout() {
    try {
      const result = await api.user.logout();
      
      // 清除本地存储的用户信息
      wx.removeStorageSync('userInfo');
      wx.removeStorageSync('token');
      
      wx.showToast({
        title: '已退出登录',
        icon: 'success',
        duration: 1000
      });
      
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/login/login'
        });
      }, 1000);
    } catch (error) {
      // 即使退出失败，也清除本地信息并跳转
      wx.removeStorageSync('userInfo');
      wx.removeStorageSync('token');
      
      wx.showToast({
        title: '已退出登录',
        icon: 'none',
        duration: 1000
      });
      
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/login/login'
        });
      }, 1000);
    }
  }
})