// pages/order/orderConfirm/orderConfirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyGoodsList: [{
      auth: "金庸",
      bookId: 2,
      pic: "book.jpg",
      price: "558.00",
      rate: 8.7,
      realPrice: "388.00",
      remind: false,
      sel: true,
      stock: 20,
      sum: 1,
      title: "我是个年轻人，我的脾气不太好",
    }, {
        auth: "金庸",
        bookId: 2,
        pic: "book.jpg",
        price: "558.00",
        rate: 8.7,
        realPrice: "388.00",
        remind: false,
        sel: true,
        stock: 20,
        sum: 1,
        title: "我是个年轻人，我的脾气不太好",
      }],
    remakes: '',
    totalMoney: 0,
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
    // const eventChannel = this.getOpenerEventChannel();
    // var self = this;
    // eventChannel.on('acceptBuyGoodsList', function (data) {
    //   self.setData({
    //     buyGoodsList: data
    //   })
    // })
    console.log(this.data.buyGoodsList)
  },
  
  bindKeyRemakes(e){
    this.setData({
      remakes: e.detail.value
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