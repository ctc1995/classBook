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
    tuikuan: [
      {
        id: 0,
        name: '活动/优惠未生效'
      },
      {
        id: 1,
        name: '空包裹'
      },
      {
        id: 2,
        name: '包裹丢失'
      },
      {
        id: 3,
        name: '配送超时'
      },
      {
        id: 4,
        name: '未按约定时间发货'
      },
      {
        id: 5,
        name: '未送货上门'
      },
      {
        id: 6,
        name: '物流显示签收实际未到货'
      },
      {
        id: 7,
        name: '不喜欢/不想要'
      },
    ],
    tuihuo: [
      {
        id: 1,
        name: '配送超时'
      },
      {
        id: 2,
        name: '未按约定时间发货'
      },
      {
        id: 3,
        name: '未送货上门'
      },
      {
        id: 4,
        name: '卖家发错货'
      },
      {
        id: 5,
        name: '少件/漏发'
      },
      {
        id: 6,
        name: '包装/商品破损/污渍'
      },
      {
        id: 7,
        name: '商品信息描述不符'
      },
      {
        id: 8,
        name: '使用后过敏'
      },
      {
        id: 9,
        name: '已过/临近保质期'
      },
      {
        id: 10,
        name: '无法溶解/结块/有异物'
      },
    ],
    reasonTypeObj: [
      {
        id: 0,
        name: '仅退款'
      },
    ],
    orderMaxMoney: '',
    money: 0,
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
    // 本地显示
    uploaderList1: [],
    // 实际URL
    uploaderList2: [],
    uploaderNum: 0,
    showUpload: true,
    isLogis: false,
    // 快递名称
    logisName: "",
    // 快递单号
    logisNumber: "",
    request: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const eventChannel = this.getOpenerEventChannel();
    var self = this, status = options.status;
    if (status == 4 || status == 3){
      self.setData({
        reasonTypeObj: self.data.reasonTypeObj.concat([{ id: 1, name: '退款退货' }]),
        orderId: options.oid
      })
    } else if (status == 99) {
      self.setData({
        isLogis: true,
        shouhouId: options.id,
        orderId: options.oid
      })
    }
    eventChannel.on('acceptOrder', function (data) {
      console.log(data)
      self.setData({
        buyGoodsList: [data],
        order_id: data.order_id,
        order_detail_id: data.id,
        orderMaxMoney: data.total_price,
        money: data.total_price,
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
  bindLogisName: function(e){
    this.setData({
      logisName: e.detail.value
    })
  },
  bindLogisNumber: function(e){
    this.setData({
      logisNumber: e.detail.value
    })
  },
  submit: function () {
    const self = this;
    if (this.data.request) {
      return;
    }
    this.setData({
      request: true
    })
    if(this.data.isLogis){
      app.request.aftersaledelivery({ id: this.data.shouhouId, name: this.data.logisName, number: this.data.logisNumber}).then(res=>{
        console.log(res);
        this.setData({
          request: false
        })
        if (res.code == 0) {
          wx.showToast({
            title: '提交成功',
            success(res) {
              setTimeout(() => {
                wx.redirectTo({
                  url: '../orderReceipt/orderReceipt?id=' + self.data.orderId,
                })
              }, 1500);
            }
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
        }
      })
    } else {
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
        images: this.data.uploaderList2
      }
      if (this.data.reasonType.id == 1) {
        obj.number = this.data.number;
      }
      app.request.postOrserAftersale(obj).then(res => {
        console.log(res);
        if (res.code == 0) {
          wx.showToast({
            title: '提交成功',
            success(res) {
              setTimeout(() => {
                wx.redirectTo({
                  url: '../orderReceipt/orderReceipt?id=' + self.data.orderId,
                })
              }, 1500);
            },
            complete() {
              self.setData({
                request: false
              })
            }
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
        }
      })
    }
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
    console.log(e.detail.value);
    const self = this;
    if (e.detail.value == 1) {
      this.setData({
        reasonObj: this.data.tuihuo,
        reason: ''
      })
    } else {
      this.setData({
        reasonObj: this.data.tuikuan,
        reason: ''
      })
    }
    console.log(this.data.reasonType);
  },
  bindRegionChange: function (e) {
    console.log(this.data.reasonObj);
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
      current: that.data.uploaderList1[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 3 - that.data.uploaderNum, // 默认3
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.uploadFile({
          url: 'https://dianshu.chaoshang666.com/index.php/api/ueditor/Index/path_type/aftersale_2_15_27?action=uploadimage&encode=utf-8&token=' + wx.getStorageSync('token'),
          filePath: res.tempFilePaths[0],
          name: 'upfile',
          success(upData) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            let tempFilePaths1 = res.tempFilePaths, tempFilePaths2 = JSON.parse(upData.data).data.url;
            let uploaderList1 = that.data.uploaderList1.concat(tempFilePaths1),
                uploaderList2 = that.data.uploaderList2.concat(tempFilePaths2);
            if (uploaderList1.length == 3) {
              that.setData({
                showUpload: false
              })
            }
            that.setData({
              uploaderList1: uploaderList1,
              uploaderList2: uploaderList2,
              uploaderNum: uploaderList1.length,
            })
          },
          fail(err){
            console.log(err);
          }
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
    setTimeout(() => { wx.stopPullDownRefresh(); }, 1000)
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