// pages/order/orderCancel/orderCancel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyGoodsList: [],
    orderStatus: {},
    orderInfo: {
      id: 20191023008912,
      delivery: {
        name: '张三丰',
        phone: '18977837849',
        address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
      },
      status: 4,
      // 快递费用
      logisticsPrice: '6.00',
      // 订单费用
      orderTotal: '776.00',
      // 创建时间
      ctime: new Date().toLocaleString(),
      // 付款时间
      ptime: new Date().toLocaleString(),
      // 发货时间
      stime: new Date().toLocaleString(),
      // 物流信息
      logistics: [
        '已签收，快递员：桑查 17827399371',
        '下一站,深圳市南山邮局南油分局集散中心。',
        '百世物流已揽件',
      ],
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(this.data.orderStatus)
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '15018504589' //仅为示例，并非真实的电话号码
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