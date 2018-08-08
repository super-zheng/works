var app = getApp()
var all_store_name = []
var all_store_id = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    all_store_name: [],
    index: 0,
    choseStore: false,
    name: [0]
  },

  //切换店铺
  bindChange: function (e) {
    console.log(e)
    const val = e.detail.value
    this.setData({
      name: this.data.all_store_name[val[0]],
      index: val
    })
  },
  //确认店铺
  sure_store: function () {
    app.globalData.store_id = all_store_id[this.data.index]
    console.log(all_store_id[this.data.index])
    wx.switchTab({
      url: '../sales/sales',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var user_id = app.globalData.user_id
    console.log(user_id)
    // var user_id = 175

    try {
      var store_id = app.globalData.store_id
      console.log('store_id2:' + store_id)
      if (store_id) {//已经存在店铺
        app.globalData.store_id = store_id
        // Do something with return value
      } else {
        this.setData({
          choseStore: true
        })
        //不存在店铺store_id
        wx.request({
          url: 'https://www.jingliyun.cn/index.php/Home/SmallProgram/stores',
          data: {
            user_id: user_id
          },
          success: function (res) {
            that.setData({
              all_store_name: res.data[1],
              name: res.data[1][0]
            })
            console.log(res.data[1])
            all_store_id = res.data[0]
            all_store_name = res.data[1]
          }
        })
      }
    } catch (e) {
      wx.showToast({
        title: 'sales页面出错了……',
        duration: 1000
      })
      // Do something when catch error
    }

    // app.globalData.user_id=175
    // app.globalData.store_id = 327
    // wx.setStorage({
    //   key: "products_add",
    //   data: ''
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.bindPickerChange();
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