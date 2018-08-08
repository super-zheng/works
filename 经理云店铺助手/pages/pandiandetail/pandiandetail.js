// pages/saledetail/saledetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pandaindetail: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var taking_id = options.taking_id
    console.log(taking_id)
    var that = this
    // console.log(ity_Number)
    wx.request({
      url: "https://www.jingliyun.cn/index.php/Home/SmallGeren/pandiandetail",
      data: {
        taking_id: taking_id
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        that.setData({
          pandaindetail: res.data
        })
        if (res.data[1] == '') {
          wx.showToast({
            title: '加载失败',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../geren/geren',
            })
          }, 1000)
        }

      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          duration: 1000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../geren/geren',
          })
        }, 1000)

      }
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