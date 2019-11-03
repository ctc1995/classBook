// pages/order/orderRefundSuc/orderRefundSuc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyGoodsList: [],
    orderStatus: {},
    orderInfo: {
      id: 20191023008912,
      status: 7,
      // 退款费用
      money: '776.00',
      // 申请时间
      ctime: new Date().toLocaleString(),
      // 退款时间
      rtime: new Date().toLocaleString(),
      // 退款原因
      info: '不想要了。'
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  callPhone(){
    wx.makePhoneCall({
      phoneNumber: '15018504589' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    const eventChannel = this.getOpenerEventChannel();
    var self = this, appInstance = getApp();
    eventChannel.on('acceptBuyGoodsList', function (data) {
      self.setData({
        buyGoodsList: data,
        orderStatus: appInstance.globalData.orderStatus
      })
    })
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