Page({
  data: {
    date:'2017-11-29',
    phoneNums:'',
    list:'',
    payFor:[{
      id:'1',
      name:'微贷网',
      type:'普拉多抵押',
      outdata:'已到期',
      payMoney:'5000',
      receMoney:'15000',
      getMoney:'20000'
    },
      {
        id: '2',
        name: '果树财富',
        type: '普拉多抵押',
        outdata:'已到期',
        payMoney: '5000',
        receMoney: '15000',
        getMoney: '20000'
      },
      {
        id: '3',
        name: '果树财富',
        type: '普拉多抵押',
        outdata: '待收',
        payMoney: '5000',
        receMoney: '15000',
        getMoney: '20000'
      },
      {
        id: '4',
        name: '果树财富',
        type: '普拉多抵押',
        outdata: '待收',
        payMoney: '5000',
        receMoney: '15000',
        getMoney: '20000'
      },
      {
        id: '5',
        name: '果树财富',
        type: '普拉多抵押',
        outdata: '已到期',
        payMoney: '5000',
        receMoney: '15000',
        getMoney: '20000'
      },
      {
        id: '6',
        name: '果树财富',
        type: '普拉多抵押',
        outdata: '已到期',
        payMoney: '5000',
        receMoney: '15000',
        getMoney: '20000'
      }
    ],
    index1: '',//弹窗内容的选择
    list1: '', //点击为第几个按钮
    debt: false,
    colors:false,
    num:''
    
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  onchange: function(e) {
    // console.log('列表的按钮',e.target.dataset.hi);
    // console.log(e.target.dataset.out);
    if (e.target.dataset.out == '逾期' ){
      this.setData({
        list: 3,
        list1: e.target.dataset.hi
      })
    } else if (e.target.dataset.out == '已收'){
      this.setData({
        list: 2,
        list1: e.target.dataset.hi
      })
    }else{
      this.setData({
        list: 1,
        list1: e.target.dataset.hi
      })
    }
   
  },
  colorChange: function(e) {
    var nums = e.detail.value + "";
    //保留两位小数
    if (nums.indexOf(".") == -1){
      this.setData({
        colors: false,
        num: e.detail.value
      })
    }else{
      var str = nums.substring(0, nums.indexOf(".") + 3);
      this.setData({
        colors: false,
        num: str
      })
    }

  },
  bindget:function(e) {
    console.log('弹窗内容选择的索引',e.target.dataset.text)
    var list2 = this.data.list1-1;
    var payfor = this.data.payFor;
    if (e.target.dataset.text == '逾期'){
      payfor[list2].outdata = '逾期'
    }else{
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
  bindCancle: function(e) {
    this.setData({
      list:''
    })
  },
  overtime:function(e) {
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
  bindgets: function(e){
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
      list:'',
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
  transfer:function(e) {
    this.setData({
       debt: true,
    })
  },
  modify:function (e) {
    var that = this;
    wx.showModal({
      // title: '小程序不支持此功能，请下载网贷记账本APP进行修改',
      content: '小程序不支持此功能，请下载网贷记账本APP进行修改',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            list: ''
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  
  },
  bindCancles:function(e) {
     this.setData({
       debt:false,
       list: 1
     })
  },
  getNum:function(e){
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
    if (payfor[list2].payMoney < 0){
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
    }else{
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
  onShareAppMessage: function (res) {
    return {
      title: '网贷记账本',
      path: 'pages/payback/payback'
    }
  }
  
})


