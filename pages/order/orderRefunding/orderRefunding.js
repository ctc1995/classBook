// pages/order/orderRefunding/orderRefunding.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyGoodsList: [],
    reasonObj: [
      {
        id: 0,
        name: '不想买了'
      },
      {
        id: 1,
        name: '买错了'
      },
    ],
    reasonTypeObj: [
      {
        id: 0,
        name: '仅退款'
      },
      {
        id: 1,
        name: '退款退货'
      },
    ],
    orderMaxMoney: '',
    orderMaxNumber: 0,
    order_id: null,
    order_detail_id: null,
    // 退款金额
    money: '',
    // 退款方式
    reasonType: '',
    //退款数量
    number: 0,
    // 退款原因
    reason: '',
    // 退款说明
    remake: '',
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    var self = this;
    eventChannel.on('acceptOrder', function (data) {
      console.log(data)
      self.setData({
        buyGoodsList: [data],
        order_id: data.order_id,
        order_detail_id: data.id,
        orderMaxMoney: data.total_price,
        orderMaxNumber: data.buy_number,
        number: data.buy_number,
      })
    })
    // app.request.getOrderAftersale(this.data.order_id, this.data.order_detail_id).then(res=>{
    //   console.log(res);
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  submit:function(){
    let obj = {
      order_id: this.data.order_id,
      order_detail_id: this.data.order_detail_id,
      // 退款金额
      money: this.data.money,
      // 退款方式
      reasonType: this.data.reasonType.id,
      // 退款原因
      reason: this.data.reason.name,
      // 退款说明
      remake: this.data.remake,
      // 凭证图片
      images: this.data.uploaderList
    }
    if (this.data.reasonType.id == 1){
      obj.number = this.data.number;
    }
    console.log(obj)
    app.request.postOrserAftersale(obj).then(res=>{
      console.log(res);
      if (res.code == 0) {
        wx.showToast({
          title: '提交成功',
          success(res) {
            setTimeout(() => { wx.navigateBack() }, 1500);
          }
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    })
  },
  bindMoney(e) {
    var money = e.detail.value && e.detail.value.match(/\d+/g).join('');
    if (parseFloat(money) > parseFloat(this.data.orderMaxMoney)) {
      money = this.data.orderMaxMoney
    }
    this.setData({
      money: money
    })
    console.log(money);
    return {
      value: money + '元',
      cursor: money.length
    }
  },
  bindNumber(e) {
    let number = e.detail.value
    if (number > this.data.orderMaxNumber){
      number = this.data.orderMaxNumber;
    }
    this.setData({
      number
    })
    return {
      value: number,
      cursor: number.length
    }
  },
  bindRemake(e) {
    this.setData({
      remake: e.detail.value
    })
  },
  bindRegionTypeChange: function (e) {
    this.setData({
      reasonType: this.data.reasonTypeObj[e.detail.value]
    })
    console.log(this.data.reasonType);
  },
  bindRegionChange: function (e) {
    this.setData({
      reason: this.data.reasonObj[e.detail.value]
    })
    console.log(this.data.reason);
  },

  // 删除图片
  clearImg: function (e) {
    var nowList = [];//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 6 - that.data.uploaderNum, // 默认6
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 6) {
          that.setData({
            showUpload: false
          })
        }
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
      }
    })
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