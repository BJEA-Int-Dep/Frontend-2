// pages/alumniList/alumniList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alumni: [
      {
        id: 1,
        name: '张三',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        year: '2008级',
        major: '计算机科学',
        job: '现任某科技公司工程师',
        desc: '2008级计算机科学，现任某科技公司工程师。'
      },
      {
        id: 2,
        name: '李四',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        year: '2010级',
        major: '金融学',
        job: '现任银行客户经理',
        desc: '2010级金融学，现任银行客户经理。'
      },
      {
        id: 3,
        name: '王五',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        year: '2012级',
        major: '法学',
        job: '现为律师',
        desc: '2012级法学，现为律师。'
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 这里可以请求后端接口获取校友数据，当前为假数据
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
    // 用户下拉刷新时触发
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 页面滚动到底部时触发
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    // 设置分享内容
  },

  /**
   * 点击校友卡片，跳转到详情页并传递信息
   */
  goToDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/alumniDetail/alumniDetail?avatar=${encodeURIComponent(item.avatar)}&name=${encodeURIComponent(item.name)}&year=${encodeURIComponent(item.year)}&major=${encodeURIComponent(item.major)}&job=${encodeURIComponent(item.job)}&desc=${encodeURIComponent(item.desc)}`
    });
  }
})