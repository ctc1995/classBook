// pages/about/about.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      "name": '岂止年少,也是有为',
      "phone": null,
    },
    about:{},
    urlList:[
      {
        "icon": 'book-shelf.png',
        "title": '我的书架',
        "href": '../bookshelf/bookshelf'
      },
      {
        "icon": 'coupon.png',
        "title": '我的优惠',
        "href": '../coupon/coupon'
      },
      {
        "icon": 'task.png',
        "title": '任务中心',
        "href": '../mission/mission'
      },
      {
        "icon": 'setting.png',
        "title": '收货地址',
        "href": '../address/address'
      },
      {
        "icon": 'aboutme.png',
        "title": '关于我们',
        "href": '../aboutMe/aboutMe'
      },
    ],
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
    app.request.getAbout().then(res => {
      console.log(res);
      this.setData({
        about: res.data
      })
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