// tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: []
    },
    small: {
      type: Boolean,
      value: false
    },
    curTabIndex: {
      type: Number,
      value: 0
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
    changeTabNav: function (e) {
      this.setData({
        curTabIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('changeTabNav', Object.assign(e.currentTarget.dataset.item,{ 'tabIndex': e.currentTarget.dataset.index}));
    },
  },
  /*组件所在页面的生命周期 */
  pageLifetimes: {
    // show: function () {
    //   this.setData({
    //     curTabIndex: 'all'
    //   })
    // }
  }
})
