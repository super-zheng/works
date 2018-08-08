// pages/xiaoshou/xiaoshou.js
var app = getApp();
var Index = 0;
var page = 100;
var gukeArr = [];
var over = false;
//渲染会员
function loadvip(that,flag,cus){//flag==1，数据累加，flag==2 数据清空
  // var sql = { "code": "A10", "accesstoken": "SELECT a.customer_id, a.vip_tel AS customer_tel, a.vip_type, b.customer_name, a.vip_id FROM tb_vip a JOIN tb_customer b ON a.customer_id = b.customer_id WHERE a.store_id =" + app.globalData.zd_id + " and concat(IFNULL(customer_name,''),'|',IFNULL(vip_tel,'')) like '%" + that.data.inputValue + "%'  ORDER BY a.vip_id desc limit " + (Index * page) + ",100" }
   var sql = { "code": "A10", "accesstoken": "SELECT a.customer_id, a.vip_tel AS customer_tel, a.vip_type, b.customer_name, a.vip_id FROM tb_vip a JOIN tb_customer b ON a.customer_id = b.customer_id WHERE a.store_id =" + app.globalData.zd_id + " and vip_tel = '" + that.data.inputValue + "'  ORDER BY a.vip_id desc limit " + (Index * page) + ",100" }
  wx.request({
    url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    data: {
      par1: 'common',
      par2: 'api',
      ids: sql,
    }, header: {
      'content-type': 'application/json' // 默认值
    },
    method: "get",
    success: function (res) {
      console.log(res)
      if (res.data.code == 200) {
        wx.showToast({
          title: '加载完成',
          duration: 500
        })
        
        if (flag==2){
          Index = 0;
          that.setData({
            guke: res.data.data,
            activeId: 'name' + res.data.data[0].customer_id//赋值第一个会员高亮
          })
          app.globalData.cutdetil = res.data.data[0];
          app.globalData.chosecutid = res.data.data[0].customer_id;//vipList
          if (cus){
            that.setData({
              activeId: 'name' + cus//赋值第一个会员高亮
            })
            var vlist = res.data.data;
            for (var i = 0, len = vlist.length; i < len; i++) {
              if (cus == vlist[i].customer_id) {
                app.globalData.cutdetil = vlist[i];
                break;
              }
            }
            app.globalData.chosecutid = cus;
          }
        }else{
          // Index++;
          that.setData({
            guke: that.data.guke.concat(res.data.data)
          })
        }
        gukeArr[Index] = res.data.data;
        // console.log();
        over = false;
      } else if (res.data.code == 201) {
        over = true;
        wx.showToast({
          title: '暂无更多会员！',
          image: '../images/warn.png',
          duration: 1000
        })
      }
      console.log(app.globalData)
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',//搜索框的值
    guke: [],//会员信息
    activeId:'name0',//被选中的会员ID
  },
  //选择顾客的点击事件
  chooseGuke:function(e){
    this.setData({
      activeId: e.currentTarget.id
    })
    app.globalData.chosecutid = e.currentTarget.id.substring(4)
    for (var i in this.data.guke){
      if (this.data.guke[i].customer_id == e.currentTarget.id.substring(4)){
        app.globalData.cutdetil = this.data.guke[i];
      }
    }
    console.log(this.data.guke)
  },
  lastleft: function (e) {//scroll-view 滑动到右边底部
    console.log(e);
    var that = this;
    if (that.data.guke.length == ((Index + 1) * page) && !over){
      Index++;
      loadvip(that, 1);
    }
    // that.setData({
    //   guke: that.data.guke.concat(that.data.guke)
    // });
  },

  //搜索框的数据获取
  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  yanguang: function () {
    wx.navigateTo({
      url: '../yanguang/yanguang',
    })
    app.globalData.chosecutid = this.data.activeId.substring(4)
  },
  changevip:function(){
    wx.navigateTo({
      url: '../addMember/addMember?status=1',//1 查询  0不查
    })
  },
  addvip: function () {
    wx.navigateTo({
      url: '../addMember/addMember?status=0',
    })
  },
  chosegoods:function(){
    wx.navigateTo({
      url: '../chooseGoods/chooseGoods',
    })
    app.globalData.chosecutid = this.data.activeId.substring(4)
  },
  shopcar: function () {
    wx.navigateTo({
      url: '../shopCar/shopCar',
    })
  }, 
  orderhistory: function() {//历史订单
    wx.navigateTo({
      url: '../orderHistory/orderHistory',
    })
  },
  //点击搜索的事件
  clicksousuo:function(){
    var that = this;
    that.setData({
      guke: [],
      activeId: 'name0'
    });
    gukeArr = [];
    loadvip(that, 2);
    // var where = "concat(IFNULL(customer_name,''),'|',IFNULL(vip_tel,'')) like '%" + that.data.inputValue + "%'";
    // console.log(where)
    // wx.request({
    //   url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    //   data: {
    //     par1: 'php',
    //     par2: 'getvipforstoreid',
    //     ids: { "store_id": app.globalData.store_id, "whers": where},
    //   }, header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method: "GET",
    //   success: function (res) {
    //     if (res.data.code == 200) {
    //       that.setData({
    //         guke: res.data.data.vipList,
    //         activeId: 'name' + res.data.data.vipList[0].customer_id//赋值第一个会员高亮
    //       })
    //       app.globalData.cutdetil = res.data.data.vipList[0];
    //       app.globalData.chosecutid = res.data.data.vipList[0].customer_id;
    //     } else if (res.data.code == 201){
    //       wx.showToast({
    //         title: '该店铺暂无会员，请添加！',
    //         image: '../images/warn.png',
    //         duration: 1000
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.showToast({
      title: '进入' + app.globalData.store_name + '店铺！',
      duration: 500
    })
    console.log(app.globalData.zd_id)
    var that = this;
    that.setData({
      guke: [],
      activeId: 'name0'
    });
    gukeArr = [];
    loadvip(that, 2);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.gettuiID();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { //重新返回这个页面需要执行的
    var that = this;
    if (app.globalData.newvip != false){
      that.setData({
        guke: [],
        activeId: 'name0'
      });
      gukeArr = [];
      if (app.globalData.newvip === true){
        loadvip(that, 2)
      }else{
        console.log(app.globalData.cutdetil);
        that.setData({
          inputValue:app.globalData.cutdetil.customer_tel
        });
        loadvip(that, 2, app.globalData.newvip)
      }
      app.globalData.newvip = false;
    }
    // if (app.globalData.newvip!=false){
    // 
    //   wx.request({
    //     url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    //     data: {
    //       par1: 'php',
    //       par2: 'getvipforstoreid',
    //       ids: { "store_id": app.globalData.store_id, "whers": "" },
    //     }, header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     method: "GET",
    //     success: function (res) {
    //       console.log(res)
    //       if (res.data.code == 200) {
    //         wx.showToast({
    //           title: '进入' + app.globalData.store_name + '店铺！',
    //           duration: 500
    //         })
    //         if (app.globalData.newvip===true){
    //           that.setData({
    //             guke: res.data.data.vipList,
    //             activeId: 'name' + res.data.data.vipList[0].customer_id//赋值第一个会员高亮
    //           })
    //           app.globalData.cutdetil = res.data.data.vipList[0];
    //           app.globalData.chosecutid = res.data.data.vipList[0].customer_id;
    //           app.globalData.newvip = false;
    //         }else{
    //           that.setData({
    //             guke: res.data.data.vipList,
    //             activeId: 'name' + app.globalData.newvip//赋值第一个会员高亮
    //           })
    //           var vlist = res.data.data.vipList
    //           for (var i = 0, len = vlist.length; i < len; i++) {
    //             if (app.globalData.newvip == vlist[i].customer_id) {
    //               app.globalData.cutdetil = vlist[i];
    //               app.globalData.newvip = false;
    //               break;
    //             }
    //           }
    //           app.globalData.chosecutid = app.globalData.newvip;
    //         }
            
    //       } else if (res.data.code == 201) {
    //         that.setData({
    //           guke: [],
    //           activeId: 'name0' 
    //         })
    //         wx.showToast({
    //           title: '该店铺暂无会员，请添加！',
    //           image: '../images/warn.png',
    //           duration: 1000
    //         })
    //       }
    //       console.log(app.globalData)
    //     }
    //   })
    // }
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    that.setData({
      guke: [],
      activeId: 'name0'
    });
    gukeArr = [];
    loadvip(that, 2);
    // wx.request({
    //   url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    //   data: {
    //     par1: 'php',
    //     par2: 'getvipforstoreid',
    //     ids: { "store_id": app.globalData.store_id, "whers": "" },
    //   }, header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method: "GET",
    //   success: function (res) {
    //     console.log(res)
    //     if (res.data.code == 200) {
    //       wx.showToast({
    //         title: '进入店铺！',
    //         duration: 500
    //       })
    //       that.setData({
    //         guke: res.data.data.vipList,
    //         activeId: 'name' + res.data.data.vipList[0].customer_id//赋值第一个会员高亮
    //       })
    //       app.globalData.cutdetil = res.data.data.vipList[0];
    //       app.globalData.chosecutid = res.data.data.vipList[0].customer_id;
    //     } else if (res.data.code == 201) {
    //       wx.showToast({
    //         title: '该店铺暂无会员，请添加！',
    //         image: '../images/warn.png',
    //         duration: 1000
    //       })
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