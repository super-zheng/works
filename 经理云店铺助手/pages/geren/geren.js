// pages/geren/geren.js
var app=getApp()
var all_store_name = []
var all_store_id = []
var all_jifen = []
var jfs = {};
var zd_id = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choseStore: true,
    all_store_name: [],
    index: 0,
    user_realname: '',
    user_integral:0
  },
  bindPickerChange: function (e) {
    console.log(all_store_id)
    console.log(jfs)
    var index = e.detail.value
    this.setData({
      index: index,
      user_integral: jfs[all_store_id[index]]
    })
    
    app.globalData.store_id=all_store_id[index];
    app.globalData.store_name = all_store_name[index];
    // wx.setStorage({
    //   key: 'store_id',
    //   data: all_store_id[index],
    // })
    app.gettuiID();
    app.globalData.newvip = true;
    app.globalData.zd_id = zd_id[all_store_id[index]];
    app.globalData.shopcargoods = [];
    app.globalData.shopcargoodsdetil = {};
    app.globalData.shopcount = 0;
  },

  //销售记录
  salelists:function(){
    wx.navigateTo({
      url: '../salelists/salelists?type=1',
    })
  },
  //盘点记录
  pandianlists: function () {
    wx.navigateTo({
      url: '../pandianHistory/pandianHistory',
    })
  },
  //退货记录
  tuihuolists:function(){
    wx.navigateTo({
      url: '../tuihuolists/tuihuolists?type=4',
    })
  },
  //清理数据
  clearData:function() {
    try {
      wx.clearStorageSync()
      wx.showToast({
        title: '清除成功',
      })
      // wx.redirectTo({
      //   url: '../login/login'
      // })
    } catch (e) {
      // Do something when catch error
      wx.showToast({
        title: '清除失败',
      })
    }
  },

  // //切换账号
  // changeUser: function () {
  //   try {
  //     app.globalData.user_id = ''
  //     app.globalData.store_id = ''
  //     wx.clearStorageSync()
  //     wx.redirectTo({
  //       url: '../login/login'
  //     })
  //   } catch (e) {
  //     // Do something when catch error
  //     wx.showToast({
  //       title: '清除失败',
  //     })
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sql = "SELECT store_id,user_integral FROM tb_user_store where user_id = " + app.globalData.user_id+" and user_store_status =0";
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'common',
        par2: 'api',
        ids: { "code": "A10", "accesstoken": sql },
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        if(res.data.code==200){
          var datas = res.data.data;
          for(var i=0,len=datas.length;i<len;i++){
            jfs[datas[i].store_id] = datas[i].user_integral;
            if (datas[i].store_id == app.globalData.store_id){
              that.setData({
                user_integral: datas[i].user_integral
              })
            }
          }
        }
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
      // setTimeout(function () {
      //   wx.redirectTo({
      //     url: '../choosestore/choosestore',
      //   })
      // }, 3000)
    }
    console.log(app.globalData.userdetil);
    var storeList = app.globalData.storeList;
    var that = this
    all_store_name = [];
    all_store_id = [];
    for (var i = 0, len = storeList.length;i<len;i++){
      all_store_name.push(storeList[i].store_name);
      all_store_id.push(storeList[i].store_id);
      zd_id[storeList[i].store_id] = storeList[i].zd_id ? storeList[i].zd_id : storeList[i].store_id;
      if (storeList[i].store_id == app.globalData.store_id){
        that.setData({
          index: i
        })
      }
    }
    that.setData({
      all_store_name: all_store_name
    })
    var username = app.globalData.userdetil.user_realname ? app.globalData.userdetil.user_realname:"暂无";
    that.setData({
      user_realname: username
    })
    // wx.request({
    //   url: 'https://www.jingliyun.cn/index.php/Home/SmallGeren/stores',
    //   data: {
    //     user_id: user_id
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       all_store_name: res.data[1]
    //     })
    //     all_store_id = res.data[0]
    //     all_store_name = res.data[1]
    //     all_jifen = res.data[2]
    //     //若已选店铺，则将index绑定
    //     try {
    //       var store_id = app.globalData.store_id
    //       console.log(store_id)
    //       console.log(all_store_id)
    //       if (store_id) {
    //         for (var i = 0; i < all_store_id.length; i++) {
    //           if (all_store_id[i] == store_id) {
    //             that.setData({
    //               index: i,
    //               user_integral: all_jifen[i]
    //             })
    //           }
    //         }
    //         // Do something with return value
    //       }
    //     } catch (e) {
    //       // Do something when catch error
    //     }
    //   }
    // })


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
      // setTimeout(function () {
      //   wx.redirectTo({
      //     url: '../choosestore/choosestore',
      //   })
      // }, 3000)
    }


    // var that = this
    // that.setData({
    //   user_realname: app.globalData.user_realname
    // })
    // wx.request({
    //   url: 'https://www.jingliyun.cn/index.php/Home/SmallGeren/stores',
    //   data: {
    //     user_id: user_id
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       all_store_name: res.data[1]
    //     })
    //     all_store_id = res.data[0]
    //     all_store_name = res.data[1]
    //     all_jifen = res.data[2]
    //     //若已选店铺，则将index绑定
    //     try {
    //       var store_id = app.globalData.store_id
    //       console.log(store_id)
    //       console.log(all_store_id)
    //       if (store_id) {
    //         for (var i = 0; i < all_store_id.length; i++) {
    //           if (all_store_id[i] == store_id) {
    //             that.setData({
    //               index: i,
    //               user_integral: all_jifen[i]
    //             })
    //           }
    //         }
    //         // Do something with return value
    //       }
    //     } catch (e) {
    //       // Do something when catch error
    //     }
    //   }
    // })
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