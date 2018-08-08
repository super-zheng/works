// pages/orderHistory/orderHistory.js
var nowTime = new Date().Format('yyyy-MM-dd');
const color = {
  '0': 'colorOrange',
  '-1': 'color777',
  '1': 'colorblue',
  '200':'colorRed'
}
const Status ={
  '0': '已付清 ',
  '-1': '未付清',
  '1': '已交付',
  '200': '手机端订单'
}
var Index = 0;
var page = 20;
var over = false;
var app = getApp();
//展示订单数据
function loadList(that, types) {//flag==1，数据累加，flag==2 数据清空
  var sql = { "code": "A10", "accesstoken": "select f.*,b.user_realname,c.vip_id,c.vip_tel,d.customer_name FROM tb_ivtfather f LEFT JOIN tb_user b on ity_operatPersonId = user_id LEFT JOIN tb_vip c on f.ity_saleid = c.vip_id LEFT JOIN tb_customer d on c.customer_id =d.customer_id WHERE  f.store_id =" + app.globalData.store_id + " and ity_operatPersonId =" + app.globalData.user_id+" AND f.ity_type= 1 and date_format(ity_date,'%Y-%m-%d') between '" + that.data.times.startTime + "' and '" + that.data.times.overTime + "' ORDER BY ity_date desc limit " + (Index * page) + ",20" };
  // var id = { "store_id": app.globalData.store_id, "user_id": app.globalData.cutdetil.vip_id, "where": "" };
  // console.log(id)
  //发请求 加载数据
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    data: {
      par1: 'common',
      par2: 'api',
      ids: sql,
    }, header: {
      'content-type': 'application/json' // 默认值
    },
    method: "GET",
    success: function (res) {
      console.log(res)
      // that.setData({
      //   lists: []
      // })
      if (res.data.code == 200) {
        var list = res.data.data;
        var lists = [];
        if (types==1){
          lists = that.data.lists;
        }
        for (var i = 0; i < list.length; i++) {
          var detil = { number: list[i].ity_Number, time: new Date(list[i].ity_date).Format('yyyy-MM-dd HH:mm:ss'), guke: list[i].customer_name, staff: list[i].user_realname, state: list[i].ity_status, money: list[i].ity_logNumber, check: false, ity_id: list[i].ity_id, vip_id: list[i].ity_saleid }
          lists.push(detil)
        }
        that.setData({
          lists: lists
        })
        Index++;
        console.log(that.data.lists)
        wx.showToast({
          title: '加载成功！',
          duration: 500
        })
        over = false;
      } else if (res.data.code == 201) {
        wx.showToast({
          title: '暂无订单！',
          image: '../images/warn.png',
          duration: 1000
        })
        over = true;
      } else {
        over = true;
        wx.showToast({
          title: '请刷新重试！',
          image: '../images/warn.png',
          duration: 1000
        })
      }
    }
  })
  console.log(that.data.lists)
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
    Status: Status,
    lists: [],
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
    var that = this
    console.log(app.globalData.cutdetil)
    Index = 0;
    loadList(that, 2);
    // var id = { "store_id": app.globalData.store_id, "user_id": app.globalData.cutdetil.vip_id, "where": "and ity_date between '" + this.data.times.startTime + "' and '" + this.data.times.overTime + "'" };
   
    // //发请求 加载数据
    // wx.showLoading({
    //   title: '加载中',
    // })
    // wx.request({
    //   url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    //   data: {
    //     par1: 'php',
    //     par2: 'orderhistory',
    //     ids: id,
    //   }, header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method: "GET",
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       lists: []
    //     })
    //     if (res.data.code == 200) {
    //       var list = res.data.data[0].list
    //       var lists = [];
    //       for (var i = 0; i < list.length; i++) {
    //         var detil = { number: list[i].ity_Number, time: new Date(list[i].ity_date).Format('yyyy- MM - dd HH:mm:ss'), guke: app.globalData.cutdetil.customer_name, staff: list[i].user_realname, state: list[i].ity_status, money: list[i].ity_logNumber, check: false, ity_id: list[i].ity_id }
    //         lists.push(detil)
    //       }
    //       that.setData({
    //         lists: lists
    //       })
    //       console.log(that.data.lists)
    //       wx.showToast({
    //         title: '加载成功！',
    //         duration: 500
    //       })
    //     } else if (res.data.code == 201) {
    //       wx.showToast({
    //         title: '暂无订单！',
    //         image: '../images/warn.png',
    //         duration: 1000
    //       })
    //     } else {
    //       wx.showToast({
    //         title: '请刷新重试！',
    //         image: '../images/warn.png',
    //         duration: 1000
    //       })
    //     }
    //   }
    // })
    // console.log(this.data.lists)
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
    var ity = e.currentTarget.dataset.ity;
    var vip = e.currentTarget.dataset.vip;
    wx.navigateTo({
      url: '../xsOrderDetail/xsOrderDetail?ity_id='+ity+'&vipid='+vip,
    })

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
    var that = this
    console.log(app.globalData.cutdetil)
    // var id = { "store_id": app.globalData.store_id, "user_id": app.globalData.cutdetil.vip_id, "where": "and ity_date between '" + that.data.times.startTime + "' and '" + that.data.times.overTime+"'"};
    Index = 0;
    loadList(that, 2);
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
    var that = this;
    if (!over){
      loadList(that, 1);
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})