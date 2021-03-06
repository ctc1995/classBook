// pages/allClass/allClass.js
const app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allClassList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    app.request.getGoodsCategory({
      type: 'rare_treasures'
    }).then(res => {
      console.log(res)
      self.setData({
        allClassList: res.data
      })
    })
  },
  navToList: function(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/recommend/recommend',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendData', e.currentTarget.dataset.item)
      }
    })
    // '../../pages/bookMenu/bookMenu?{{item.id}}'
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