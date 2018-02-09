Page({
  data: {
    restData: [
      { item: 'P2P记账： 这些名词要懂22', index: 1 },
      { item: 'P2P记账： 常用的还款方式2', index: 2 },
      { item: 'P2P记账： 常用的还款方式2', index: 3 }]
  },
  binddetail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "/pages/index/feedback/problemDetail/problemDetail?id=" + id,
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '网贷记账本',
      path: 'pages/index/feedback/help/help',
      success: function (res) {

      },
      fail: function (res) {

      }

    }
  }
})