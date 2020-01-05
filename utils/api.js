class api {
  constructor() {
    this._baseUrl = 'https://dianshu.chaoshang666.com/index.php/api/'
    this._header = {}
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    const self = this;
    wx.showLoading({
      title: '加载中',
    });
    return new Promise((resolve, reject) => {
      wx.request({
        url: this._baseUrl + url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
            if (res.data.code == -400 || res.code == -400) {
              wx.switchTab({
                url: '../home/home',
                success: function(){
                  const _PAGE = getCurrentPages();
                  wx.setStorageSync('_page', '/'+_PAGE[_PAGE.length - 1].route)
                  wx.setStorageSync('_query', _PAGE[_PAGE.length - 1].options)
                },
                complete: function(){
                  wx.showToast({
                    title: '为了方便您的使用，请先登录！',
                    icon: 'none'
                  })
                }
              })
            } else {
              //200: 服务端业务处理正常结束
              resolve(res)
            }
          }  else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        }),
        complete: (res=>{
          wx.hideLoading();
        })
      })
    })
  }
}

export default api