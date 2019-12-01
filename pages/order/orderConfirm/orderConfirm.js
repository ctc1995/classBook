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
    // 优惠券id
    coupon_id: '',
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
  // 选择优惠券
  chooseCoupon() {
    const self = this;
    wx.navigateTo({
      url: '../../coupon/coupon',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          app.request.buyCart(self.data.ids, data.id).then(res => {
            console.log(res);
            self.setData({
              coupon_id: data.id
            })
            res.data.payment_list.map(item => {
              if (item.payment == 'Weixin') {
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
      coupon_id: this.data.coupon_id,
      user_note: this.data.remakes
    }
    app.request.buyAdd(orderObj).then(res=>{
      console.log(res);
      let orderInfo = res.data.order;
      wx.request({
        url: app.request.payOrder(orderInfo.id, orderInfo.payment_id),
        method: "POST",
        data: {
          id: orderInfo.id,
          payment_id: orderInfo.payment_id,
        },
        dataType: "json",
        success: res => {
          wx.hideLoading();
          console.log(res);
          if (res.data.code == 0) {
            wx.requestPayment({
              timeStamp: res.data.data.timeStamp,
              nonceStr: res.data.data.nonceStr,
              package: res.data.data.package,
              signType: res.data.data.signType,
              paySign: res.data.data.paySign,
              success: function (res) {
                console.log(res);
                // 数据设置
                orderInfo['status'] = 2;
                orderInfo['status_name'] = '待发货';
                wx.redirectTo({
                  url: '../orderReceipt/orderReceipt?id=' + orderInfo.id,
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: "支付失败",
                  icon: 'none',
                  complete(){
                    wx.redirectTo({
                      url: '../orderReceipt/orderReceipt?id=' + orderInfo.id,
                    })
                  }
                })
              }
            });
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
        },
        fail: () => {
          wx.hideLoading();
          wx.showToast({
            title: "服务器请求出错",
          })
        }
      });
    }).catch(error=>{
      wx.showToast({
        title: '下单失败，请重试',
        icon: 'none'
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