// pages/alumniDetail/alumniDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alumni: {
      avatar: '',
      name: '',
      year: '',
      major: '',
      job: '',
      desc: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 对所有参数进行解码，防止中文乱码
    if (options && options.name) {
      this.setData({
        alumni: {
          avatar: decodeURIComponent(options.avatar),
          name: decodeURIComponent(options.name),
          year: decodeURIComponent(options.year),
          major: decodeURIComponent(options.major),
          job: decodeURIComponent(options.job),
          desc: decodeURIComponent(options.desc)
        }
      });
    }
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

  // 返回上一页
  goBack() {
    wx.navigateBack();
  }
})