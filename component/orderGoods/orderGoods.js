// component/orderGoods/orderGoods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buyGoodsList: {
      type: Array,
      value: []
    },
    orderInfo: {
      type: Object,
      value: {}
    },
    navType: {
      type: Number,
      value: 0
    },
    money: {
      type: Boolean,
      value: true
    },
    attr: {
      type: Boolean,
      value: true
    },
    sum: {
      type: Boolean,
      value: true
    },
    shouhou: {
      type: Boolean,
      value: false
    },
    status: {
      type: Number,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 申请退货
    refund(e) {
      var orderIndex = e.currentTarget.dataset.index;
      var self = this;
      wx.navigateTo({
        url: '../orderRefunding/orderRefunding?status=' + self.properties.status,
        success: function (res) {
          res.eventChannel.emit("acceptOrder", self.properties.buyGoodsList[orderIndex])
        }
      })
    },

    // 商品详情
    detail(e) {
      var self = this, goodsIndex = e.currentTarget.dataset.index;
      if (self.properties.navType == 1){
        console.log(self.properties.buyGoodsList[goodsIndex])
        wx.navigateTo({
          url: "../../goods/goods?bookId=" + self.properties.buyGoodsList[goodsIndex].goods_id,
        })
      } else {
        wx.navigateTo({
          url: '../orderReceipt/orderReceipt',
          success: function (res) {
            res.eventChannel.emit("acceptOrder", self.properties.orderInfo)
          }
        })
      }
    },
  }
})
