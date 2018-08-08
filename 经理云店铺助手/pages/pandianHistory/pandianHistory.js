var date = new Date();
var times = {};
var curr = 1;
var app = getApp()
times.overTime = date.Format('yyyy-MM-dd');
times.nowTime = date.Format('yyyy-MM-dd');
times.startTime = new Date(date.setDate(1)).Format('yyyy-MM-dd');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelStr: '请选择日期',//日期组件的显示选择文字
    times: times,//传入日期时间段选择组件的参数{ startTime: 起始时间，nowTime:当前时间，overTime:截止时间}
    lists: []
  },
  //获取当前的历史记录事件范围
  getTimes: function (e) {
    times = e.detail;
    curr = 1;
    this.setData({
      lists: []
    })
    load_dan(this, 1)
  },
  // 跳转二级页面
  detail: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var st = e.currentTarget.dataset.st;
    wx.navigateTo({
      url: '../setStock/setStock?id=' + id + '&st=' + st
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lists: []
    })
    curr = 1;
    load_dan(this, 1)
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
    if (curr != "x") {
      load_dan(this, curr + 1)
    } else {
      wx.showToast({
        title: '再拉也没有啦!',
        icon: 'none',
        duration: 1000
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})


function load_dan(that, page) {

  if (curr == "x") {
    return;
  }
  var store_id = app.globalData.store_id;
  var user_id = app.globalData.user_id;
  var sql = 'select * from tb_taking where store_id=' + store_id + ' and users_id=' + user_id;
  sql += ' and date_format(taking_time, ' + "'" + '%Y-%m-%d' + "'" + ') between ' + "'" + times.startTime + "'" + ' and ' + "'" + times.overTime + "' ORDER BY taking_id desc";


  var id = { "code": "A11", "accesstoken": sql, "limit": "limit " + ((page || 1) - 1) * 20 + ",20" };
  curr = page;
  console.log(id)
  wx.request({
    url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    data: {
      par1: 'common',
      par2: 'api',
      ids: JSON.stringify(id),
    }, header: {
      'content-type': 'application/json' // 默认值
    },
    method: "GET",
    success: function (res) {
      console.log(res)

      if (res.data.code == 200) {

        var list = res.data.data;
        var jarr = that.data.lists;
        for (var i = 0; i < list.length; i++) {
          var status = "未审核";
          if (list[i].taking_status == 1){
            status = "已审核";
          } else if (list[i].taking_status == 2){
            status = "已核准";
          } else if (list[i].taking_status == -1){
            status = "审核失败";
          }

          jarr.push({ number: list[i].taking_NO, time: new Date(list[i].taking_time).Format("yyyy-MM-dd HH:mm:ss"), Inventory: list[i].users_id_realname, accounting: (list[i].users_id_realname_he ? list[i].users_id_realname_he : ""), status: status, id: list[i].taking_id, st: list[i].taking_status })
        }

        that.setData({
          lists: jarr
        })
      } else if (res.data.code == 201) {
        curr = "x";
      }
    }
  })

}