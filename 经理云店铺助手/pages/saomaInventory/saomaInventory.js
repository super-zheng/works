// pages/saomaInventory/saomaInventory.js
let arr = [{
  num: 1,
  type: 1,
  title: '陈雷帅的一匹',
  id1:'id1',
  id2:'id2',
  stock:1,
  detail: ['+0.00', '+0.00',"2"]
},
{
  num: 1,
  type: 1,
  id1: 'id11',
  id2: 'id21',
  stock:1,
  title: '田榈彬帅的两匹',
  detail: ['+0.50', '+1.00', '2']
},
{
  num: 1,
  type: 1,
  id1:'id1',
  id2:'id22',
  title: '陈雷帅的一匹',
  stock:1,
  detail: ['+3.00', '+2.00', '2']
},
{
  num: 1,
  type: 1,
  id1: 'id12',
  id2: 'id23',
  title: '文导最拉轰',
  stock: 1,
  detail: ['+3.00', '+2.00', '14', '2']
}, {
  num: 1,
  type: 2,
  id1: 'id12',
  id2: 'id23',
  title: '文导最拉轰2',
  stock: 1,
  detail: ['C011522522', '2']
},
  
]
var index = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newArr: [],
    id2:''
  },
  //扫码
  addGoods:function(){
    var goodObj = arr[index]; 
    this.setData({
      id2:goodObj.id2,
      newArr: createObj(goodObj)
    })
    console.log(newArr)
    index++;
    if(index>=arr.length){
      index=0;
    }
  },
  //数量加减按钮
  jian: function (e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
     //{arr:arr,id:id,jia:-1}
    var arr = this.data.newArr;
    this.setData({
      newArr: changeNum({
        arr:arr,
        id:id,
        jia:-1
      })
    })
  },
  jia: function (e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var arr = this.data.newArr;
    this.setData({
      newArr: changeNum({
        arr: arr,
        id: id,
        jia: 1
      })
    })
  },
  //输入框事件
  changeInput:function(e){
    var id = e.currentTarget.dataset.id;
    var arr = this.data.newArr;
    var num = e.detail.value;
    var arr = this.data.newArr;
    num = parseInt(num.replace(/[^\d]/g, ''))
    this.setData({
      newArr: changeNum({
        arr: arr,
        id: id,
        num: num
      })
    })
    console.log(newArr)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
//定义显示内容
var goodstitle = [
  ['球镜', '柱镜', '库存', '差值', '数量'],
  ['色号', '库存', '数量', '差值'],
  ['色号', '库存', '数量', '差值'],
  ['球镜', '柱镜', '库存', '数量', '差值'],
  ['球镜', '柱镜', '库存', '数量', '差值'],
  ['规格(ml)', '库存', '数量', '差值'],
  ['尺寸', '库存', '数量', '差值']
];
var newObj={};
var newArr = [];
function createObj(goodObj){
  if (!newObj[goodObj.title]) {
    // if (goodObj.type == 1) {
      newObj[goodObj.title] = {
        id1:goodObj.id1,
        head: goodstitle[goodObj.type-1],
        body: [{
          args: goodObj.detail.join(','),
          num: goodObj.num,
          id2:goodObj.id2,
          stock:goodObj.stock,
        }]
      }
    // }
    newArr.unshift({
      title: goodObj.title,
      content: newObj[goodObj.title]
    })
  } else {
    var flag = true;
    newObj[goodObj.title].body.forEach(function (item1, index1) {
      console.log(item1);
      if (item1.id2 == goodObj.id2) {
        item1.num++;
        flag = false;
        item1.stock = goodObj.stock;
      }
    })
    if (flag) {
      newObj[goodObj.title].body.push({
        args: goodObj.detail.join(','),
        num: goodObj.num,
        id2: goodObj.id2,
        stock: goodObj.stock
      })
    }
    newArr.forEach(function (item, index) {
      if (item.title == goodObj.title) {
        newArr.splice(index, 1);
      }
    })
    newArr.unshift({
      title: goodObj.title,
      content: newObj[goodObj.title]
    })
  }
  newArr.forEach(function (item, index) {
    item.content.body.forEach(function (item1, index) {
      if (typeof (item1.args) == 'string') {
        item1.args = item1.args.split(',');
      }

    })
  })
  return newArr
}

function changeNum(obj){
  //{arr:arr,id:id,jia:-1,num:12}
  obj.arr.forEach(function(item,index){
    item.content.body.forEach(function(item1,index1){
      if(item1.id2 == obj.id){
        if(obj.num!=undefined){
          item1.num = obj.num;
        }else{
          item1.num += obj.jia;
          if (item1.num < 0) {
            item1.num = 0;
          }
        }
      }
    });
  });
  return obj.arr;
}
