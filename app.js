//app.js
import request from './utils/request.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const self = this;
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        self.request.postAuth({code: res.code}).then(res=>{
          wx.setStorageSync('openid', res.data)
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.encryptedData = res.encryptedData
              this.globalData.iv = res.iv
              this.globalData.signature = res.signature
              this.request.getUserInfo({
                openid: wx.getStorageSync('openid'),
                encrypted_data: res.encryptedData,
                iv: res.iv,
              }).then(res => {
                wx.setStorageSync('token', res.data.token)
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    encryptedData: '',
    iv: '',
    signature: '',
    orderStatus:{
      0: {
        title: '等待支付',
        tips: '请在下单后30分钟内付款，超时他人将有机会购买'
      },
      1: {
        title: '付款成功',
        tips: '您已成功付款，订单处理中，请耐心等候'
      },
      2: {
        title: '订单已发货',
        tips: '订单已发货，请注意查收快件'
      },
      3: {
        title: '订单完成',
        tips: '您已成功签收心爱的书籍，欢迎再次购买'
      },
      4: {
        title: '订单取消',
        tips: '您已狠心取消订单'
      },
      5: {
        title: '请等待商家处理',
        tips: '提交时间：'
      },
      6: {
        title: '请退货并填写物流信息',
        tips: '还剩'
      },
      7: {
        title: '退款成功',
        tips: '时间：'
      },
      8: {
        title: '换货成功',
        tips: '时间：'
      },
    }
  },
  request: new request(),
})