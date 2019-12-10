// pages/logistics/logistics.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delivery: {
      name: '张三丰',
      phone: '18977837849',
      address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
    },
    logistics: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    app.request.orderLogistics(options.id, options.number).then(res=>{
      console.log(res);
      if(res.code == 0 ){

        let stateTips = ''
        switch (res.State) {
          case '0':
            stateTips = '暂无物流信息';
            break;
          case '1':
            stateTips = '快递公司已揽收';
            break;
          case '2':
            stateTips = '快递正在配送途中';
            break;
          case '3':
            stateTips = '该物流已被签收';
            break;
          case '4':
            stateTips = '该物流问题件，请咨询物流商处理！';
            break;
        }
        res.Traces = res.Traces.reverse()
        res.stateTips = stateTips
        res.logisticsName = options.name
        res.address = options.address
        self.setData({
          logistics: res
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
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