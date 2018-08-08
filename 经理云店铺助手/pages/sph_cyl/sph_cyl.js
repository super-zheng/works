var util = require('../../mymethod/util.js');
let zjIndex = 0;
let zjLength = 8;
let qjIndex = 0;
let qjLength = 16;
var stock_id = 0;
var degree = {};
var type = 1;
var app = getApp()
var name = "";
var img_name = "";
var img_type = ["GlassesLens", "GlassesFrame", "GlassesSun", "GlassesPresbyopic",
  "GlassesContact", "GlassesCareSolution", "GlassesAccessory", "GlassesLens"];
var sao_all = {};
var qjArr = util.qjArr1;
var pan = false;
var totalA = {};
console.log(util.qjArr2)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qjIndex,
    chose: 0,
    zjArr: util.zjArr.slice(zjIndex, zjIndex + zjLength),
    qjArr: qjArr.slice(qjIndex, qjIndex + qjLength),
    thisTap: '',
    qjLength: qjLength,
    tdData: {
    },
    stockData: {
    },
    nowStatus: '',
    stock: '',
    shiji: '',
    hiddenModal: true,
    remark: "",
    img1: "../../pages/images/qjUp.png",
    img2: "../../pages/images/qjDown.png",
    img3: "../../pages/images/zjUp.png",
    img4: "../../pages/images/zjDown.png",
    totalArr: {
      "+0.00": 3, "-0.25": 1, "-6.25": 8, "-1.25": 10
    },
    totalA:{}
  },
  //td点击的时候创建input 标签 并拿到td里面的值
  tapTd: function (e) {
    console.log(pan)
    // if (pan){
    //   return;
    // }
    var that = this;
    if (!that.data.stockData[e.currentTarget.dataset.key] && that.data.stockData[e.currentTarget.dataset.key] != 0) {
      return;
    }
    var stock = that.data.stockData[e.currentTarget.dataset.key];
    stock = stock ? stock : 0;
    var shiji = that.data.tdData[e.currentTarget.dataset.key];
    shiji = shiji ? shiji : 0;
    this.setData({
      thisTap: e.currentTarget.dataset.key,
      nowStatus: e.currentTarget.dataset.key.split(','),
      stock: stock,
      shiji: shiji,
    })
  },
  //td点击的时候创建input 标签 并拿到td里面的值------列总计操作
  lzj: function (e) {
    console.log(pan)
    if (pan) {
      return;
    }
    var that = this;
    
    var stock = totalA[e.currentTarget.dataset.key];
    stock = stock ? stock : 0;
    var shiji = that.data.totalArr[e.currentTarget.dataset.key];
    shiji = shiji ? shiji : 0;
    this.setData({
      thisTap: e.currentTarget.dataset.key,
      nowStatus: ["", e.currentTarget.dataset.key],
      stock: stock,
      shiji: shiji,
    })
  },
  //input 失去焦点的时候 将input移除掉
  blurInput: function (e) {
    this.setData({
      thisTap: ''
    })
  },
  //当input输入的时候，将值动态改变
  changeValue: function (e) {
    var that = this;
    var tdData = this.data.tdData;

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
    tdData[e.currentTarget.dataset.key] = value;
    var stock = that.data.stockData[e.currentTarget.dataset.key];
    stock = stock ? stock : 0;
    var shiji = that.data.tdData[e.currentTarget.dataset.key];
    shiji = shiji ? shiji : 0;
    this.setData({
      tdData: tdData,
      stock: stock,
      shiji: shiji
    })
  },
  //当input输入的时候，将值动态改变------列总计操作
  changeValue1: function (e) {
    var that = this;
    var totalArr = this.data.totalArr;

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
    totalArr[e.currentTarget.dataset.key] = value;
    var stock = that.data.totalA[e.currentTarget.dataset.key];
    stock = stock ? stock : 0;
    var shiji = that.data.totalArr[e.currentTarget.dataset.key];
    shiji = shiji ? shiji : 0;
    this.setData({
      totalArr: totalArr,
      stock: stock,
      shiji: shiji
    })
  },
  //改变表格数据
  //纵向球镜
  changeTable1: function (e) {
    var add = e.currentTarget.dataset.add;
    var qjLength = this.data.qjLength;
    qjIndex += add / 1;
    if (qjIndex <= 0) {
      qjIndex = 0;
    } else if (qjIndex + qjLength > qjArr.length) {
      qjIndex = qjArr.length - qjLength;
    }
    this.setData({
      qjArr: qjArr.slice(qjIndex, qjIndex + qjLength),
      qjIndex
    })
    console.log(qjIndex)
  },
  //正负切换事件
  changeTable3: function (e) {
    //console.log(qjArr)
    var that = this;
    var a = e.currentTarget.dataset.add;
    if (a == 0) {
      qjArr = util.qjArr1;
      this.setData({
        chose: 1
      })
    } else {
      qjArr = util.qjArr2;
      this.setData({
        chose: 0
      })
    }

    this.setData({
      qjArr: qjArr.slice(qjIndex, qjIndex + that.data.qjLength)
    })
  },
  //横向柱镜
  changeTable2: function (e) {
    var add = e.currentTarget.dataset.add;
    zjIndex += add / 1;
    if (zjIndex <= 0) {
      zjIndex = 0;
    } else if (zjIndex + zjLength > util.zjArr.length) {
      zjIndex = util.zjArr.length - zjLength;
    }
    this.setData({
      zjArr: util.zjArr.slice(zjIndex, zjIndex + zjLength)
    })
  },
  //订单备注
  taking_remark: function (e) {
    this.setData({
      remark: e.detail.value
    })

  },
  //点击确定
  save: function () {

    var that = this;
    var t = this.data.tdData;
    var s = this.data.stockData;
    var store_id = app.globalData.store_id;
    var pd = 0;
    for (var i in t) {
      if (t[i + ""] != s[i + ""] && degree[i + ""]) {
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

    var th = getCurrentPages()[2];
    wx.showModal({
      title: '提示',
      content: '是否直接生成盘点',
      cancelText: "加入列表",
      confirmText: "直接盘点",
      success: function (res) {
        if (res.confirm) {
          that.setData({
            hiddenModal: false
          })
        } else {
          var t = that.data.tdData;
          var s = that.data.stockData;
          var store_id = app.globalData.store_id;

          var jo = [];
          var stock_img = "../images/Icon_Default_productr.png"
          if (img_name) {
            stock_img = 'http://cnc.jingliyun.com/pic/' + img_type[type - 1] + '/' + img_name;
          }


          for (var i in t) {
            if (t[i + ""] != s[i + ""] && degree[i + ""]) {
              var jr = {};

              jr["degree_id"] = degree[i + ""].degree_id;
              jr["takingdetails_status"] = (t[i + ""] ? t[i + ""] : 0) / 1 - (s[i + ""] ? s[i + ""] : 0) / 1;
              jr["taking_brand"] = name + ";" + i;// 品牌
              jr["taking_price"] = (t[i + ""] ? t[i + ""] : 0) / 1 * (degree[i + ""].orderPrice ? degree[i + ""].orderPrice : 0) / 1
              jr["taking_saleprice"] = (t[i + ""] ? t[i + ""] : 0) / 1 * (degree[i + ""].price ? degree[i + ""].price : 0) / 1
              jr["takingdetails_damagesPrice"] = (degree[i + ""].orderPrice ? degree[i + ""].orderPrice : 0) / 1;// 进货价
              jr["takingdetails_unitPrice"] = (degree[i + ""].price ? degree[i + ""].price : 0) / 1;// 单价


              var ar = jr["taking_brand"].split(";");


              jo.push({ src: stock_img, title: ar[0] + " " + ar[1], detail: ar[2] + " " + ar[3] + " " + ar[4] + "" + ar[5], stock: s[i + ""], actual: t[i + ""], difval: jr["takingdetails_status"], id: jr["degree_id"], price: jr["taking_saleprice"], orderPrice: jr["taking_price"], goods_type: type, taking_storeid: jr["taking_storeid"], taking_brand: jr["taking_brand"], img_name: img_name, numbers_id: stock_id });

            }
          }
          var g = JSON.stringify(th.data.gou);
          console.log(g)
          var gou = JSON.parse(g);
          for (var u = 0; u < jo.length; u++) {
            var pd = 1;
            for (var i = 0; i < gou.length; i++) {
              if (jo[u].id == gou[i].id && jo[u].goods_type == gou[i].goods_type) {
                pd = 0;
                gou[i].actual = jo[u].actual;
                break;
              }
            }
            if (pd == 1) {
              gou.push(jo[u]);
            }
          }
         
          console.log(gou)
          th.setData({
            gou: gou
          })
          var g_saoall = getCurrentPages()[2].get_saoall();
          wx.setStorageSync("pan_" + app.globalData.store_id + "_" + app.globalData.user_id, { "time": formatTime(new Date().getTime(), "Y-M-D"), "ar": gou, "select": getCurrentPages()[2].get_select() })
          for (var i in g_saoall) {
            var pd_i = 0;

            for (var j in sao_all) {
              if (i == j) {
                g_saoall[i] = sao_all[j]
                pd_i = 1;
              }
            }
            if (!pd_i) {
              g_saoall.push(sao_all[j]);
            }
          }
          console.log(g_saoall)
          if (g_saoall.length) {
            for (var j in sao_all) {
              g_saoall.push(sao_all[j]);
            }
          }
          getCurrentPages()[2].set_saoall(g_saoall);
          sao_all = {};
          console.log(th.data.gou)
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
  fh: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  sao: function () {
    var g_t = type;
    var g_id = stock_id;
    saoma(this, g_t, g_id)
  },
  listenerConfirm: function () {
    var that = this;
    var t = that.data.tdData;
    var s = that.data.stockData;
    var store_id = app.globalData.store_id;
    console.log(store_id)
    var ja = {};
    ja["store_id"] = app.globalData.store_id;
    ja["taking_NO"] = new Date().Format("yyyyMMddHHmm") + "" + suiji(4);
    ja["taking_type"] = 1;
    ja["users_id"] = app.globalData.user_id;
    ja["users_id_realname"] = app.globalData.userdetil.user_realname;
    ja["taking_time"] = new Date().Format("yyyy-MM-dd HH:mm:ss");
    ja["taking_brand_total"] = 1;// 品牌数
    ja["taking_goods_total"] = 0;// 商品总数
    ja["taking_goods_pricetotal"] = 0;// 总成本价
    ja["taking_goods_salepricetotal"] = 0;// 总销售价
    ja["taking_remark"] = this.data.remark;
    ja["taking_status"] = 0;
    ja["opt"] = "add";
    ja["ref"] = "#";
    ja["tb"] = "Taking";
    var jo = [];
    for (var i in t) {
      if (t[i + ""] != s[i + ""] && degree[i + ""]) {
        var jr = {};
        jr["goods_type"] = type;
        jr["degree_id"] = degree[i + ""].degree_id;
        jr["numbers_id"] = stock_id;
        jr["taking_number"] = t[i + ""];
        jr["takingdetails_status"] = (t[i + ""] ? t[i + ""] : 0) / 1 - (s[i + ""] ? s[i + ""] : 0) / 1;
        jr["taking_storeid"] = store_id;
        jr["taking_brand"] = name + ";" + i;// 品牌
        jr["taking_price"] = (t[i + ""] ? t[i + ""] : 0) / 1 * (degree[i + ""].orderPrice ? degree[i + ""].orderPrice : 0) / 1
        jr["taking_saleprice"] = (t[i + ""] ? t[i + ""] : 0) / 1 * (degree[i + ""].price ? degree[i + ""].price : 0) / 1
        jr["takingdetails_unitPrice"] = (degree[i + ""].price ? degree[i + ""].price : 0) / 1;
        jr["takingdetails_damagesPrice"] = (degree[i + ""].orderPrice ? degree[i + ""].orderPrice : 0) / 1;
        jr["takingdetails_fortunename"] = img_name;// 图片
        jo.push(jr);



        // 总计
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
    console.log(jarr)
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
          if (res.data.data[0][0][0]) {
            tui(res.data.data[0][0][0])
          }
          var a_1 = JSON.stringify(s);
          that.setData({
            tdData: JSON.parse(a_1)
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          sao_all = {};
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    zjIndex = 0;
    zjLength = 8;
    qjIndex = 0;
    qjLength = 16;
    stock_id = options.id;
    name = options.taking_brand;
    img_name = options.img_name;
    console.log(options)
    pan = getCurrentPages()[2].data.pan;
    console.log(getCurrentPages()[2].data.pan)
    type = options.type;
    sao_all = {};
    load_degree(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        var qjLength = Math.floor((res.windowHeight - 185-33) / Math.ceil(res.windowWidth / 750 * 60));
        that.setData({
          qjLength: qjLength,
          zjArr: util.zjArr.slice(zjIndex, zjIndex + zjLength),
          qjArr: util.qjArr2.slice(qjIndex, qjIndex + qjLength),
        })
        console.log(that.data.qjLength)
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

function saoma(that, g_t, g_id) {
  wx.scanCode({
    onlyFromCamera: true,
    success: (res) => {
      console.log(res)
    },
    complete: (res) => {
      if (res.errMsg == "scanCode:fail cancel") {
        console.log("取消扫码")
      } else if (res.errMsg == "scanCode:fail") {
        wx.showToast({
          title: '扫描失败',
          icon: 'none',
          duration: 1000
        })
        saoma(that, g_t, g_id)
      } else if (res.errMsg == "scanCode:ok") {
        var c_1 = res.result;
        if (c_1) {
          var c_2 = c_1.split("?id=")[1];
          var idlength = c_2.length;
          var ids = c_2.substring(idlength * 1 - 20, idlength * 1 - 8) + "";
          var ids1 = c_2.substring(idlength / 1 - 33, idlength / 1 - 20) + "";
          console.log(app.globalData.store_id)
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
              console.log(res1)
              if ((res1.data.code == 200 || res1.data.code == 201) && res1.data.data[0]) {
                var list = res1.data.data[0];
                var goods_type = list.stock_type;

                if (goods_type == 1 || goods_type == 4 || goods_type == 5) {


                  if (sao_all[goods_type + "_" + list.degree_id] && sao_all[goods_type + "_" + list.degree_id].indexOf(c_2) != -1) {
                    wx.showToast({
                      title: '扫描重复',
                      icon: 'none',
                      duration: 1000
                    })
                    saoma(that, g_t, g_id)
                    return;
                  }
                }


                if (goods_type == 1 || goods_type == 4 || goods_type == 5) {




                  if (g_t == goods_type && list.stock_id == g_id) {

                    if (!sao_all[goods_type + "_" + list.degree_id]) {
                      sao_all[goods_type + "_" + list.degree_id] = [];
                    }
                    sao_all[goods_type + "_" + list.degree_id].push(c_2)
                    var td_d = that.data.tdData;
                    if (td_d[list.degree_cyl + ""] != undefined) {
                      td_d[list.degree_cyl + ""] = td_d[list.degree_cyl + ""] / 1 + 1;
                    }
                    that.setData({
                      tdData: td_d
                    })
                    wx.showToast({
                      title: '扫描成功',
                      icon: 'none',
                      duration: 1000
                    })
                  } else {
                    wx.showToast({
                      title: '标签错误',
                      icon: 'none',
                      duration: 1000
                    })
                  }
                } else {
                  wx.showToast({
                    title: '标签错误，非此类商品',
                    icon: 'none',
                    duration: 1000
                  })
                }
              } else {
                wx.showToast({
                  title: '未扫到商品',
                  icon: 'none',
                  duration: 1000
                })
              }
              saoma(that, g_t, g_id)
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

function load_degree(that) {

  var store_id = app.globalData.store_id;
  var id = '{"code":"A11","accesstoken":"SELECT * FROM tb_glassesdegree' + store_id + ' WHERE stock_id = ' + stock_id + '"}'
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
      if (res.data.code == 200) {
        var list = res.data.data;
        var s = {};
        var t = {};
        var z = {};
        for (var i = 0; i < list.length; i++) {
          var s_c = list[i].degree_cyl;
          var degree_id = list[i].degree_id;
          s[s_c + ""] = list[i].numbers;
          t[s_c + ""] = list[i].numbers;
          degree[s_c + ""] = { degree_id: list[i].degree_id, price: list[i].price, orderPrice: list[i].orderPrice, degree_wholesalePrice: list[i].degree_wholesalePrice };
          var cyl = s_c.split(",")[1];
          if(!z[cyl]){
            totalA[cyl] = list[i].numbers;
            z[cyl] = list[i].numbers;
          }else{
            totalA[cyl] = totalA[cyl]/1+list[i].numbers/1;
            z[cyl] = z[cyl]/1+list[i].numbers/1;
          }



        }
        that.setData({
          tdData: t,
          stockData: s,
          totalArr:z,
          totalA: totalA
        })
      } else if (res.data.code == 201) {
        wx.showToast({
          title: '未查到数据',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: 'IO或签名错误',
          icon: 'none',
          duration: 2000
        })
      }
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
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}