// pages/info/info.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    sex: ["男", "女"],
    sexIndex: 0,
    region: ['', '', ''],
    canGetCode: true,
    code: '',
    error: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.request.getAbout().then(res => {
      console.log(res);
      this.setData({
        'formData.avatar': res.data.avatar,
        'formData.nickname': res.data.nickname,
        'formData.gender': res.data.gender - 1,
        'formData.birthday': res.data.birthday,
        'formData.mobile': res.data.mobile,
        region: [res.data.province, res.data.city, res.data.area]
      })
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      [`formData.birthday`]: e.detail.value
    })
  },
  bindSexChange: function (e) {
    this.setData({
      [`formData.gender`]: e.detail.value,
      sexIndex: e.detail.value
    })
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      [`formData.province`]: e.detail.value[0],
      [`formData.city`]: e.detail.value[1],
      [`formData.area`]: e.detail.value[2],
      region: e.detail.value
    })
  },
  getCode: function(){
    const self = this;
    // if (/^1[3456789]\d{9}$/.test(this.data.formData.mobile) && this.data.canGetCode) {
    console.log(self.data.formData.mobile);
    if (/^1[3456789]\d{9}$/.test(self.data.formData.mobile)) {
      self.setData({
        canGetCode: false,
      })
      setTimeout(function(){
        self.setData({
          canGetCode: true,
        })
      }, 60000)
      return true;
    } else {
      self.setData({
        error: '手机号错误，请检查'
      })
      return false;
    }
  },
  submitForm: function(){
    console.log(this.data.formData)
    if (this.getCode()) {
      let obj = this.data.formData;
      obj.gender = (+obj.gender + 1).toString()
      app.request.modifyInfo(this.data.formData).then(res => {
        console.log(res);
        if (res.code == 0) {
          wx.navigateBack();
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(() => { wx.stopPullDownRefresh(); }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})