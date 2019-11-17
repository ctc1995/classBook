// pages/search/search.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 官方书单
    bookList: [{
        id: 1,
        name: '职场必读'
      },
      {
        id: 2,
        name: '提高文学'
      },
      {
        id: 3,
        name: '放眼世界'
      },
      {
        id: 4,
        name: '管理必读'
      },
    ],
    // 好书推荐
    goodList: [{
        bookId: 1,
        pic: 'book.jpg',
        title: '我是个年轻人，我的脾气不太好',
        auth: '金庸',
        rate: 8.7,
        realPrice: "388.00",
        price: "558.00"
      },
      {
        bookId: 2,
        pic: 'book.jpg',
        title: '我是个年轻人，我的脾气不太好',
        auth: '金庸',
        rate: 8.7,
        realPrice: "388.00",
        price: "558.00"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 搜索
   */
  search: function(e) {
    console.log(e.detail);
    app.request.getSearch({
      number: 999,
      page: 1,
      keyword: e.detail.value
    }).then(res => {
      console.log(res);
      let data = res.data.data;
      wx.navigateTo({
        url: '/pages/searchRes/searchRes',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('sendSearchData', {
            data
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})