// tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: []
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    curTabIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTabNav: function (e) {
      this.setData({
        curTabIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('changeTabNav', e.currentTarget.dataset.item);
    },
  }
})
