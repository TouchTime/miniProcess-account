Page({
  data:{
    list:false,
    one:true
  },
  bindCommon:function(e){
    this.setData({
      list:true
    })
  },
  bindCancles:function(e){
    this.setData({
      list:false
    })
  },
  bindSure: function (e) {
    this.setData({
      list: false
    })
  },
  isShow:function(e){
    let one = this.data.one;
    if(one){
      this.setData({
        one:false
      })
    }else{
      this.setData({
        one: true
      })
    }
  },
  bindHand:function(e){
    wx.navigateTo({
      url: '/pages/count/list/listLogin/account/account',
    })
  }
})