var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      text: '重新获取验证码',
      hide: true

    })
    countdown = 60;
    return;
  } else {
    that.setData({
      text: countdown + 's后重新发送',
      hide: false
    })

    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }, 1000)
}
Page({
  data:{
    phoneNum:'',
    phoneNums:'',
    code:'',
    text:'获取验证码',
    hide:true,
    colors:true,
    font:true,
    loginCode: true
  },
  phoneInput:function(e){
    this.setData({
      phoneNums: e.detail.value
      // colors: true
    })
  },
  msgInput:function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  colorChange:function(e){
    this.setData({
      colors:false,
      phoneNums: e.detail.value
    })
  },
  colorChanges: function(e) {
    this.setData({
      font: false,
      code: e.detail.value
    })
  },
  validatemobile:function(e){
    var phoneNums = this.data.phoneNums;
    var reg = /^1[34578]\d{9}$/;
    if (!phoneNums) {
      wx.showToast({
        title: '请输入手机号',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    if (!reg.test(phoneNums)) {
      wx.showToast({
        title: '手机号有误',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    
    var that = this;
    settime(that);
    this.setData({
      loginCode: false
    })
    
  },
  logIn: function (e) {
    var phone = this.data.phoneNums;
    var codes = this.data.code;
    var reg = /^1[34578]\d{9}$/;
    var regs = /^[0-9]\d{5}$/;
    if (phone == ''){
      wx.showToast({
        title: '请输入手机号',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    if (!reg.test(phone)) {
      wx.showToast({
        title: '手机号有误',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    if (codes == ''){
      wx.showToast({
        title: '请输入验证码',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    
    if (!regs.test(codes)) {
      wx.showToast({
        title: '验证码有误',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    wx.showToast({
      title: '绑定成功',
      image: '/images/success.png',
      duration: 2000,
      success: function () {
        setTimeout(function () {
          //要延时执行的代码
          wx.navigateBack({
            url: '../index/index'
          })
        }, 800) //延迟时间
    }
   
  })
  },
  onShareAppMessage: function (res) {
    if (res.form === 'menu') {
      //来自右上角按钮
    }
    return {
      title: '网贷记账本',
      path: 'pages/index/login/login',
      success: function (res) {

      },
      fail: function (res) {

      }

    }
  }
  
})