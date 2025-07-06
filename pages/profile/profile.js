// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      avatar: '/assets/avatars/user1.png', // 本地头像图片
      name: '张三',
      studentId: '2020123456',
      major: '计算机科学',
      contact: 'zhangsan@example.com'
    }
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

  // 退出登录按钮事件
  logout() {
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
})