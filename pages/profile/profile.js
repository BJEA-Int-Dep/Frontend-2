// pages/profile/profile.js
const api = require('../../utils/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    loading: false,
    refreshing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadUserProfile();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 每次显示页面时刷新用户信息
    this.loadUserProfile();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.refreshData();
  },

  // 加载用户信息
  loadUserProfile() {
    if (this.data.loading) return;

    this.setData({ loading: true });

    api.auth.getProfile()
      .then(res => {
        if (res.success) {
          this.setData({
            user: res.data
          });
        } else {
          wx.showToast({
            title: res.message || '获取用户信息失败',
            icon: 'none'
          });
          // 如果获取用户信息失败，可能是token过期，跳转到登录页
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/login/login'
            });
          }, 1500);
        }
      })
      .catch(err => {
        console.error('获取用户信息失败:', err);
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
        // 网络错误时也跳转到登录页
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }, 1500);
      })
      .finally(() => {
        this.setData({ 
          loading: false,
          refreshing: false
        });
        wx.stopPullDownRefresh();
      });
  },

  // 刷新数据
  refreshData() {
    this.setData({ refreshing: true });
    this.loadUserProfile();
  },

  // 编辑个人信息
  editProfile() {
    wx.navigateTo({
      url: '/pages/profile/edit/edit'
    });
  },

  // 退出登录按钮事件
  logout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          this.performLogout();
        }
      }
    });
  },

  // 执行退出登录
  performLogout() {
    wx.showLoading({
      title: '退出中...'
    });

    api.auth.logout()
      .then(() => {
        wx.hideLoading();
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
      })
      .catch(err => {
        wx.hideLoading();
        console.error('退出登录失败:', err);
        // 即使API调用失败，也要清除本地token并跳转
        api.clearAuthToken();
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
      });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '校友资料查询系统',
      path: '/pages/alumniList/alumniList'
    };
  }
})