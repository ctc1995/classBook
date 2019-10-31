// pages/shopCar/shopCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        "tabId": "all",
        "tabName": "全部",
      },
      {
        "tabId": "remind",
        "tabName": "到货提醒"
      }
    ],
    curTabId: "all",
    shopCarList: [],
    curGoods: [],
    checkAllGoods: false,
    // 到货提醒
    remindGoods: false,
    totalGoods: 0,
    totalMoney: 0,
  },

  // 切换TabNav事件
  changeTabNav: function (e){
    this.setData({
      curTabId: e.detail.tabId
    })
    console.log(e.detail);
  },
  // 取购物车商品缓存
  getShopCarList: function(){
    try {
      var value = wx.getStorageSync('shopCar')
      if (value) {
        let list = [];
        value.list.map(item=>{
          list.push(Object.assign({ 
            sum: 1, 
            sel: false,
            remind: false,
            stock: 20
          }, item))
        })
        list[0].stock = 0;
        console.log(list);
        this.setData({
          shopCarList: list
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  // 选择商品
  selGoods: function(e){
    this.data.shopCarList[e.target.dataset.index].sel = !this.data.shopCarList[e.target.dataset.index].sel;
    var totalGoods = this.data.totalGoods;
    this.data.shopCarList[e.target.dataset.index].sel ? totalGoods += 1 : totalGoods -=1;
    this.setData({
      totalGoods: totalGoods,
      checkAllGoods: this.data.shopCarList.length === totalGoods
    })
    this.countMoney();
    if (this.data.shopCarList[e.target.dataset.index].stock < 0) {
      this.setData({
        remindGoods: !this.data.remindGoods
      })
    }
  },
  /*点击减号*/
  bindMinus: function (e) {
    if (this.data.shopCarList[e.target.dataset.index].sum == 1) {
      this.data.shopCarList[e.target.dataset.index].sum = 1
    } else {
      this.data.shopCarList[e.target.dataset.index].sum -= 1
    }
    this.setData({
      shopCarList: this.data.shopCarList
    })
    this.countMoney();
    console.log(this.data.shopCarList);
  },
  /*点击加号*/
  bindPlus: function (e) {
    if (this.data.shopCarList[e.target.dataset.index].sum == 999) {
      this.data.shopCarList[e.target.dataset.index].sum = 999
    } else {
      this.data.shopCarList[e.target.dataset.index].sum += 1
    }
    this.setData({
      shopCarList: this.data.shopCarList
    })
    this.countMoney();
    console.log(this.data.shopCarList);
  },
  // 输入商品数量
  bindManual: function(e) {
    var sum = parseInt(e.detail.value.replace(/[^\d]/g, '') || 1);
    this.data.shopCarList[e.target.dataset.index].sum = sum;
    return {
      value: sum
    }
    this.countMoney();
  },
  // 全选购物车
  selAllGoods: function (e) {
    var list = [], checked = !this.data.checkAllGoods;
    this.data.shopCarList.map(item => {
      item.sel = checked;
      list.push(item);
    })
    this.setData({
      shopCarList: list,
      totalGoods: checked ? this.data.shopCarList.length : 0,
      checkAllGoods: checked
    })
    this.countMoney();
  },
  // 计算金额
  countMoney: function(){
    var sum = 0;
    this.data.shopCarList.map(item=>{
      if (item.sel && item.stock > 0){
        sum += item.sum * item.realPrice
      }
    })
    this.setData({
      totalMoney: sum
    })
  },
  // 到货提醒
  remind: function() {
    var list = [];
    this.data.shopCarList.map(item=>{
      if(item.sel && item.stock<=0){
        item.remind = !item.remind
      }
      list.push(item);
    })
    this.setData({
      shopCarList: list,
      remindGoods: !this.data.remindGoods
    })
    console.log(this.data.shopCarList);
  },
  // 结算
  buy: function () {
    console.log(this.data.shopCarList);
    var buyGoodsList = [];
    this.data.shopCarList.map(item=>{
      if (item.sel && item.stock > 0) buyGoodsList.push(item)
    })
    wx.navigateTo({
      url: '../order/orderConfirm/orderConfirm',
      success: function(res){
        res.eventChannel.emit("acceptBuyGoodsList", { data: buyGoodsList})
      }
    })
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
    this.getShopCarList();
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