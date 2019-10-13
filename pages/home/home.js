// pages/home.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 轮播图片
    swiperPics: ['swiper.png', 'swiper.png','swiper.png'],
    // 当前选中图片
    current: 0,
    // 导航信息
    navBar: [
      {
        icon: "new2x.png",
        label: "最新上架",
        href: "../logs/logs"
      },
      {
        icon: "recommend2x.png",
        label: "每日推荐",
        href: "../logs/logs"
      },
      {
        icon: "collection2x.png",
        label: "珍品孤本",
        href: "../logs/logs"
      },
      {
        icon: "all2x.png",
        label: "全部分类",
        href: "../logs/logs"
      },
    ],
    // 推荐书单
    recommendList: [
      {
        bookId: 1,
        pic: "book.png",
        title: "传奇，独自从矿山中走出",
        like: true,
        likeCount: 10000,
      },
      {
        bookId: 2,
        pic: "book.png",
        title: "心通万古，踏上了一条传奇之路",
        like: false,
        likeCount: 10000,
      },
      {
        bookId: 3,
        pic: "book.png",
        title: "宇文轩，武当山上一名杰出的道教弟子",
        like: true,
        likeCount: 10000,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  swiperChange: function (e) {
    this.setData({
      current: e.detail.current
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