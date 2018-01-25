Page({
  data:{
    list:{},
    money:'',
    lixi:'',
    yuqi:'',
    shiji_apr: '',
    qishu: '',
    time_end: ''
  },
  onShareAppMessage: function (res) {
    return {
      title: '能帮你算账的理财计算器',
      path: '/pages/index/index',
      imageUrl: '/images/count.png'
    }
  },
  onLoad:function(e){
   let that = this;
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        that.setData({
          list:res.data.data.huankuan_list,
          money: res.data.data.money,
          lixi: res.data.data.lixi,
          yuqi:res.data.data.yuqi,
          shiji_apr: res.data.data.shiji_apr,
          qishu: res.data.data.qishu,
          time_end: res.data.data.time_end

        });
      }
    });
  }
})