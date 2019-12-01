// component/goods/goods.js
const app = new getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Array,
      value: []
    },
    car: {
      type: Boolean,
      value: true
    },
    favor: {
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
    canelFavor(e) {
      const self = this;
      app.request.favorOrder(e.currentTarget.dataset.book.goods_id, e.currentTarget.dataset.book.isbn).then(res => {
        console.log(res);
        if (res.code == 0) {
          wx.showToast({
            title: '取消收藏',
          })
          self.triggerEvent('parentEvent')
        }
      })
    },
  }
})
