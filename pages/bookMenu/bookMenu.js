// pages/bookMenu.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookMenu:{
      id: 1008,
      title: '提高自我掌控力的书籍',
      info: '很多人追求财务自由，其实就是因为缺少对生活的掌控能力，让自己陷入生活的重压，那么要怎么样提高我们对生活的掌控力呢？',
      like: true,
      likeCount: 29090,
      shareCount: 2883
    },
    // 好书推荐
    goodList:[
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
      {
        bookId: 2,
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this, appInstance = getApp();
    app.request.getBookListDetail(options.bookMenuId).then(res=>{
      console.log(res);
      self.setData({
        goodList: res.data
      })
    })
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptbookMenu', function (data) {
      console.log(data);
      self.setData({
        bookMenu: data
      })
    })
  },

  // 加购
  addShopCar(e) {
    console.log(e);
    app.request.addCart({ goods_id: e.currentTarget.dataset.book.id }).then(res => {
      console.log(res);
      wx.showToast({
        title: '加入购物车成功',
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