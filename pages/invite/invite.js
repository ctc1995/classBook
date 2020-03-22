// pages/invite/invite.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 推广二维码地址
    imgUrl: '',
    // 成功邀请数
    invitaSuccessNum: 0,
    // 兑换数
    exchangeTotalNum: 0
  },

  // 立即邀请
  invite: function () {
    app.request.inviteCode().then(res=>{
      let imgUrl = res.replace('"', '').replace(/[\\]/g, '');
      this.setData({
        imgUrl,
      })
      wx.navigateTo({
        url: '../inviteImg/inviteImg?inviteImg=' + imgUrl,
        // success: function (res) {
        //   res.eventChannel.emit("acceptbookMenu", e.currentTarget.dataset.item)
        // }
      })
      console.log(res.replace('"', '').replace(/[\\]/g, ''));
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    app.request.invitation().then(res=>{
      self.setData({
        invitaSuccessNum: res.data.invita_success_num,
        exchangeTotalNum: res.data.exchange_total_num
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