// pages/discovery.js
const app = new getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        "tabId": "rank",
        "tabName": "排行榜",
      },
      {
        "tabId": "auth",
        "tabName": "作者"
      }
    ],
    curTabId: "rank",
    rankList: [
      {
        "image": "hot-shop.png",
        "list": [
          {
            "id": 10,
            "name": "我和我的祖国",
          },
          {
            "id": 11,
            "name": "基督山伯爵",
          },
          {
            "id": 12,
            "name": "时间简史",
          },
        ]
      },
      {
        "image": "hot-like.png",
        "list": [
          {
            "id": 10,
            "name": "我和我的祖国",
          },
          {
            "id": 11,
            "name": "基督山伯爵",
          },
          {
            "id": 12,
            "name": "时间简史",
          },
        ]
      },
      {
        "image": "hot-search.png",
        "list": [
          {
            "id": 10,
            "name": "我和我的祖国",
          },
          {
            "id": 11,
            "name": "基督山伯爵",
          },
          {
            "id": 12,
            "name": "时间简史",
          },
        ]
      },
    ],
    authList: [
      {
        "id": 0,
        "name": "大仲马大仲马大仲马大仲马",
        "image": "hot-shop.png",
        "likeCount": 29093,
        "like": true,
      },
      {
        "id": 1,
        "name": "刘慈溪",
        "image": "hot-shop.png",
        "likeCount": 29093,
        "like": false,
      },
      {
        "id": 2,
        "name": "莫言",
        "image": "hot-shop.png",
        "likeCount": 29093,
        "like": true,
      },
      {
        "id": 0,
        "name": "大仲马",
        "image": "hot-shop.png",
        "likeCount": 29093,
        "like": true,
      },
      {
        "id": 1,
        "name": "刘慈溪",
        "image": "hot-shop.png",
        "likeCount": 29093,
        "like": false,
      },
      {
        "id": 2,
        "name": "莫言",
        "image": "hot-shop.png",
        "likeCount": 29093,
        "like": true,
      },
      {
        "id": 0,
        "name": "大仲马",
        "image": "hot-shop.png",
        "likeCount": 29093,
        "like": true,
      },
      {
        "id": 1,
        "name": "刘慈溪",
        "image": "hot-shop.png",
        "likeCount": 29093,
        "like": false,
      },
      {
        "id": 2,
        "name": "莫言",
        "image": "hot-shop.png",
        "likeCount": 29093,
        "like": true,
      },
    ]
  },
  // 切换TabNav事件
  changeTabNav: function (e){
    this.setData({
      curTabId: e.detail.tabId
    })
    console.log(e.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  init: function () {
    const self = this;
    app.request.getHotsearchlist({}).then(res=>{
      console.log(res);
      self.setData({
        'rankList[2].list': res.data.data
      })
    })
    app.request.getCollectionlist({}).then(res=>{
      console.log(res);
      self.setData({
        'rankList[1].list': res.data.data
      })
    })
    app.request.getHotlist({}).then(res=>{
      console.log(res);
      self.setData({
        'rankList[0].list': res.data.data
      })
    })
    app.request.getAuthList({}).then(res=>{
      console.log(res);
      self.setData({
        authList: res.data.data
      })
    })
  },
  /**
   * 搜索作者
   */
  search: function (e) {
    const self = this;
    app.request.getAuthList({
      keyword: e.detail.value
    }).then(res => {
      self.setData({
        authList: res.data.data
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