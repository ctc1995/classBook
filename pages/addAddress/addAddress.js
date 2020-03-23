// pages/addAddress/addAddress.js
const app = new getApp();
const debounce = (func, wait) => {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rules: [{
      name: 'name',
      rules: {
        required: true,
        message: '收货人是必填项'
      },
    }, {
      name: 'tel',
      rules: {
        required: true,
        message: '联系电话是必填项'
      },
    }, {
      name: 'address',
      rules: {
        required: true,
        message: '详细地址是必填项'
      },
    }],
    formData: {
      'name': '',
      'tel': '',
      'address': '',
      'province_name': '',
      'city_name': '',
      'county_name': '',
      'is_default': false,
    },
    region: [],
    currentAddressId: null,
  },


  formInputChange(e) {
    console.log(e);
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  // 地址级联返回
  regionChange: function(e) {
    console.log(e.detail)
    this.setData({
      'formData.province_name': e.detail[0],
      'formData.city_name': e.detail[1],
      'formData.county_name': e.detail[2]
    })
  },
  switchChange:function(e){
    this.setData({
      'formData.is_default': e.detail.value
    })
  },
  submitForm: function (address) {
    console.log(this.data.formData);
    const that = this;
    app.request.postAddress(this.data.formData).then(res => {
      console.log(res);
      if (res.code == 0) {
        if (that.data.formData.is_default){
          let id = res.data || that.data.formData.id
          app.request.setDefaultAddress(id).then(res=>{
            console.log(res);
            wx.navigateBack()
          })
        } else {
          wx.navigateBack()
        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  wechatAddress: function () {
    let that = this;
    wx.chooseAddress({
      success(res) {
        let address = {
          name: res.userName,
          province_name: res.provinceName,
          city_name: res.cityName,
          county_name: res.countyName,
          address: res.detailInfo,
          tel: res.telNumber,
          is_default: false
        };
        that.setData({
          'formData': address
        })
        app.request.postAddress(address).then(res => {
          console.log(res);
          if(res.code == 0){
            wx.showToast({
              title: '新建成功',
              success(){
                setTimeout(() => {wx.navigateBack()},1500)
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    this.regionComponent = this.selectComponent("#region")
    this.setData({
      currentAddressId: options.id
    })
    if (!options.id) return;
    app.request.getAddressDetail(options.id).then(res => {
      console.log(res);
      that.setData({
        formData: res.data,
        region: [res.data.province_name, res.data.city_name, res.data.county_name]
      })
      that.regionComponent.updataRate(that.data.region);
      console.log(that.data.formData)
    })
    console.log(this.data.currentAddressId)
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

    setTimeout(() => { wx.stopPullDownRefresh(); }, 1000)
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