// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [{
        // 收货人姓名
        userName: '张三',
        // 邮编
        postalCode: '516300',
        // 国标收货地址第一级地址
        provinceName: '广东省',
        // 国标收货地址第二级地址
        cityName: '深圳市',
        // 国标收货地址第三级地址
        countyName: '龙岗区',
        // 详细收货地址信息
        detailInfo: '龙城街道111号',
        // 	收货人手机号码
        telNumber: '15018504589',
        type: 1,
      },
      {
        // 收货人姓名
        userName: '张三',
        // 邮编
        postalCode: '516300',
        // 国标收货地址第一级地址
        provinceName: '广东省',
        // 国标收货地址第二级地址
        cityName: '深圳市',
        // 国标收货地址第三级地址
        countyName: '龙岗区',
        // 详细收货地址信息
        detailInfo: '龙城街道111号',
        // 	收货人手机号码
        telNumber: '15018504589',
        type: 0,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  addAddress: function() {
    let that = this;
    wx.chooseAddress({
      success(res) {
        let address = {
          userName: res.userName,
          postalCode: res.postalCode,
          provinceName: res.provinceName,
          cityName: res.cityName,
          countyName: res.countyName,
          detailInfo: res.detailInfo,
          nationalCode: res.nationalCode,
          telNumber: res.telNumber,
          type: 0
        }, addressList = that.data.addressList;
        console.log(address);
        addressList.push(address);
        that.setData({
          addressList: addressList
        })
      }
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