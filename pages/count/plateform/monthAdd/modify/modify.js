var app = getApp();
Page({
  data: {
    onlyText: true,
    isChecked: true,
    isChecks: true,
    isCheck: true,
    one: true,
    show: true,
    shows: true,
    left: true,
    lefts: true,
    array: ['到期连本付清', '先付息到期还本', '日付息到期还本', '月付息到期还本', '季付息到期还本', '月付息按季等额本金', '等额本金', '等额本息', '收益复投，到期还本息', '固定付息日'],
    arrays: ['到期连本付清', '先付息到期还本', '日付息到期还本', '月付息到期还本', '季付息到期还本', '月付息按季等额本金', '等额本金', '等额本息', '收益复投，到期还本息', '固定付息日'],
    date: '2017-11-29',
    index: '到期连本付清',
    indexs: '到期连本付清',
    phoneNum: '', //项目名称
    phoneNumber: '',
    capital: '', //本金
    payment: '',//还款方式
    dataValue: '',//起息日期
    standard: '',//年的标化
    investment: '',//投资年限
    payCurrent: '', //活期本金
    wayCurrent: '', //活期计息方式
    standCurrent: '',//活期年的标化
    carrycurrent: '',//活期起息日期
    isColor1: false,
    isColor2: false,
    isColor3: false,
    isColor4: false,
    isColor5: false,
    isColor6: false,
    isColor7: false,
    isColor8: false,
    isColor9: false,
    isColor10: false,
    isColors1: false,
    isColors2: false,
    isColors3: false,
    isColors4: false,
    isColors5: false,
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      mername: '果树财富'//options为页面路由过程中传递的参数
    })
    wx.setNavigationBarTitle({
      title: that.data.mername//页面标题为路由参数
    })
  },
  switch: function (e) {
    var onlyText = e.target.dataset.id;
    if (onlyText == 1) {
      console.log(e)
      this.setData({
        onlyText: true,
        isChecked: true
      })
    } else {
      this.setData({
        onlyText: false,
        isChecked: false

      })
    }

  },
  showColor: function (e) {
    var isColor = e.currentTarget.dataset.iscolor;
    if (isColor == 1) {
      this.setData({
        isColor1: true,
        isColor2: false,
        isColor3: false,
        isColor4: false,
        isColor5: false,
        isColor6: false,
        isColor7: false,
        isColor8: false,
        isColor9: false,
        isColor10: false
      })
    } else if (isColor == 2) {
      this.setData({
        isColor1: false,
        isColor2: true,
        isColor3: false,
        isColor4: false,
        isColor5: false,
        isColor6: false,
        isColor7: false,
        isColor8: false,
        isColor9: false,
        isColor10: false
      })
    } else if (isColor == 3) {
      this.setData({
        isColor1: false,
        isColor2: false,
        isColor3: true,
        isColor4: false,
        isColor5: false,
        isColor6: false,
        isColor7: false,
        isColor8: false,
        isColor9: false,
        isColor10: false
      })
    } else if (isColor == 4) {
      this.setData({
        isColor1: false,
        isColor2: false,
        isColor3: false,
        isColor4: true,
        isColor5: false,
        isColor6: false,
        isColor7: false,
        isColor8: false,
        isColor9: false,
        isColor10: false
      })
    } else if (isColor == 5) {
      this.setData({
        isColor1: false,
        isColor2: false,
        isColor3: false,
        isColor4: false,
        isColor5: true,
        isColor6: false,
        isColor7: false,
        isColor8: false,
        isColor9: false,
        isColor10: false
      })
    } else if (isColor == 6) {
      this.setData({
        isColor1: false,
        isColor2: false,
        isColor3: false,
        isColor4: false,
        isColor5: false,
        isColor6: true,
        isColor7: false,
        isColor8: false,
        isColor9: false,
        isColor10: false
      })
    } else if (isColor == 7) {
      this.setData({
        isColor1: false,
        isColor2: false,
        isColor3: false,
        isColor4: false,
        isColor5: false,
        isColor6: false,
        isColor7: true,
        isColor8: false,
        isColor9: false,
        isColor10: false
      })
    } else if (isColor == 8) {
      this.setData({
        isColor1: false,
        isColor2: false,
        isColor3: false,
        isColor4: false,
        isColor5: false,
        isColor6: false,
        isColor7: false,
        isColor8: true,
        isColor9: false,
        isColor10: false
      })
    } else if (isColor == 9) {
      this.setData({
        isColor1: false,
        isColor2: false,
        isColor3: false,
        isColor4: false,
        isColor5: false,
        isColor6: false,
        isColor7: false,
        isColor8: false,
        isColor9: true,
        isColor10: false
      })
    } else {
      this.setData({
        isColor1: false,
        isColor2: false,
        isColor3: false,
        isColor4: false,
        isColor5: false,
        isColor6: false,
        isColor7: false,
        isColor8: false,
        isColor9: false,
        isColor10: true
      })
    }
  },
  showColors: function (e) {
    var isColor = e.currentTarget.dataset.iscolor;
    if (isColor == 1) {
      this.setData({
        isColors1: true,
        isColors2: false,
        isColors3: false,
        isColors4: false,
        isColors5: false,
      })
    } else if (isColor == 2) {
      this.setData({
        isColors1: false,
        isColors2: true,
        isColors3: false,
        isColors4: false,
        isColors5: false,
      })
    } else if (isColor == 3) {
      this.setData({
        isColors1: false,
        isColors2: false,
        isColors3: true,
        isColors4: false,
        isColors5: false,
      })
    } else if (isColor == 4) {
      this.setData({
        isColors1: false,
        isColors2: false,
        isColors3: false,
        isColors4: true,
        isColors5: false,
      })
    } else if (isColor == 5) {
      this.setData({
        isColors1: false,
        isColors2: false,
        isColors3: false,
        isColors4: false,
        isColors5: true,
      })
    }
  },
  changeDate: function (e) {
    var list = e.target.dataset.month;
    if (list == 3) {
      this.setData({
        isChecks: true
      })
    } else {
      this.setData({
        isChecks: false

      })
    }
  },
  bindPickerChange: function (e) {
    var array = ['到期连本付清', '先付息到期还本', '日付息到期还本', '月付息到期还本', '季付息到期还本', '月付息按季等额本金', '等额本金', '等额本息', '收益复投，到期还本息', '固定付息日'];
    this.setData({
      index: array[e.detail.value]
    })
  },
  bindPickerChanges: function (e) {
    var arrays = ['到期连本付清', '先付息到期还本', '日付息到期还本', '月付息到期还本', '季付息到期还本', '月付息按季等额本金', '等额本金', '等额本息', '收益复投，到期还本息', '固定付息日'];
    this.setData({
      indexs: arrays[e.detail.value]
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  tabSwitch: function (e) {
    var month = e.target.dataset.year;
    if (month == 1) {
      this.setData({
        isCheck: true
      })
    } else {
      this.setData({
        isCheck: false
      })
    }
  },
  openContent: function (e) {
    var msg = e.currentTarget.dataset.hi;
    if (msg == 1) {
      this.setData({
        one: false
      })
    } else {
      this.setData({
        one: true

      })
    }
  },
  noteProject: function (e) {
    var phoneNum = e.detail.value;
    if (phoneNum) {
      this.setData({
        show: false,
        left: false
      })
    } else {
      this.setData({
        show: true,
        left: true
      })
    }
    this.setData({
      phoneNum: e.detail.value
    })
  },
  noteProjects: function (e) {
    var phoneNumber = e.detail.value;
    if (phoneNumber) {
      this.setData({
        shows: false,
        lefts: false
      })
    } else {
      this.setData({
        shows: true,
        lefts: true
      })
    }
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  deteleAll: function (e) {
    this.setData({
      phoneNum: '',
      show: true,
      phoneNumber: '',
      shows: true,
      left: true,
      lefts: true
    })
  },
  amountChange: function (e) {
    this.setData({
      capital: e.detail.value
    })
  },
  yearChange: function (e) {
    this.setData({
      standard: e.detail.value
    })
  },
  devoteChange: function (e) {
    this.setData({
      investment: e.detail.value
    })
  },
  finishRegular: function (e) {
    var phoneNum = this.data.phoneNum;
    var capital = this.data.capital;
    var payment = this.data.payment;
    var dataValue = this.data.dataValue;
    var standard = this.data.standard;
    var investment = this.data.investment;
    if (!phoneNum) {
      wx.showToast({
        title: '请输入项目名称',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    if (!capital) {
      wx.showToast({
        title: '请输入投资本金',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    if (!standard) {
      wx.showToast({
        title: '请输入年的标化',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    if (!investment) {
      wx.showToast({
        title: '请输入投资期限',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    setTimeout(function () {
      //要延时执行的代码
      wx.switchTab({
        url: '../count'
      })
    }, 800) //延迟时间
  },
  amountCurrent: function (e) {
    this.setData({
      payCurrent: e.detail.value
    })
  },
  yearStandard: function (e) {
    this.setData({
      standCurrent: e.detail.value
    })
  },

  saveCurrent: function (e) {
    setTimeout(function () {
      //要延时执行的代码
      wx.switchTab({
        url: '../count'
      })
    }, 800) //延迟时间
  },
  finishCurrent: function (e) {
    var phoneNumber = this.data.phoneNumber;
    var payCurrent = this.data.payCurrent;
    var standCurrent = this.data.standCurrent;
    if (!phoneNumber) {
      wx.showToast({
        title: '请输入项目名称',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    if (!payCurrent) {
      wx.showToast({
        title: '请输入投资本金',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    if (!standCurrent) {
      wx.showToast({
        title: '请输入年的标化',
        image: '/images/success.png',
        duration: 2000
      })
      return false;
    }
    wx.showToast({
      title: '记一笔完成',
      image: '/images/success.png',
      duration: 2000,
      success: function (res) {
        setTimeout(function () {
          //要延时执行的代码
          wx.switchTab({
            url: '../count'
          })
        }, 800) //延迟时间
      }
    })

  },
  saveRegular: function (e) {
    wx.showToast({
      title: '记一笔保存',
      image: '/images/success.png',
      duration: 2000,
      success: function (res) {
        setTimeout(function () {
          //要延时执行的代码
          wx.switchTab({
            url: '../count'
          })
        }, 800) //延迟时间
      }
    })

  },
  onShareAppMessage: function (res) {
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