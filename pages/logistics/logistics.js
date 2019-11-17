// pages/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    logistics: {
      "state": "0", //0在途，1揽收，2疑难，3签收，4退签，5派件，6退回
      "com": "圆通快递",
      "nu": "V030344422",
      "data": [
        {
          "context": "上海分拨中心/装件入车扫描 ",
          "ftime": "2019-08-28 16:33:19",
        },
        {
          "context": "上海分拨中心/下车扫描 ",
          "ftime": "2019-08-27 23:22:42",
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