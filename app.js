//app.js
import request from './utils/request.js'
App({
  onLaunch: function () {
    const self = this;
    // 登录
    wx.login({
      success: res => {
        wx.setStorageSync('authcode', res.code)
        console.log(res.code)
        if (!wx.getStorageSync('openid')) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          self.request.postAuth({code: res.code}).then(res=>{
            wx.setStorageSync('openid', res.data)
            self.getUserInfo();
          })
        } else {
          self.getUserInfo();
        }
      }
    })
  },
  getUserInfo:function(){
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
              wx.setStorageSync('encryptedData', res.encryptedData)
              wx.setStorageSync('iv', res.iv)
              wx.setStorageSync('signature', res.signature)
              // if (!wx.getStorageSync('token')) {
              this.request.getUserInfo({
                openid: wx.getStorageSync('openid'),
                encrypted_data: res.encryptedData,
                iv: res.iv,
              }).then(res => {
                console.log(res);
                wx.setStorageSync('token', res.data.token)
              }).catch(error=>{
                console.log(error);
                wx.showToast({
                  title: '获取用户信息失败，可能影响体验，请重启小程序。',
                  icon: 'none',
                  duration: 3000
                })
              })
              // }
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
    /* orderStatus: {
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
    }, */
    orderStatus: {
      1: {
        title: '等待支付',
        tips: '请在下单后30分钟内付款，超时他人将有机会购买'
      },
      2: {
        title: '付款成功',
        tips: '您已成功付款，订单处理中，请耐心等候'
      },
      3: {
        title: '订单已发货',
        tips: '订单已发货，请注意查收快件'
      },
      '4': {
        title: '订单完成',
        tips: '您已成功签收心爱的书籍，欢迎再次购买'
      },
      5: {
        title: '订单取消',
        tips: '您已狠心取消订单'
      },
      6: {
        title: '订单关闭',
        tips: '订单已处理完毕'
      },
      7: {
        title: '售后/退款',
        tips: '订单正在售后处理，请退货并填写物流信息'
      }
    }
  },
  request: new request(),
})