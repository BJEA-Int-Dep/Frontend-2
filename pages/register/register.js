const api = require('../../utils/api.js');

Page({
  data: {
    identity: 'student',
    // 学生注册字段
    studentId: '',
    name: '',
    major: '',
    enrollmentYear: '',
    contact: '',
    password: '',
    confirmPassword: '',
    // 校友注册字段
    graduationYear: '',
    company: '',
    // 通用字段
    loading: false
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

  // 输入框事件处理
  onStudentIdInput(e) {
    this.setData({ studentId: e.detail.value });
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value });
  },

  onMajorInput(e) {
    this.setData({ major: e.detail.value });
  },

  onEnrollmentYearInput(e) {
    this.setData({ enrollmentYear: e.detail.value });
  },

  onGraduationYearInput(e) {
    this.setData({ graduationYear: e.detail.value });
  },

  onCompanyInput(e) {
    this.setData({ company: e.detail.value });
  },

  onContactInput(e) {
    this.setData({ contact: e.detail.value });
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  onConfirmPasswordInput(e) {
    this.setData({ confirmPassword: e.detail.value });
  },

  // 表单验证
  validateForm() {
    const { identity, studentId, name, major, enrollmentYear, graduationYear, contact, password, confirmPassword, loading } = this.data;

    if (loading) return false;

    // 通用验证
    if (!name.trim()) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return false;
    }

    if (!major.trim()) {
      wx.showToast({
        title: '请输入专业',
        icon: 'none'
      });
      return false;
    }

    if (!contact.trim()) {
      wx.showToast({
        title: '请输入联系方式',
        icon: 'none'
      });
      return false;
    }

    if (!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return false;
    }

    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none'
      });
      return false;
    }

    // 学生特有验证
    if (identity === 'student') {
      if (!studentId.trim()) {
        wx.showToast({
          title: '请输入学号',
          icon: 'none'
        });
        return false;
      }

      if (!enrollmentYear.trim()) {
        wx.showToast({
          title: '请输入入学年份',
          icon: 'none'
        });
        return false;
      }
    }

    // 校友特有验证
    if (identity === 'alumni') {
      if (!graduationYear.trim()) {
        wx.showToast({
          title: '请输入毕业年份',
          icon: 'none'
        });
        return false;
      }
    }

    return true;
  },

  handleRegister() {
    if (!this.validateForm()) return;

    const { identity, studentId, name, major, enrollmentYear, graduationYear, company, contact, password } = this.data;

    this.setData({ loading: true });
    wx.showLoading({
      title: '注册中...'
    });

    // 构建注册数据
    const registerData = {
      identity: identity,
      name: name.trim(),
      major: major.trim(),
      contact: contact.trim(),
      password: password
    };

    // 根据身份添加不同字段
    if (identity === 'student') {
      registerData.studentId = studentId.trim();
      registerData.enrollmentYear = enrollmentYear.trim();
    } else {
      registerData.graduationYear = graduationYear.trim();
      if (company.trim()) {
        registerData.company = company.trim();
      }
    }

    // 调用注册API
    api.auth.register(registerData)
      .then(res => {
        wx.hideLoading();
        this.setData({ loading: false });

        if (res.success) {
          wx.showToast({
            title: '注册成功',
            icon: 'success'
          });

          // 注册成功后跳转到登录页
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/login/login'
            });
          }, 1500);
        } else {
          wx.showToast({
            title: res.message || '注册失败',
            icon: 'none'
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        this.setData({ loading: false });

        console.error('注册错误:', err);
        wx.showToast({
          title: err.message || '网络错误，请重试',
          icon: 'none'
        });
      });
  },

  goToLogin() {
    wx.reLaunch({
      url: '/pages/login/login'
    });
  }
}); 