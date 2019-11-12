// pages/bookshelf/bookshelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        "tabId": "shoucang",
        "tabName": "收藏",
      },
      {
        "tabId": "maiguo",
        "tabName": "买过"
      }
    ],
    curTabId: 'shoucang',
    buySCGoodsList: [
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      },
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      }
    ],
    buyMGGoodsList: [
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      },
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      },
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      },
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      },
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      },
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      },
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      },
      {
        bookId: 2,
        title: "我是个年轻人，我的脾气不太好",
        auth: "金庸",
        pic: "book.jpg",
        price: "558.00",
        realPrice: "388.00",
        rate: 8.7,
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 切换TabNav事件
  changeTabNav: function (e) {
    this.setData({
      curTabId: e.detail.tabId
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