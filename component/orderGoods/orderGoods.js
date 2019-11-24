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
        url: '../orderRefunding/orderRefunding',
        success: function (res) {
          res.eventChannel.emit("acceptOrder", self.properties.buyGoodsList[orderIndex])
        }
      })
    },
  }
})
