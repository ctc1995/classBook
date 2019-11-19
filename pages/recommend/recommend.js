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
    type: ''
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
    const eventChannel = this.getOpenerEventChannel(), self = this;
    eventChannel.on('sendData', function (data) {
      console.log(data)
      self.setData({
        title: '分类-' + data.name,
        bookClass: data.items
      })
    })

    this.setData({
      type: options.type
    })
    // 好书推荐
    this.getGoodsRecommend(options.type, 10, 1)
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
      this.setData({
        goodList: res.data.data
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
        title = self.data.title;
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