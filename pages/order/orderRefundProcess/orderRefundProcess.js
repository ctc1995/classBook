// pages/order/orderRefundProcess/orderRefundProcess.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyGoodsList: [],
    orderStatus: {},
    orderInfo: {
      id: 20191023008912,
      status: 6,
      // 退款费用
      money: '776.00',
      // 申请时间
      ctime: new Date().toLocaleString(),
      // 退款时间
      rtime: new Date().toLocaleString(),
      // 自动处理时间
      atime: new Date().getTime()+100000000,
      // 退款原因
      info: '不想要了。',
      tuihuo:{
        name: '张三丰',
        phone: '15800808080',
        address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
      }
    },
    tuihuo:{},
    countDown: '',
    process:{
      5:{
        title: "您已成功发起退款申请，请耐心等待商家处理",
        content: [
          "商家同意或者超时未处理，系统将退款给您", 
          "如果被拒绝，您可以联系客服，客服将会为您处理"
        ]
      },
      6: {
        title: "商家已同意退货申请，请尽早退货",
        content: [
          "未与商家协商一致，请勿使用到付或平邮，以免商家拒签货物",
          "交易的钱款还在平台中间账户，确保您的资金安全",
          "请填写真实物流信息，逾期未填写，退货申请将撤销",
        ]
      }
    },
    receiptInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel(), self = this;
    eventChannel.on('acceptOrder', function (data) {
      console.log(data);
      data.orderaftersale.status = '7-' + data.orderaftersale.status
      if(data.company) {
        self.setData({
          tuihuo: {
            name: data.company.warehouse_name,
            phone: data.company.phone,
            address: `${data.company.province_name}${data.company.city_name}${data.company.exparea_name}${data.company.address}`
          }
        })
      }
      self.setData({
        receiptInfo: data.orderaftersale,
        buyGoodsList: [data]
      })
    })
    // this.setData({
    //   "orderInfo.id": options.id
    // })
    // app.request.getOrderDetail(options.id, 1).then(res=>{
    //   console.log(res);
    // })
  },
  // 撤销售后
  cancel(){
    const self = this;
    console.log(self.data.receiptInfo);
    wx.showModal({
      content: '撤销售后申请',
      success(res) {
        if (res.confirm) {
          app.request.aftersaleCancel(self.data.receiptInfo.id).then(res => {
            console.log(res);
            wx.showToast({
              title: res.msg,
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 2
              })
            }, 1500);
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  // 物流登记
  logis(){
    console.log('logis');
    const self = this;
    wx.navigateTo({
      url: `../orderRefunding/orderRefunding?status=99&id=${this.data.receiptInfo.id}&oid=${this.data.buyGoodsList[0].order_id}`,
      success: function (res) {
        res.eventChannel.emit("acceptOrder", self.data.buyGoodsList[0])
      }
    })
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: wx.getStorageSync('phone')
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
    var countDownInterval = setInterval(function(){
      var countDown = '', restSec = (self.data.orderInfo.atime - new Date().getTime()) / 1000;
      if(restSec<0){
        clearInterval(countDownInterval);
        self.setData({
          countDown: '已完成'
        })
        return;
      }
      var day = parseInt(restSec / (3600 * 24));
      var hour = parseInt(restSec / 3600 % 24);
      var minu = parseInt(restSec / 60 % 60);
      var sec = parseInt(restSec % 60);
      countDown = `${day}天${hour}时${minu}分${sec}秒`;
      self.setData({
        countDown: countDown
      })
    },1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      orderStatus: app.globalData.orderStatus
    })
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
    // app.request.getOrderDetail(this.data.orderInfo.id, 1).then(res => {
    //   console.log(res);
    // })
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