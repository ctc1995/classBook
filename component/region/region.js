// component/region/region.js
const app = new getApp();
Component({
  /**
   * 生命周期
   */
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const self = this;
      let objectMultiArray = [], reqPromise = [];
      reqPromise.push(new Promise((resolve, reject) => {
        app.request.getRegion().then(res => {
          resolve(res.data)
        })
      }))
      reqPromise.push(new Promise((resolve, reject) => {
        app.request.getRegion(1).then(res => {
          resolve(res.data)
        })
      }))
      reqPromise.push(new Promise((resolve, reject) => {
        app.request.getRegion(37).then(res => {
          resolve(res.data)
        })
      }))
      Promise.all(reqPromise).then(res=>{
        objectMultiArray[0] = res[0];
        objectMultiArray[1] = res[1];
        objectMultiArray[2] = res[2];
        self.setData({ objectMultiArray });
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    objectMultiArray: [],
    multiIndex: [],
    defaultRegion: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updataRate: function (data) {
      this.setData({
        defaultRegion: data
      })
    },
    getRegion: function (pid) {
      return app.request.getRegion(pid).then(res => {
        return res.data;
      })
    },
    bindMultiPickerChange: function (e) {
      const objectMultiArray = this.data.objectMultiArray, multiIndex = e.detail.value, selRegion = [objectMultiArray[0][multiIndex[0]].name, objectMultiArray[1][multiIndex[1]].name, objectMultiArray[2][multiIndex[2]].name];
      this.triggerEvent('regionChange', selRegion);
      this.setData({
        multiIndex
      });
    },
    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', +e.detail.column + 1, '，index值为', +e.detail.value);
      var data = {
        objectMultiArray: this.data.objectMultiArray,
        multiIndex: this.data.multiIndex
      };
      const self = this;
      let column = e.detail.column, index = e.detail.value;
      data.multiIndex[column] = index;
      switch (column) {
        // 省级变更
        case 0:
          // 根据省级id获取市级数据
          self.getRegion(data.objectMultiArray[0][index].id).then(cityRes=>{
            data.objectMultiArray[1] = cityRes;
            // 根据市级id获取县级数据
            self.getRegion(cityRes[0].id).then(countyRes => {
              console.log(countyRes);
              data.objectMultiArray[2] = countyRes;
              data.multiIndex[1] = 0;
              data.multiIndex[2] = 0;
              this.setData(data);
            })
          })
          break;
        // 市级变更
        case 1:
          self.getRegion(data.objectMultiArray[1][index].id).then(res => {
            data.objectMultiArray[2] = res;
            data.multiIndex[2] = 0;
            this.setData(data);
          })
          break;
      }
    },
  }
})
