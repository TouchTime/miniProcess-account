Page({
  onShareAppMessage: function (res) {
    return {
      title: '网贷记账本',
      path: 'pages/index/about/about',
      success: function (res) {
        //转发成功
        // wx.showToast({
        //   title: '分享成功',
        //   image: '/images/success.png',
        //   duration: 2000
        // })
      },
      fail: function (res) {
        //转发失败
      }

    }
  }
})