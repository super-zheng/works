//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

   

    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.startRecord()
            }
          })
        }
      }
    })

  },
  globalData: {
    userInfo: null,
    store_id: '',//用户登陆后选择的店ID
    store_name: '',//用户登陆后选择的店name
    storelogimg:'',
    user_id: '',//登陆的员工ID
    userdetil: [],//登陆的员工详情
    chosecutid:'',//被选中的顾客ID
    cutdetil: [],//被选中的顾客详情
    shopcargoods: [],//加入购物车的所有商品model_code+uncode[type]
    shopcargoodsdetil: {},//加入购物车的所有商品详情
    products_add: [],
    scan_products: [],
    optid:'',
    zd_id:'',
    pads:[],
    logo: '../images/0.jpg',
    path:'http://cnc.jingliyun.com/pic/',
    GoodsName: ["GlassesLens", "GlassesFrame", "GlassesSun", "GlassesPresbyopic",
      "GlassesContact", "GlassesCareSolution", "GlassesAccessory", "GlassesLens"],
    newvip:false,
    storeList:[],
    shopcount:0,
    optometrys:{},
  }, gettuiID:function() {
    console.log(getApp())
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'common',
        par2: 'api',
        ids: { "code": "A10", "accesstoken": "SELECT pt_tuiID, a.pad_id FROM tb_pad a JOIN tb_padtrajectory b ON a.pad_id = b.pad_id AND pt_apkpackage = 'com.cnclink.managercloud5_0_2' WHERE a.store_id = " + getApp().globalData.store_id + " AND a.pad_status = 0 GROUP BY a.pad_id" },//app.globalData.store_id
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 200) {
          getApp().globalData.pads = res.data.data;//存储所有的tuiID
          console.log(res.data.data);
        } else if (res.data.code == 201) {
          getApp().globalData.pads = [];//存储所有的tuiID
        }
      }
    })
  }
})
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
Array.prototype.revise = function (id, callback) {
  //此方法可以通过传入ID修改数字中对应对象，回调函数的参数是匹配到的对象，注意：此方法 id要保证唯一，否则只会修改第一个，该数组的每个元素要是一个对象，匹配只能是ID,回调函数必须有返回值，返回值为改变后的对象
  this.forEach(function (item) {
    if (item.id == id) {
      item = callback(item);
      return
    }
  })
  return this
};
Array.prototype.uniq = function (arr) {
  var temp = []; //一个新的临时数组
  for (var i = 0; i < arr.length; i++) {
    if (temp.indexOf(arr[i]) == -1) {
      temp.push(arr[i]);
    }
  }
  return temp;
}
Array.prototype.uniq1 = function () {
  var temp = []; //一个新的临时数组
  for (var i = 0; i < this.length; i++) {
    if (temp.indexOf(this[i]) == -1) {
      temp.push(this[i]);
    }
  }
  return temp;
}
//得到店铺的所有tuiID 
