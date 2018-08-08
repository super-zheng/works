Array.prototype.SET_ATTR = function (id, callback) {
  var that = this;
  var i;
  that.forEach(function (item, index) {
    if (item.id == id) {
      i = index;
    }
    console.log(item.edit)
  })
  callback(that[i]);
  return that
}

function getTotalPrice(arr) {
  var newArr = arr.filter(function (item, index) {
    return item.check == true;
  });
  var allNum = 0;
  newArr.forEach(function (item, index) {
    allNum += item.num * item.price;
    console.log(item)
  })
  return allNum;
}
function demo() {
  console.log(this);
  console.log(123124124124)
}
function getpinming(obj,type){

    var pingming = "";
    switch (type) {
      case 1:
        pingming = obj["lens_brand"] + ";" + obj["lens_model"] + ";"
          + obj["lens_refractivity"] + ";" + obj['degree_cyl'];
        break;
      case 2:
        pingming = obj["gframe_brand"] + ";" + obj["gframe_model"] + ";"
          + obj["gframe_style"] + ";" + obj['colorNumber'];
        break;
      case 3:
        pingming = obj["sun_brand"] + ";" + obj["o1"] + ";" + obj["sun_style"] + ";" + obj['colorNumber'];
        break;
      case 4:
        pingming = obj["presbyopic_brand"] + ";" + obj["o1"] + ";"
          + obj["presbyopic_frameType"] + ";" + obj["presbyopic_colorNumber"] + ";" + obj['degree_cyl'] ;
        break;
      case 5:
        pingming = obj["contact_brand"] + ";" + obj["o1"] + ";"
          + obj["contact_packingType"] + ";" + obj['degree_cyl'] ;
        break;
      case 6:
        pingming = obj["caresolution_brand"] + ";" + obj["o1"] + ";"
          + obj["caresolution_model"] +  ";" + obj['caresolution_rule'];
        break;
      case 7:
        pingming = obj["accessory_brand"] + ";" + obj["category"] + ";"
          + obj["accessory_model"] + ";" + obj['accessory_size'];
        break;

      default:
        break;
    }
    return pingming;
}
//渲染数据
function renders(that){
  var goodsfordetil = [];
  goodList = []
  let goodsid = 0;
  var temps = {};
  //发请求 加载数据
  wx.showLoading({
    title: '加载中',
  })
  var goodInfo = app.globalData.shopcargoodsdetil;
  for (let j = 0; j < app.globalData.shopcargoods.length; j++) {
    let goodsdetil = app.globalData.shopcargoods[j].toString();
    console.log(goodsdetil)
    var model_codes = goodsdetil.split(',')[0];
    var uncodes = '';
    var goodstype = Number(goodsdetil.split(',')[2]);
    var lastsql = '';
    var statusfortype = '';//是否查球柱
    if (goodstype == 1 || goodstype == 4 || goodstype == 5) {
      statusfortype = '1';
      uncodes = goodsdetil.split(',')[1].split(';')[0] + ',' + goodsdetil.split(',')[1].split(';')[1];
      lastsql = " and degree_cyl= '" + uncodes + "'"
    } else {
      uncodes = goodsdetil.split(',')[1];
      var stockID = goodsdetil.split(',')[3];
      lastsql = " and a.stock_id = " + stockID;
      //lastsql = " and " + uncode[goodstype - 1] + " = '" + uncodes + "'";
    }
    
    var goodsdetli = goodInfo[goodsdetil];
          goodList.push(goodsdetli)
          console.log(goodsdetli)
            var goodstype = goodsdetli.stock_type;
            var Img_ = '';
            Img_ = goodsdetli.stock_imgPath == "" ? (app.globalData.storelogimg == '' ? app.globalData.logo : app.globalData.path + 'ImagePath/' + app.globalData.storelogimg) : app.globalData.path + app.globalData.GoodsName[goodstype - 1] + '/' + goodsdetli.stock_imgPath.split(';')[0];
            var stock = 0;
            var thatobj = goodsdetli;
            var num = 1;
            if (thatobj) {
              num = thatobj.count;
            }
            var price = goodsdetli.stock_price;
            var orderPrice = goodsdetli.stock_orderPrice;
            var sph = "";
            if (goodstype == 1 || goodstype == 4 || goodstype == 5) {
              stock = goodsdetli.numbers;
              price = goodsdetli.price;
              orderPrice = goodsdetli.orderPrice;
              sph = goodsdetil.split(',')[1].split(';')[0] + ',' + goodsdetil.split(',')[1].split(';')[1];
            } else {
              stock = (!goodsdetli.allnumbers) ? goodsdetli.numbers:goodsdetli.allnumbers;
              price = (!price) ? goodsdetli.price:price;
              orderPrice = (!orderPrice) ? goodsdetli.orderPrice:orderPrice;
              sph = goodsdetli[uncode[goodstype - 1]] ? goodsdetli[uncode[goodstype - 1]]:"";
            }
            var gooddetil = { message: types[goodsdetli.stock_type - 1] + " " + goodsdetli[tiaojian[goodsdetli.stock_type - 1][0].key] + " " + goodsdetli[tiaojian[goodsdetli.stock_type - 1][1].key] + " " + goodsdetli[tiaojian[goodsdetli.stock_type - 1][2].key] + sph, src: Img_, 'num': num, price: price, stock: stock, orderPrice: orderPrice, check: true, id: goodsdetil, edit: false, goodsids: goodsid };
            goodsid++;
            //console.log(goodList)
            goodsfordetil.push(gooddetil);      
  }
          that.setData({
            lists: goodsfordetil
          })
          that.setData({
            checked: true,
            totalPrice: getTotalPrice(goodsfordetil)
          })
  wx.showToast({
    title: '加载成功！',
    duration: 500
  })
}

var app = getApp();
var noPrice = 0;
var goodList = [];
var uncode = ["", "colorNumber", "colorNumber", "", "", "caresolution_rule", "accessory_size", "", ""]
var tiaojian = [
  [{ 'name': '品牌', 'key': 'lens_brand' }, { 'name': '品类', 'key': 'lens_model' }, { 'name': '材质', 'key': 'lens_material' }, { 'name': '折射率', 'key': 'lens_refractivity' }],
  [{ 'name': '品牌', 'key': 'gframe_brand' }, { 'name': '品类', 'key': 'gframe_model' }, { 'name': '型号', 'key': 'gframe_style' }, { 'name': '材质', 'key': 'gframe_material' }],
  [{ 'name': '品牌', 'key': 'sun_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '型号', 'key': 'sun_style' }, { 'name': '材质', 'key': 'sun_material' }, { 'name': '色号', 'key': 'colorNumber' }],
  [{ 'name': '品牌', 'key': 'presbyopic_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '材质', 'key': 'presbyopic_lensMaterial' }, { 'name': '功能', 'key': 'presbyopic_function' }],
  [{ 'name': '品牌', 'key': 'contact_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '型号', 'key': 'contact_model' }, { 'name': '材质', 'key': 'contact_material' }],
  [{ 'name': '品牌', 'key': 'caresolution_brand' }, { 'name': '系列', 'key': 'o1' }, { 'name': '容量', 'key': 'caresolution_rule' }],
  [{ 'name': '品牌', 'key': 'accessory_brand' }, { 'name': '型号', 'key': 'accessory_model' }, { 'name': '材质', 'key': 'accessory_material' }, { 'name': '功能', 'key': 'accessory_function' }]

]
var types = ['镜片', '镜架', '太阳眼镜', '成品眼镜', '隐形眼镜', '护理液', '配件'];

function sends(obj){
  var padarr = app.globalData.pads;
  console.log(padarr)
  for (var i = 0, len = padarr.length; i < len;i++){
    var ids = {};
    ids['CID'] = padarr[i].pt_tuiID;
    ids['title'] = '您有新的销售订单';
    ids['url'] = 'cnc.jingliyun.com';
    ids['type'] = 3;
    ids['op_type'] = 2;
    ids['transmissionType'] = 2;
    ids['text'] = obj;
    
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'php',
        par2: 'getui',
        ids: ids,//app.globalData.store_id
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        
      }
    })
  }
  if (padarr.length>0){
    wx.showToast({
      title: '推送成功',
      duration: 500
    })
  }
}
function sumcount(that) {
  var all = 0;
  var obj = app.globalData.shopcargoodsdetil;
  for (var i in obj) {
    if (obj[i]['count']) {
      all += obj[i]['count'] / 1;
    }
  }
  
  app.globalData.shopcount = all;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demo: false,
    lists: [
      // { message: '镜片1 依视路1 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 1, stock: 5, check: false, id: 1, edit: false },
      // { message: '镜片2 依视路2 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 2, stock: 8, check: false, id: 2, edit: false },
      // { message: '镜片3 依视路3 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 3, stock: 9, check: false, id: 3, edit: false },
      // { message: '镜片4 依视路4 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 4, stock: 3, check: false, id: 4, edit: false },
      // { message: '镜片5 依视路5 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 5, stock: 4, check: false, id: 5, edit: false },
      // { message: '镜片6 依视路6 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 6, stock: 4, check: false, id: 6, edit: false },
      // { message: '镜片7 依视路7 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 6, stock: 7, check: false, id: 7, edit: false },
    ],
    checked: false,
    totalPrice: 0
  },
  //点击勾选点击事件
  checkList: function (e) {
    var id = e.currentTarget.id;
    var that = this.data.lists.SET_ATTR(id, function (obj) { obj.check = !obj.check });
    if (that.filter(function (item, index) { return item.id == id })[0].check == false) {
      that.SET_ATTR(id, function (obj) { obj.edit = false });
    }
    this.setData({
      lists: that,
      totalPrice: getTotalPrice(that),
      checked: that.every(function (item, index) {
        return item.check
      })
    })
  },
  //输入框输入事件
  setnum: function (e) {
    var obj = e.target.dataset;
    var lists = this.data.lists;
    var value = e.detail.value
    if (value != '') {
      value = value.replace(/[^0-9]/ig, "") / 1;
      // if (value > obj.kuncun / 1) {
      //   value = obj.kuncun;
      // } else 
      if (value < 1) {
        value = 1;
      }
    }
    var lists = lists.SET_ATTR(obj.id, function (o) { o.num = value });
    this.setData({
      lists: lists,
      totalPrice: getTotalPrice(lists)
    })
  },
  //点击商品数量修改完成事件
  succ: function (e) {
    var id = e.target.dataset.id;
    var lists = this.data.lists;
    this.setData({
      lists: lists.SET_ATTR(id, function (o) { o.edit = false })
    })
  },
  //加减按钮点击事件注册
  numAdd: function (e) {
    var that = this;
    var obj = e.target.dataset;
    console.log("加减数据：")
    console.log(e.target.dataset.add)// 1==》加    -1==》减 
    // if(e.){

    // }
    var goodID = e.target.dataset.id;
    let goodS = app.globalData.shopcargoodsdetil;
    let add = e.target.dataset.add;
    var lists = this.data.lists.SET_ATTR(obj.id, function (o) {

      // if (o.num > o.stock) {
      //   o.num = o.stock;
      // } else 

      if (add === -1) {
        let a = goodS[goodID];
        if (a.wym) {
          if (a.count <= a.wym.length && a.count > 1) {
            a['wym'].splice(a.wym.length, 1);
          }

        }

      }

      o.num = o.num / 1 + obj.add / 1;
      if (o.num < 1) {
        o.num = 1;
      }
      app.globalData.shopcargoodsdetil[obj.id]['count'] = o.num;
      sumcount(that);
    });
    sumcount(this);
    this.setData({
      lists: lists,
      totalPrice: getTotalPrice(lists)
    })
  },
  //打开编辑界面
  openEdit: function (e) {
    var id = e.currentTarget.dataset.id;

    var lists = this.data.lists.SET_ATTR(id, function (o) { o.edit = true });
    console.log(this.data.lists.SET_ATTR(id, function (o) { o.edit = true }))
    // console.log(lists)
    this.setData({
      lists: lists
    })
  },
  //全选事件
  checkAll: function () {
    var lists = this.data.lists;
    var checked = this.data.checked;
    lists.forEach(function (item, index) {
      item.check = !checked;
    });
    if (lists.length == 0) {
      checked = true
    }
    this.setData({
      checked: !checked,
      lists: lists,
      totalPrice: getTotalPrice(lists)
    })
  },
  //删除事件注册
  delList: function () {
    var that = this;
    if (this.data.lists.filter(function (item, index) { return item.check }).length > 0) {
      wx.showModal({
        title: '是否确定删除选中商品',
        success: function (bool) {
          console.log(bool)
          if (bool.confirm) {
            var lists = that.data.lists;
            for (var i = lists.length - 1; i >= 0; i--) {
              if (lists[i].check) {
                delete app.globalData.shopcargoodsdetil[lists[i]['id']];
                lists.splice(i, 1);
                app.globalData.shopcargoods.splice(i, 1);
                console.log();
                sumcount(that);
                goodList.splice(i, 1);
              }
            }

            that.setData({
              lists: lists,
              checked: lists.length == 0 ? false : that.data.checked,
              totalPrice: getTotalPrice(lists)
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '请选择商品',
        showCancel: false
      })
    }

  },
  //下单事件注册
  upload: function () {
    var that =this;
    if (this.data.lists.filter(function (item, index) { return item.check }).length > 0) {
      wx.showModal({
        title: '是否确定下单',
        success: function (bool) {
          if (bool.confirm) {
            var lists = that.data.lists.filter(function (item, index) {
              return item.check
            });
            // lists 就是要提交商品的数组
            console.log(lists)
            console.log(goodList)
            var oll =0;//商品总数
             that.data.lists.filter(function(item,index){
              return item.check
            }).forEach(function(item,index){
                oll += item.num/1;
            })

            var ity_Number = new Date().Format('yyyyMMddHHmm') + (Math.floor(Math.random() * 8999) + 1000)//当前时间加4位随机数
            var ity_date = new Date().Format('yyyy-MM-dd HH:mm:ss') ;
            console.log(app.globalData.cutdetil.vip_id)
            var vip_id = app.globalData.cutdetil.vip_id ? ',"ity_saleid":'+app.globalData.cutdetil.vip_id :"";
            var father = '{"store_id":' + app.globalData.store_id + ',"ity_type":"1","ity_Number":' + ity_Number + ',"ity_logNumber":' + that.data.totalPrice + ',"ity_boxNumber":"' + that.data.totalPrice+'","ity_source":' + that.data.totalPrice + ',"ity_operatPerson1":' + oll + ',"ity_status":"200","ity_operatPerson2":' + app.globalData.user_id + ',"ity_spuid":' + app.globalData.user_id + ',"ity_operatPerson3":"0","ity_date":"' + ity_date + '","ity_operatPersonId":' + app.globalData.user_id + ',"ity_operatTime1":"' + ity_date + '","ity_paidPrice":"0","ity_unpaidPrice":' + that.data.totalPrice +  vip_id+',"ity_glassesNum":"0","wholediscount":"10"}';
            var detil = '[';
            console.log(lists)
            for (var i = 0; i < lists.length;i++){
              var goods = goodList[lists[i].goodsids];//商品的详情
              //console.log(goods)
              var goodsSeriesid ="";
              var jobberName = "";
              var price = '';
              var orderPrice ='';
              if (goods.stock_type == 1 || goods.stock_type == 4 || goods.stock_type == 5) {
                goodsSeriesid = goods.degree_id;
                orderPrice = goods.orderPrice;
                price = goods.price;
              } else {
                goodsSeriesid = goods.stock_id;
                orderPrice = (!goods.stock_orderPrice) ? goods.orderPrice : goods.stock_orderPrice;
                price = (!goods.stock_price) ? goods.price : goods.stock_price;
              }
              var wymlen = lists[i]['wym'] ? lists[i]['wym'].length : 0;
              var ordercount = lists[i].num - wymlen;
              var goods_pinming = getpinming(goods, goods.stock_type);
              detil += '{"goodsSeriesid":"' + goodsSeriesid + '","goods_storeid":' + app.globalData.store_id + ',"goodsType":' + goods.stock_type + ',"goodsCounts":' + ordercount + ',"goodsSeriesidout":"0","goods_pinming":"' + goods_pinming + '","goods_danjia":' + price + ',"noPrice":' + orderPrice + ',"jobberName":"-0.00,-0.00","ity_rackingNumber":"' + goods.model_code + '"},';
              if (lists[i]['wym']) {
                let wymArr = lists[i]['wym'];
                for (let k = 0, len = wymArr.length; k < len; k++) {
                  detil += '{"goodsSeriesid":"' + goodsSeriesid + '","goods_storeid":' + app.globalData.store_id + ',"goodsType":' + goods.stock_type + ',"goodsCounts":1,"goodsSeriesidout":"0","goods_pinming":"' + goods_pinming + '","goods_danjia":' + lists[i].price + ',"noPrice":' + orderPrice + ',"jobberName":"-0.00,-0.00","thegoods_user_Name":"' + wymArr[k].unicode_code + '","ity_rackingNumber":"' + goods.model_code + '"},';
                }
              }
              
            }
             detil = detil.substring(0, detil.length - 1);
            detil+=']'
            var id = '{"ivtfather":' + father + ',"detail":' + detil + ',"status":"0"}'
            console.log(id)
            wx.showLoading({
              title: '提交中',
            })
            wx.request({
              url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
              data: {
                par1: 'php',
                par2: 'saveOut',
                ids: id,
              }, header: {
                'content-type': 'application/json' // 默认值
              },
              method: "GET",
              success: function (res) {
                console.log(res)
                if(res.data.code==200){
                  var ity_id = res.data.data[0].ity_id;
                  wx.showToast({
                    title: '下单成功！',
                    duration: 500
                  })
                  //下单成功后删除购物车的商品
                  var lists = that.data.lists;
                  for (var i = lists.length - 1; i >= 0; i--) {
                    if (lists[i].check) {
                      delete app.globalData.shopcargoodsdetil[lists[i]['id']];
                      lists.splice(i, 1);
                      app.globalData.shopcargoods.splice(i, 1);
                      sumcount(that);
                      goodList.splice(i, 1);
                    }
                  }

                  that.setData({
                    lists: lists,
                    checked: lists.length == 0 ? false : that.data.checked,
                    totalPrice: getTotalPrice(lists)
                  })
                  var sendobj = {};
                  sendobj['ity_id'] = ity_id;
                  if (app.globalData.chosecutid!=''){
                    sendobj['tel'] = app.globalData.cutdetil.customer_tel;
                  }else{
                    sendobj['tel'] = "";
                  }
                  console.log(sendobj);
                  sends(sendobj);
                }else{
                  wx.showToast({
                    title: '下单失败，请重试！',
                    image: '../images/warn.png',
                    duration: 1000
                  })
                }
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '请选择商品',
        showCancel:false
      })
    }



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.pads)
    var that = this;
    that.setData({
      lists:[]
    })
    renders(that);
    // var goodsfordetil = [];
    // goodList = []
    // let goodsid = 0;
    // var temps = {};
    // for (let j = 0; j < app.globalData.shopcargoods.length; j++) {
    //   let goodsdetil = app.globalData.shopcargoods[j].toString();
    //   console.log(goodsdetil)


    //   // if (temps[goodsdetil]){
    //   //   temps[goodsdetil]['num'] = temps[goodsdetil]+1;
    //   //   num = temps[goodsdetil];
    //   //   continue;
    //   // }
    //   var model_codes = goodsdetil.split(',')[0];
    //   var uncodes = '';
    //   var goodstype = Number(goodsdetil.split(',')[2]);
    //   var lastsql = '';
    //   var statusfortype = '';//是否查球柱
    //   // if (uncodes != " " && uncodes != "" && uncodes != null){
    //   if (goodstype == 1 || goodstype == 4 || goodstype == 5) {
    //     statusfortype = '1';
    //     uncodes = goodsdetil.split(',')[1].split(';')[0] + ',' + goodsdetil.split(',')[1].split(';')[1];
    //     lastsql = " and degree_cyl= '" + uncodes + "'"
    //   } else {
    //     uncodes = goodsdetil.split(',')[1];
    //     var stockID = goodsdetil.split(',')[3];
    //     lastsql = " and a.stock_id = " + stockID;
    //     //lastsql = " and " + uncode[goodstype - 1] + " = '" + uncodes + "'";
    //   }
    //   // }
    //   var id = { "store_id": app.globalData.store_id, "limitstr": "", "likesSql": "", "where": [{ "where": "and a.model_code = '" + model_codes + "'" + lastsql, "type": goodstype, "status": statusfortype }] };
    //   console.log(id)
    //   //发请求 加载数据
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   wx.request({
    //     url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    //     data: {
    //       par1: 'php',
    //       par2: 'findgoodsforwx',
    //       ids: id,
    //     }, header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     method: "GET",
    //     success: function (res) {
    //       console.log(res)
    //       if (res.data.code == 200) {
    //         var goodsdetli = res.data.data[0].goodsinfo
    //         goodList.push(goodsdetli[0])
    //         for (var i = 0; i < goodsdetli.length; i++) {
    //           var goodstype = goodsdetli[i].stock_type;
    //           var Img_ = '';
    //           Img_ = goodsdetli[i].stock_imgPath == "" ? (app.globalData.storelogimg == '' ? app.globalData.logo : app.globalData.path + 'ImagePath/' + app.globalData.storelogimg) : app.globalData.path + app.globalData.GoodsName[goodstype - 1] + '/' + goodsdetli[i].stock_imgPath.split(';')[0];
    //           var stock = 0;
    //           var thatobj = app.globalData.shopcargoodsdetil[goodsdetil];
    //           var num = 1;
    //           if (thatobj) {
    //             num = thatobj.count;
    //           }
    //           var price = goodsdetli[i].stock_price;
    //           var orderPrice = goodsdetli[i].stock_orderPrice;
    //           var sph = "";
    //           if (goodstype == 1 || goodstype == 4 || goodstype == 5) {
    //             stock = goodsdetli[i].numbers;
    //             price = goodsdetli[i].price;
    //             orderPrice = goodsdetli[i].orderPrice;
    //             sph = goodsdetil.split(',')[1].split(';')[0] + ',' + goodsdetil.split(',')[1].split(';')[1];
    //           } else {
    //             stock = goodsdetli[i].allnumbers;
    //           }
    //           var gooddetil = { message: types[goodsdetli[i].stock_type - 1] + " " + goodsdetli[i][tiaojian[goodsdetli[i].stock_type - 1][0].key] + " " + goodsdetli[i][tiaojian[goodsdetli[i].stock_type - 1][1].key] + " " + goodsdetli[i][tiaojian[goodsdetli[i].stock_type - 1][2].key] + sph, src: Img_, 'num': num, price: price, stock: stock, orderPrice: orderPrice, check: false, id: goodsdetil, edit: false, goodsids: goodsid };
    //           goodsid++;
    //           //console.log(goodList)
    //           goodsfordetil.push(gooddetil);
    //         }
    //         that.setData({
    //           lists: goodsfordetil
    //         })
    //         wx.showToast({
    //           title: '加载成功！',
    //           duration: 500
    //         })
    //       } else if (res.data.code == 201) {
    //         wx.showToast({
    //           title: '购物车为空，请添加商品！',
    //           image: '../images/warn.png',
    //           duration: 1000
    //         })
    //       } else {
    //         wx.showToast({
    //           title: '服务器出错啦！',
    //           image: '../images/warn.png',
    //           duration: 1000
    //         })
    //       }
    //     }
    //   })
    // }
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