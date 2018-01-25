Page({
  skipAbout:function(e){
    wx.navigateTo({
      url: '/pages/more/about/about',
    })
  },
  network:function(e){
    // console.log(222)
    // wx.navigateToMiniProgram({
    //   appId: 'wx79c85c3d0580795e',
    //   path: '',
    //   // extraData: {
    //   //   foo: 'bar'
    //   // },
    //   envVersion: 'develop',
    //   success(res) {
    //     // 打开成功
    //     console.log(111)
    //   }
    // })
  },
  onShareAppMessage: function (res) {
    return {
      title: '能帮你算账的理财计算器',
      path: '/pages/index/index',
      imageUrl: '/images/count.png'
    }
  }
})

