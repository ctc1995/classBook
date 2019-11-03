// pages/order/orderRefundProcess/orderRefundProcess.js
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
    countDown: '',
    process:{
      5:{
        title: "您已成功发起退款申请，请耐心等待商家处理",
        content: [
          "商家同意或者超时未处理，系统将退款给您", 
          "如果商家拒绝，您可以修改退款申请后再次发起，商家会重新处理"
        ]
      },
      6: {
        title: "商家已同意退货申请，请尽早退货",
        content: [
          "未与商家协商一致，请勿使用到付或平邮，以免商家拒签货物",
          "交易的钱款还在平台中间账户，确保您的资金安全",
          "请填写真实物流信息，逾期未填写，退货申请将撤销",
          "平台提供官方寄件服务（上门取件），退货有保障",
        ]
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  callPhone() {
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