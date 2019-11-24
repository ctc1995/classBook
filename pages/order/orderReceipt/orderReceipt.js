// pages/order/orderReceipt/orderReceipt.js
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
      delivery: {
        name: '张三丰',
        phone: '18977837849',
        address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
      },
      status: 1,
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
      logistics:[
        '下一站,深圳市南山邮局南油分局集散中心。',
        '百世物流已揽件',
      ],
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    var self = this, appInstance = getApp();
    eventChannel.on('acceptOrder', function (data) {
      console.log(data);
      app.request.orderLogistics(data.express_id, data.express_number).then(res => {
        data.logistics = res.Traces.reverse()
        self.setData({
          orderInfo: data,
          buyGoodsList: data.items,
          orderStatus: appInstance.globalData.orderStatus
        })
      })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  // 拨打电话
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.orderInfo.receive_tel //仅为示例，并非真实的电话号码
    })
  },
  // 申请退货
  refund(){
    var self = this;
    wx.navigateTo({
      url: '../orderRefunding/orderRefunding',
      success: function (res) {
        res.eventChannel.emit("acceptOrder", self.data.buyGoodsList)
      }
    })
  },
  //调起支付
  buy(){
    
  },
  // 查看物流
  goLogi(){
    wx.navigateTo({
      url: '../../logistics/logistics?id=' + this.data.orderInfo.express_id + '&number=' + this.data.orderInfo.express_number + '&name=' + this.data.orderInfo.express_name + '&address=' + this.data.orderInfo.receive_province_name + this.data.orderInfo.receive_city_name + this.data.orderInfo.receive_county_name + this.data.orderInfo.receive_address
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