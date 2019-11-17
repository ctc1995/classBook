// pages/discovery.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{
      picUrl: ['swiper.png', 'book.png', 'swiper.png'],
      realPrice: 399.99,
      price: 999.99,
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
    // 相关推荐
    goodList: [
      {
        bookId: 1,
        pic: 'book.jpg',
        title: '我是个年轻人，我的脾气不太好',
        auth: '金庸',
        rate: 8.7,
        realPrice: "388.00",
        price: "558.00"
      },
      {
        bookId: 2,
        pic: 'book.jpg',
        title: '我是个年轻人，我的脾气不太好',
        auth: '金庸',
        rate: 8.7,
        realPrice: "388.00",
        price: "558.00"
      },
    ],
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
    },
    region: ['', '', ''],
  },

  swiperChange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.bookId)
    app.request.getGoodsDetail(options.bookId).then(res=>{
      console.log(res);
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