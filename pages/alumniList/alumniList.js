// pages/alumniList/alumniList.js
const api = require('../../utils/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    alumni: [],
    loading: false,
    refreshing: false,
    page: 1,
    pageSize: 20,
    hasMore: true,
    // 筛选条件
    filters: {
      keyword: '',
      major: '',
      year: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadAlumniList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 每次显示页面时刷新数据
    this.refreshData();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.refreshData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadMoreData();
    }
  },

  // 加载校友列表
  loadAlumniList(isRefresh = false) {
    if (this.data.loading) return;

    const { page, pageSize, filters } = this.data;
    
    this.setData({ loading: true });

    // 构建请求参数
    const params = {
      page: isRefresh ? 1 : page,
      pageSize: pageSize
    };

    // 添加筛选条件
    if (filters.keyword) {
      params.keyword = filters.keyword;
    }
    if (filters.major) {
      params.major = filters.major;
    }
    if (filters.year) {
      params.year = filters.year;
    }

    api.alumni.getAlumniList(params)
      .then(res => {
        if (res.success) {
          const newAlumni = res.data.list || [];
          
          if (isRefresh) {
            // 刷新数据
            this.setData({
              alumni: newAlumni,
              page: 1,
              hasMore: res.data.pagination.hasMore
            });
          } else {
            // 加载更多数据
            this.setData({
              alumni: [...this.data.alumni, ...newAlumni],
              page: page + 1,
              hasMore: res.data.pagination.hasMore
            });
          }
        } else {
          wx.showToast({
            title: res.message || '获取数据失败',
            icon: 'none'
          });
        }
      })
      .catch(err => {
        console.error('获取校友列表失败:', err);
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
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
    this.loadAlumniList(true);
  },

  // 加载更多数据
  loadMoreData() {
    this.loadAlumniList(false);
  },

  // 搜索功能
  onSearchInput(e) {
    this.setData({
      'filters.keyword': e.detail.value
    });
  },

  // 执行搜索
  onSearch() {
    this.refreshData();
  },

  // 清除搜索
  onClearSearch() {
    this.setData({
      'filters.keyword': ''
    });
    this.refreshData();
  },

  // 筛选功能
  onFilterChange(e) {
    const { type, value } = e.currentTarget.dataset;
    this.setData({
      [`filters.${type}`]: value
    });
    this.refreshData();
  },

  /**
   * 点击校友卡片，跳转到详情页
   */
  goToDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/alumniDetail/alumniDetail?id=${item.id}`
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