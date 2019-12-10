// pages/invite/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: '28_4iUlOL04D0LYw_jnuhNMIuBt6WaipcCmd0dunRVk0pSy4ZageGG83nX6LzvvX-2KQbTaxGmZElm3TAiD3WG98kWtve1dGRbFkAmZyOSDEBePvh2Js4WdCZjqYLIvRHflvSScqtUhntu9K-jYTPFdAAALHX'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + self.access_token,
      data: {
        access_token: self.access_token,
        scene: 'ovwpL5MOUPrgYeD0HWLmt6pKq2PM'
      },
      method: 'POST',
      success(res){
        console.log(res);
      },
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