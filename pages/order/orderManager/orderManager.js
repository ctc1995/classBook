// pages/order/orderManager/orderManager.js
var _MD = require('../../../mock/mock-data.js')
var app = new getApp();
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
        "tabName": "已完成"
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
    curOrderId: null,
    topTips: '',
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appInstance = getApp(), self = this;
    this.setData({
      // orderStatus: appInstance.globalData.orderStatus,
      // orderList: _MD.allOrderList,
      curTabId: options.type,
      curTabIndex: options.index,
      orderList: []
    })
    if (options.type != 'all'){
      this.changeTabNav({ detail: { tabId: options.type } })
    } else {
      app.request.getOrderIndex({ type: 'all' }).then(res => {
        self.setData({
          orderList: res.data.data
        })
      })
    }
  },
  /**
   * TODO：
   * 整体订单流程未完成
   */
  tapDialogButton: function(e){
    const that = this;
    if (e.detail.index) {
      console.log(that.data.curOrderId)
      app.request.cancelOrder(that.data.curOrderId).then(res => {
        if (res.code == 0) {
          that.setData({
            topTips: res.msg
          })
        } else {
          that.setData({
            topTipse: res.msg
          })
        }
        that.setData({
          dialogShow: false,
          curOrderId: null
        })
        that.onload();
      })
    } else {
      that.setData({
        dialogShow: false
      })
    }
  },
  // 切换TabNav事件
  changeTabNav: function (e) {
    var orderListKey = e.detail.tabId + 'OrderList', status= null, self=this;
    this.setData({
      curTabId: e.detail.tabId,
      curTabIndex: e.detail.tabIndex,
      orderList: []
      // orderList: _MD[orderListKey]
    })
    switch (e.detail.tabId) {
      case 'pendPay':
        status = 1;
        break;
      case 'paid':
        status = 2;
        break;
      case 'arrived':
        status = 4;
        break;
      case 'refund':
        status = 7;
        break;
    }
    if (status == 2) {
      app.request.getOrderIndex({page:1, status: 2}).then(res => {
        // let orderList = self.data.orderList;
        self.setData({
          orderList: self.data.orderList.concat(res.data.data)
        })
      })
      app.request.getOrderIndex({ page: 1, status: 3 }).then(res => {
        // let orderList = self.data.orderList;
        self.setData({
          orderList: self.data.orderList.concat(res.data.data)
        })
      })
    } else if(status == 7) {
      app.request.getOrderAftersaleList(1).then(res => {
        let oL = [];
        res.data.map(item=>{
          oL.push(item.order_data)
        })
        self.setData({
          orderList: oL
        })
      })
    } else {
      app.request.getOrderIndex({ page: 1, status }).then(res => {
        self.setData({
          orderList: res.data.data
        })
      })
    }
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
    this.setData({
      topTips: '已提醒,将尽快为您发货！'
    })
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
  // 确认收货
  collect(e) {
    var orderIndex = e.currentTarget.dataset.index, self = this;
    wx.showModal({
      content: '确认收货',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          app.request.orderCollect(self.data.orderList[orderIndex].id).then(res=>{
            console.log(res);
            wx.showToast({
              title: res.msg,
            })
            self.onLoad()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 取消订单
  cancel(e){
    this.setData({
      dialogShow: true,
      curOrderId: e.currentTarget.dataset.index
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