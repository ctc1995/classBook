// pages/discovery.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    // 相关推荐
    goodList: [],
    goodsServer: [
      {
        "icon": '',
        "name": '消毒清洁'
      },
      {
        "icon": '',
        "name": '官方自营'
      },
    ],
    goodsType:{
      "wenxue":"文学"
    },
    // 更多品相
    goodsProd: [],
    // 品相Index
    prodIndex: 0,
    region: ['', '', ''],
    // 显示msg
    msg: false,
  },

  swiperChange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const self =this;
    this.setData({
      prodIndex: e.detail.value,
      'goods.price_container.price': self.data.goodsProd[e.detail.value].price,
      'goods.price': self.data.goodsProd[e.detail.value].price
    })
  },
  // 收藏
  shoucang: function(){
    app.request.favorOrder(this.data.goods.id, this.data.goods.isbn).then(res=>{
      console.log(res);
      if (res.code == 0) {
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  // 加入购物车
  addCar:function(){
    const self = this;
    app.request.addCart({ goods_id: this.data.goods.id }).then(res => {
      console.log(res);
      if(res.code==0){
        // self.setData({
        //   msg: true
        // })
        wx.showToast({
          title: res.msg,
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  // 加购
  addShopCar(e) {
    console.log(e);
    app.request.addCart({ goods_id: e.currentTarget.dataset.book.id }).then(res => {
      console.log(res);
      wx.showToast({
        title: res.msg,
      })
    })
  },
  // 立即购买
  shop: function(){
    console.log(this.data.goods);
    const self = this;
    wx.navigateTo({
      url: '../order/orderConfirm/orderConfirm?goods_id=' + self.data.goods.id + '&wid=' + self.data.goods.wid
    })
  },
  // 到货提醒
  arrival: function(){
    const self = this;
    wx.requestSubscribeMessage({
      tmplIds: ['SRu_UWjgrbun3CacoCV1LrTRn0bK0cG9evsa8s25090'],
      success(res) {
        console.log(res);
        if (res['SRu_UWjgrbun3CacoCV1LrTRn0bK0cG9evsa8s25090'] == 'accept'){
          app.request.getCartArri(self.data.goods.id, self.data.goods.isbn, self.data.goods.title, self.data.goods.images).then(ret => {
            console.log(ret);
            if (ret.code == 0) {
              wx.showToast({
                title: '登记成功！',
              })
            }
          })
        } else {
          wx.showToast({
            title: '到货提醒需要授权消息提醒',
            icon: 'none'
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: 'errMsg',
          icon: 'none'
        })
      }
    })
  },
  go: function(){
    wx.switchTab({
      url: '../../pages/shopCar/shopCar',
    })
    
  },
  back: function () {
    this.setData({
      msg: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.bookId)
    const self=this;
    app.request.getGoodsDetail(options.bookId).then(res=>{
      console.log(res);
      if(res.code == -1) {
        wx.navigateBack();
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        return;
      }
      self.setData({
        goods: res.data,
        'goods.picUrl': [res.data.home_recommended_images, res.data.images]
      })
      if (res.data.isbn && res.data.isbn!=0){
        app.request.getProduct(res.data.isbn).then(res=>{
          console.log(res);
          res.data.map(item=>{
            item.quality_name = item.quality/10 + '成新'
          })
          self.setData({
            goodsProd: res.data,
            'goods.price_container.price': res.data[0].price,
            'goods.price': res.data[0].price
          })
        })
      }
    })
    app.request.getRelatedRecommendations(options.bookId).then(res=>{
      self.setData({
        goodList: res.data.data.data
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