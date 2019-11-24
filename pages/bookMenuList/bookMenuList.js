// pages/bookMenuList.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 推荐书单
    recommendList: [
      {
        bookId: 1,
        pic: "book.png",
        title: "传奇，独自从矿山中走出",
        like: true,
        likeCount: 10000,
      },
      {
        bookId: 2,
        pic: "book.png",
        title: "心通万古，踏上了一条传奇之路",
        like: false,
        likeCount: 10000,
      },
      {
        bookId: 3,
        pic: "book.png",
        title: "宇文轩，武当山上一名杰出的道教弟子",
        like: true,
        likeCount: 10000,
      },
      {
        bookId: 4,
        pic: "book.png",
        title: "宇文轩，武当山上一名杰出的道教弟子",
        like: true,
        likeCount: 10000,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    app.request.getBookList().then(res=>{
      self.setData({
        recommendList: res.data.data
      })
    })
  },

  // 进入书单
  goBookMenu(e) {
    console.log(e.currentTarget.dataset.item)

    var self = this;
    wx.navigateTo({
      url: '../bookMenu/bookMenu?bookMenuId=' + e.currentTarget.dataset.item.id,
      success: function (res) {
        res.eventChannel.emit("acceptbookMenu", e.currentTarget.dataset.item)
      }
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