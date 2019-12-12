// pages/order/orderManager/orderManager.js
var _MD = require('../../../mock/mock-data.js')
var app = new getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        "tabId": "all",
        "tabName": "全部"
      },{
        "tabId": "pendPay",
        "tabName": "待付款",
      },
      {
        "tabId": "paid",
        "tabName": "已付款"
      },
      {
        "tabId": "arrived",
        "tabName": "已完成"
      },
      {
        "tabId": "refund",
        "tabName": "退款/售后"
      }
    ],
    curTabId: "",
    curTabIndex: 0,
    orderStatus: {},
    orderList: [],
    curOrderId: null,
    topTips: '',
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    page: 1,
    noMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appInstance = getApp(), self = this;
    this.setData({
      // orderStatus: appInstance.globalData.orderStatus,
      // orderList: _MD.allOrderList,
      curTabId: options.type,
      curTabIndex: options.index,
      orderList: [],
      page: 1,
    })
  },
  /**
   * TODO：
   * 整体订单流程未完成
   */
  tapDialogButton: function(e){
    const that = this;
    if (e.detail.index) {
      console.log(that.data.curOrderId)
      app.request.cancelOrder(that.data.curOrderId).then(res => {
        if (res.code == 0) {
          that.onShow();
          that.setData({
            topTips: res.msg
          })
        } else {
          that.setData({
            topTipse: res.msg
          })
        }
        that.setData({
          dialogShow: false,
          curOrderId: null
        })
      })
    } else {
      that.setData({
        dialogShow: false
      })
    }
  },
  // 切换TabNav事件
  changeTabNav: function (e) {
    var orderListKey = e.detail.tabId + 'OrderList', self=this;
    this.setData({
      curTabId: e.detail.tabId,
      curTabIndex: e.detail.tabIndex,
      orderList: [],
      page: 1,
      noMore: false
      // orderList: _MD[orderListKey]
    })
    this.getOrderList();
    if(e.detail.tabId == 'all'){

    } else {
    } 
  },
  // 请求订单数据
  getOrderList() {
    var self = this, status = null;
    switch (this.data.curTabId) {
      case 'pendPay':
        status = 1;
        break;
      case 'paid':
        status = 2;
        break;
      case 'arrived':
        status = 4;
        break;
      case 'refund':
        status = 7;
        break;
      default:
        status = null;
        break;
    }
    if (!this.data.noMore) {
      if (status == 2) {
        app.request.getOrderIndex({ page: self.data.page, status: 2 }).then(res => {
          if (res.data.data.length == 0) {
            self.nomore();
            self.setData({
              noMore: true
            })
          } else {
            let orders
            if (self.data.page != 1) {
              orders = self.data.orderList.concat(res.data.data)
            } else {
              orders = res.data.data
            }
            self.setData({
              orderList: orders,
              page: self.data.page + 1
            })
          }
        })
        app.request.getOrderIndex({ page: self.data.page, status: 3 }).then(res => {
          if (res.data.data.length == 0) {
            self.nomore();
            self.setData({
              noMore: true
            })
          } else {
            let orders
            if (self.data.page != 1) {
              orders = self.data.orderList.concat(res.data.data)
            } else {
              orders = res.data.data
            }
            self.setData({
              orderList: orders,
              page: self.data.page + 1
            })
          }
        })
      } else if (status == 7) {
        app.request.getOrderAftersaleList(self.data.page).then(res => {
          if (res.data.length == 0) {
            self.nomore();
            self.setData({
              noMore: true
            })
          } else {
            let oL = [], orders;
            res.data.map(item => {
              let obj = item.order_data
              obj.status = 7
              obj.status_name = item.status_text
              oL.push(obj)
            })
            if (self.data.page != 1) {
              orders = self.data.orderList.concat(oL)
            } else {
              orders = oL
            }
            self.setData({
              orderList: orders,
              page: self.data.page + 1
            })
          }
        })
      } else {
        app.request.getOrderIndex({ type: self.data.curTabId, page: self.data.page, status }).then(res => {
          if (res.data.data.length == 0) {
            self.nomore();
            self.setData({
              noMore: true
            })
          } else {
            let orders
            if (self.data.page != 1) {
              orders = self.data.orderList.concat(res.data.data)
            } else {
              orders = res.data.data
            }
            self.setData({
              orderList: orders,
              page: self.data.page + 1
            })
          }
        })
      }
    }
  },
  // 订单详情
  detail(e){
    var self = this, orderIndex = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../orderReceipt/orderReceipt',
      success: function (res) {
        res.eventChannel.emit("acceptOrder", self.data.orderList[orderIndex])
      }
    })
  },
  // 立即支付
  toPaid(e) {
    var orderIndex = e.currentTarget.dataset.index, self = this, orderInfo = self.data.orderList[orderIndex];
    // 加载loding
    wx.showLoading({ title: "请求中..." });
    wx.request({
      url: app.request.payOrder(orderInfo.id, orderInfo.payment_id),
      method: "POST",
      data: {
        id: orderInfo.id,
        payment_id: orderInfo.payment_id,
      },
      dataType: "json",
      success: res => {
        wx.hideLoading();
        console.log(res);
        if (res.data.code == 0) {
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: function (res) {
              self.onShow()
            },
            fail: function (res) {
              wx.showToast({
                title: "支付失败",
                icon: 'none',
                complete(){
                  self.onShow()
                }
              })
            }
          });
          
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
    // wx.navigateTo({
    //   url: '../orderReceipt/orderReceipt',
    //   success: function (res) {
    //     res.eventChannel.emit("acceptOrder", self.data.orderList[orderIndex])
    //   }
    // })
  },
  // 提醒发货
  remind(e){
    var orderIndex = e.currentTarget.dataset.index;
    this.setData({
      topTips: '已提醒,将尽快为您发货！'
    })
    console.log('已提醒')
  },
  // 查看物流
  logistics(e){
    var orderIndex = e.currentTarget.dataset.index;
    var self = this;
    wx.navigateTo({
      url: '../orderReceipt/orderReceipt',
      success: function (res) {
        res.eventChannel.emit("acceptOrder", self.data.orderList[orderIndex])
      }
    })
  },
  // 确认收货
  collect(e) {
    var orderIndex = e.currentTarget.dataset.index, self = this;
    wx.showModal({
      content: '确认收货',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          app.request.orderCollect(self.data.orderList[orderIndex].id).then(res=>{
            console.log(res);
            wx.showToast({
              title: res.msg,
            })
            self.onLoad()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 取消订单
  cancel(e){
    this.setData({
      dialogShow: true,
      curOrderId: e.currentTarget.dataset.index
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
    console.log('show')
    const self = this;
    self.setData({
      page: 1,
    })
    if (this.data.curTabId != 'all') {
      this.getOrderList()
    } else {
      app.request.getOrderIndex({ type: 'all', page: self.data.page }).then(res => {
        self.setData({
          orderList: res.data.data,
          page: self.data.page + 1
        })
      })
    }
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
    this.onShow();
  },
  nomore(){
    wx.showToast({
      title: '没有更多了',
      icon: 'none'
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const self = this;
    if (this.data.curTabId != 'all') {
      this.getOrderList({ detail: { tabId: this.data.curTabId } })
    } else {
      if (!this.data.noMore){
        app.request.getOrderIndex({ type: 'all', page: self.data.page }).then(res => {
          console.log(res.data.data);
          if (res.data.data.length == 0) {
            self.nomore();
            self.setData({
              noMore: true
            })
          } else {
            self.setData({
              orderList: self.data.orderList.concat(res.data.data),
              page: self.data.page + 1
            })
          }
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})