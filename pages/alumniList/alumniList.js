// pages/alumniList/alumniList.js
const { api, handleError } = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    alumni: [],
    loading: false,
    hasMore: true,
    page: 1,
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadAlumniList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 页面初次渲染完成后可进行相关操作
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面每次显示时触发
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 页面隐藏时触发
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时触发
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.refreshAlumniList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadMoreAlumni();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    // 设置分享内容
  },

  /**
   * 加载校友列表
   */
  async loadAlumniList() {
    if (this.data.loading) return;
    
    try {
      this.setData({ loading: true });
      
      const params = {
        page: this.data.page,
        pageSize: this.data.pageSize
      };
      
      const result = await api.alumni.getList(params);
      
      if (result.success) {
        this.setData({
          alumni: result.data.list || [],
          hasMore: result.data.hasMore || false,
          loading: false
        });
      } else {
        this.setData({ loading: false });
        wx.showToast({
          title: result.message || '获取校友列表失败',
          icon: 'none'
        });
      }
    } catch (error) {
      this.setData({ loading: false });
      handleError(error);
    }
  },

  /**
   * 刷新校友列表
   */
  async refreshAlumniList() {
    this.setData({
      page: 1,
      hasMore: true
    });
    await this.loadAlumniList();
    wx.stopPullDownRefresh();
  },

  /**
   * 加载更多校友
   */
  async loadMoreAlumni() {
    if (this.data.loading || !this.data.hasMore) return;
    
    try {
      this.setData({ loading: true });
      
      const nextPage = this.data.page + 1;
      const params = {
        page: nextPage,
        pageSize: this.data.pageSize
      };
      
      const result = await api.alumni.getList(params);
      
      if (result.success) {
        const newAlumni = result.data.list || [];
        this.setData({
          alumni: [...this.data.alumni, ...newAlumni],
          page: nextPage,
          hasMore: result.data.hasMore || false,
          loading: false
        });
      } else {
        this.setData({ loading: false });
        wx.showToast({
          title: result.message || '加载更多失败',
          icon: 'none'
        });
      }
    } catch (error) {
      this.setData({ loading: false });
      handleError(error);
    }
  },

  /**
   * 点击校友卡片，跳转到详情页并传递信息
   */
  goToDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/alumniDetail/alumniDetail?id=${item.id}`
    });
  }
})