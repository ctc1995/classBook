// pages/bookMenu.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookMenu:{
      id: 1008,
      title: '典书书单',
      info: '很多人追求财务自由，其实就是因为缺少对生活的掌控能力，让自己陷入生活的重压，那么要怎么样提高我们对生活的掌控力呢？',
      like: true,
      likeCount: 29090,
      shareCount: 2883
    },
    // 好书推荐
    goodList:[
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this, appInstance = getApp();
    if (options.bookMenuId) {
      app.request.getBookListDetail(options.bookMenuId).then(res => {
        console.log(res);
        self.setData({
          goodList: res.data
        })
      })
    } else if (options.type) {
      switch (options.type) {
        case '0':
          app.request.getHotlist({page:1, number:999}).then(res => {
            console.log(res);
            self.setData({
              goodList: res.data.data,
              "bookMenu.title": '热销榜'
            })
          })
          break;
        case '1':
          app.request.getCollectionlist({page:1, number:999}).then(res => {
            console.log(res);
            self.setData({
              goodList: res.data.data,
              "bookMenu.title": '收藏榜'
            })
          })
          break;
        case '2':
          app.request.getHotsearchlist({page:1, number:999}).then(res => {
            console.log(res);
            self.setData({
              goodList: res.data.data,
              "bookMenu.title": '热搜榜'
            })
          })
          break;
      }
    }
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
    setTimeout(() => { wx.stopPullDownRefresh(); }, 1000)
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