Page({
  data:{
    debts:false,
    date:'2018-01-10',
    details:false,
    trable:true
  },
  modified:function(e){
   wx.navigateTo({
     url: '/pages/count/plateform/regular/modified/modified',
   })
  },
  increase:function(e){
    this.setData({
      debt:true
    })
  },
  atone:function(e){
    this.setData({
      debts: true
    })
  },
  bindget: function (e) {
    console.log('弹窗内容选择的索引', e.target.dataset.text)
    var list2 = this.data.list1 - 1;
    var payfor = this.data.payFor;
    if (e.target.dataset.text == '逾期') {
      payfor[list2].outdata = '逾期'
    } else {
      payfor[list2].outdata = e.target.dataset.text;
    }

    this.data.payFor = payfor;
    this.setData({
      list: '',
      payFor: payfor
    })

    wx.showToast({
      title: '操作成功',
      image: '/images/success.png',
      duration: 1000
    })
  },
  bindCancle: function (e) {
    this.setData({
      list: ''
    })
  },
  overtime: function (e) {
    var list2 = this.data.list1 - 1;
    var payfor = this.data.payFor;
    if (e.target.dataset.text == '逾期') {
      payfor[list2].outdata = '逾期'
    } else {
      payfor[list2].outdata = e.target.dataset.text;
    }
    this.data.payFor = payfor;
    console.log(this.data.payFor)
    this.setData({
      list: '',
      payFor: payfor
    })
    wx.showToast({
      title: '操作成功',
      image: '/images/success.png',
      duration: 1000
    })
  },
  bindgets: function (e) {
    console.log('弹窗内容选择的索引', e.target.dataset.text)
    var list2 = this.data.list1 - 1;
    var payfor = this.data.payFor;
    if (e.target.dataset.text == '逾期') {
      payfor[list2].outdata = '逾期'
    } else {
      payfor[list2].outdata = e.target.dataset.text;
    }

    this.data.payFor = payfor;
    this.setData({
      list: '',
      payFor: payfor
    })

    wx.showToast({
      title: '操作成功',
      image: '/images/success.png',
      duration: 1000
    })
  },
  bindCancle: function (e) {
    this.setData({
      list: ''
    })
  },
  transfer: function (e) {
    this.setData({
      debt: true,
    })
  },
  modify: function (e) {
    this.setData({
      debts:true
    })
  },
  bindCancles: function (e) {
    this.setData({
      debt: false,
      debts: false,
    })
  },
  getNum: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  bindSure: function (e) {
    var that = this;
    var nums = that.data.num;
    var list2 = that.data.list1 - 1;
    var payfor = that.data.payFor;
    var payMoney = payfor[list2].payMoney;
    var getMoney = payfor[list2].getMoney;
    payfor[list2].payMoney = payfor[list2].payMoney - nums;
    payfor[list2].getMoney = payfor[list2].getMoney - nums;

    console.log(payfor[list2].payMoney)
    //转让金额小于或者等于应收利息
    if (payfor[list2].payMoney < 0) {
      payfor[list2].payMoney = payMoney;
      payfor[list2].getMoney = getMoney;
      that.setData({
        debt: true,
        num: '',
        // list: '',
        payFor: payfor
      })
      wx.showToast({
        title: '转让金额太大',
        image: '/images/success.png',
        duration: 1000
      })
    } else {
      payfor[list2].outdata = '已收';
      that.setData({
        debt: false,
        list: '',
        payFor: payfor
      })
      wx.showToast({
        title: '操作成功',
        image: '/images/success.png',
        duration: 1000
      })
    }
  },
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindMark:function(e){
    if(this.data.details){
      this.setData({
        details: false,
        trable:true
      })
    }else{
      this.setData({
        details: true,
        trable:false
      })
    }
   
  }
})