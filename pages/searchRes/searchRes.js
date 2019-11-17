// pages/searchRes/searchRes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel(), self = this;
    eventChannel.on('sendSearchData', function (data) {
      console.log(data)
      self.setData({
        goodList: data.data
      })
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