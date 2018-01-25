//index.js
var util = require('../../utils/util.js');
const app = getApp()
var time = util.formatTime(new Date());
Page({
  data: {
    one:true,
    color:false,
    colors: true,
    array:['1年','2年','3年','5年','3个月','6个月'],
    index: 0,   //银行理财存款期限o
    color1:false,  //活期
    color2:true,   //定期
    color3:false,
    color4:true,
    color5: false,
    color6: true,
    dates: time,
    choose:true,
    arrays: ['一次性还本付息', '按月付息到期还本','等额本息','等额本金','固定付息日'],
    index2:0,
    show:false,
    index1:0,
    Money: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    trueMoney:0,    //银行理财利息
    interestMoney: 0,   //银行理财本息
    custodyData: 0.35,   //银行理财年利率
    money:'',
    percentNum: 0,
    percentGet: 0,
    types:true,
    index3:0,
    array1: ['一次性还本付息', '固定付息日'],
    pMoney:'',
    pyear:'',
    prate:'',
    reward:'',
    deduction:'',
    manage:'',
    objectData:{},
    black: true,
    blacks: true,
    black1:true,
    black2:true,
    black3:true
  },
  moneyChange:function(e){
    this.setData({
      money:e.detail.value
    })
    let that = this;
    let array = ['1年', '2年', '3年', '5年', '3个月', '6个月'];
    let money = this.data.money;
    let time = array[this.data.index];
    let apr = this.data.custodyData;
    if(money){
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiBank',
        data: {
          money: money,
          time: time,
          time_type: '',
          apr: apr
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            trueMoney: res.data.data.lixi,
            interestMoney: res.data.data.benxi,
            objectData:res.data
          })
        }
      })
    }
  },
  colorChange:function(e){
    let that = this;
    let name = e.currentTarget.dataset.id;
    if(name === '银行理财') {
      that.setData({
        color:false,
        colors:true,
        one:true
      })
    }else{
      that.setData({
        color: true,
        colors: false,
        one:false
      })
    }
  },
  changeCircle:function(e){
    let that = this;
    let name = e.currentTarget.dataset.text;
    if(name == '1'){
      this.setData({
        choose:false
      })
    }else{
      this.setData({
        choose: true
      })
    }
    let pmoney = this.data.pmoney;
    let begin = this.data.dates;
    let color3 = this.data.color3;
    let time_type = '';
    let time = this.data.pyear;
    let apr = this.data.prate;
    let choose = this.data.choose;
    let color5 = this.data.color5;
    let apr_type = '';
    let year_days = '365';
    let huankuan_type = '';
    let type = this.data.types;
    let fanxian = this.data.reward;
    let dikou = this.data.deduction;
    let guanli_fee = this.data.manage;
    let show = this.data.show;
    let index1 = this.data.index1;
    let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let fuxiri = '';

    //利率
    if (choose) {
      year_days = '365';
    }else{
      year_days = '360';
    }
    if (color5) {
      apr_type = 'd';
    } else {
      apr_type = 'y';
    }
    //理财期限
    if (color3) {
      time_type = 'd';
    } else {
      time_type = 'm';
    }
    //还款方式
    if (type) {
      huankuan_type = parseInt(this.data.index2) + 1;
  
    } else {
      if (this.data.index2 == 0) {
        huankuan_type = 1;
      } else {
        huankuan_type = 5;
      }
    }
    //固定付息日
    if (show) {
      fuxiri = Money[index1];
    }
    // let that = this;
    if (time && pmoney && apr) {
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
        data: {
          money: pmoney,
          begin: begin,
          time_type: time_type,
          time: time,
          apr: apr,
          apr_type: apr_type,
          year_days: year_days,
          huankuan_type: huankuan_type,
          fanxian: fanxian,
          dikou: dikou,
          guanli_fee: guanli_fee,
          fuxiri: fuxiri
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let pdata = res.data.data;
          let padataApr = '';
          let pdataLixi = '';
          if (String(pdata.shiji_apr).length>5){
            padataApr = String(pdata.shiji_apr).substr(0,6) + '...';
          }else{
            padataApr = pdata.shiji_apr;
          }

          if (pdata.yuqi>999999) {
            pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
          } else {
            pdataLixi = pdata.yuqi;
          }
          that.setData({
            percentNum: padataApr,
            percentGet: pdataLixi,
            objectData: res.data
          })
        }
      })
    } else {
      that.setData({
        percentNum: 0,
        percentGet: 0,
        objectData: {}
      })
    }
  },
  bindPickerChange1:function(e){
    let name = e.detail.value;
    if (name == '1') {
      this.setData({
        show: true,
        index3: 1
      })
    } else {
      this.setData({
        show: false,
        index3: e.detail.value
      })
    }
    let pmoney = this.data.pmoney;
    let begin = this.data.dates;
    let color3 = this.data.color3;
    let time_type = '';
    let time = this.data.pyear;
    let apr = this.data.prate;
    let choose = this.data.choose;
    let color5 = this.data.color5;
    let apr_type = '';
    let year_days = '365';
    let huankuan_type = '';
    let type = this.data.types;
    let fanxian = this.data.reward;
    let dikou = this.data.deduction;
    let guanli_fee = this.data.manage;
    let show = this.data.show;
    let index1 = this.data.index1;
    let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let fuxiri = '';

    //利率
    if (!choose) {
      year_days = '360';
    }
    if (color5) {
      apr_type = 'd';
    } else {
      apr_type = 'y';
    }
    //理财期限
    if (color3) {
      time_type = 'd';
    } else {
      time_type = 'm';
    }
    //还款方式
    if (type) {
      huankuan_type = parseInt(this.data.index2) + 1;
    } else {
      if (this.data.index2 == 0) {
        huankuan_type = 1;
      } else {
        huankuan_type = 5;
      }
    }
    //固定付息日
    if (show) {
      fuxiri = Money[index1];
    }
    let that = this;
    if (time && pmoney && apr) {
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
        data: {
          money: pmoney,
          begin: begin,
          time_type: time_type,
          time: time,
          apr: apr,
          apr_type: apr_type,
          year_days: year_days,
          huankuan_type: huankuan_type,
          fanxian: fanxian,
          dikou: dikou,
          guanli_fee: guanli_fee,
          fuxiri: fuxiri
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let pdata = res.data.data;
          let padataApr = '';
          let pdataLixi = '';
          if (pdata.shiji_apr>999999) {
            padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
          } else {
            padataApr = pdata.shiji_apr;
          }

          if (pdata.yuqi>999999) {
            pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
          } else {
            pdataLixi = pdata.yuqi;
          }
          that.setData({
            percentNum: padataApr,
            percentGet: pdataLixi,
            objectData: res.data
          })
        }
      })
    } else {
      that.setData({
        percentNum: 0,
        percentGet: 0,
        objectData: {}
      })
    }
  },
  moneyChanges: function(e) {
    this.setData({
      custodyData: e.detail.value
    })
    let array = ['1年', '2年', '3年', '5年', '3个月', '6个月'];
    let money = this.data.money;
    let time = array[this.data.index];
    let apr = this.data.custodyData;
    let that = this;
    if (money && apr) {
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiBank',
        data: {
          money: money,
          time: time,
          time_type: '',
          apr: apr
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            trueMoney: res.data.data.lixi,
            interestMoney: res.data.data.benxi
            
          })
        }
      })
    }
  },
  bindgiveMoney:function(e){
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    let name = e.detail.value;
    let color1 = this.data.color1;
    if (color1){
      if (name == 0) {
        this.setData({
          index: e.detail.value,
          custodyData: 1.50
        })
      } else if (name == 1) {
        this.setData({
          index: e.detail.value,
          custodyData: 2.10
        })
      } else if (name == 2) {
        this.setData({
          index: e.detail.value,
          custodyData: 2.75
        })
      } else if (name == 3) {
        this.setData({
          index: e.detail.value,
          custodyData: 2.75
        })
      } else if (name == 4) {
        this.setData({
          index: e.detail.value,
          custodyData: 1.10
        })
      } else if (name == 5) {
        this.setData({
          index: e.detail.value,
          custodyData: 1.30
        })
      }
    }else{
      this.setData({
        index: e.detail.value,
        custodyData: 0.35
      })
    
    }
    let that = this;
    let array = ['1年', '2年', '3年', '5年', '3个月', '6个月'];
    let money = this.data.money;
    let time = array[this.data.index];
    let apr = this.data.custodyData;
    if (money && apr) {
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiBank',
        data: {
          money: money,
          time: time,
          time_type: '',
          apr: apr
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            trueMoney: res.data.data.lixi,
            interestMoney: res.data.data.benxi
          })
        }
      })
    }
  },
  bindPickerChanges: function (e) {
    let name = e.detail.value;
    if(name == '4'){
      this.setData({
        show: true,
        index2: 4
      })
    }else{
      this.setData({
        show: false,
        index2: e.detail.value
      })
    }
    let pmoney = this.data.pmoney;
    let begin = this.data.dates;
    let color3 = this.data.color3;
    let time_type = '';
    let time = this.data.pyear;
    let apr = this.data.prate;
    let choose = this.data.choose;
    let color5 = this.data.color5;
    let apr_type = '';
    let year_days = '365';
    let huankuan_type = '';
    let type = this.data.types;
    let fanxian = this.data.reward;
    let dikou = this.data.deduction;
    let guanli_fee = this.data.manage;
    let show = this.data.show;
    let index1 = this.data.index1;
    let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let fuxiri = '';

    //利率
    if (!choose) {
      year_days = '360';
    }
    if (color5) {
      apr_type = 'd';
    } else {
      apr_type = 'y';
    }
    //理财期限
    if (color3) {
      time_type = 'd';
    } else {
      time_type = 'm';
    }
    //还款方式
    if (type) {
      huankuan_type = parseInt(this.data.index2) + 1;
    } else {
      if (this.data.index2 == 0) {
        huankuan_type = 1;
      } else {
        huankuan_type = 5;
      }
    }
    //固定付息日
    if (show) {
      fuxiri = Money[index1];
    }
    let that = this;
    if (time && pmoney && apr) {
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
        data: {
          money: pmoney,
          begin: begin,
          time_type: time_type,
          time: time,
          apr: apr,
          apr_type: apr_type,
          year_days: year_days,
          huankuan_type: huankuan_type,
          fanxian: fanxian,
          dikou: dikou,
          guanli_fee: guanli_fee,
          fuxiri: fuxiri
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let pdata = res.data.data;
          let padataApr = '';
          let pdataLixi = '';
          if (pdata.shiji_apr>999999) {
            padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
          } else {
            padataApr = pdata.shiji_apr;
          }

          if (pdata.yuqi>999999) {
            pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
          } else {
            pdataLixi = pdata.yuqi;
          }
          that.setData({
            percentNum: padataApr,
            percentGet: pdataLixi,
            objectData: res.data
          })
        }
      })
    } else {
      that.setData({
        percentNum: 0,
        percentGet: 0,
        objectData: {}
      })
    }
  },
  colorsChange:function(e) {
    let that = this;
    let name = e.currentTarget.dataset.id;
    let indexDay = this.data.index;
    if (name === '活期') {
      that.setData({
        color1: false,
        color2: true,
        custodyData: 0.35   
      })
      let array = ['1年', '2年', '3年', '5年', '3个月', '6个月'];
      let money = this.data.money;
      let time = array[this.data.index];
      let apr = this.data.custodyData;
      if (money && apr) {
        wx.request({
          url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiBank',
          data: {
            money: money,
            time: time,
            time_type: '',
            apr: apr
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              trueMoney: res.data.data.lixi,
              interestMoney: res.data.data.benxi
            })
          }
        })
      }
    } else if (name === '定期') {
      let index = this.data.index;
      let custodyData = this.data.custodyData;
      let year = this.data.color3;
      if (index == 0) {
        that.setData({
          color1: true,
          color2: false,
          custodyData:1.50
        })
      } else if (index == 1) {
        that.setData({
          color1: true,
          color2: false,
          custodyData: 2.10
        })
      } else if (index == 2) {
        that.setData({
          color1: true,
          color2: false,
          custodyData: 2.75
        })
      } else if (index == 3) {
        that.setData({
          color1: true,
          color2: false,
          custodyData: 2.75
        })
      } else if (index == 4) {
        that.setData({
          color1: true,
          color2: false,
          custodyData: 1.10
        })
      } else if (index == 5) {
        that.setData({
          color1: true,
          color2: false,
          custodyData: 1.30
        })
      }
      let array = ['1年', '2年', '3年', '5年', '3个月', '6个月'];
      let money = this.data.money;
      let time = array[this.data.index];
      let apr = this.data.custodyData;
      if (money && apr) {
        wx.request({
          url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiBank',
          data: {
            money: money,
            time: time,
            time_type: '',
            apr: apr
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              trueMoney: res.data.data.lixi,
              interestMoney: res.data.data.benxi
            })
          }
        })
      }
    } else if (name === '月'){
      that.setData({
        types: true,
        color3: false,
        color4: true,
        show: false
      })
      let pmoney = this.data.pmoney;
      let begin = this.data.dates;
      let color3 = this.data.color3;
      let time_type = '';
      let time = this.data.pyear;
      let apr = this.data.prate;
      let choose = this.data.choose;
      let color5 = this.data.color5;
      let apr_type = '';
      let year_days = '365';
      let huankuan_type = '';
      let type = this.data.types;
      let fanxian = this.data.reward;
      let dikou = this.data.deduction;
      let guanli_fee = this.data.manage;
      let show = this.data.show;
      let index1 = this.data.index1;
      let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      let fuxiri = '';

      //利率
      if (!choose) {
        year_days = '360';
      }
      if (color5) {
        apr_type = 'd';
      } else {
        apr_type = 'y';
      }
      //理财期限
      if (color3) {
        time_type = 'd';
      } else {
        time_type = 'm';
      }
      //还款方式
      if (type) {
        huankuan_type = parseInt(this.data.index2) + 1;
      } else {
        if (this.data.index2 == 0) {
          huankuan_type = 1;
        } else {
          huankuan_type = 5;
        }
      }
      //固定付息日
      if (show) {
        fuxiri = Money[index1];
      }
      if (apr && pmoney && time) {
        wx.request({
          url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
          data: {
            money: pmoney,
            begin: begin,
            time_type: time_type,
            time: time,
            apr: apr,
            apr_type: apr_type,
            year_days: year_days,
            huankuan_type: huankuan_type,
            fanxian: fanxian,
            dikou: dikou,
            guanli_fee: guanli_fee,
            fuxiri: fuxiri
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            let pdata = res.data.data;
            let padataApr = '';
            let pdataLixi = '';
            if (pdata.shiji_apr>999999) {
              padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
            } else {
              padataApr = pdata.shiji_apr;
            }

            if (pdata.yuqi>999999) {
              pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
            } else {
              pdataLixi = pdata.yuqi;
            }
            that.setData({
              percentNum: padataApr,
              percentGet: pdataLixi,
              objectData: res.data
            })
          }
        })
      } else {
        that.setData({
          percentNum: 0,
          percentGet: 0,
          objectData: {}
        })
      }

    } else if (name === '日') {
      that.setData({
        color3: true,
        color4: false,
        types: false,
        show: false
      })
      let pmoney = this.data.pmoney;
      let begin = this.data.dates;
      let color3 = this.data.color3;
      let time_type = '';
      let time = this.data.pyear;
      let apr = this.data.prate;
      let choose = this.data.choose;
      let color5 = this.data.color5;
      let apr_type = '';
      let year_days = '365';
      let huankuan_type = '';
      let type = this.data.types;
      let fanxian = this.data.reward;
      let dikou = this.data.deduction;
      let guanli_fee = this.data.manage;
      let show = this.data.show;
      let index1 = this.data.index1;
      let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      let fuxiri = '';

      //利率
      if (!choose) {
        year_days = '360';
      }
      if (color5) {
        apr_type = 'd';
      } else {
        apr_type = 'y';
      }
      //理财期限
      if (color3) {
        time_type = 'd';
      } else {
        time_type = 'm';
      }
      //还款方式
      if (type) {
        huankuan_type = parseInt(this.data.index2) + 1;
      } else {
        if (this.data.index2 == 0) {
          huankuan_type = 1;
        } else {
          huankuan_type = 5;
        }
      }
      //固定付息日
      if (show) {
        fuxiri = Money[index1];
      }
      // let that = this;
      if (apr && pmoney && time) {
        wx.request({
          url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
          data: {
            money: pmoney,
            begin: begin,
            time_type: time_type,
            time: time,
            apr: apr,
            apr_type: apr_type,
            year_days: year_days,
            huankuan_type: huankuan_type,
            fanxian: fanxian,
            dikou: dikou,
            guanli_fee: guanli_fee,
            fuxiri: fuxiri
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            let pdata = res.data.data;
            let padataApr = '';
            let pdataLixi = '';
            if (pdata.shiji_apr>999999) {
              padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
            } else {
              padataApr = pdata.shiji_apr;
            }

            if (pdata.yuqi > 999999) {
              pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
            } else {
              pdataLixi = pdata.yuqi;
            }
            that.setData({
              percentNum: padataApr,
              percentGet: pdataLixi,
              objectData: res.data
            })
          }
        })
      } else {
        that.setData({
          percentNum: 0,
          percentGet: 0,
          objectData: {}
        })
      }

     }else if(name === "年"){
      that.setData({
        color5: false,
        color6: true
      })
      let pmoney = this.data.pmoney;
      let begin = this.data.dates;
      let color3 = this.data.color3;
      let time_type = '';
      let time = this.data.pyear;
      let apr = this.data.prate;
      let choose = this.data.choose;
      let color5 = this.data.color5;
      let apr_type = '';
      let year_days = '365';
      let huankuan_type = '';
      let type = this.data.types;
      let fanxian = this.data.reward;
      let dikou = this.data.deduction;
      let guanli_fee = this.data.manage;
      let show = this.data.show;
      let index1 = this.data.index1;
      let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      let fuxiri = '';

      //利率
      if (!choose) {
        year_days = '360';
      }
      if (color5) {
        apr_type = 'd';
      } else {
        apr_type = 'y';
      }
      //理财期限
      if (color3) {
        time_type = 'd';
      } else {
        time_type = 'm';
      }
      //还款方式
      if (type) {
        huankuan_type = parseInt(this.data.index2) + 1;
      } else {
        if (this.data.index2 == 0) {
          huankuan_type = 1;
        } else {
          huankuan_type = 5;
        }
      }
      //固定付息日
      if (show) {
        fuxiri = Money[index1];
      }
      if (apr && pmoney && time) {
        wx.request({
          url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
          data: {
            money: pmoney,
            begin: begin,
            time_type: time_type,
            time: time,
            apr: apr,
            apr_type: apr_type,
            year_days: year_days,
            huankuan_type: huankuan_type,
            fanxian: fanxian,
            dikou: dikou,
            guanli_fee: guanli_fee,
            fuxiri: fuxiri
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            let pdata = res.data.data;
            let padataApr = '';
            let pdataLixi = '';
            if (pdata.shiji_apr>999999) {
              padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
            } else {
              padataApr = pdata.shiji_apr;
            }

            if (pdata.yuqi>999999) {
              pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
            } else {
              pdataLixi = pdata.yuqi;
            }
            that.setData({
              percentNum: padataApr,
              percentGet: pdataLixi,
              objectData: res.data
            })
          }
        })
      } else {
        that.setData({
          percentNum: 0,
          percentGet: 0,
          objectData: {}
        })
      }

    } else if (name === "日6") {
      that.setData({
        color5: true,
        color6: false
      })
      let pmoney = this.data.pmoney;
      let begin = this.data.dates;
      let color3 = this.data.color3;
      let time_type = '';
      let time = this.data.pyear;
      let apr = this.data.prate;
      let choose = this.data.choose;
      let color5 = this.data.color5;
      let apr_type = '';
      let year_days = '365';
      let huankuan_type = '';
      let type = this.data.types;
      let fanxian = this.data.reward;
      let dikou = this.data.deduction;
      let guanli_fee = this.data.manage;
      let show = this.data.show;
      let index1 = this.data.index1;
      let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      let fuxiri = '';

      //利率
      if (!choose) {
        year_days = '360';
      }
      if (color5) {
        apr_type = 'd';
      } else {
        apr_type = 'y';
      }
      //理财期限
      if (color3) {
        time_type = 'd';
      } else {
        time_type = 'm';
      }
      //还款方式
      if (type) {
        huankuan_type = parseInt(this.data.index2) + 1;

      } else {
        if (this.data.index2 == 0) {
          huankuan_type = 1;
        } else {
          huankuan_type = 5;
        }
      }
      //固定付息日
      if (show) {
        fuxiri = Money[index1];
      }
      if (apr && pmoney && time) {
        wx.request({
          url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
          data: {
            money: pmoney,
            begin: begin,
            time_type: time_type,
            time: time,
            apr: apr,
            apr_type: apr_type,
            year_days: year_days,
            huankuan_type: huankuan_type,
            fanxian: fanxian,
            dikou: dikou,
            guanli_fee: guanli_fee,
            fuxiri: fuxiri
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            let pdata = res.data.data;
            let padataApr = '';
            let pdataLixi = '';
            if (pdata.shiji_apr>999999) {
              padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
            } else {
              padataApr = pdata.shiji_apr;
            }

            if (pdata.yuqi>999999) {
              pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
            } else {
              pdataLixi = pdata.yuqi;
            }
            that.setData({
              percentNum: padataApr,
              percentGet: pdataLixi,
              objectData: res.data
            })
          }
        })
      } else {
        that.setData({
          percentNum: 0,
          percentGet: 0,
          objectData: {}
        })
      }

    }
  },
  skip:function(e){
    wx.navigateTo({
      url: '/pages/index/table/table',
    })
  },
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  check:function(e) {
    wx.setStorage({
      key: 'userName',
      data: this.data.objectData
    });
    console.log(this.data.percentNum !== 0 && this.data.percentGet !== 0)
    if (this.data.percentNum!== 0 && this.data.percentGet !== 0){
      wx.navigateTo({
        url: '/pages/index/examine/examine',
      })
    }
    
  },
  onShareAppMessage: function (res) {
    return {
      title: '能帮你算账的理财计算器',
      path: '/pages/index/index',
      imageUrl: '/images/count.png'
    }
  },
  pChange: function(e){
    this.setData({
      pmoney: e.detail.value
    })
    let pmoney = this.data.pmoney;
    let begin = this.data.dates;
    let color3 = this.data.color3;
    let time_type = '';
    let time = this.data.pyear;
    let apr = this.data.prate;
    let choose = this.data.choose;
    let color5 = this.data.color5;
    let apr_type = '';
    let year_days = '365';
    let huankuan_type = '';
    let type = this.data.types;
    let fanxian = this.data.reward;
    let dikou = this.data.deduction;
    let guanli_fee = this.data.manage;
    let show = this.data.show;
    let index1 = this.data.index1;
    let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let fuxiri = '';
    
    //利率
    if (!choose) {
      year_days = '360';
    }
    if (color5) {
      apr_type = 'd';
    } else {
      apr_type = 'y';
    }
    //理财期限
    if (color3) {
      time_type = 'd';
    } else {
      time_type = 'm';
    }
    //还款方式
    if (type) {
      huankuan_type = parseInt(this.data.index2) + 1;
      console.log(huankuan_type)
    } else {
      if (this.data.index2 == 0) {
        huankuan_type = 1;
      } else {
        huankuan_type = 5;
      }
    }
    //固定付息日
    if (show) {
      fuxiri = Money[index1];
    }
    let that = this;
    if (apr && pmoney && time){
       wx.request({
         url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
         data: {
           money: pmoney,
           begin: begin,
           time_type: time_type,
           time: time,
           apr: apr,
           apr_type: apr_type,
           year_days: year_days,
           huankuan_type: huankuan_type,
           fanxian: fanxian,
           dikou: dikou,
           guanli_fee: guanli_fee,
           fuxiri: fuxiri
         },
         header: {
           'content-type': 'application/json' // 默认值
         },
         success: function (res) {
           let pdata = res.data.data;
           let padataApr = '';
           let pdataLixi = '';
           if (pdata.shiji_apr>999999) {
             padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
           } else {
             padataApr = pdata.shiji_apr;
           }

           if (pdata.yuqi>999999) {
             pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
           } else {
             pdataLixi = pdata.yuqi;
           }
           that.setData({
             percentNum: padataApr,
             percentGet: pdataLixi,
             objectData: res.data
           })
         }
       })
     }else{
      that.setData({
        percentNum: 0,
        percentGet: 0,
        objectData:{}
      })
     }
  
  },
  yearChange: function(e){
    this.setData({
      pyear: e.detail.value
    })
    let pmoney = this.data.pmoney;
    let begin = this.data.dates;
    let color3 = this.data.color3;
    let time_type = '';
    let time = this.data.pyear;
    let apr = this.data.prate;
    let choose = this.data.choose;
    let color5 = this.data.color5;
    let apr_type = '';
    let year_days = '365';
    let huankuan_type = '';
    let type = this.data.types;
    let fanxian = this.data.reward;
    let dikou = this.data.deduction;
    let guanli_fee = this.data.manage;
    let show = this.data.show;
    let index1 = this.data.index1;
    let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let fuxiri = '';

    //利率
    if (!choose) {
      year_days = '360';
    }
    if (color5) {
      apr_type = 'd';
    } else {
      apr_type = 'y';
    }
    //理财期限
    if (color3) {
      time_type = 'd';
    } else {
      time_type = 'm';
    }
    //还款方式
    if (type) {
      huankuan_type = parseInt(this.data.index2) + 1;
      console.log(huankuan_type)
    } else {
      if (this.data.index2 == 0) {
        huankuan_type = 1;
      } else {
        huankuan_type = 5;
      }
    }
    //固定付息日
    if (show) {
      fuxiri = Money[index1];
    }
    let that = this;
    if(time && pmoney && apr){
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
        data: {
          money: pmoney,
          begin: begin,
          time_type: time_type,
          time: time,
          apr: apr,
          apr_type: apr_type,
          year_days: year_days,
          huankuan_type: huankuan_type,
          fanxian: fanxian,
          dikou: dikou,
          guanli_fee: guanli_fee,
          fuxiri: fuxiri
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let pdata = res.data.data;
          let padataApr = '';
          let pdataLixi = '';
          if (pdata.shiji_apr>999999) {
            padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
          } else {
            padataApr = pdata.shiji_apr;
          }

          if (pdata.yuqi>999999) {
            pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
          } else {
            pdataLixi = pdata.yuqi;
          }
          that.setData({
            percentNum: padataApr,
            percentGet: pdataLixi,
            objectData: res.data
          })
        }
      })
    }else{
      that.setData({
        percentNum: 0,
        percentGet:0,
        objectData: {}
      })
    }
   
  },
  rewardTap:function(e){
    this.setData({
      reward: e.detail.value
    })
    let pmoney = this.data.pmoney;
    let begin = this.data.dates;
    let color3 = this.data.color3;
    let time_type = '';
    let time = this.data.pyear;
    let apr = this.data.prate;
    let choose = this.data.choose;
    let color5 = this.data.color5;
    let apr_type = '';
    let year_days = '365';
    let huankuan_type = '';
    let type = this.data.types;
    let fanxian = this.data.reward;
    let dikou = this.data.deduction;
    let guanli_fee = this.data.manage;
    let show = this.data.show;
    let index1 = this.data.index1;
    let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let fuxiri = '';
    //利率
    if (!choose) {
      year_days = '360';
    }
    if (color5) {
      apr_type = 'd';
    } else {
      apr_type = 'y';
    }
    //理财期限
    if (color3) {
      time_type = 'd';
    } else {
      time_type = 'm';
    }
    //还款方式
    if (type) {
      huankuan_type = parseInt(this.data.index2) + 1;
      console.log(huankuan_type)
    } else {
      if (this.data.index2 == 0) {
        huankuan_type = 1;
      } else {
        huankuan_type = 5;
      }
    }
    //固定付息日
    if (show) {
      fuxiri = Money[index1];
    }
    let that = this;
    if (time && pmoney && apr) {
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
        data: {
          money: pmoney,
          begin: begin,
          time_type: time_type,
          time: time,
          apr: apr,
          apr_type: apr_type,
          year_days: year_days,
          huankuan_type: huankuan_type,
          fanxian: fanxian,
          dikou: dikou,
          guanli_fee: guanli_fee,
          fuxiri: fuxiri
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let pdata = res.data.data;
          let padataApr = '';
          let pdataLixi = '';
          if (pdata.shiji_apr>999999) {
            padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
          } else {
            padataApr = pdata.shiji_apr;
          }

          if (pdata.yuqi>999999) {
            pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
          } else {
            pdataLixi = pdata.yuqi;
          }
          that.setData({
            percentNum: padataApr,
            percentGet: pdataLixi,
            objectData: res.data
          })
        }
      })
    } else {
      that.setData({
        percentNum: 0,
        percentGet: 0,
        objectData: {}
      })
    }
  },
  deductionTap:function(e){
    this.setData({
      deduction: e.detail.value
    })
    let pmoney = this.data.pmoney;
    let begin = this.data.dates;
    let color3 = this.data.color3;
    let time_type = '';
    let time = this.data.pyear;
    let apr = this.data.prate;
    let choose = this.data.choose;
    let color5 = this.data.color5;
    let apr_type = '';
    let year_days = '365';
    let huankuan_type = '';
    let type = this.data.types;
    let fanxian = this.data.reward;
    let dikou = this.data.deduction;
    let guanli_fee = this.data.manage;
    let show = this.data.show;
    let index1 = this.data.index1;
    let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let fuxiri = '';

    //利率
    if (!choose) {
      year_days = '360';
    }
    if (color5) {
      apr_type = 'd';
    } else {
      apr_type = 'y';
    }
    //理财期限
    if (color3) {
      time_type = 'd';
    } else {
      time_type = 'm';
    }
    //还款方式
    if (type) {
      huankuan_type = parseInt(this.data.index2) + 1;
      console.log(huankuan_type)
    } else {
      if (this.data.index2 == 0) {
        huankuan_type = 1;
      } else {
        huankuan_type = 5;
      }
    }
    //固定付息日
    if (show) {
      fuxiri = Money[index1];
    }
    let that = this;
    if (time && pmoney && apr) {
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
        data: {
          money: pmoney,
          begin: begin,
          time_type: time_type,
          time: time,
          apr: apr,
          apr_type: apr_type,
          year_days: year_days,
          huankuan_type: huankuan_type,
          fanxian: fanxian,
          dikou: dikou,
          guanli_fee: guanli_fee,
          fuxiri: fuxiri
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let pdata = res.data.data;
          let padataApr = '';
          let pdataLixi = '';
          if (pdata.shiji_apr>999999) {
            padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
          } else {
            padataApr = pdata.shiji_apr;
          }

          if (pdata.yuqi>999999) {
            pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
          } else {
            pdataLixi = pdata.yuqi;
          }
          that.setData({
            percentNum: padataApr,
            percentGet: pdataLixi,
            objectData: res.data
          })
        }
      })
    } else {
      that.setData({
        percentNum: 0,
        percentGet: 0,
        objectData: {}
      })
    }
  },
  manageTap:function(e){
    this.setData({
      manage: e.detail.value
    })
    let pmoney = this.data.pmoney;
    let begin = this.data.dates;
    let color3 = this.data.color3;
    let time_type = '';
    let time = this.data.pyear;
    let apr = this.data.prate;
    let choose = this.data.choose;
    let color5 = this.data.color5;
    let apr_type = '';
    let year_days = '365';
    let huankuan_type = '';
    let type = this.data.types;
    let fanxian = this.data.reward;
    let dikou = this.data.deduction;
    let guanli_fee = this.data.manage;
    let show = this.data.show;
    let index1 = this.data.index1;
    let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    let fuxiri = '';

    //利率
    if (!choose) {
      year_days = '360';
    }
    if (color5) {
      apr_type = 'd';
    } else {
      apr_type = 'y';
    }
    //理财期限
    if (color3) {
      time_type = 'd';
    } else {
      time_type = 'm';
    }
    //还款方式
    if (type) {
      huankuan_type = parseInt(this.data.index2) + 1;
      console.log(huankuan_type)
    } else {
      if (this.data.index2 == 0) {
        huankuan_type = 1;
      } else {
        huankuan_type = 5;
      }
    }
    //固定付息日
    if (show) {
      fuxiri = Money[index1];
    }
    let that = this;
    if (time && pmoney && apr) {
      wx.request({
        url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
        data: {
          money: pmoney,
          begin: begin,
          time_type: time_type,
          time: time,
          apr: apr,
          apr_type: apr_type,
          year_days: year_days,
          huankuan_type: huankuan_type,
          fanxian: fanxian,
          dikou: dikou,
          guanli_fee: guanli_fee,
          fuxiri: fuxiri
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let pdata = res.data.data;
          let padataApr = '';
          let pdataLixi = '';
          if (pdata.shiji_apr>999999) {
            padataApr = (pdata.shiji_apr + '').substr(0, 6) + '...';
          } else {
            padataApr = pdata.shiji_apr;
          }

          if (pdata.yuqi>999999) {
            pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
          } else {
            pdataLixi = pdata.yuqi;
          }
          that.setData({
            percentNum: padataApr,
            percentGet: pdataLixi,
            objectData: res.data
          })
        }
      })
    } else {
      that.setData({
        percentNum: 0,
        percentGet: 0,
        objectData: {}
      })
    }
  },
 rateChange:function(e){
   this.setData({
     prate: e.detail.value
   })
   let pmoney = this.data.pmoney;
   let begin = this.data.dates;
   let color3 = this.data.color3;
   let time_type = '';
   let time = this.data.pyear;
   let apr = this.data.prate;
   let choose = this.data.choose;
   let color5 = this.data.color5;
   let apr_type = '';
   let year_days = '365';
   let huankuan_type = '';
   let type = this.data.types;
   let fanxian = this.data.reward;
   let dikou = this.data.deduction;
   let guanli_fee = this.data.manage;
   let show = this.data.show;
   let index1 = this.data.index1;
   let Money = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
   let fuxiri ='';
   //利率
   if (!choose) {
     year_days = '360';
   }
   if (color5) {
     apr_type = 'd';
   } else {
     apr_type = 'y';
   }
   //理财期限
   if (color3) {
     time_type = 'd';
   } else {
     time_type = 'm';
   }
   //还款方式
   if(type){
     huankuan_type = parseInt(this.data.index2) +1;
     (huankuan_type)
   }else{
     if (this.data.index2 == 0){
       huankuan_type = 1;
     }else{
       huankuan_type = 5;
     }
   }
   //固定付息日
   if(show){
      fuxiri = Money[index1];
   }
   let that = this;
   if (time && pmoney && apr) {
     wx.request({
       url: 'https://www.youjin360.com/?m=Mobile&s=jisuanqiWd',
       data: {
         money: pmoney,
         begin: begin,
         time_type: time_type,
         time: time,
         apr: apr,
         apr_type: apr_type,
         year_days: year_days,
         huankuan_type: huankuan_type,
         fanxian: fanxian,
         dikou: dikou,
         guanli_fee: guanli_fee,
         fuxiri: fuxiri
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
          let pdata = res.data.data;
          let padataApr = '';
          let pdataLixi = '';
          if (String(pdata.shiji_apr).length>5){
            padataApr = String(pdata.shiji_apr).substr(0,6) + '...';
          }else{
            padataApr = pdata.shiji_apr;
          }

          if (pdata.yuqi>999999) {
            pdataLixi = String(pdata.yuqi).substr(0, 6) + '...';
          } else {
            pdataLixi = pdata.yuqi;
          }
          that.setData({
            percentNum: padataApr,
            percentGet: pdataLixi,
            objectData: res.data
          })
       }
     })
   } else {
     that.setData({
       percentNum: 0,
       percentGet: 0,
       objectData: {}
     })
   }
 },
 bindReplaceInput:function(e){
   this.setData({
     black:false
   })
 },
 bindReplaceInputs: function (e) {
   this.setData({
     blacks: false
   })
 },
 bindReplaceInput1: function (e) {
   this.setData({
     black1: false
   })
 },
 bindReplaceInput2: function (e) {
   this.setData({
     black2: false
   })
 },
 bindReplaceInput3: function (e) {
   this.setData({
     black3: false
   })
 }
})
