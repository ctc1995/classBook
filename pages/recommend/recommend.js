// pages/recommend/recommend.js
const app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '典书',
    // 全部分类
    bookClass: [],
    goodList: [],
    // 分类面板
    showClassPanel: false,
    // 推荐类型
    type: 'is_home_recommended',
    page: 1,
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
    if (options.type){
      this.setData({
        type: options.type
      })
      this.getGoodsRecommend(options.type, 10, this.data.page)
    } else {
      const eventChannel = this.getOpenerEventChannel(), self = this;
      eventChannel.on('sendData', function (data) {
        self.setData({
          title: '分类-' + data.name,
          bookClass: data.items
        })
        app.request.getGoodsCategoryList(data.id).then(res=>{
          self.setData({
            goodList: res.data.data
          })
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  checkClass: function (e) {
    console.log(e.currentTarget.dataset.item);
  },
  getGoodsRecommend: function(type, number, page){
    const self = this;
    app.request.getGoodsRecommend({
      type: type || self.data.type,
      number,
      page
    }).then(res => {
      console.log(res);
      if (res.data.data.length == 0) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
      }
      this.setData({
        goodList: self.data.goodList.concat(res.data.data),
        page: self.data.page+1
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var title = '', self=this;
    switch (this.data.type) {
      case 'new_upper':
        title = "最新上架";
        break;
      case 'recommended_daily':
        title = "每日推荐";
        break;
      case 'rare_treasures':
        title = "珍品孤本";
        break;
      default:
        title = "好书推荐";
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
    this.setData({
      page: 1
    })
    this.onLoad(this.data.type)
    setTimeout(() => { wx.stopPullDownRefresh(); }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getGoodsRecommend(this.data.type, 10, this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})