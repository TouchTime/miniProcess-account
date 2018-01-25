Page({
  onShareAppMessage: function (res) {
    return {
      title: '能帮你算账的理财计算器',
      path: '/pages/index/index',
      imageUrl: '/images/count.png'
    }
  }
})