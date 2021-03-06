// pages/search/search.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 官方书单
    recommendList: [],
    // 好书推荐
    goodList: [],
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const self = this;
    // 推荐书单
    app.request.getRecommendedlist({
      number: 3,
      page: 1
    }).then(res => {
      console.log(res);
      self.setData({
        recommendList: res.data.data
      })
    })
    // 好书推荐
    app.request.getGoodsRecommend({
      // type: 'recommended_daily',
      type: 'is_home_recommended',
      number: 10,
      page: this.data.page
    }).then(res => {
      console.log(res);
      this.setData({
        goodList: self.data.goodList.concat(res.data.data),
        page: this.data.page+1
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
   * 搜索
   */
  search: function(e) {
    console.log(e.detail);
    app.request.getSearch({
      number: 20,
      page: 1,
      keywords: e.detail.value
    }).then(res => {
      console.log(res);
      let data = res.data.data;
      wx.navigateTo({
        url: '/pages/searchRes/searchRes',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('sendSearchData', {
            data,
            keywords: e.detail.value
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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
  onReachBottom: function() {
    app.request.getGoodsRecommend({
      // type: 'recommended_daily',
      type: 'is_home_recommended',
      number: 10,
      page: this.data.page
    }).then(res => {
      if (res.data.data.length == 0) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
        return;
      }
      this.setData({
        goodList: self.data.goodList.concat(res.data.data),
        page: this.data.page + 1
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})