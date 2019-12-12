// pages/shopCar/shopCar.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
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
    curCartId: null,
    checkAllGoods: false,
    // 到货提醒
    remindGoods: false,
    totalGoods: 0,
    totalMoney: 0,
  },
  _init_: function() {
    this.setData({
      // curTabId: "all",
      shopCarList: [],
      curGoods: [],
      checkAllGoods: false,
      // 到货提醒
      remindGoods: false,
      totalGoods: 0,
      totalMoney: 0,
      curCartId: null,
    })
  },
  // 切换TabNav事件
  changeTabNav: function(e) {
    this._init_();
    if (e.detail.tabId) {
      this.setData({
        curTabId: e.detail.tabId,
      })
    }
    this.setData({
      totalGoods: 0,
      checkAllGoods: false
    })
    const self = this;
    if (e.detail.tabIndex == 1 || self.data.curTabId=='remind'){
      app.request.getCartArriList().then(res=>{
        self.setData({
          shopCarList: res.data.data
        })
      })
    } else {
      app.request.getCartIndex().then(res => {
        console.log(res);
        self.setData({
          shopCarList: res.data
        })
      })
    }
  },
  // 获取购物车信息
  getShopCarList: function() {
    const self = this;
    app.request.getCartIndex().then(res=>{
      console.log(res);
      self.setData({
        shopCarList: res.data
      })
    })
  },
  // 选择商品
  selGoods: function(e) {
    let item = this.data.shopCarList[e.target.dataset.index];
    item.sel = !item.sel;
    var totalGoods = this.data.totalGoods;
    item.sel ? totalGoods += 1 : totalGoods -= 1;
    this.setData({
      totalGoods: totalGoods,
      checkAllGoods: this.data.shopCarList.length === totalGoods
    })
    this.countMoney();
    if (item.stock < 0) {
      this.setData({
        remindGoods: !this.data.remindGoods
      })
    }
  },
  /*点击减号*/
  bindMinus: function (e) {
    let item = this.data.shopCarList[e.target.dataset.index];
    if (item.stock == 1) {
      item.stock = 1
      return;
    } else {
      item.stock -= 1
    }
    this.setData({
      shopCarList: this.data.shopCarList
    })
    this.stockGoodsCart(item.stock, item.goods_id, item.id)
    console.log(this.data.shopCarList);
  },
  /*点击加号*/
  bindPlus: function(e) {
    let item = this.data.shopCarList[e.target.dataset.index];
    console.log(item);
    if (item.stock >= parseInt(item.inventory)) {
      item.stock = parseInt(item.inventory)
      return;
    } else {
      item.stock *= 1
      item.stock += 1
    }
    this.setData({
      shopCarList: this.data.shopCarList
    })
    this.stockGoodsCart(item.stock, item.goods_id, item.id)
    console.log(this.data.shopCarList);
  },
  // 输入商品数量
  bindManual: function(e) {
    let sum = parseInt(e.detail.value.replace(/[^\d]/g, '') || 1), item = this.data.shopCarList[e.target.dataset.index];
    item.stock = sum;
    this.stockGoodsCart(item.stock, item.goods_id, item.id, )
    return {
      value: sum
    }
  },
  // 更新购物车商品数量
  stockGoodsCart: function (stock, goods_id, id) {
    app.request.stockGoodsCart({ stock, goods_id, id }).then(res => {
      console.log(res);
      this.countMoney();
    })
  },
  // 全选购物车
  selAllGoods: function(e) {
    var list = [],
      checked = !this.data.checkAllGoods,
      sum = 0;
    this.data.shopCarList.map(item => {
      console.log(item);
      if (item.inventory != 0) {
        item.sel = checked;
        sum += 1;
      }
      list.push(item);
    })
    this.setData({
      shopCarList: list,
      totalGoods: checked ? sum : 0,
      checkAllGoods: checked
    })
    this.countMoney();
  },
  // 计算金额
  countMoney: function() {
    var sum = 0;
    this.data.shopCarList.map(item => {
      if (item.sel && item.stock > 0) {
        sum += item.stock * item.price
      }
    })
    this.setData({
      totalMoney: sum.toFixed(2)
    })
  },
  // 到货提醒
  remind: function() {
    var list = [];
    this.data.shopCarList.map(item => {
      if (item.sel && item.stock <= 0) {
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
  buy: function() {
    var buyGoodsList = [];
    this.data.shopCarList.map(item => {
      if (item.sel && item.stock > 0) buyGoodsList.push(item.id)
    })
    console.log(buyGoodsList);

    wx.navigateTo({
      url: '../order/orderConfirm/orderConfirm',
      success: function (res) {
        res.eventChannel.emit("acceptBuyGoodsList", buyGoodsList)
      }
    })
  },
  longpressGoods: function (e) {
    let index = e.currentTarget.dataset.index, item = this.data.shopCarList[index];
    console.log(item);
    this.setData({
      curCartId: item.id
    })
  },
  // 关闭actionSheet
  hiddenActionSheet: function(){
    this.setData({
      curCartId: null
    })
  },
  // 移出购物车
  delGoods: function(){
    const self=this;
    app.request.delGoodsCart(this.data.curCartId).then(res=>{
      console.log(res);
      self.setData({
        curCartId: null
      })
      self.getShopCarList();
    })
  },
  // 移入收藏夹
  colGoods: function () {
    const self=this;
    app.request.favorOrder(this.data.curCartId).then(res => {
      console.log(res);
      self.setData({
        curCartId: null
      })
      self.getShopCarList();
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.curTabId);
    this.changeTabNav({ detail: {} })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this._init_();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // this._init_();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.changeTabNav({detail:{}})
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