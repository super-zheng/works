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
  })
  return allNum;
}
function demo() {
  console.log(this);
  console.log(123124124124)
}
var app = getApp()
var uncode = ["", "colorNumber", "colorNumber", "", "", "caresolution_rule", "accessory_size", "", ""]
var tiaojian = [
  [{ 'name': '品牌', 'key': 'lens_brand' }, { 'name': '品类', 'key': 'lens_model' }, { 'name': '材质', 'key': 'lens_material' }, { 'name': '折射率', 'key': 'lens_refractivity' }],
  [{ 'name': '品牌', 'key': 'gframe_brand' }, { 'name': '品类', 'key': 'gframe_model' }, { 'name': '型号', 'key': 'gframe_material' }, { 'name': '材质', 'key': 'gframe_style' }],
  [{ 'name': '品牌', 'key': 'presbyopic_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '材质', 'key': 'presbyopic_lensMaterial' }, { 'name': '功能', 'key': 'presbyopic_function' }],
  [{ 'name': '品牌', 'key': 'contact_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '型号', 'key': 'contact_model' }, { 'name': '材质', 'key': 'contact_material' }],
  [{ 'name': '品牌', 'key': 'sun_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '型号', 'key': 'sun_style' }, { 'name': '材质', 'key': 'sun_material' }, { 'name': '色号', 'key': 'colorNumber' }],
  [{ 'name': '品牌', 'key': 'caresolution_brand' }, { 'name': '系列', 'key': 'o1' }, { 'name': '容量', 'key': 'caresolution_rule' }],
  [{ 'name': '品牌', 'key': 'accessory_brand' }, { 'name': '型号', 'key': 'accessory_model' }, { 'name': '材质', 'key': 'accessory_material' }, { 'name': '功能', 'key': 'accessory_function' }]

]
var types = ['镜片', '镜架', '成品眼镜', '隐形眼镜', '太阳眼镜', '护理液', '配件'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demo: false,
    lists: [
      { message: '镜片1 依视路1 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 1, stock: 5, check: false, id: 1, edit: false },
      { message: '镜片2 依视路2 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 2, stock: 8, check: false, id: 2, edit: false },
      { message: '镜片3 依视路3 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 3, stock: 9, check: false, id: 3, edit: false },
      { message: '镜片4 依视路4 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 4, stock: 3, check: false, id: 4, edit: false },
      { message: '镜片5 依视路5 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 5, stock: 4, check: false, id: 5, edit: false },
      { message: '镜片6 依视路6 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 6, stock: 4, check: false, id: 6, edit: false },
      { message: '镜片7 依视路7 非球面 1.665', src: '../image/jingpian.png', 'num': '2', price: 6, stock: 7, check: false, id: 7, edit: false },
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
      if (value > obj.kuncun / 1) {
        value = obj.kuncun;
      } else if (value < 1) {
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
    var obj = e.target.dataset;
    var lists = this.data.lists.SET_ATTR(obj.id, function (o) {
      o.num = o.num / 1 + obj.add / 1;
      if (o.num > o.stock) {
        o.num = o.stock;
      } else if (o.num < 1) {
        o.num = 1;
      }
    });
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
                lists.splice(i, 1);
                app.globalData.shopcargoods.splice(i, 1);
                app.globalData.shopcargoodsdetil.splice(i, 1);
              }
            }

            that.setData({
              lists: lists,
              checked: lists.length == 0 ? false : that.data.checked
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
            console.log(app.globalData.shopcargoodsdetil)
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
    // var that = this;
    // that.setData({
    //   lists:[]
    // })
    // var goodsfordetil = [];
    
    // for (var j = 0;j< app.globalData.shopcargoods.length;j++){
      // var goodsdetil = app.globalData.shopcargoods[j].toString();
      // var model_codes = goodsdetil.split(',')[0];
      // var uncodes = goodsdetil.split(',')[1];
      // var goodstype = Number(goodsdetil.split(',')[2]);
      // var lastsql = '';
      // if (uncodes!=" "){
      //   lastsql = " and " + uncode[goodstype - 1] + " = '" + uncodes+"'";
      // }
      // var id = { "type": goodstype, "store_id": app.globalData.store_id, "limitstr": "", "likesSql": "", "where": [{"where":"and a.model_code = " + model_codes + lastsql}] };
      // console.log(id)
    //发请求 加载数据
      // wx.showLoading({
      //   title: '加载中',
      // })
      // wx.request({
      //   url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      //   data: {
      //     par1: 'php',
      //     par2: 'findgoodsforwx',
      //     ids: id,
      //   }, header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   method: "GET",
      //   success: function (res) {
      //     if (res.data.code == 200) {
      //       var goodsdetli = res.data.data[0].goodsinfo
      //       app.globalData.shopcargoodsdetil = goodsdetli
      //       for (var i=0;i<goodsdetli.length;i++){
      //         console.log(j)
      //         var gooddetil = { message: types[goodsdetli[i].stock_type - 1] + " " + goodsdetli[i][tiaojian[goodsdetli[i].stock_type - 1][0].key] + " " + goodsdetli[i][tiaojian[goodsdetli[i].stock_type - 1][1].key] + " " + goodsdetli[i][tiaojian[goodsdetli[i].stock_type - 1][2].key], src: goodsdetli[i].stock_imgPath == "" ? '../image/jingpian.png' : goodsdetli[i].stock_imgPath == "", 'num': '1', price: goodsdetli[i].stock_price, stock: goodsdetli[i].allnumbers, check: false, id: goodsdetil, edit: false };
      //         goodsfordetil.push(gooddetil);
      //       }
      //       that.setData({
      //         lists: goodsfordetil
      //       })
      //       wx.showToast({
      //         title: '加载成功！',
      //         duration: 500
      //       })
      //     } else if (res.data.code == 201) {
      //       wx.showToast({
      //         title: '购物车为空，请添加商品！',
      //         image: '../images/warn.png',
      //         duration: 1000
      //       })
      //     } else{
      //       wx.showToast({
      //         title: '服务器出错啦！',
      //         image: '../images/warn.png',
      //         duration: 1000
      //       })
      //     }
      //   }
      // })
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