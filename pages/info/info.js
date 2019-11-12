// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    sex: ["未知", "男", "女"],
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

  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  bindSexChange: function (e) {
    this.setData({
      [`formData.sex`]: e.detail.value,
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
      [`formData.region`]: e.detail.value,
      region: e.detail.value
    })
  },
  getCode: function(){
    if (/^1[3456789]\d{9}$/.test(this.data.formData.mobile) && this.data.canGetCode) {
      this.setData({
        canGetCode: false,
      })
      setTimeout(function(){
        this.setData({
          canGetCode: true,
        })
      },60000)
    } else {
      this.setData({
        error: '手机号错误，请检查'
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