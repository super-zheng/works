var util = require('../../mymethod/util.js');
console.log(util.qjArr)
var app = getApp()
var likeArr = [" and concat(IFNULL(lens_brand,''),'|',IFNULL(lens_model,''),'|',IFNULL(lens_material,''),'|',IFNULL(lens_model,''),'|',IFNULL(lens_refractivity,''),'|',IFNULL(lens_rule,''),'|',IFNULL(lens_colorFilm,'')) like '%",
  " and concat(IFNULL(gframe_brand,''),'|',IFNULL(gframe_style,''),'|',IFNULL(gframe_material,''),'|',IFNULL(degree_colorNumber,''),'|',IFNULL(gframe_model,''),'|',IFNULL(o1,'')) like '%",
  " and concat(IFNULL(sun_brand,''),'|',IFNULL(sun_style,''),'|',IFNULL(sun_material,''),'|',IFNULL(degree_colorNumber,''),'|',IFNULL(sun_model,''),'|',IFNULL(o1,'')) like '%",
  " and concat(IFNULL(presbyopic_brand,''),'|',IFNULL(presbyopic_style,'')) like '%",
  " and concat(IFNULL(contact_brand,''),'|',IFNULL(contact_model,'')) like '%",
  " and concat(IFNULL(caresolution_brand,''),'|',IFNULL(caresolution_model,'')) like '%",
  " and concat(IFNULL(accessory_brand,''),'|',IFNULL(accessory_model,'')) like '%"
]
var types = ['镜片', '镜架', '太阳眼镜', '成品眼镜', '隐形眼镜', '护理液', '配件'];
var img_type = ["GlassesLens", "GlassesFrame", "GlassesSun", "GlassesPresbyopic",
  "GlassesContact", "GlassesCareSolution", "GlassesAccessory", "GlassesLens"];
var type_id = ["lens_id", "gframe_id", "sun_id", "presbyopic_id", "contact_id", "caresolution_id", "accessory_id"];
var type_table = ["tb_glasseslens", "tb_glassesframe", "tb_glassessun", "tb_glassespresbyopic", "tb_glassescontact", "tb_glassescaresolution", "tb_glassesaccessory"];
var select = {};
var curr = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideChoose: false,
    goodList: [],
    details: [],
    goods_All: {},
    sou_val: "",
    types: 1,
    hiddenModal: true,
    remark: ""
  },
  openchoose: function () {
    this.setData({
      hideChoose: true,
    })
  },
  //获取商品选择的筛选条件
  onGetCode: function (e) {
    
  },
  //test
  getInfo: function (e) {
   

  },
  //订单备注
  taking_remark: function (e) {
    this.setData({
      remark: e.detail.value
    })

  },
  inputNum: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var goodList = this.data.goodList;
    var value = e.detail.value;
    if (value == "") {
      value == 0;
    } else {
      if (/[^\d]/.test(value)) {
        value = value.replace(/[^\d]/g, '');
      }
      value = parseInt(value)
    }
    if (value != 0 && !value) {
      value = 0;
    }
    console.log(value)
    goodList.forEach(function (item, index) {
      if (item.id == id) {
        item.actual = value;
        item.difval = item.actual - item.stock;
      }
    });
    this.setData({
      goodList: goodList
    })




  },
  //有二级的商品点击跳转二级
  xiang: function (e) {

    console.log(e)
    var id = e.currentTarget.dataset.id;
    var taking_brand = e.currentTarget.dataset.arr;
    var type = this.data.types;
    var img_name = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: '../sph_cyl/sph_cyl?id=' + id + '&type=' + type + '&taking_brand=' + taking_brand + '&img_name=' + img_name
    })
  },
  //提示框的确定
  listenerConfirm: function () {

    var that = this;
    var list = this.data.goodList;
    var jo = [];
    var ja = {};
    ja["store_id"] = app.globalData.store_id;
    ja["taking_NO"] = new Date().Format("yyyyMMddHHmm") + "" + suiji(4);
    ja["taking_type"] = 1;
    ja["users_id"] = app.globalData.user_id;
    ja["users_id_realname"] = app.globalData.userdetil.user_realname;
    ja["taking_time"] = new Date().Format("yyyy-MM-dd HH:mm:ss");
    ja["taking_brand_total"] = 0;// 品牌数
    ja["taking_goods_total"] = 0;// 商品总数
    ja["taking_goods_pricetotal"] = 0;// 总成本价
    ja["taking_goods_salepricetotal"] = 0;// 总销售价
    ja["taking_remark"] = this.data.remark;
    ja["taking_status"] = 0;
    ja["opt"] = "add";
    ja["ref"] = "#";
    ja["tb"] = "Taking";
    for (var i = 0; i < list.length; i++) {
      var jr = {};
      if (list[i].difval != 0) {
        jr["goods_type"] = list[i].goods_type;
        jr["degree_id"] = list[i].id;
        if (list[i].numbers_id) {
          jr["numbers_id"] = list[i].numbers_id;
        }
        jr["taking_number"] = list[i].actual;
        jr["taking_brand"] = list[i].taking_brand;
        jr["takingdetails_damagesPrice"] = list[i].orderPrice;// 进货价
        jr["takingdetails_unitPrice"] = list[i].price;// 单价
        jr["takingdetails_fortunename"] = list[i].img_name;// 图片
        jr["takingdetails_status"] = list[i].difval;
        jr["taking_storeid"] = list[i].taking_storeid;
        jr["taking_price"] = (list[i].actual ? list[i].actual : 0) / 1 * (list[i].orderPrice ? list[i].orderPrice : 0) / 1
        jr["taking_saleprice"] = (list[i].actual ? list[i].actual : 0) / 1 * (list[i].price ? list[i].price : 0) / 1
        
        jo.push(jr);


        // 总计
        ja["taking_brand_total"] += 1;
        ja["taking_goods_total"] = ja["taking_goods_total"] + jr["taking_number"];
        ja["taking_goods_pricetotal"] = ja["taking_goods_pricetotal"] + jr["taking_price"];// 总成本价
        ja["taking_goods_salepricetotal"] = ja["taking_goods_salepricetotal"] + jr["taking_saleprice"];// 总销售价
      }
    }
    if (jo.length < 1) {
      return;
    }

    var jarr = [];
    jarr.push(ja);
    jarr.push({ array: jo, opt: "add", ref: "0", setter: "taking_id", tb: "TakingDetails" });
    
    // TakingTotalFirst表的保存数据
    var jr = {};
    jr["ttf_store_id"] = ja["store_id"];
    jr["ttf_NO"] = ja["taking_NO"];
    jr["ttf_users_name"] = ja["users_id_realname"];
    jr["ttf_time"] = ja["taking_time"];
    jr["ttf_remark"] = ja["taking_remark"];
    this.setData({
      hiddenModal: true
    })
    this.setData({
      remark: ""
    })
    console.log(JSON.stringify({ "arrays": jarr, "json": jr }))
    wx.showLoading({
      title: '提交中',
    })
    
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'android',
        par2: 'pandian',
        ids: JSON.stringify({ "arrays": jarr, "json": jr }),
      }, header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "post",
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        })
        if (res.data.code == 201 || res.data.code == 200) {

          if (res.data.data[0][0][0]) {
            tui(res.data.data[0][0][0])
          }
          that.setData({
            goodList: []
          })
          getCurrentPages()[1].setData({
            gou: []
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
  //提示框的取消
  listenerCancel: function () {
    this.setData({
      remark: ""
    })
    this.setData({
      hiddenModal: true
    })
  },

  del: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    var gou = getCurrentPages()[1].data.gou
    for (var i = 0; i < gou.length;i++){
      if (gou[i].goods_type == type && gou[i].id == id){
        gou.splice(i, 1);
        console.log(gou)
        break;
      }
    }
    this.setData({
      goodList: gou
    })
    getCurrentPages()[1].setData({
      gou: gou
    })

  },

  save: function () {


    var list = this.data.goodList;
    var pd = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].difval != 0) {
        pd = 1;
      }
    }
    if (pd == 0) {

      wx.showToast({
        title: '没有不统一的库存，无需生成',
        icon: 'none',
        duration: 2000
      })

      return;
    }

    this.setData({
      hiddenModal: false
    })

  },

  activeBottom: function () {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodList:getCurrentPages()[1].data.gou
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





//获取随机数
function suiji(n) {
  var rand = "";
  for (var i = 0; i < n; i++) {
    var r = Math.floor(Math.random() * 10);

    rand += r;

  }
  return rand;
}

//推送生成的盘点单进行审核
function tui(id) {
  console.log(id);
  wx.request({
    url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/JavaAppertain/jlySmall_shenhe',
    data: {
      ids: { "taking_id": id },
    }, header: {
      'content-type': 'application/json' // 默认值
    },
    method: "GET",
    success: function (res1) {
      console.log(res1)
    }, fail: function (e) {
      console.log(e)
    }
  })
}