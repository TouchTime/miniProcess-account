Page({
  data:{
    change:false,
    plateform:'',
    debt:false
  },
  bindInput:function(e){
    this.setData({
      plateform: e.detail.value,
    })
    let plateform = this.data.plateform;
    if (plateform){
      this.setData({
        change: true,

      })
    }else{
      this.setData({
        change: false
      })
    }
   
  },
  deleteAll:function(e){
    this.setData({
      plateform:'',
      change:false
    })
  },
  bindCancle:function(e){
    wx.navigateBack({})
  },
  apply:function(e){
    this.setData({
      debt:true
    })
  },
  cancles:function(e){
    this.setData({
      debt:false
    })
  },
  bindCancles:function(e){
    this.setData({
      debt: false
    })
  },
  bindSure: function (e) {
    this.setData({
      debt: false
    })
  }
})