// pages/login/login.js
var app = getApp()
var code = ''
var all_store_name = []
var all_store_id = []

function init(){  //对初始化的值做初始化
    app.globalData.userInfo = null,
    app.globalData.store_id = '',//用户登陆后选择的店ID
    app.globalData.store_name = '',//用户登陆后选择的店name
    app.globalData.user_id = '',//登陆的员工ID
    app.globalData.userdetil = [],//登陆的员工详情
    app.globalData.chosecutid = '',//被选中的顾客ID
    app.globalData.cutdetil = [],//被选中的顾客详情
    app.globalData.shopcargoods = [],//加入购物车的所有商品model_code+uncode[type]
    app.globalData.shopcargoodsdetil = {},//加入购物车的所有商品详情
    app.globalData.products_add = [],
    app.globalData.scan_products = [],
    app.globalData.optid = '',
    app.globalData.storelogimg = '',
    app.globalData.pads = [];
    app.globalData.storeList = [];
    app.globalData.shopcount = 0;
}
function loaduser(that){
    //查询登陆的员工详细信息
    try {
      //不存在店铺store_id
      var user_id = app.globalData.user_id
      var sql = "where user_id=" + user_id;
      wx.request({
        url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
        data: {
          par1: 'common',
          par2: 'api',
          ids: { "code": "A8", "tb_name": "User", "whereConditions": sql },
        }, header: {
          'content-type': 'application/json' // 默认值
        },
        method: "GET",
        success: function (res) {
          app.globalData.userdetil = res.data.data[0]
        }
      })
    } catch (e) {
      wx.showToast({
        title: '未获取到员工详情，请完善信息！',
        image: '../images/warn.png',
        duration: 1000
      })
    }


    //请求所有的店铺列表
    try {
      //不存在店铺store_id
      var user_id = app.globalData.user_id
      var ids2 = { "code": "A10", "accesstoken": "SELECT u.LEVEL AS user_level, u.store_id AS store_id, u.store_name AS store_name, u.boss_id AS boss_id, u.bossname AS boss_name , u.zd_id FROM view_login2 u WHERE u.user_id = " + user_id+" AND IFNULL(u.store_status = 0, 1 = 1) ORDER BY store_id DESC"};
      wx.request({
        url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
        data: {
          par1: 'common',
          par2: 'api',
          ids: ids2,
        }, header: {
          'content-type': 'application/json' // 默认值
        },
        method: "GET",
        success: function (res) {
          //显示店铺选择界面
          that.setData({
            modalshow: false,
            store: res.data.data,
            name: res.data.data[0]
          })
          app.globalData.storeList = res.data.data;

        }
      })
    } catch (e) {
      wx.showToast({
        title: '登录页面出错了……',
        image: '../images/warn.png',
        duration: 1000
      })
      // Do something when catch error
    }
}
function updateuser(that){
  var id = { "code": "A4", "tb_name": "User", "key_id": app.globalData.user_id, "obj": { "user_openid": that.data.openid}};
  wx.request({
    url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    data: {
      par1: 'common',
      par2: 'api',
      ids: id,
    }, header: {
      'content-type': 'application/json' // 默认值
    },
    method: "GET",
    success: function (res) {
      if(res.data.code==200){

      }else{

      }
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    choseStore: true,
    all_store_name: [],
    index: 0,//选择店铺时选择的第几个
    name: [0],//选择店铺时选择的店铺名
    modalshow: true,//选择店铺弹出层的状态
    store: [],//用户相关的店铺的信息
    username: '',//账号
    password: '',//密码
    openid:null //openid
  },
  //获取用户名
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  //获取密码
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //登陆点击事件
  logins: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    that.setData({
      modalshow: false
    })
    if (that.data.username == '' || that.data.password ==''){
      wx.showToast({
        title: '请输入账号密码!',
        image: '../images/warn.png',
        duration: 1000
      })
    }else{
      console.log(111)
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            code = res.code
            wx.request({
              url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',

              data: {
                par1: 'common',
                par2: 'login',
                ids: { "tel": that.data.username, "pwd": that.data.password },
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: "GET",
              success: function (res) {
                wx.hideLoading()
                if (res.data.code==200) {
                  //登陆成功后初始化所有公共变量，避免数据混乱
                  init();
                    
                  app.globalData.user_id = res.data.data[0]
                  // app.globalData.user_realname = res.data.data[0].user_realname
                  wx.showToast({
                    title: '登录成功！',
                    duration: 500
                  })
                  loaduser(that);
                  updateuser(that)
                } else {
                  //显示登录界面
                  that.setData({
                    modalshow: true
                  })
                  wx.showToast({
                    title: '账号或密码错误！',
                    image: '../images/warn.png'
                  })
                }
              }, fail: function () {
                wx.hideLoading()
                //显示登录界面
                that.setData({
                  modalshow: true
                })
                wx.showToast({
                  title: '网络请求失败！',
                  image: '../images/warn.png'
                })
              }
            })
          } else {
            wx.showToast({
              title: '获取用户登录态失败！' + res.errMsg,
              image: '../images/warn.png'
            })
          }
        },
        fail: function () {
          wx.hideLoading();
          console.log('获取登录态失败');
        }
      });
    }
},
  zuzhi: function () { },
  //切换店铺
  bindChange: function (e) {
    var that = this;
    const val = e.detail.value[0];
    this.setData({
      name: that.data.store[val],
      index: val
    })
  },
  //取消
  closemodal: function () {
    this.setData({
      modalshow: true
    })
  },
  //确认店铺
  confirm: function () {
    var that = this;
    app.globalData.store_id =   that.data.name.store_id;
    app.globalData.store_name = that.data.name.store_name;
    var id1 = { "store_id": that.data.name.store_id}
    //查询选择店铺的LOGO用于后面显示图片
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'findstoredetil',
        ids: id1,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        if(res.data.code==200){
          var list = res.data.data[0].list[0];
          app.globalData.storelogimg = (list.imagePath_url) ? list.imagePath_url:'';
          app.globalData.zd_id = list.zd_id != "" ? list.zd_id : list.store_id;
          console.log(list.store_logoImagePath)
          wx.switchTab({
            url: '../xiaoshou/xiaoshou',
          })
        }else{
          wx.showToast({
            title: '未得到店铺图片',
            image: '../images/warn.png'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.pads = [];
    var that = this;
    //console.log(new Date().getTime());
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/get_u_openid',
            data: {
              code: res.code
            }, success: function (data) {
              console.log(data);
              that.data.openid = data.data.openid;
              console.log(new Date().getTime());
              var ids = { "code": "A10", "accesstoken": "SELECT user_id FROM tb_user where user_openid ='" + data.data.openid+"'"};
              wx.request({
                url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
                data:{
                  par1:'common',
                  par2:'api',
                  ids:ids
                },success: function (e){
                  if(e.data.code==200){//就是已经存在的了
                    init();
                    app.globalData.user_id = e.data.data[0].user_id;
                    wx.showToast({
                      title: '登录成功！',
                      duration: 500
                    })
                    loaduser(that);
                  }else{  //还没绑定，就是用密码登录

                  }
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });

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
    console.log(new Date().getTime());
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