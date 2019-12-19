// pages/inviteHistory/inviteHistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invite:{
      "invitation": [
        {
          'username': '袁敏',
          'mobile': '13640978507',
          'add_time': '2019-6-4 23:23:32',
        },
        {
          'username': '袁敏',
          'mobile': '13640978507',
          'add_time': '2019-6-4 23:23:32',
        }],
      "invita_total_num": "10",
      "invita_success_num": "4",
      'exchange_total_num':'3',
      'exchange_num':'3',
      'admin_count_give':'3',
      'admin_max_receive':'3',
      "user_exchange":[
        {
          'user_id': 1,
          'goods_id': 3,
          'title': '手机',
          'add_time': '2019-6-7 12:34:22',
          'status': 1
        },
        {
          'user_id': 1,
          'goods_id': 3,
          'title': '手机',
          'add_time': '2019-6-7 12:34:22',
          'status': 1
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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