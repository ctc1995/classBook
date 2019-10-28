// pages/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 全部分类
    bookClass: [
      {
        id: 1,
        name: '明国旧书',
        sel: false
      },
      {
        id: 2,
        name: '名人墨迹',
        sel: false
      },
      {
        id: 3,
        name: '外文原版',
        sel: true
      },
      {
        id: 4,
        name: '线装古籍',
        sel: false
      },
    ],
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
    // 分类面板
    showClassPanel: false,
    // 推荐类型
    type: 'new'
  },
  
  toggleClassPanel: function(){
    this.setData({
      showClassPanel : !this.data.showClassPanel
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
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
    var title = '';
    switch (this.data.type) {
      case 'new':
        title = "最新上架";
        break;
      case 'day':
        title = "每日推荐";
        break;
      case 'collection':
        title = "珍藏孤本";
        break;
      default:
        title = "典书";
        break;
    }
    wx.setNavigationBarTitle({
      title
    })
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