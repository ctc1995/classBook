// pages/coupon/coupon.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    tabList: [
      {
        "tabId": "keyong",
        "tabName": "可用",
      },
      // {
      //   "tabId": "dailingqu",
      //   "tabName": "待领取"
      // },
      {
        "tabId": "bukeyong",
        "tabName": "不可用"
      }
    ],
    curTabId: 'keyong',
    coupon: {
      already_use: [],
      already_expire: [],
      not_use: []
    },
      // {
      //   couponId: 1,
      //   title: "活动优惠券",
      //   money: "20",
      //   condition: "100",
      //   validityStart: "2019/11/10",
      //   validityEnd: "2019/11/11",
      //   status: 0
      // },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel(), self = this;
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      self.setData({
        isUse: data.isUse,
        totalPrice: data.totalPrice
      })
    })
    app.request.getCoupon().then(res=>{
      console.log(res);
      this.setData({
        'coupon.already_use': res.data.already_use,
        'coupon.already_expire': res.data.already_expire,
        'coupon.not_use': res.data.not_use,
      })
    })
  },

  // 切换TabNav事件
  changeTabNav: function (e) {
    this.setData({
      curTabId: e.detail.tabId
    })
  },
  // 选择优惠券
  chooseCoupon: function(e){
    console.log(e);
    const eventChannel = this.getOpenerEventChannel(), couponItem = e.currentTarget.dataset.item
    if (+couponItem.coupon.where_order_price > this.data.totalPrice) {
      wx.showToast({
        title: '订单未达到优惠卷使用条件',
        icon: 'none'
      })
      return false;
    }
    eventChannel.emit('acceptDataFromOpenedPage', couponItem);
    wx.navigateBack()
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