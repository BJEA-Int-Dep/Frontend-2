// pages/login/login.js
const { api, handleError } = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity: 'student', // 默认学生
    studentId: '', // 用户输入的学号
    password: '',   // 用户输入的密码
    loginBtnActive: false // 登录按钮按下状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  // 监听学号输入框内容变化
  onStudentIdInput(e) {
    this.setData({ studentId: e.detail.value });
  },

  // 监听密码输入框内容变化
  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  // 登录按钮按下效果
  onLoginBtnTouchStart() {
    this.setData({
      loginBtnActive: true
    });
  },

  // 登录按钮松开效果
  onLoginBtnTouchEnd() {
    this.setData({
      loginBtnActive: false
    });
  },

  // 登录按钮点击事件处理
  async handleLogin() {
    const { studentId, password, identity } = this.data;
    
    if (!studentId || !password) {
      wx.showToast({
        title: '请输入学号和密码',
        icon: 'none'
      });
      return;
    }
    
    try {
      wx.showLoading({
        title: '登录中...',
        mask: true
      });
      
      const loginData = {
        studentId,
        password,
        identity // 学生或校友身份
      };
      
      const result = await api.user.login(loginData);
      
      wx.hideLoading();
      
      if (result.success) {
        // 保存用户信息到本地存储
        wx.setStorageSync('userInfo', result.data);
        wx.setStorageSync('token', result.token);
        
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
          title: result.message || '登录失败',
          icon: 'none'
        });
      }
    } catch (error) {
      wx.hideLoading();
      handleError(error);
    }
  },

  // 注册按钮点击事件处理
  // 目前未开放注册，点击时弹出提示
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