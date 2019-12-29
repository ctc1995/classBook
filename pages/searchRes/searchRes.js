// pages/searchRes/searchRes.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList: [],
    keywords: '',
    more: true,
    page: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel(), self = this;
    eventChannel.on('sendSearchData', function (data) {
      console.log(data)
      self.setData({
        goodList: data.data,
        keywords: data.keywords
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
    const self = this;
    app.request.getSearch({
      number: 20,
      page: self.data.page,
      keywords: self.data.keywords
    }).then(res => {
      if (res.data.data.length == 0) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
        return;
      }
      self.setData({
        goodList: self.data.goodList.concat(res.data.data),
        page: self.data.page + 1
      })
      console.log(res);
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})