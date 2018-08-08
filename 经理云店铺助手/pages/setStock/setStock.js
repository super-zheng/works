var util = require('../../mymethod/util.js');
var goods_All = util.goods_All;
console.log(util.qjArr);
var taking_id = "";
var goods_All = util.goods_All;
var goodList = [];
var app = getApp();
var st = 0;
var pd_quan = false;
var img_type = ["GlassesLens", "GlassesFrame", "GlassesSun", "GlassesPresbyopic",
  "GlassesContact", "GlassesCareSolution", "GlassesAccessory", "GlassesLens"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideChoose: false,
    goodList: goodList,
    details: [],
    hiddenModal:true,
    remark:"",
    ying: false,
    sou_val:""
  },
  openchoose: function () {
    //默认将detail设置为镜片的所有品牌
    this.setData({
      hideChoose: true
    })
  },
  //获取商品选择的筛选条件渲染列表
  onGetCode: function (e) {
    console.log(e.detail)//获取商品筛选条件，发请求 渲染商品列表
    var condition = JSON.parse(JSON.stringify(e.detail));
    condition.type = condition.type / 1 + 1;
    var goodList1 = goodList.filter(function (item) {
      var flag = true;
      for (var k in condition) {
        if (item[k] != condition[k]) {
          flag = false;
          break;
        }
      }
      console.log(flag);
      return flag;
    });
    this.setData({
      goodList: goodList1
    })
  },
  //订单备注
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })

  },
  quan:function(){
    console.log("111")
    var g1 = this.data.goodList;
    
    for (var i=0;i<g1.length;i++){
      if (pd_quan){
        g1[i].check = false;
      }else{
        g1[i].check = true;
      }
    }
    if (pd_quan) {
      pd_quan = false;
    } else {
      pd_quan = true;
    }
    this.setData({
      goodList: g1
    })
  },
  // 调整库存的取消按钮
  listenerCancel:function(){
    if (st != 1) {
      return;
    }

    var that = this;
    this.setData({
      remark: ""
    })
    this.setData({
      hiddenModal: true
    })
  },
  // 调整库存的确定按钮
  listenerConfirm:function(){

    if (st != 1){
      return;
    }


    var that = this;
    var jarr = {};
    jarr["store_id"] = app.globalData.store_id;
    jarr["taking_id"] = taking_id;
    
    var ja = [];
    for (var i = 0; i < goodList.length; i++) {


      if (goodList[i].check) {
        var jr = {};
        jr["counts"] = goodList[i].difval;
        var s_c = goodList[i].s_c;
        if (goodList[i].type == 1 || goodList[i].type == 4 || goodList[i].type == 5) {
          jr["sph"] = s_c.split(",")[0];
          jr["cyl"] = s_c.split(",")[1];
        } else {
          jr[goods_All["col"][goodList[i].type / 1 - 1] + ""] = s_c;
        }
        ja.push({ "stock_id": goodList[i].stock, "type": goodList[i].type, "ar": [jr] })
      }
    }
    if (ja.length == 0){
      wx.showToast({
        title: '请选择需要调整的商品',
        icon: 'none',
        duration: 1000
      })
      return;
      
    }
    var jo = {};
    jo["taking_he_remark"] = this.data.remark;
    jo["users_id_he"] = app.globalData.user_id;
    jo["users_id_realname_he"] = app.globalData.userdetil.user_realname;
    jo["taking_status"] = 2;

    jarr["array"] = ja;
    jarr["taking"] = jo;
    console.log(JSON.stringify(jarr))
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'wx_ruku',
        ids: JSON.stringify(jarr),
      }, header: {
        'Content-Type': 'application/x-www-form-urlencoded'// 默认值
      },
      method: "post",
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        })
        that.setData({
          remark: "",
          hiddenModal: true
        })
        if (res.data.code == 201 || res.data.code == 200) {
          getCurrentPages()[1].onLoad()
          st = 2;
          that.setData({
            ying: true
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //test
  //渲染选择条件的点击事件
  getInfo: function (e) {
    //console.log(e.detail)//通过e.detail条件进行请求，将details数组进行渲染
    //在此处理details的渲染
    var info = e.detail;
    info.type = info.type / 1 + 1;
    var goodList1 = goodList.filter(function (item) { return item.type == info.type });
    var select = info.select;
    delete info.select;
    delete info.type;
    var details = goodList1.filter(function (item, index) {
      var flag = true;
      for (var k in info) {
        if (info[k] != item[k]) {
          flag = false;
          return
        }
      }
      return flag
    })
    details = details.map(function (item, index) {
      return item[select]
    })
    this.setData({
      details: details.uniq1().filter(function(item){ return item!=''})
    })
  },
  sou:function(e){
    var that = this;
    var val = e.detail.value;
    console.log(e)
    var g = goodList.filter(function(item,index){
      var fil = false;
      for (var i in item){
        if ((("" + item[i]).indexOf(val)) != -1){
          fil = true;
        }
      }

      return fil;
    })
    console.log(g)
    
    that.setData({
      goodList: g,
      sou_val: val
    })
    
    console.log(that.data.goodList)
  },
  que: function () {
    console.log(111123)
    var that = this;
    var val = this.data.sou_val;
    
    var g = goodList.filter(function (item, index) {
      var fil = false;
      for (var i in item) {
        if ((("" + item[i]).indexOf(val)) != -1) {
          fil = true;
        }
      }

      return fil;
    })
    console.log(g)

    that.setData({
      goodList: g
    })

    console.log(that.data.goodList)
  },


  // 是否处理库存的点击事件
  checkGood: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    var a = JSON.stringify(this.data.goodList);

    var goodList1 = JSON.parse(a).revise(id, function (obj) {
      obj.check = !obj.check
      return obj
    })
    goodList.revise(id, function (obj) {
      obj.check = !obj.check
      return obj
    })
    this.setData({
      goodList: goodList1
    })
  },
  // 点击调整库存按钮
  save:function(){
    if (st == -1){
      wx.showToast({
        title: '无法调整审核失败的盘点单',
        icon: 'none',
        duration: 1000
      })

      return;
    }else if(st == 2){
      wx.showToast({
        title: '无法重复调整盘点单',
        icon: 'none',
        duration: 1000
      })

      return;
    }
    this.setData({
      hiddenModal: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    taking_id = options.id;
    st = options.st;
    if (st != 1) {
      this.setData({
        ying:true
      })
    }
    console.log(options)
    this.setData({
      goodList: []
    })
    load_detail(this)
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


function load_detail(that) {

  var user_id = app.globalData.user_id;
  var sql = 'select * from tb_takingdetails where taking_id=' + taking_id;


  var id = { "code": "A11", "accesstoken": sql };
  console.log(id)
  wx.request({
    url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    data: {
      par1: 'common',
      par2: 'api',
      ids: JSON.stringify(id),
    }, header: {
      'content-type': 'application/json' // 默认值
    },
    method: "GET",
    success: function (res) {
      console.log(res)
      goodList = [];
      if (res.data.code == 200) {

        var list = res.data.data;
        var jarr = that.data.goodList;
        var shai = [];
        for (var i = 0; i < list.length; i++) {

          var sp = list[i].taking_brand;
          var ar = ["", "", "", "", "", ""]
          if (sp) {
            ar = sp.split(";");
          }

          var img = '../images/Icon_Default_productr.png';
          if (list[i].takingdetails_fortunename) {
            img = 'http://cnc.jingliyun.com/pic/' + img_type[list[i].goods_type/1 - 1] + '/' + list[i].takingdetails_fortunename;
          }


          var cha = (list[i].takingdetails_status ? list[i].takingdetails_status:0)/ 1 * (list[i].takingdetails_unitPrice ? list[i].takingdetails_unitPrice:0)/1
          console.log(list[i].takingdetails_status + "*" + list[i].takingdetails_unitPrice+"="+cha);
          var jo = { type: list[i].goods_type, src: img, title: ar[0] + " " + ar[1], detail: ar[2] + ar[3] + ";" + ar[5], difval: list[i].takingdetails_status, id: list[i].takingdetails_id, price: (list[i].takingdetails_damagesPrice ? list[i].takingdetails_damagesPrice : 0) / 1, check: false, s_c: ar[5] }
          var s = 1;
          for (var o in goods_All){
            
            jo[goods_All[o][list[i].goods_type / 1 - 1]] = ar[s + ""];
            
            s++;
          }

          if (list[i].goods_type == 1 || list[i].goods_type == 4 || list[i].goods_type == 5){
            jo["stock"] = list[i].numbers_id;
          }else{
            jo["stock"] = list[i].degree_id;
          }

          if(list[i].goods_type == 1){
            shai.push(ar[1])
          }
          jarr.push(jo)
          console.log(jo)



        }
        that.setData({
          goodList: jarr,
          details: shai.uniq1()
        })
        goodList = jarr;
      } else if (res.data.code == 201) {
        
      }
    }
  })

}