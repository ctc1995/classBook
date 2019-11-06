// pages/order/orderManager/orderManager.js
var _MD = require('../../../mock/mock-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        "tabId": "all",
        "tabName": "全部"
      },{
        "tabId": "pendPay",
        "tabName": "待付款",
      },
      {
        "tabId": "paid",
        "tabName": "已付款"
      },
      {
        "tabId": "arrived",
        "tabName": "已收货"
      },
      {
        "tabId": "refund",
        "tabName": "退款/售后"
      }
    ],
    curTabId: "all",
    orderStatus: {},
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(_MD);
    var appInstance = getApp()
    this.setData({
      orderStatus: appInstance.globalData.orderStatus,
      orderList: _MD.allOrderList
    })
  },

  // 切换TabNav事件
  changeTabNav: function (e) {
    var orderListKey = e.detail.tabId + 'OrderList';
    this.setData({
      curTabId: e.detail.tabId,
      orderList: _MD[orderListKey]
    })
    console.log(this.data.orderList);
  },
  // 订单详情
  detail(){
    console.log('detail')
  },
  // 立即支付
  toPaid() {
    var self = this;
    wx.navigateTo({
      url: '../orderReceipt/orderReceipt',
      success: function (res) {
        res.eventChannel.emit("acceptBuyGoodsList", self.data.orderList)
      }
    })
  },
  // 提醒发货
  remind(){
    console.log('已提醒')
  },
  // 查看物流
  logistics(){
    console.log('logistics')
  },
  // 取消订单
  cancel(){
    console.log('cancel')
  },
  // 申请退货
  refund() {
    var self = this;
    wx.navigateTo({
      url: '../orderRefunding/orderRefunding',
      success: function (res) {
        res.eventChannel.emit("acceptBuyGoodsList", self.data.orderList)
      }
    })
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