//index.js
//获取应用实例
const app = getApp()
// var API = require('../../utils/api.js')
Page({
  data: {
   
  },
  // onLoad: function() {
  //   console.log('onLoad');
  //   var that = this;
  //   //使用Mock
  //   API.ajax('',function(res) {
  //     //这里既可以获取模拟的
  //     console.log(res);
  //     that.setData({
  //       list: res.data
  //     })
  //   })

  //   console.log(this.data.list)

  // },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../index/login/login'
    })
  }
  ,
  bindAbout:function(e) {
    wx.navigateTo({
      url: '../index/about/about',
    })
  },
  bindHelp:function(e){
    wx.navigateTo({
      url: '../index/feedback/feedback',
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '网贷记账本',
      path: 'pages/index/index',
      success: function (res) {

      },
      fail: function (res) {

      }

    }
  }
})
