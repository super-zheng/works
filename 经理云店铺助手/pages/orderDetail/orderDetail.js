var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhedie: true,
    zhedie1:true,
    time: "",
    picUrl: "../images/down.png",
    picUrl1: "../images/down.png",
    arrGuige: [{
        guige: "蔡司 1.56 双光 非球面（镜片）",
        jianshu: "",
        price: "",
        zhekou: "",
        total: ""
      },
      {
        guige: "1.00,-0.25",
        jianshu: "1片",
        price: "￥100.00",
        zhekou: "9.0折",
        total: "￥90.00"
      },
      {
        guige: "镜片加工工艺名称",
        jianshu: "",
        price: "",
        zhekou: "",
        total: ""
      },
      {
        guige: "割边",
        jianshu: "1",
        price: "￥10.00",
        zhekou: "无 ",
        total: "￥10.00"
      },
      {
        guige: "割孔",
        jianshu: "2",
        price: "￥10.00",
        zhekou: "无 ",
        total: "￥10.00"
      },
      {
        guige: "镜框加工工艺名称",
        jianshu: "",
        price: "",
        zhekou: "",
        total: ""
      },
      {
        guige: "金框标准加工",
        jianshu: "1片",
        price: "￥10.00",
        zhekou: "无",
        total: "￥10.00"
      },
    ],
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },

  bindTimeChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
  },
  changeTime(e) {
    this.setData({
      time: e.detail.value
    });
  },
  changeDateTime(e) {
    this.setData({
      dateTime: e.detail.value
    });
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  //箭头折叠
  changeEvent: function() {
    if (this.data.zhedie) {
      this.setData({
        zhedie: !this.data.zhedie,
        picUrl: "../images/up.png"
      })
    }else{
      this.setData({
        zhedie: !this.data.zhedie,
        picUrl: "../images/down.png"
      })
    }

  },
  changeEvent1: function () {
    if (this.data.zhedie1) {
      this.setData({
        zhedie1: !this.data.zhedie1,
        picUrl1: "../images/up.png"
      })
    } else {
      this.setData({
        zhedie1: !this.data.zhedie1,
        picUrl1: "../images/down.png"
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})