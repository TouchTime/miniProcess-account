Page({
  getSure:function(e){
    wx.openSetting({
      success: function (res) {
        if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
        //   //这里是授权成功之后 填写你重新获取数据的js
        //   //参考:
        //   this.getLogiCallback('', function () {
        //     callback('')
        //   })
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.form === 'menu') {
      //来自右上角按钮
    }
    return {
      title: '网贷记账本',
      path: 'pages/payback/payback',
      success: function (res) {

      },
      fail: function (res) {

      }

    }
  }
})