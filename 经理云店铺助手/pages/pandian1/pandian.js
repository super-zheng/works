var util = require('../../mymethod/util.js');
var app = getApp()
var likeArr = [" and concat(IFNULL(lens_brand,''),'|',IFNULL(lens_model,''),'|',IFNULL(lens_material,''),'|',IFNULL(lens_model,''),'|',IFNULL(lens_refractivity,''),'|',IFNULL(lens_rule,''),'|',IFNULL(lens_colorFilm,'')) like '%",
  " and concat(IFNULL(gframe_brand,''),'|',IFNULL(gframe_style,''),'|',IFNULL(gframe_material,''),'|',IFNULL(colorNumber,''),'|',IFNULL(gframe_model,''),'|',IFNULL(o1,'')) like '%",
  " and concat(IFNULL(sun_brand,''),'|',IFNULL(sun_style,''),'|',IFNULL(sun_material,''),'|',IFNULL(colorNumber,''),'|',IFNULL(sun_model,''),'|',IFNULL(o1,'')) like '%",
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
var z_i = 0;
var sou_val = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideChoose: false,
    goodList: [],
    details: [],
    goods_All: {},
    types: 1,
    hiddenModal: true,
    remark: "",
    gou: []
  },
  openchoose: function () {
    this.setData({
      hideChoose: true,
    })
  },
  //获取商品选择的筛选条件
  onGetCode: function (e) {
    //获取商品筛选条件，发请求 渲染商品列表
    select = e.detail;
    this.setData({
      goodList: []
    })
    curr = 1;
    this.setData({
      types: (e.detail.type) / 1 + 1
    })
    load_goods(e.detail, 1, this,1)
  },
  //test
  getInfo: function (e) {
    this.setData({
      details: []
    })
    //通过e.detail条件进行请求，将details数组进行渲染
    wx.showLoading({
      title: '加载中',
    })
    
    load_goods_can(e.detail, this);

  },
  que:function(){
    wx.navigateTo({
      url: '../querenpan/querenpan'
    })
  },
  //订单备注
  taking_remark: function (e) {
    this.setData({
      remark: e.detail.value
    })

  },
  inputNum: function (e) {
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
          if (res.data.data[0][0][0]){
            tui(res.data.data[0][0][0])
          }
          that.setData({
            goodList: []
          })
          load_goods(select, curr, that,1)
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

  sou: function (e) {
    if(e.detail.keyCode==8){
      return;
    }
    sou_val = e.detail.value;
    this.setData({
      goodList: []
    })
    curr = 1;
    load_goods(select, 1, this,1);
  },
  sao:function(e){
    var g_t = e.currentTarget.dataset.type;
    var g_id = e.currentTarget.dataset.id;
    var g_s = e.currentTarget.dataset.s;
    var that = this;
    z_i = 0;
    saoma(that, g_s, g_t, g_id)
    
  },
  
  save: function () {


    var list = this.data.goodList;
    var pd = 0;
    var that = this;
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


    wx.showModal({
      title: '提示',
      content: '是否直接生成盘点',
      cancelText:"继续盘点",
      confirmText: "直接盘点",
      success: function (res) {
        if (res.confirm) {
          that.setData({
            hiddenModal: false
          })
        }else{
         
          var g = JSON.stringify(that.data.gou);
          var gou = JSON.parse(g);
          var a = JSON.stringify(that.data.goodList);
          var goodList = JSON.parse(a);
          for (var u = 0; u < goodList.length; u++) {
            var pd = 1;
            for (var i = 0; i < gou.length; i++) {
              if (goodList[u].id == gou[i].id && goodList[u].goods_type == gou[i].goods_type){
                pd = 0;
                gou[i].actual = goodList[u].actual;
                //gou[i].difval = gou[i].stock / 1 - goodList[u].stock / -1;
                gou[i].difval = goodList[i].difval;
                break;
              }
            }
            if (pd == 1 && goodList[u].difval != 0) {
              gou.push(goodList[u]);
            }
          }
          
          that.setData({
            gou: gou
          })
        }
      }
    })

    

  },

  activeBottom: function () {
    if (curr != 'x') {
      load_goods(select, curr + 1, this)
    } else {
      wx.showToast({
        title: '再拉也没有啦!',
        icon:"none",
        duration: 1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    select = { type: 0 }
    sou_val = "";
    load_goods({ type: 0 }, 1, this)
    this.setData({
      details: []
    })
    load_goods_can({ type: 0 }, this)

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



function load_goods_can(obj, that) {
  var type = (obj.type) / 1 + 1;
  if (type == 0) {
    type = 1;
  }
  var store_id = app.globalData.store_id;
  var zd_id = store_id;
  if (app.globalData.zd_id) {
    zd_id = app.globalData.zd_id;
  }
  var shai = "";
  if (!obj["select"]) {
    obj["select"] = "lens_brand"
  }
  if (obj) {

    for (var i in obj) {
      if (i != "type" && i != 'select' && i != obj["select"] && obj[i]) {

        shai += " and " + i + "='" + obj[i] + "'";


      }
    }
  }




  var id = '{"code":"A11","accesstoken":"select b.* from tb_glassesstock' + store_id + ' a JOIN ' + type_table[type - 1] + '' + zd_id + ' b on a.stock_goodsId=b.' + type_id[type - 1] + ' where stock_type=' + type + ' and stock_status = 0' + shai + ' GROUP BY ' + obj["select"] + '"}'
  
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
      that.setData({
        details: []
      })
      if (res.data.code == 200) {

        var list = res.data.data;
        var jarr = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i][obj["select"] + ""]) {
            jarr.push(list[i][obj["select"] + ""])
          }
        }

        that.setData({
          details: jarr
        })
      } else if (res.data.code == 201) {
      }
      setTimeout(function () {
        wx.hideLoading()
      })
    }
  })

}


//根据每次筛选的字段查出商品信息
function load_goods(obj, curr_1, that,qing) {
  var type = (obj.type) / 1 + 1;
  if (type == 0) {
    type = 1;
  }
  var store_id = app.globalData.store_id;
  var zd_id = store_id;
  if (app.globalData.zd_id) {
    zd_id = app.globalData.zd_id;
  }

  var shai = "";
  if (obj) {
    for (var i in obj) {
      if (i != "type" && i != 'select') {
        shai += " and " + i + "='" + obj[i] + "'";
      }
    }
  }
  var sou_input = "";
  var input_val = sou_val;
  if (input_val) {
    sou_input = likeArr[type - 1] + input_val + "%'"
  }



  var id = '{"code":"A11","accesstoken":"select a.stock_imgPath,a.price,a.orderPrice,a.stock_id,a.stock_type as type,a.numbers,a.stock_storeId,b.* from tb_glassesstock' + store_id + ' a JOIN ' + type_table[type - 1] + '' + zd_id + ' b on a.stock_goodsId=b.' + type_id[type - 1] + ' where stock_type=' + type + ' and stock_status = 0' + shai + '' + sou_input + '","limit":"limit ' + ((curr_1 || 1) - 1) * 20 + ',20"}'
  console.log(id)
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
      if (qing){
        that.setData({
          goodList: []
        })
      }
      if (res.data.code == 200) {


        var list = res.data.data;
        var jo = that.data.goodList;
        for (var i = 0; i < list.length; i++) {
          var stock_img = '../images/Icon_Default_productr.png';
          var img_name = "";
          if (list[i].stock_imgPath) {
            stock_img = 'http://cnc.jingliyun.com/pic/' + img_type[type - 1] + '/' + list[i].stock_imgPath.split(";")[0];
            img_name = list[i].stock_imgPath.split(";")[0];
          }
          //1:类型；2：品牌；3：品类；4型号/折射率；5材质；6色号/球柱镜/容量/尺寸
          var type_name = types[type - 1];
          var goods_all = util.goods_All;
          var title = "", detail = "", taking_brand = "";
          if (type == 1 || type == 4 || type == 5) {
            title = type_name + ';' + (list[i][goods_all.brand[type - 1] + ""] ? list[i][goods_all.brand[type - 1] + ""] : "")
            detail = (list[i][goods_all.model[type - 1] + ""] ? list[i][goods_all.model[type - 1] + ""] : "") + ';' + (list[i][goods_all.rec[type - 1] + ""] ? list[i][goods_all.rec[type - 1] + ""] : "")
            taking_brand = type_name + ';' +
              (list[i][goods_all.brand[type - 1] + ""] ? list[i][goods_all.brand[type - 1] + ""] : "") + ";" +
              (list[i][goods_all.model[type - 1] + ""] ? list[i][goods_all.model[type - 1] + ""] : "") + ";" +
              (list[i][goods_all.rec[type - 1] + ""] ? list[i][goods_all.rec[type - 1] + ""] : "") + ";" +
              (list[i][goods_all.mat[type - 1] + ""] ? list[i][goods_all.mat[type - 1] + ""] : "");
          } else {
            title = type_name + ';' + (list[i][goods_all.brand[type - 1] + ""] ? list[i][goods_all.brand[type - 1] + ""] : "")
            detail = (list[i][goods_all.model[type - 1] + ""] ? list[i][goods_all.model[type - 1] + ""] : "") + ';' + (list[i][goods_all.rec[type - 1] + ""] ? list[i][goods_all.rec[type - 1] + ""] : "") + ';' + (list[i][goods_all.col[type - 1] + ""] ? list[i][goods_all.col[type - 1] + ""] : "")

            taking_brand = type_name + ';' +
              (list[i][goods_all.brand[type - 1] + ""] ? list[i][goods_all.brand[type - 1] + ""] : "") + ";" +
              (list[i][goods_all.model[type - 1] + ""] ? list[i][goods_all.model[type - 1] + ""] : "") + ";" +
              (list[i][goods_all.rec[type - 1] + ""] ? list[i][goods_all.rec[type - 1] + ""] : "") + ";" +
              (list[i][goods_all.mat[type - 1] + ""] ? list[i][goods_all.mat[type - 1] + ""] : "") + ";" +
              (list[i][goods_all.col[type - 1] + ""] ? list[i][goods_all.col[type - 1] + ""] : "")
          }


          jo.push({ src: stock_img, title: title, detail: detail, stock: (list[i]["numbers"] ? list[i]["numbers"] : 0), actual: 0, difval: (list[i]["numbers"] * -1), id: list[i].stock_id, price: (list[i]["price"] ? list[i]["price"] : 0), orderPrice: (list[i]["orderPrice"] ? list[i]["orderPrice"] : 0), goods_type: type, taking_storeid: list[i]["stock_storeId"], taking_brand: taking_brand, img_name: img_name });
        }
        curr = curr_1;
        that.setData({
          goodList: jo
        })
        console.log(that.data.goodList)
      } else if (res.data.code == 201) {
        curr = 'x';
        wx.showToast({
          title: '再拉也没有啦',
          icon: 'none',
          duration: 2000
        })
      }
    }
  })

}

function saoma(that, g_s, g_t, g_id){
  wx.scanCode({
    onlyFromCamera: true,
    success: (res) => {
    },
    complete: (res) => {
      if (res.errMsg == "scanCode:fail cancel") {
        var good_l = that.data.goodList;
        good_l[g_s].actual = good_l[g_s].actual / 1 + z_i;
        good_l[g_s].difval = good_l[g_s].actual / 1 - good_l[g_s].stock / 1;
        that.setData({
          goodList: good_l
        })
      } else if (res.errMsg == "scanCode:fail") {
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
          duration: 1000
        })
        saoma(that, g_s, g_t, g_id)
      } else if (res.errMsg == "scanCode:ok") {
        var c_1 = res.result;
        if (c_1) {
          var c_2 = c_1.split("?id=")[1];
          var idlength = c_2.length;
          var ids = c_2.substring(idlength * 1 - 20, idlength * 1 - 8)+"";
          var ids1 = c_2.substring(idlength / 1 - 33, idlength / 1 - 20)+"";
          if (c_2.split(".")[1]){
            var ls_1 = c_2.split(".")[0];
            ids1 = ls_1.substring(ls_1.length/1-14,ls_1.length/1-1)
          }
          wx.request({
            url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
            data: {
              par1: 'android',
              par2: 'findbysm',
              ids: { "store_id": app.globalData.store_id, "unicode": ids1 },
            }, header: {
              'content-type': 'application/json' // 默认值
            },
            method: "GET",
            success: function (res1) {
              if ((res1.data.code == 200 || res1.data.code == 201) && res1.data.data[0]) {
                var list = res1.data.data[0];
                var goods_type = list.stock_type;

                if (goods_type == 1 || goods_type == 4 || goods_type == 5) {
                  if (g_t == goods_type && list.degree_id == g_id) {
                    z_i = z_i/1 + 1;
                    wx.showToast({
                      title: '扫描成功',
                      icon: 'none',
                      duration: 1000
                    })
                  }else{
                    wx.showToast({
                      title: '商品错误',
                      icon: 'none',
                      duration: 1000
                    })
                  }
                } else {
                  if (g_t == goods_type && list.stock_id == g_id) {
                    z_i = z_i /1 + 1;
                    wx.showToast({
                      title: '扫描成功',
                      icon: 'none',
                      duration: 1000
                    })
                  }else{
                    wx.showToast({
                      title: '商品错误',
                      icon: 'none',
                      duration: 1000
                    })
                  }
                }
              }else{
                wx.showToast({
                  title: '未扫到商品',
                  icon: 'none',
                  duration: 1000
                })
              }
              saoma(that, g_s, g_t, g_id)
            },
            fail: function (e) {
              wx.showToast({
                title: 'IO错误',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }
      }
    }
  })
}

//推送生成的盘点单进行审核
function tui(id){
  console.log(id);
  wx.request({
    url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/JavaAppertain/jlySmall_shenhe',
    data: {
      ids: { "taking_id": id},
    }, header: {
      'content-type': 'application/json' // 默认值
    },
    method: "GET",
    success: function (res1) {
      console.log(res1)
    }, fail:function(e){
      console.log(e)
    }
  })
}

//获取随机数
function suiji(n) {
  var rand = "";
  for (var i = 0; i < n; i++) {
    var r = Math.floor(Math.random() * 10);

    rand += r;

  }
  return rand;
}