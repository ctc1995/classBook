// pages/discovery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{
      picUrl: [],
      price: 999.99,
      realPrice: 399.99,
      title: '我是个年轻人，我的脾气不太好',
      auth: '金庸',
      publicHome: '全球国际-联合出版社出版',
      publicTime: '2010-09-16',
      buildType: '平装',
      server: [1,2],
      ID: '10010',
      type: 'wenxue',
      buyTime: '2018-09-09',
      format: '32',
    },
    goodsServer: [
      {
        "icon": '',
        "name": '消毒清洁'
      },
      {
        "icon": '',
        "name": '官方自营'
      },
    ],
    goodsType:{
      "wenxue":"文学"
    }
  },

  swiperChange: function (e) {
    this.setData({
      current: e.detail.current
    })
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