Page({
  data: {
    arrays: [{
      title: '活期自动普拉多抵押',
      tel: '6037',
      yesNum: 3.75,
      all: 1000,
      getMoney: 1003.75,
      id: '1'
    },
    {
      title: '活期自动普拉多抵押',
      tel: '6037',
      yesNum: 3.75,
      all: 1000,
      getMoney: 1003.75,
      id: '2'
    }, {
      title: '活期自动普拉多抵押',
      tel: '6037',
      yesNum: 3.75,
      all: 1000,
      getMoney: 1003.75,
      id: '3'
    }, {
      title: '定期自动普拉多抵押',
      tel: '6037',
      yesNum: 3.75,
      all: 1000,
      getMoney: 1003.75,
      id: '4'
    }],
    list:0
  },
  bindList: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/count/plateform/monthAdd/monthAdd?id=' + id,
    })
  },
  selectStatus: function (e) {
    this.setData({
      list:1
    })
  },
  bindCancle:function(e){
    this.setData({
      list:0
    })
  }
})