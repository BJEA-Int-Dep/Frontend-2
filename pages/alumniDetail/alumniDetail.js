// pages/alumniDetail/alumniDetail.js
const { api, handleError } = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    alumni: {
      id: '',
      avatar: '',
      name: '',
      year: '',
      major: '',
      job: '',
      desc: '',
      contact: '',
      company: '',
      location: ''
    },
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options && options.id) {
      this.loadAlumniDetail(options.id);
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

  /**
   * 加载校友详情
   */
  async loadAlumniDetail(id) {
    try {
      this.setData({ loading: true });
      
      const result = await api.alumni.getDetail(id);
      
      if (result.success) {
        this.setData({
          alumni: result.data,
          loading: false
        });
      } else {
        this.setData({ loading: false });
        wx.showToast({
          title: result.message || '获取校友详情失败',
          icon: 'none'
        });
      }
    } catch (error) {
      this.setData({ loading: false });
      handleError(error);
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  }
})