Page({
  data:{
    indexs:'月月升',
    checkbox: [],
    id:[],
    i:2
  },
  insert: function (e) {
    let cb = this.data.checkbox;
    let id = this.data.id;
    let i = Number(this.data.i) + 1;
    cb.push(this.data.checkbox.length);
    id.push(i)
    this.setData({
      checkbox: cb,
      i:i,
      id:id

    });
  },
  inserts: function(e){
    let cb = this.data.checkbox;
    let id = this.data.id;
    let i = Number(this.data.i) - 1;
    if(i <= 2){
      cb.pop();
      id = [];
      i = 2;
    }else{
      cb.pop();
      id.pop();
    }
   
    this.setData({
      checkbox: cb,
      i: i,
      id: id
    })
  }
   
})