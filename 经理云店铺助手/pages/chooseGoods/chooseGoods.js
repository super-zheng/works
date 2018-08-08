var qjArr = [];
var zjArr = [];
var demoNumQj = -36;
var demoNumZj = 0;
var flagg = 1;
var start = 0;
//
function joinstring(that){
  var restr = "";
  if (that.data.typeBtnCheck===-1){
    
  }else{
    flagg = 1;
    start = 0;
  }
  
}
function tozero(o){
  flagg = o&&o['flag'] ? o['flag']:1;
  start = o&&o['start'] ? o['start'] :0;
}
while (demoNumQj <= 36) {
  if (demoNumQj.toFixed(2) < 0) {
    qjArr.push(demoNumQj.toFixed(2));
  } else {
    qjArr.push('+' + demoNumQj.toFixed(2));
  }

  demoNumQj += 0.25;
}
while (demoNumZj >= -8) {
  if (demoNumZj.toFixed(2) < 0) {
    zjArr.push(demoNumZj.toFixed(2));
  } else {
    zjArr.push('+' + demoNumZj.toFixed(2));
  }

  demoNumZj -= 0.25;
}
function render(that,res,lists){
  
  var goodslist = (res.data.data[0].goodsinfo);
  for (var i = 0; i < goodslist.length; i++) {
    console.log(goodslist);
    var goodstype = goodslist[i].stock_type;
    var goodsdetilfortype = tiaojian[goodstype - 1];
    var ids = goodslist[i].model_code;
    if (uncode[goodstype - 1] == "") {
      ids += "," + " ";
    } else {
      ids += "," + goodslist[i][uncode[goodstype - 1]];
    }
    ids += "," + goodstype + "," + goodslist[i].stock_id;
    var goodsdetilfortype0 = goodsdetilfortype[0].key;
    var goodsdetilfortype1 = model[goodstype - 1];
    var goodsdetilfortype2 = rec[goodstype - 1];
    var goodsdetilfortype3 = field[goodstype - 1] ? field[goodstype - 1] : "";
    goodsObj[ids] = goodslist[i];
    var Img_ = '';
    Img_ = goodslist[i].stock_imgPath == "" ? (app.globalData.storelogimg == '' ? app.globalData.logo : app.globalData.path + 'ImagePath/' + app.globalData.storelogimg) : app.globalData.path + app.globalData.GoodsName[goodstype - 1] + '/' + goodslist[i].stock_imgPath.split(';')[0];
    var goodsdetil = { image: Img_, type: types[goodstype - 1], brand: goodslist[i][goodsdetilfortype0], caizhi: goodslist[i][goodsdetilfortype1], xilie: goodslist[i][goodsdetilfortype2], field: goodslist[i][goodsdetilfortype3], price: goodslist[i].stock_price.toFixed(2), id: ids, check: false, types: goodstype, stock_id: goodslist[i].stock_id };
    if (goodstype == 1 || goodstype==5){
      var mark = app.globalData.optometrys[app.globalData.chosecutid];
      if (mark){
        goodsdetil['qjL'] = mark.qjL && mark ? qjArr.indexOf(mark.qjL) : 144;
        goodsdetil['zjL'] = mark.zjL && mark ? zjArr.indexOf(mark.zjL) : 0;
        goodsdetil['qjR'] = mark.qjR && mark ? qjArr.indexOf(mark.qjR) : 144;
        goodsdetil['zjR'] = mark.zjR && mark ? zjArr.indexOf(mark.zjR) : 0;
      }else{
        goodsdetil['qjL'] = 144;
        goodsdetil['zjL'] = 0;
        goodsdetil['qjR'] = 144;
        goodsdetil['zjR'] = 0;
      }
      
    } else if (goodstype==4){
      var mark = app.globalData.optometrys[app.globalData.chosecutid];
      if (mark){
        goodsdetil['qj'] = mark.qjL && mark ? qjArr.indexOf(mark.qjL) : 144;
        goodsdetil['zj'] = mark.zjL && mark ? zjArr.indexOf(mark.zjL) : 0;
      }else{
        goodsdetil['qj'] = 144;
        goodsdetil['zj'] = 0;
      }
      
    }
    console.log(goodsdetil)
    lists.push(goodsdetil)
  }
  that.setData({
    lists: lists
  })
}
//object2object
function o2o(a,b){
  var A = a;
  for(var i in b){
    A[i] = b[i];
  }
  return A;
}
function sumcount(that){
  var all = 0;
  var obj = app.globalData.shopcargoodsdetil;
  for(var i in obj){
    if(obj[i]['count']){
      all += obj[i]['count']/1;
    }
  }
  that.setData({
    shopcount:all
  });
  app.globalData.shopcount = all;
}


var types = ['镜片', '镜架', '太阳眼镜', '成品眼镜', '隐形眼镜', '护理液', '配件'];
var uncode = ["", "colorNumber", "colorNumber", "", "", "caresolution_rule", "accessory_size", "", ""];// 色号，批次号，规格大小
var lists = [];
var tiaojian = [
  [{ 'name': '品牌', 'key': 'lens_brand' }, { 'name': '品类', 'key': 'lens_model' }, { 'name': '材质', 'key': 'lens_material' }, { 'name': '折射率', 'key': 'lens_refractivity' }],
  [{ 'name': '品牌', 'key': 'gframe_brand' }, { 'name': '品类', 'key': 'gframe_model' }, { 'name': '型号', 'key': 'gframe_style' }, { 'name': '材质', 'key': 'gframe_material' }, { 'name': '色号', 'key': 'colorNumber' }],
  [{ 'name': '品牌', 'key': 'sun_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '型号', 'key': 'sun_style' }, { 'name': '材质', 'key': 'sun_material' }, { 'name': '色号', 'key': 'colorNumber' }],
  [{ 'name': '品牌', 'key': 'presbyopic_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '材质', 'key': 'presbyopic_lensMaterial' }, { 'name': '功能', 'key': 'presbyopic_function' }],
  [{ 'name': '品牌', 'key': 'contact_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '型号', 'key': 'contact_model' }, { 'name': '材质', 'key': 'contact_material' }],
  [{ 'name': '品牌', 'key': 'caresolution_brand' }, { 'name': '系列', 'key': 'o1' }, { 'name': '容量', 'key': 'caresolution_rule' }],
  [{ 'name': '品牌', 'key': 'accessory_brand' }, { 'name': '型号', 'key': 'accessory_model' }, { 'name': '材质', 'key': 'accessory_material' }, { 'name': '功能', 'key': 'accessory_function' }]

]
var  rec = ["lens_refractivity", "gframe_style", "sun_style", "presbyopic_style",
  "contact_model", "caresolution_model", "accessory_model", "lens_refractivity"];//型号
var model = ["lens_model", "gframe_model", "o1", "o1", "o1", "o1", "category",
  "lens_model"];//品类
var field = ["", "colorNumber", "colorNumber", "", "product_batch_no",
  "caresolution_rule", "accessory_size", ""]; //色号尺寸规格
var brand = ["lens_brand", "gframe_brand", "sun_brand", "presbyopic_brand", "contact_brand", "caresolution_brand", "accessory_brand", "lens_brand"]
var sph = {};//存放球柱镜的值
var goodsObj = {};
var unicode = {};
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',//搜索条件
    lists: [
    ],//页面商品数据
    checkId: '',//页面商品筛选的ID
    openChoose: false,
    types: types,
    typeBtnCheck: -1,//商品类型
    indexpage: 0,//下滑更新第几页
    chooseType: tiaojian,//通过类型 动态渲染赛选条件
    bigType: 'lens_brand',
    detail: [],
    detailIndex: {},
    shopCar: [],
    qjArr:qjArr,
    zjArr:zjArr,
    value:[[144],[0]],
    qzBool:false,
    goodDetailHide:false,
    goodsId: '',
    jingpian: false,
    qzValue: [{
      qjvalue: '+0.00',
      zjvalue: '+0.00'
    },
    {
      qjvalue: '+0.00',
      zjvalue: '+0.00'
    }],
    checkEye: 0,
    kucun: 0,
    shopcount: app.globalData.shopcount
  },
  //左右眼切换事件
  chooseEyes: function (e) {
    console.log(e.currentTarget.dataset.num);
    var qzValue = this.data.qzValue[e.currentTarget.dataset.num];
    var valueArr = [];

    valueArr.push([qjArr.indexOf(qzValue.qjvalue)]);
    valueArr.push([zjArr.indexOf(qzValue.zjvalue)]);
    console.log(valueArr)
    var kucun = sph[qzValue.qjvalue + "," + qzValue.zjvalue] ? sph[qzValue.qjvalue + "," + qzValue.zjvalue]['numbers']:'无';
    this.setData({
      checkEye: e.currentTarget.dataset.num,
      value: valueArr,
      kucun:kucun
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  saomabutton: function(e){  //扫码选择商品
    // wx.scanCode({
    //   success:function(res){
    //     console.log(res);
    //   }
    // });
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var store_id = app.globalData.store_id
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function (res) {
        console.log(res)
        if (res.result) {//判断是否扫描到结果
          //判断是否是5.0的码
          if (res.result.indexOf('cnc') > 0) {
            //单据or单个商品
            if (res.result.indexOf('id=') > 0) {//单个商品
              var code = res.result.substring(res.result.indexOf('id=') + 3)
              //判断该码是否已被扫
              if (unicode['c' + code]) {
                wx.showToast({
                  title: '扫码重复',
                  image: '../images/warn.png'
                })
                return
              }
              // console.log(unicode)
              wx.request({
                url: 'https://www.jingliyun.cn/jlyyj/index.php/Small/SmallProgram/ScanTT',
                data: {
                  code: code,
                  store_id: store_id
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  wx.hideLoading()
                  console.log(res)
                  unicode['c' + code] = code
                  if (!res.data.data[0]) {
                    wx.showToast({
                      title: '未查询到数据',
                      image: '../images/warn.png',
                      duration: 500
                    })
                    return
                  }
                  if (res.data.code == 200) {
                    if (res.data.data[0].wyminfo.number_status == 2) {
                      wx.showToast({
                        title: '该商品已销售',
                        image: '../images/warn.png',
                        duration: 500
                      })
                      return
                    } else {
                      if (res.data.data[0].numbers > 0) {
                        // app.globalData.shopcount = app.globalData.shopcount + 1
                        var goodslist = res.data.data[0];
                        var goodstype = goodslist.stock_type;
                        var goodsdetilfortype = tiaojian[goodstype - 1];
                        var ids = goodslist.model_code;
                        if (goodstype == 1 || goodstype == 4 || goodstype == 5) {
                          ids += "," + goodslist.degree_cyl.split(",")[0] + ";" + goodslist.degree_cyl.split(",")[1];
                        } else {
                          ids += "," + goodslist[uncode[goodstype - 1]];
                        }
                        ids += "," + goodstype + "," + goodslist.stock_id;
                        var arr1 = that.data.shopCar;
                        let googsl = app.globalData.shopcargoodsdetil;
                        if (googsl[ids]) {
                          googsl[ids].count++;
                        } else {
                          googsl[ids] = goodslist;
                          googsl[ids]['count'] = 1;
                          arr1.push(ids);
                        }
                        if (!googsl[ids]['wym']) {
                          googsl[ids]['wym'] = [];
                        }
                        googsl[ids]['wym'].push(goodslist.wyminfo);
                        app.globalData.shopcargoods = arr1;
                        that.setData({
                          shopCar: arr1
                        });
                        sumcount(that);
                        wx.showToast({
                          title: '已添加至购物车',
                          image: '../images/cart_ic_check_box_selected.png',
                          duration: 500
                        })
                      } else {
                        wx.showToast({
                          title: '该商品暂无库存',
                          image: '../images/warn.png',
                          duration: 500
                        })
                        return
                      }

                    }
                  } else {
                    wx.showToast({
                      title: '该店暂无此商品',
                      image: '../images/warn.png',
                      duration: 500
                    })
                    return
                  }
                },
                fial: function () {
                  wx.hideLoading()
                  wx.showToast({
                    title: '扫码失败',
                    image: '../images/warn.png',
                    duration: 500
                  })
                }
              })
            } else {//单据
              //不支持
              wx.showToast({
                title: '暂不支持扫单据',
                image: '../images/warn.png'
              })
            }
          } else {
            wx.showToast({
              title: '请扫描5.0二维码',
              image: '../images/warn.png'
            })
            return
          }
        } else {
          wx.showToast({
            title: '扫码失败',
            duration: 500
          })
        }
      }
    })
  },
  //搜索点击事件
  selectforgoods: function (e) {
    var that = this;
    var likes = "'%" + this.data.inputValue + "%'";
    joinstring(that)
    var id = { "store_id": app.globalData.store_id, "limitstr": "limit " + that.data.indexpage / 1 * 20 + ",20", "likesSql": likes, "where": [{ "where": "", "type": Number(that.data.typeBtnCheck) + 1, "status": "", "flag": flagg, "start": start}] };
    console.log(id)
    //发请求 加载数据
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'findgoodsforwx',
        ids: id,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        that.setData({
          indexpage: 0
        })
        console.log(res);
        tozero(res.data.data['res'])
        if (res.data.code == 200) {
          lists = []
          that.setData({
            lists: lists
          })
          render(that, res, lists);
        } else if (res.data.code == 201) {
          that.setData({
            lists: []
          })
          wx.showToast({
            title: '未查到相关商品！',
            image: '../images/warn.png',
            duration: 1000
          })
        }
      }
    })
  },
  //点击商品单选事件
  checkGoods: function (e) {
    var id = e.currentTarget.id;
    var arr = this.data.lists;
    var that = this;
    this.setData({
      goodsId:id
    })
    console.log(goodsObj[id]);
    //console.log(e.currentTarget.dataset.types);
    var types = e.currentTarget.dataset.types;
    if (types == 1 || types == 4 || types == 5) {
      var goodObj = arr.filter(function(item){ return item.id== id})[0];
      if (types == 1 || types == 5){
        this.setData({
          jingpian:true,
          value: [[goodObj.qjR], [goodObj.zjR]],
          qzValue: [{
            qjvalue: qjArr[goodObj.qjR],
            zjvalue: zjArr[goodObj.zjR]
          },
          {
            qjvalue: qjArr[goodObj.qjL],
            zjvalue: zjArr[goodObj.zjL]
          }],
        })
        
      }else{
        this.setData({
          value: [[goodObj.qj], [goodObj.zj]],
          qzValue: [{
            qjvalue: qjArr[goodObj.qj],
            zjvalue: zjArr[goodObj.zj]
          },
          {
            qjvalue: qjArr[goodObj.qj],
            zjvalue: zjArr[goodObj.zj]
          }],
        })
      }
      // sph
      var stock_id = id.split(",")[3];
      var store_id = app.globalData.store_id;
      var sql = { "code": "A10", "accesstoken": "select degree_cyl,degree_id,price,orderPrice,numbers from tb_glassesdegree" + store_id+" where stock_id =" + stock_id+""};
      wx.request({
        url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
        data: {
          par1: 'common',
          par2: 'api',
          ids: sql,
        }, header: {
          'content-type': 'application/json' // 默认值
        },
        method: "GET",
        success: function (res) {
          
          console.log(res);
          if(res.data.code==200){
            var slist = res.data.data;
            sph = {};
            for(var i=0,len=slist.length;i<len;i++){
              sph[slist[i].degree_cyl] = slist[i];
            }
            console.log(sph)
            var kucun = '';
            var sph_ = that.data.qzValue[0].qjvalue + "," + that.data.qzValue[0].zjvalue;
            kucun = sph[sph_] ? sph[sph_].numbers:'无';
            that.setData({
              qzBool: true,
              kucun: kucun
            })
          }else{
            wx.showToast({
              title: '数据异常！',
              image: '../images/warn.png',
              duration: 1000
            })
          }
        }
      })

      

    }else{
      var arr1 = this.data.shopCar;
      var flag = true;
      // for (var i = 0, len = arr1.length;i<len;i++){
      //     if(arr1[i]==id){
      //       flag = false; 
      //       break;
      //     }
      // }
      // if (flag){
        
        this.setData({
          goodDetailHide: true
        })
      // }else{
      //   wx.showToast({
      //     title: '商品已选中。',
      //     duration: 1000
      //   })
      // }
      
    };
    // var shopCar = this.data.shopCar;
    // arr.forEach(function (item, index) {
    //   if (item.id == id) {
    //     item.check = !item.check
    //     if (shopCar.indexOf(id) == -1) {
    //       shopCar.push(id)
    //     } else {
    //       shopCar.splice(shopCar.indexOf(id), 1);
    //     }
    //   }
    // })
    // this.setData({
    //   shopCar: shopCar,
    //   lists: arr
    // })
    //app.globalData.shopcargoods = this.data.shopCar;
  },
  //picker设置球柱镜
  setQZ: function (e) {
    // console.log(e);
    // var qzValue = this.data.qzValue;
    // qzValue[e.currentTarget.dataset.name] = this.data[e.currentTarget.dataset.arr][e.detail.value[0]];
    // this.setData({
    //   qzValue: qzValue
    // })
    console.log(e);
    var checkEye = this.data.checkEye;
    var qzValue = this.data.qzValue;
    console.log(qzValue[checkEye][e.currentTarget.dataset.name])
    qzValue[checkEye][e.currentTarget.dataset.name] = this.data[e.currentTarget.dataset.arr][e.detail.value[0]];

    
    console.log(this.data.qzValue)
    var key = this.data.qzValue[checkEye].qjvalue + "," + this.data.qzValue[checkEye].zjvalue;
    console.log(sph)
    var kucun = sph[key] ? sph[key]['numbers']:'无';
    this.setData({
      qzValue: qzValue,
      kucun: kucun
    })
  },
  //球柱镜选择确定按钮
  confirm1:function(e){
    console.log(goodsObj)
    var id = e.target.id;
    var qzj = this.data.qzValue//当前选择的球柱镜对象
    var goodList = this.data.lists;
    goodList.revise(this.data.goodsId, function (obj) {
      if (obj.types == 1) {
        obj.qjR = qjArr.indexOf(qzj[0].qjvalue);
        obj.zjR = zjArr.indexOf(qzj[0].zjvalue);
        obj.qjL = qjArr.indexOf(qzj[1].qjvalue);
        obj.zjL = zjArr.indexOf(qzj[1].zjvalue);
      } else {
        obj.qj = qjArr.indexOf(qzj[0].qjvalue);
        obj.zj = zjArr.indexOf(qzj[0].zjvalue);
      }
      return obj;
    })
    //发请求将该商品加入到购物车
    this.setData({
      jingpian: false,
      qzBool: false,
      qzValue: [
        {
          qjvalue: '+0.00',
          zjvalue: '+0.00'
        },
        {
          qjvalue: '+0.00',
          zjvalue: '+0.00'
        }
      ],
      value: [[144], [0]],
      checkEye: 0,
      lists: goodList
    })
    var that = this;
    var modelcode = id.split(",")[0];
    var goodstypefor = id.split(",")[2]/1;
    var stock_id = id.split(",")[3];
    var qzjarr = [];
    var temparr = [];
    var googsl = app.globalData.shopcargoodsdetil;
    if (qzj){
      for (var i = 0, len = qzj.length; i < len; i++) {
        var goodscarid = modelcode + "," + qzj[i].qjvalue + ";" + qzj[i].zjvalue + "," + goodstypefor + "," + stock_id;
        if (!googsl[goodscarid]){
          qzjarr.push(goodscarid);
          var aa = JSON.stringify(goodsObj[id]);
          googsl[goodscarid] = JSON.parse(aa);
          if (sph[qzj[i].qjvalue + "," + qzj[i].zjvalue]){
            let b = sph[qzj[i].qjvalue + "," + qzj[i].zjvalue];
            googsl[goodscarid] = o2o(googsl[goodscarid],b);
          }
          googsl[goodscarid]['count'] = 1;
        }else{
          console.log(googsl[goodscarid].count)
          googsl[goodscarid].count = googsl[goodscarid].count +1;
          console.log(googsl)
        }
        if (!sph[qzj[i].qjvalue + "," + qzj[i].zjvalue]){
          var tobj = { "degree_cyl": qzj[i].qjvalue + "," + qzj[i].zjvalue };
          temparr.push(tobj);
        }
        if (goodstypefor==4){
          break;
        }
      }
    }
    temparr = temparr.uniq(temparr);
      // var arr1 = this.data.shopCar;
      // arr1.concat(qzjarr);
      // wx.showToast({
      //   title: '此球柱镜无库存！',
      //   image: '../images/warn.png',
      //   duration: 1000
      // })
      if (temparr.length>0){
        var id2 = {};
        id2['stock_id'] = stock_id;
        id2['store_id'] = app.globalData.store_id;
        id2['type'] = goodstypefor;
        // var temparr = [];
        // var tobj = { "degree_cyl": that.data.qzValue.qjvalue + "," + that.data.qzValue.zjvalue};
        // temparr.push(tobj);
        id2['array'] = temparr;
        wx.request({
          url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
          data: {
            par1: 'android',
            par2: 'ruku',
            ids: id2,
          }, header: {
            'content-type': 'application/json' // 默认值
          },
          method: "GET",
          success: function (res1) {
            if (res1.data.code == 200) {
              var listArr = res1.data.data;
              for (let i = 0, len = listArr.length;i<len;i++){
                let carid = '';
                let temm = id.split(',');
                temm[1] = listArr[i].degree_cyl.split(",")[0] +";"+ listArr[i].degree_cyl.split(",")[1];
                carid = temm.toString();
                googsl[carid] = o2o(googsl[carid], listArr[i]);
                app.globalData.shopcargoodsdetil = googsl;
              }
              var arr1 = that.data.shopCar;
              for (let i = 0, len = qzjarr.length;i<len;i++){
                arr1.push(qzjarr[i]);    
              }
              // arr1.concat(qzjarr);
              that.setData({
                shopCar: arr1
              });
              sumcount(that);
              app.globalData.shopcargoods = that.data.shopCar
              wx.showToast({
                title: '加入购物车！',
                duration: 500
              })
            } else {
              wx.showToast({
                title: '服务异常请重试！',
                image: '../images/warn.png',
                duration: 1000
              })
            }
          }
        })
      }else{
          var arr1 = that.data.shopCar;
          for (var i = 0, len = qzjarr.length; i < len; i++) {
            arr1.push(qzjarr[i]);
          }
          //qzjarr.concat(arr1);
          that.setData({
            shopCar: arr1
          })
          sumcount(that);
          app.globalData.shopcargoods = that.data.shopCar;
          wx.showToast({
            title: '加入购物车！',
            duration: 500
          })
      }
      
          
    
    },
  //球柱镜选择取消按钮
  cancel1:function(e){
    this.setData({
      qzBool: false,
      value: [[144], [0]],
      checkEye: 0,
      jingpian: false
    })
  },
  //提示的确定按钮
  confirm2: function (e) {
    var id = e.target.id;
    var that = this;
    var googsl = app.globalData.shopcargoodsdetil;
    var flag = false;
    if (!googsl[id]){
      googsl[id] = goodsObj[id];
      googsl[id]['count'] = 1;
      flag = true;
    }else{
      googsl[id]['count']++;
    }
    if (flag){
      this.data.shopCar.push(id)
      this.setData({
        shopCar: this.data.shopCar
      })
      app.globalData.shopcargoods = this.data.shopCar
    }
    sumcount(that);
    this.setData({
      goodDetailHide: false
    })
  },
  //提示的取消按钮
  cancel2: function (e) {
    this.setData({
      goodDetailHide: false
    })
  },
  //开关选择界面
  openSider: function () {
    var that = this;
    this.setData({
      openChoose: !that.data.openChoose
    })
    if (this.data.openChoose) {
      //在这里发请求，获取镜片 的所有品牌名称 渲染到detail
      this.setData({//初次打开筛选时，默认选择查询镜片的品牌类型
        typeBtnCheck: 0,
        bigType: 'lens_brand',
        inputValue: ''
      })
      joinstring(that)
      var id = { "type": "1", "store_id": app.globalData.store_id, "select": "lens_brand", "where": "" }
      console.log(id);
      wx.request({
        url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
        data: {
          par1: 'php',
          par2: 'findplforwx',
          ids: id,
        }, header: {
          'content-type': 'application/json' // 默认值
        },
        method: "GET",
        success: function (res) {
          that.setData({
            indexpage: 0
          })
          console.log(res);
          if (res.data.code == 200) {
            var details = [];
            for (var i = 0; i < res.data.data[0].goodsinfo.length;i++){
              details.push(res.data.data[0].goodsinfo[i][that.data.bigType])
            }
            that.setData({
              detail: details
            })
          } else if (res.data.code == 201) {
            wx.showToast({
              title: '没有对应的级别！',
              image: '../images/warn.png',
              duration: 1000
            })
          }
        }
      })
    } else {
      this.setData({
        detailIndex: {},
        typeBtnCheck: -1,
        bigType: 'lens_brand'
      })
      joinstring(this)
    }
  },
  closeSider: function () {
    this.setData({
      openChoose: false,
      detailIndex: {},
      typeBtnCheck: -1,
      bigType: 'lens_brand'
    })
    joinstring(this)
    console.log(this.data.typeBtnCheck)
  },
  //阻止冒泡
  emtyTap: function () { },

  //商品类型选择点击事件注册
  typeBtnCheck: function (e) {
    var that = this;
    this.setData({
      typeBtnCheck: e.currentTarget.id,
      bigType: that.data.chooseType[e.currentTarget.id][0].key,
      detailIndex: {}
    })
    joinstring(that)
    var id = { "type": Number(that.data.typeBtnCheck) + 1, "store_id": app.globalData.store_id, "select": that.data.bigType, "where": "" }
    console.log(id)
    //这里发请求，获取类型是 this.data.typeBtnCheck 的  this.data.bigType 的所有数据 渲染到 detail
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'findplforwx',
        ids: id,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        that.setData({
          indexpage: 0
        })
        console.log(res);
        if (res.data.code == 200) {
          var details = [];
          for (var i = 0; i < res.data.data[0].goodsinfo.length; i++) {
            details.push(res.data.data[0].goodsinfo[i][that.data.bigType])
          }
          that.setData({
            detail: details
          })
        } else if (res.data.code == 201) {
          wx.showToast({
            title: '没有对应的级别！',
            image: '../images/warn.png',
            duration: 1000
          })
        }
      }
    })
  },
  //大类选择点击事件
  bigClassCheck: function (e) {
    var that = this;
    this.setData({
      bigType: e.currentTarget.id
    })
    //这里发请求，请求条件是根据 this.data.detailIndex  拿到 this.data.bigType 类型的数据 渲染到 detail
    var detilindexlist = this.data.detailIndex;
    var sqlwhere = "";
    if (detilindexlist) {
      for (var i in detilindexlist) {
        sqlwhere += "and " + i + " = '" + detilindexlist[i] + "' ";
      }
      sqlwhere = sqlwhere.substring(0, sqlwhere.length - 1)//取出最后的一个空格，否则无法签名
    }
    console.log(sqlwhere)
    var id = { "type": Number(that.data.typeBtnCheck) + 1, "store_id": app.globalData.store_id, "select": that.data.bigType, "where": sqlwhere };
    console.log(sqlwhere)
    console.log(id)
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'findplforwx',
        ids: id,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        that.setData({
          indexpage: 0
        })
        console.log(res);
        if (res.data.code == 200) {
          var details = [];
          for (var i = 0; i < res.data.data[0].goodsinfo.length; i++) {
            details.push(res.data.data[0].goodsinfo[i][that.data.bigType])
          }
          that.setData({
            detail: details
          })
        } else{
          that.setData({
            detail: []
          })
          wx.showToast({
            title: '没有对应的级别！',
            image: '../images/warn.png',
            duration: 1000
          })
        }
      }
    })
  },
  //信息点击事件
  checkDetail: function (e) {
    var that = this;
    var detailIndex = this.data.detailIndex;
    if (detailIndex[that.data.bigType] != e.currentTarget.id) {
      detailIndex[that.data.bigType] = e.currentTarget.id;
    } else {
      delete detailIndex[that.data.bigType];
    }

    this.setData({
      detailIndex: detailIndex
    })
  },
  yes: function () {
    //这里发请求 筛选条件是 商品类型是this.data.typeBtnCheck  筛选条件是this.data.detailIndex
    //请求拿到的数据渲染到  lists
    var detilindexlist = this.data.detailIndex;
    var sqlwhere = "";
    if (detilindexlist) {
      for (var i in detilindexlist) {
        sqlwhere += "and " + i + " = '" + detilindexlist[i] + "' ";
      }
      sqlwhere = sqlwhere.substring(0, sqlwhere.length - 1) //取出最后的一个空格，否则无法签名
    }
    var that = this;
    joinstring(that)
    //发请求 加载数据
    var id = { "store_id": app.globalData.store_id, "limitstr": "limit " + that.data.indexpage / 1 * 20 + ",20", "likesSql": "", "where": [{ "where": sqlwhere, "type": Number(that.data.typeBtnCheck) + 1, "status": ""}] };
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'findgoodsforwx',
        ids: id,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        that.setData({
          indexpage:0
        })
        console.log(res)
        tozero(res.data.data['res'])
        if (res.data.code == 200) {
          lists = []
        render(that, res, lists);
        } else if (res.data.code == 201) {
          that.setData({
            detail: []
          })
          wx.showToast({
            title: '该店铺暂无商品，请添加！',
            image: '../images/warn.png',
            duration: 1000
          })
        } else if (res.data.code == 400) {
          that.setData({
            detail: []
          })
          wx.showToast({
            title: '服务器异常，请重试!',
            image: '../images/warn.png',
            duration: 1000
          })
        }
      }
    })
    //确定后筛选初始化
    this.setData({
      openChoose: false,
      // typeBtnCheck: 0,
      detailIndex: {}
      //bigType: 'lens_brand'
    })
  },
  shopcar: function () {
    wx.navigateTo({
      url: '../shopCar/shopCar',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = { "store_id": app.globalData.store_id, "limitstr": "limit " + that.data.indexpage / 1 * 20 + ",20", "likesSql": "", "where": [{ "where": "", "type": 0, "status": "", "flag": flagg, "start": start}] }
    console.log(id)
    wx.showLoading({
      title: '加载中',
    })
    //发请求 加载数据
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'findgoodsforwx',
        ids: id,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        that.setData({
          indexpage: 0
        })
        tozero(res.data.data['res'])
        if (res.data.code == 200) {
          //页面加载时拿到缓存的购物车里的商品
          that.setData({
            shopCar: app.globalData.shopcargoods
          })
          wx.showToast({
            title: '查询成功！',
            duration: 500
          })
          var lists = [];
          render(that, res, lists);
        } else if (res.data.code == 201) {
          wx.showToast({
            title: '该店铺暂无商品，请添加！',
            image: '../images/warn.png',
            duration: 1000
          })
        }else{
          wx.showToast({
            title: '未获取到本店铺的商品详情，请刷新或重新登陆！',
            image: '../images/warn.png',
            duration: 1000
          })
        }
        that.setData({
          indexpage:0
        })
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
    var that = this;
    sumcount(that);
    // this.setData({
    //   shopCar: app.globalData.shopcargoods
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
    var that = this;
    joinstring(that)
    var likes = "'%" + this.data.inputValue + "%'";
    var id = { "store_id": app.globalData.store_id, "limitstr": "limit " + that.data.indexpage / 1 * 20 + ",20", "likesSql": likes, "where": [{ "where": "", "type": Number(that.data.typeBtnCheck) + 1, "status": "", "flag": flagg, "start": start}] };
    console.log(id)
    //发请求 加载数据
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'findgoodsforwx',
        ids: id,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        that.setData({
          indexpage: 0
        })
        console.log(res);
        if (res.data.code == 200) {
          lists = []
          that.setData({
            lists: lists
          })
          render(that, res, lists);
        } else if (res.data.code == 201) {
          wx.showToast({
            title: '未查到相关商品！',
            image: '../images/warn.png',
            duration: 1000
          })
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.setData({
      indexpage: this.data.indexpage + 1
    })
    joinstring(that)
    var likes = "'%" + that.data.inputValue + "%'";
    var id = { "store_id": app.globalData.store_id, "limitstr": "limit " + that.data.indexpage / 1 * 20 + ",20", "likesSql": likes, "where": [{ "where": "", "type": Number(that.data.typeBtnCheck) + 1, "status": "", "flag": flagg, "start": start}] };
    console.log(id)
    //上拉触底追加新数据
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'findgoodsforwx',
        ids: id,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        tozero(res.data.data['res'])
        if (res.data.code == 200) {
          render(that, res, lists);
        } else if (res.data.code == 201) {
          wx.showToast({
            title: '没啦，到底啦！',
            image: '../images/warn.png',
            duration: 1000
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})