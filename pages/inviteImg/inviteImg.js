// pages/inviteImg/inviteImg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteImg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    this.setData({
      inviteImg: options.inviteImg
    })
    wx.hideShareMenu()
  },
  // 长按小程序码
  bindLongPress(e) {
    let url = e.currentTarget.dataset.url, self = this;
    console.log(url);
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log(0)
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              self.saveImage(url)
            },
            fail() {
              wx.showToast({
                title: '保存小程序码需要授权',
                icon: 'none'
              })
            }
          })
        } else {
          console.log(1)
          wx.showModal({
            title: '保存小程序码',
            content: '是否允许将小程序码保存到相册',
            success(res) {
              if (res.confirm) {
                self.saveImage(url)
              } else if (res.cancel) {
                wx.showToast({
                  title: '已取消将小程序码保存到相册',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })
  },
  // 保存图片
  saveImage(url) {
    wx.downloadFile({
      url,
      success: function (res) {
        let path = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
          },
          complete(res) {
            console.log(res)
          }
        })
      }, fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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