Page({
  data: {
    identity: 'student'
  },
  onLoad(options) {
    if (options && options.identity) {
      this.setData({ identity: options.identity });
    }
  },
  chooseIdentity(e) {
    this.setData({
      identity: e.currentTarget.dataset.type
    });
  },
  handleRegister() {
    wx.showToast({
      title: '注册功能待实现',
      icon: 'none'
    });
  },
  goToLogin() {
    wx.reLaunch({
      url: '/pages/login/login'
    });
  }
}); 