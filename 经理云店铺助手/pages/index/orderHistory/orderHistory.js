// pages/orderHistory/orderHistory.js
var nowTime = new Date().Format('yyyy-MM-dd');
const color = {
  '0': 'colorOrange',
  '-1': 'color777',
  '1': 'colorblue'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTime: nowTime,
    times: {
      startTime: nowTime,
      overTime: nowTime
    },
    color: color,
    lists: [
      { number: '2018030515211111', time: '2018-05-28 14:33:25', guke: '文韬', staff: '小甜甜', state: '0', money: 200, check: false },
      { number: '2018030515211112', time: '2018-05-28 14:33:30', guke: '盼盼', staff: '小九九', state: '0', money: 250, check: false },
      { number: '2018030515211113', time: '2018-05-28 14:34:25', guke: '大雷', staff: '小彬彬', state: '1', money: 110, check: false },
      { number: '2018030515211114', time: '2018-05-28 14:35:25', guke: '豪哥', staff: '成成', state: '-1', money: 120, check: false }
    ],
    checkAll: false
  },
  bindDateChange: function (e) {
    var times = this.data.times;
    console.log(e);
    times[e.currentTarget.dataset.times] = e.detail.value;
    this.setData({
      times: times
    })
    console.log(this.data.times)
  },
  //左侧选择按钮
  checkOrder: function (e) {
    console.log(e)
    var lists = this.data.lists;
    var id = e.currentTarget.dataset.id;

    lists.forEach(function (item, index) {
      if (item.number == id) {
        item.check = !item.check;
      }
    })
    var checkLists = lists.filter(function (item, index) {
      return item.check == true;
    });

    var checkAll = this.data.checkAll;
    if (checkLists.length == lists.length) {
      checkAll = true;
    } else {
      checkAll = false;
      console.log(checkAll)
    }

    this.setData({
      lists: lists,
      checkAll: checkAll
    })
  },
  del: function () {
   var that =this;
    var lists = this.data.lists;
    var lists1 = lists.filter(function (item, index) {
      return item.check == false;
    });
    var checkAll = this.data.checkAll;
    if (lists1.length == 0) {
      checkAll = false;
    }
    var delArr = lists.filter(function (item, index) {//删除的订单数组
      return item.check == true;
    });
    var str = '';
    if (delArr.length == 0){
      str = "请选择订单"
    }else{
      str = "删除选中的订单"
    }
    wx.showModal({
      title: str,
      success: function (res) {
        if (res.confirm) {
          if(delArr.length!=0){
            that.setData({
              lists: lists1,
              checkAll: checkAll
            })
          //delArr就是删除的订单数组
          }

        } else if (res.cancel) {

        }
      }
    })
    
  },
  //查看详情
  toDetail: function (e) {
    //id为销售单号 此处跳转至详情页 参数为销售单号
    var id = e.currentTarget.dataset.id;

  },
  //全选按钮
  checkAll: function (e) {
    var lists = this.data.lists;
    var checkAlls = !this.data.checkAll;
    if (checkAlls) {
      lists.forEach(function (item, index) {
        item.check = true;
      })
    } else {
      lists.forEach(function (item, index) {
        item.check = false;
      })
    }
    this.setData({
      checkAll: checkAlls,
      lists: lists
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.lists)
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