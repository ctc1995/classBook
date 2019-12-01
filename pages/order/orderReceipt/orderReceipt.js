// pages/order/orderReceipt/orderReceipt.js
const app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {
      id: 20191023008912,
      delivery: {
        name: '张三丰',
        phone: '18977837849',
        address: '广东省深圳市南山区粤海街道9109号三诺智慧大厦'
      },
      status: 1,
      // 快递费用
      logisticsPrice: '6.00',
      // 订单费用
      orderTotal: '776.00',
      // 创建时间
      ctime: new Date().toLocaleString(),
      // 付款时间
      ptime: new Date().toLocaleString(),
      // 发货时间
      stime: new Date().toLocaleString(),
      // 物流信息
      logistics:[
        '下一站,深圳市南山邮局南油分局集散中心。',
        '百世物流已揽件',
      ],
    },
    buyGoodsList: [],
    orderStatus: {},
    topTips: '',
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    var self = this, appInstance = getApp();
    console.log(options);
    if(options.id){
      app.request.getOrderDetail(options.id).then(res => {
        self.setData({
          orderInfo: res.data,
          buyGoodsList: res.data.items,
          orderStatus: appInstance.globalData.orderStatus
        })
      })
    } else {
      eventChannel.on('acceptOrder', function (data) {
        console.log(data);
        if (data.status == '2') {
          app.request.orderLogistics(data.express_id, data.express_number).then(res => {
            data.logistics = res.Traces.reverse()
            self.setData({
              orderInfo: data,
              buyGoodsList: data.items,
              orderStatus: appInstance.globalData.orderStatus
            })
          })
        } else {
          self.setData({
            orderInfo: data,
            buyGoodsList: data.items,
            orderStatus: appInstance.globalData.orderStatus
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  tapDialogButton: function (e) {
    const that = this;
    if (e.detail.index) {
      app.request.cancelOrder(that.data.orderInfo.id).then(res => {
        if (res.code == 0) {
          that.setData({
            topTips: res.msg
          })
          setTimeout(() => { wx.navigateBack()}, 1000)
        } else {
          that.setData({
            topTipse: res.msg
          })
        }
        that.setData({
          dialogShow: false
        })
      })
    } else {
      that.setData({
        dialogShow: false
      })
    }
  },
  // 复制
  copyText(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  // 拨打电话
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.orderInfo.receive_tel 
    })
  },
  // 申请退货
  refund(){
    var self = this;
    wx.navigateTo({
      url: '../orderRefunding/orderRefunding',
      success: function (res) {
        res.eventChannel.emit("acceptOrder", self.data.buyGoodsList)
      }
    })
  },
  // 取消订单
  cancel(e) {
    this.setData({
      dialogShow: true
    })
  },
  // 立即支付
  toPay: function () {
    var self = this;
    // 加载loding
    wx.showLoading({ title: "请求中..." });
    wx.request({
      url: app.request.payOrder(this.data.orderInfo.id, this.data.orderInfo.payment_id),
      method: "POST",
      data: {
        id: this.data.orderInfo.id,
        payment_id: this.data.orderInfo.payment_id,
      },
      dataType: "json",
      success: res => {
        wx.hideLoading();
        console.log(res);
        if (res.data.code == 0) {
          // 是否在线支付,非在线支付则支付成功
          if (res.data.data.is_online_pay == 0) {
            var temp_data_list = this.data.data_list;
            temp_data_list[index]['status'] = 2;
            temp_data_list[index]['status_name'] = '待发货';
            this.setData({ data_list: temp_data_list });

            app.showToast("支付成功", "success");
          } else {
            wx.requestPayment({
              timeStamp: res.data.data.timeStamp,
              nonceStr: res.data.data.nonceStr,
              package: res.data.data.package,
              signType: res.data.data.signType,
              paySign: res.data.data.paySign,
              success: function (res) {
                console.log(res);
                let temp_orderInfo = self.data.orderInfo;
                temp_orderInfo.status = "2",
                  temp_orderInfo.status_name = "待发货",
                  temp_orderInfo.pay_status = "2",
                  temp_orderInfo.pay_status_name = "已支付",
                  self.setData({
                    orderInfo: temp_orderInfo
                  })
                // 数据设置
                // var temp_data_list = $this.data.data_list;
                // temp_data_list[index]['status'] = 2;
                // temp_data_list[index]['status_name'] = '待发货';
                // $this.setData({ data_list: temp_data_list });

                // 跳转支付页面
                // wx.navigateTo({
                //   url: "/pages/paytips/paytips?code=9000&total_price=" +
                //     $this.data.data_list[index]['total_price']
                // });
              },
              fail: function (res) {
                wx.showToast({
                  title: "支付失败",
                  icon: 'none'
                })
              }
            });
          }
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: "服务器请求出错",
        })
      }
    });
  },
  // 查看物流
  goLogi(){
    wx.navigateTo({
      url: '../../logistics/logistics?id=' + this.data.orderInfo.express_id + '&number=' + this.data.orderInfo.express_number + '&name=' + this.data.orderInfo.express_name + '&address=' + this.data.orderInfo.receive_province_name + this.data.orderInfo.receive_city_name + this.data.orderInfo.receive_county_name + this.data.orderInfo.receive_address
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