// pages/choseGoos/choseGoods.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [{ name: '镜片', url: 'jingpian' }, { name: '镜架', url: 'jingjia' }, { name: '太阳眼镜', url: 'taiyangyangjing' }, { name: '成品眼镜', url: 'chengpinyanjing' }, { name: '隐形眼镜', url: 'yinxingyanjing' }, { name: '护理液', url: 'huliye' }, { name: '配件', url: 'peijian' }],
    hiddenmodalput: true,
    new_person: '',
    new_content: '',
    new_time: ''
  },


  //点击按钮痰喘指定的hiddenmodalput弹出框  
  // modalinput: function () {
  //   this.setData({
  //     hiddenmodalput: !this.data.hiddenmodalput
  //   })
  // },
  //取消按钮  
  // cancel: function () {
  //   this.setData({
  //     hiddenmodalput: true
  //   });
  // },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
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
          url: '../choosestore/choosestore',
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