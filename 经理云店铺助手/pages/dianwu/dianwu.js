// pages/dianwu/dianwu.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    nocancel: true
  },
  
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  show: function () {
    this.setData({
      hidden: false
    });
  },
  confirm: function () {
    this.setData({
      hidden: true
    });
  },
  Pandian:function(){
    wx.navigateTo({
      url: '../pandian1/pandian',
    })
  },
  Pandian_1: function () {
    wx.navigateTo({
      url: '../saomaInventory/saomaInventory',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //验证是否登录和选择店铺
    var user_id = app.globalData.user_id
    var store_id = app.globalData.store_id
    if (user_id == '') {
      wx.showToast({
        title: '请先登录！',
        duration: 1000
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../login/login',
        })
      }, 300)

    } else if (store_id == '') {
      wx.showToast({
        title: '请先选择店铺！',
        duration: 1000
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../login/login',
        })
      }, 3000)

    }
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
     * 扫码
     */
  Scan: function (e) {
    var that=this
    console.log(e)
    var scan_type=e.target.dataset.scan_type//区分是入库还是退货
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: function (res) {
        // console.log(res)
        // res.result ='http://jingliyun.com/cx?id=000001-0.50+0.000152822480210375817663812502030000';
        res.result ='http://jingliyun.com/cx?id=000002000000250227389341721636987705703700000';
        // res.result ='http://jingliyun.com/out?r6msj9ec';
        var code ='';
        if (res.result){
          if (res.result.indexOf('id=') > 0) {
            code = res.result.substring(res.result.indexOf('id=') + 3)
            var scan_type2 = 1//区分是单个商品还是整单商品
          } else {
            code = res.result.substring(res.result.indexOf('?') + 1)
            var scan_type2 = 2
          }
          if (scan_type =='tuihuo'){
            wx.navigateTo({
              url: '../tuihuocontent/tuihuocontent?code=' + code
            })
          }else{
            wx.navigateTo({
              url: '../scancontent/scancontent?code=' + code + '&scan_type=' + scan_type + '&scan_type2=' + scan_type2
            })
          }
          
        }else{
          wx.showToast({
            title: '扫码失败',
            duration: 500
          })
        }
      },
      fail: function (res) {
        // that.show()
        wx.showToast({
          title: '扫码失败',
          duration: 500
        })
      }
    })
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