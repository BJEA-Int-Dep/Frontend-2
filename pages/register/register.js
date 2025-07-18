const { api, handleError } = require('../../utils/api.js');

Page({
  data: {
    identity: 'student',
    registerBtnActive: false,
    // 学生注册表单数据
    studentForm: {
      studentId: '',
      name: '',
      major: '',
      enrollmentYear: '',
      contact: ''
    },
    // 校友注册表单数据
    alumniForm: {
      name: '',
      graduationYear: '',
      major: '',
      company: '',
      contact: ''
    }
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
  // 注册按钮按下效果
  onRegisterBtnTouchStart() {
    this.setData({
      registerBtnActive: true
    });
  },

  // 注册按钮松开效果
  onRegisterBtnTouchEnd() {
    this.setData({
      registerBtnActive: false
    });
  },

  // 表单输入处理
  onStudentInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`studentForm.${field}`]: e.detail.value
    });
  },

  onAlumniInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`alumniForm.${field}`]: e.detail.value
    });
  },

  async handleRegister() {
    const { identity, studentForm, alumniForm } = this.data;
    
    try {
      wx.showLoading({
        title: '注册中...',
        mask: true
      });
      
      let registerData;
      
      if (identity === 'student') {
        // 验证学生表单
        if (!studentForm.studentId || !studentForm.name || !studentForm.major) {
          wx.hideLoading();
          wx.showToast({
            title: '请填写完整的学生信息',
            icon: 'none'
          });
          return;
        }
        registerData = {
          identity: 'student',
          ...studentForm
        };
      } else {
        // 验证校友表单
        if (!alumniForm.name || !alumniForm.major) {
          wx.hideLoading();
          wx.showToast({
            title: '请填写完整的校友信息',
            icon: 'none'
          });
          return;
        }
        registerData = {
          identity: 'alumni',
          ...alumniForm
        };
      }
      
      const result = await api.user.register(registerData);
      
      wx.hideLoading();
      
      if (result.success) {
        wx.showToast({
          title: '注册成功',
          icon: 'success'
        });
        
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }, 1500);
      } else {
        wx.showToast({
          title: result.message || '注册失败',
          icon: 'none'
        });
      }
    } catch (error) {
      wx.hideLoading();
      handleError(error);
    }
  },
  goToLogin() {
    wx.reLaunch({
      url: '/pages/login/login'
    });
  }
}); 