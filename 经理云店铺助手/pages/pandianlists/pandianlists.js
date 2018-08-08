// pages/saleslists/salelists.js
var app = getApp()
var type = 12
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pandainlists: [],
    date: '',
    isNull: false
  },

  bindDateChange: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(e)
    this.setData({
      date: e.detail.value
    })
    var that = this
    var store_id = app.globalData.store_id
    var time = e.detail.value
    that.setData({
      isNull: false
    })
    wx.request({
      url: "https://www.jingliyun.cn/index.php/Home/SmallGeren/lists",
      data: {
        store_id: store_id,
        time: time,
        type: type
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data == '') {
          that.setData({
            isNull: true,
            pandainlists: []
          })
          return
        }
        that.setData({
          pandainlists: res.data
        })
      },
      fail: function () {

      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var store_id = app.globalData.store_id
    var that = this
    var time = new Date().Format('yyyy-MM-dd');
    type = options.type
    that.setData({
      date: time
    })
    wx.request({
      url: "https://www.jingliyun.cn/index.php/Home/SmallGeren/lists",
      data: {
        store_id: store_id,
        time: time,
        type: type
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data == '') {
          that.setData({
            isNull: true,
            pandainlists: []
          })
          return
        }
        that.setData({
          pandainlists: res.data
        })
      },
      fail: function () {
        wx.hideLoading()

      }
    })

  },



  //点击查看详情
  pandiandetail: function (e) {
    var taking_id = e.currentTarget.dataset.taking_id
    wx.navigateTo({
      url: '../pandiandetail/pandiandetail?taking_id=' + taking_id
    })
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
