// pages/alumniDetail/alumniDetail.js
const api = require('../../utils/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    alumni: null,
    loading: false,
    refreshing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options && options.id) {
      this.loadAlumniDetail(options.id);
    } else {
      // 兼容旧版本传参方式
      if (options && options.name) {
        this.setData({
          alumni: {
            avatar: decodeURIComponent(options.avatar || ''),
            name: decodeURIComponent(options.name || ''),
            year: decodeURIComponent(options.year || ''),
            major: decodeURIComponent(options.major || ''),
            job: decodeURIComponent(options.job || ''),
            desc: decodeURIComponent(options.desc || '')
          }
        });
      } else {
        wx.showToast({
          title: '参数错误',
          icon: 'none'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    if (this.data.alumni && this.data.alumni.id) {
      this.refreshData();
    } else {
      wx.stopPullDownRefresh();
    }
  },

  // 加载校友详情
  loadAlumniDetail(id) {
    if (this.data.loading) return;

    this.setData({ loading: true });
    wx.showLoading({
      title: '加载中...'
    });

    api.alumni.getAlumniDetail(id)
      .then(res => {
        wx.hideLoading();
        if (res.success) {
          this.setData({
            alumni: res.data
          });
        } else {
          wx.showToast({
            title: res.message || '获取详情失败',
            icon: 'none'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.error('获取校友详情失败:', err);
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
        setTimeout(() => {
          wx.navigateBack();
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
    if (this.data.alumni && this.data.alumni.id) {
      this.setData({ refreshing: true });
      this.loadAlumniDetail(this.data.alumni.id);
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const { alumni } = this.data;
    if (alumni) {
      return {
        title: `${alumni.name} - ${alumni.major}校友`,
        path: `/pages/alumniDetail/alumniDetail?id=${alumni.id}`
      };
    }
    return {
      title: '校友资料查询系统',
      path: '/pages/alumniList/alumniList'
    };
  }
})