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
    ref: null,
    // 轮播图片
    swiperPics: [],
    // swiperPics: ['swiper.png', 'swiper.png','swiper.png'],
    // 当前选中图片
    current: 0,
    // 导航信息
    navBar: [{
        icon: "new2x.png",
        label: "最新上架",
        href: "../recommend/recommend?type=new_upper"
      },
      {
        icon: "recommend2x.png",
        label: "每日推荐",
        href: "../recommend/recommend?type=recommended_daily"
      },
      {
        icon: "collection2x.png",
        label: "珍品孤本",
        href: "../recommend/recommend?type=rare_treasures"
      },
      {
        icon: "all2x.png",
        label: "全部分类",
        href: "../allClass/allClass"
      },
    ],
    // 推荐书单
    recommendList: [],
    // 好书推荐
    goodList: [],
    // 加载页数
    page: 1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ref: options.ref
    })
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
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.pageInit();
        }
      }
    })
    console.log(this.data.userInfo);
  },
  pageInit: function () {
    var self = this;
    // Banner
    app.request.getBanner().then(res => {
      console.log(res);
      self.setData({
        swiperPics: res.data
      })
    })
    // 推荐书单
    app.request.getRecommendedlist({
      number: 3,
      page: 1
    }).then(res=>{
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
      page: self.data.page
    }).then(res=>{
      console.log(res);
      this.setData({
        goodList: res.data.data,
        page: self.data.page+1
      })
    })
    
  },
  getUserInfo: function(e) {
    console.log(e)
    this.pageInit();
    wx.showTabBar();
    app.globalData.userInfo = e.detail.userInfo
    app.request.getUserInfo({
      openid: wx.getStorageSync('openid'),
      encrypted_data: e.detail.encryptedData,
      iv: e.detail.iv,
      referrer: this.data.ref,
    }).then(res => {
      wx.setStorageSync('token', res.data.token)
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  swiperChange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },
  // 进入书单
  goBookMenu(e){
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
    app.request.addCart({ goods_id: e.currentTarget.dataset.book.id}).then(res=>{
      console.log(res);
      wx.showToast({
        title: res.msg,
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    try {
      var value = wx.getStorageSync('cartNum')
      if (value) {
        wx.setTabBarBadge({//tabbar右上角添加文本
          index: 2, ////tabbar下标
          text: value.toString()	//显示的内容
        })
      } else {
        wx.removeTabBarBadge({ index: 2 })
      }
    } catch (e) {
      // Do something when catch error
    }
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
  onPullDownRefresh: function() {
    this.setData({
      page: 1
    })
    this.onLoad({});
    setTimeout(() => { wx.stopPullDownRefresh();},1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const self = this;
    app.request.getGoodsRecommend({
      // type: 'recommended_daily',
      type: 'is_home_recommended',
      number: 10,
      page: self.data.page
    }).then(res => {
      if (res.data.data.length == 0) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
      }
      self.setData({
        goodList: self.data.goodList.concat(res.data.data),
        page: self.data.page + 1
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})