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
    hihi(){
      console.log(this.data.needMoney)
      console.log(this.data.needAttr)
    }
  }
})
