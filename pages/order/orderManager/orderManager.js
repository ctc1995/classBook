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
    curTabId: "",
    curTabIndex: 0,
    orderStatus: {},
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appInstance = getApp()
    this.setData({
      orderStatus: appInstance.globalData.orderStatus,
      orderList: _MD.allOrderList,
      curTabId: options.type,
      curTabIndex: options.index
    })
    this.changeTabNav({detail:{tabId:options.type}})
  },

  // 切换TabNav事件
  changeTabNav: function (e) {
    var orderListKey = e.detail.tabId + 'OrderList';
    this.setData({
      curTabId: e.detail.tabId,
      curTabIndex: e.detail.tabIndex,
      orderList: _MD[orderListKey]
    })
  },
  // 订单详情
  detail(e){
    var self = this, orderIndex = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../orderReceipt/orderReceipt',
      success: function (res) {
        res.eventChannel.emit("acceptOrder", self.data.orderList[orderIndex])
      }
    })
  },
  // 立即支付
  toPaid(e) {
    var orderIndex = e.currentTarget.dataset.index;
    var self = this;
    wx.navigateTo({
      url: '../orderReceipt/orderReceipt',
      success: function (res) {
        res.eventChannel.emit("acceptOrder", self.data.orderList[orderIndex])
      }
    })
  },
  // 提醒发货
  remind(e){
    var orderIndex = e.currentTarget.dataset.index;
    console.log('已提醒')
  },
  // 查看物流
  logistics(e){
    var orderIndex = e.currentTarget.dataset.index;
    var self = this;
    wx.navigateTo({
      url: '../orderReceipt/orderReceipt',
      success: function (res) {
        res.eventChannel.emit("acceptOrder", self.data.orderList[orderIndex])
      }
    })
  },
  // 取消订单
  cancel(e){
    var orderIndex = e.currentTarget.dataset.index;
    console.log('cancel')
  },
  // 申请退货
  refund(e) {
    var orderIndex = e.currentTarget.dataset.index;
    var self = this;
    wx.navigateTo({
      url: '../orderRefunding/orderRefunding',
      success: function (res) {
        res.eventChannel.emit("acceptOrder", self.data.orderList[orderIndex])
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