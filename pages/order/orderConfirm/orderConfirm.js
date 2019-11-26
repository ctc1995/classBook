// pages/order/orderConfirm/orderConfirm.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单备注
    remakes: '',
    // 订单基础信息
    base: {},
    // 订单运费信息
    extension_data: {},
    // 订单商品信息
    goods_list: [],
    // 商品的购物车id合集
    ids: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    var self = this;
    eventChannel.on('acceptBuyGoodsList', function (data) {
      console.log(data);
      self.setData({
        ids: data,
      })
      app.request.buyCart(data).then(res=>{
        console.log(res);
        res.data.payment_list.map(item=>{
          if (item.payment == 'Weixin'){
            self.setData({
              payment_id: item.id
            })
          }
        })
        self.setData({
          base: res.data.base,
          extension_data: res.data.extension_data,
          goods_list: res.data.goods_list,
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  
  bindKeyRemakes(e){
    this.setData({
      remakes: e.detail.value
    })
  },
  changeAddress(){
    const self=this;
    wx.navigateTo({
      url: '../../address/address',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          self.setData({
            'base.address': data
          })
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', true)
      }
    })
  },
  // 调起微信支付
  buy(){
    var self = this;
    let orderObj = { 
      address_id: this.data.base.address.id,
      ids: this.data.ids,
      payment_id: this.data.payment_id,
      // coupon_id,
      user_note: this.data.remakes
    }
    app.request.buyAdd(orderObj).then(res=>{
      console.log(res);
      app.request.payOrder(res.data.order.id).then(res=>{
        if(res.code == 0){
          // 支付成功或者取消支付再跳转
          wx.navigateTo({
            url: '../orderReceipt/orderReceipt',
            success: function (res) {
              res.eventChannel.emit("acceptBuyGoodsList", self.data.buyGoodsList)
            }
          })
        }
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