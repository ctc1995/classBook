// pages/bookshelf/bookshelf.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        "tabId": "shoucang",
        "tabName": "收藏",
      },
      {
        "tabId": "maiguo",
        "tabName": "买过"
      }
    ],
    curTabId: 'shoucang',
    buySCGoodsList: [],
    buyMGGoodsList: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    app.request.getBookBought(self.data.page).then(res=>{
      console.log(res);
      if(res.data.data.length != 0){
        self.setData({
          page: self.data.page+1,
          buyMGGoodsList: self.data.buyMGGoodsList.concat(res.data.data)
        })
      }
    })
    app.request.getUserGoodsFavor(self.data.page).then(res=>{
      console.log(res);
      if(res.data.data.length != 0){
        self.setData({
          page: self.data.page+1,
          buySCGoodsList: self.data.buySCGoodsList.concat(res.data.data)
        })
      }
    })
  },

  // 切换TabNav事件
  changeTabNav: function (e) {
    this.setData({
      curTabId: e.detail.tabId
    })
  },
  onParentEvent(){
    const self = this;
    app.request.getUserGoodsFavor().then(res => {
      console.log(res);
      wx.showToast({
        title: res.data.msg
      })
      self.setData({
        buySCGoodsList: res.data.data
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
    const self = this;
    if (this.data.curTabId == 'shoucang') {
      app.request.getUserGoodsFavor(self.data.page).then(res => {
        console.log(res);
        if (res.data.data.length == 0) {
          wx.showToast({
            title: '没有更多了',
          })
        } else {
          self.setData({
            page: self.data.page + 1,
            buySCGoodsList: self.data.buySCGoodsList.concat(res.data.data)
          })
        }
      })
    } else {
      app.request.getBookBought(self.data.page).then(res => {
        console.log(res);
        if (res.data.data.length == 0) {
          wx.showToast({
            title: '没有更多了',
          })
        } else {
          self.setData({
            page: self.data.page + 1,
            buyMGGoodsList: self.data.buyMGGoodsList.concat(res.data.data)
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})