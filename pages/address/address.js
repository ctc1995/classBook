// pages/address/address.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    isEdit: true,
    currentAddressId: null,
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    success: '',
    error: '',
  },
  radioChange: function(e){
    app.request.setDefaultAddress(e.detail.value).then(res=>{
      console.log(res);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel(), self = this;
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      self.setData({
        isEdit: data
      })
    })
  },
  // 选择地址
  selAddress: function (e) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', e.currentTarget.dataset.item);
    wx.navigateBack()
  },
  delAddress: function(e){
    this.setData({
      dialogShow: true,
      currentAddressId: e.currentTarget.dataset.id
    })
  },
  tapDialogButton: function (e){
    const that = this;
    if (e.detail.index){
      console.log(that.data.currentAddressId)
      app.request.delAddress(that.data.currentAddressId).then(res=>{
        // if (res.code == 0) {
        //   that.setData({
        //     success: res.msg
        //   })
        // } else {
        //   that.setData({
        //     error: res.msg
        //   })
        // }
        that.setData({
          dialogShow: false,
          currentAddressId: null
        })
        app.request.getAddress().then(res => {
          that.setData({
            addressList: res.data
          })
        })
      })
    } else {
      that.setData({
        dialogShow: false
      })
    }
  },
  modifyAddress: function(e){
    let url = '../addAddress/addAddress';
    if (e.currentTarget.dataset.id) url += `?id=${e.currentTarget.dataset.id}`
    wx.navigateTo({
      url
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
  onShow: function () {
    const self = this;
    app.request.getAddress().then(res => {
      console.log(res);
      self.setData({
        addressList: res.data
      })
    })
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