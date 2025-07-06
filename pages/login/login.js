// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity: 'student', // 默认学生
    studentId: '', // 用户输入的学号
    password: ''   // 用户输入的密码
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

  // 登录按钮点击事件处理
  // 校验学号和密码是否都为111，成功则跳转到校友列表页，否则弹出错误提示
  handleLogin() {
    const { studentId, password } = this.data;
    if (studentId === '111' && password === '111') { // 现在是暂时写死，后续需要修改
      // 跳转到tabBar页面（校友列表）
      wx.switchTab({
        url: '/pages/alumniList/alumniList'
      });
    } else {
      // 登录失败，弹出提示
      wx.showToast({
        title: '账号或密码错误',
        icon: 'none'
      });
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