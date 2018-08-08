// pages/products/products.js
const app = getApp();
var flag = true;
var qjArr = [];
var zjArr = [];
var qjInit = -36;
var zjInit = 0;
var stock_id = ''
var store_id = ''
var degree_id_jj = [];//镜架的degree_id数组
var unicode = {}
var jj_num = {};//镜架的库存对象
// var urlcode=[]
while (zjInit >= -14) {
  if (zjInit >= 0) {
    zjInit = '+' + zjInit.toFixed(2)
  } else {
    zjInit = zjInit.toFixed(2)
  }

  zjArr.push(zjInit);
  zjInit -= 0.25;
}
while (qjInit <= 32) {
  if (qjInit >= 0) {
    qjInit = '+' + qjInit.toFixed(2)
  } else {
    qjInit = qjInit.toFixed(2)
  }
  qjArr.push(qjInit);
  qjInit = qjInit / 1;
  qjInit += 0.25;
  // console.log(qjInit)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent:'',
    qjArr: qjArr,//定义的球镜数组 
    zjArr: zjArr,//定义的柱镜数组
    value1: [144, 0],//右眼球柱镜的默认显示
    value2: [144, 0],//左眼球柱镜的默认显示
    kucun1: '无',
    kucun2: '无',
    products: '',
    array: ['镜片', '镜架', '太阳眼镜', '成品眼镜', '隐形眼镜', '护理液', '配件'],//七大类型的数组
    index: 0,//之前picker的默认显示 现已注释
    isShow: '', //购物车小球动画的参数
    goodsNum: 0,//购物车上显示购物车商品数量//并存入缓存中
    animationData: {},//小球动画参数对象
    isNull: false,
    scrollMe: true,//让页面是否禁止滚动效果
    translateX: 0,//侧滑偏移值
    screenWidth: 0,//屏幕宽度
    searchView: '',//侧滑盒子类名
    start: 0,//记录侧滑时手指的初始x轴位置
    showQZJ: false,//显示隐藏球柱镜的选择
    end: 0,//侧滑时记录手指离开时x轴位置
    thisType: 0,//判断商品类型  镜片 镜架
    tableClass: ['', 'tableClass'],//搜索导航栏类名切换实现排它
    contentIndex: 0,//判断显示不同类型的筛选项  例如折射率 品类 品牌
    choseObj: {},
    qz_obj: {},//进入球柱镜选择界面后查到的球柱镜和对应库存的obj集合
    litters: ['', 'litters'],//筛选各个小类排它
    qiuzhujing: { Rqj: '+0.00', Rzj: '+0.00', Lqj: '+0.00', Lzj: '+0.00' },//记录当前选择球柱镜的对象

    //镜架
    colors: {},
    jj_number: 0,
    value: ['0'],
    choseGoodsType: [ //所有商品筛选对象
      [{ name: '品牌', lists: [], tableClass: 1, chose: [] }, { name: '折射率', lists: [], tableClass: 0, chose: [] }, { name: '加膜色', lists: [], tableClass: 0, chose: [] }, { name: '系列', lists: [], tableClass: 0, chose: [] }, { name: '材质', lists: [], tableClass: 0, chose: [] }],//镜片

      [{ name: '品牌', lists: [], tableClass: 1, chose: [] }, { name: '型号', lists: [], tableClass: 0, chose: [] }, { name: '系列', lists: [], tableClass: 0, chose: [] }, { name: '材质', lists: [], tableClass: 0, chose: [] }],//镜架

      [{ name: '品牌', lists: [], tableClass: 1, chose: [] }, { name: '型号', lists: [], tableClass: 0, chose: [] }, { name: '系列', lists: [], tableClass: 0, chose: [] }, { name: '材质', lists: [], tableClass: 0, chose: [] }],//太阳眼镜

      [{ name: '品牌', lists: [], tableClass: 1, chose: [] }, { name: '型号', lists: [], tableClass: 0, chose: [] }, { name: '系列', lists: [], tableClass: 0, chose: [] }, { name: '材质', lists: [], tableClass: 0, chose: [] }],//成品眼镜

      [{ name: '品牌', lists: [], tableClass: 1, chose: [] }, { name: '品类', lists: [], tableClass: 0, chose: [] }, { name: '型号', lists: [], tableClass: 0, chose: [] }, { name: '镜架材质', lists: [], tableClass: 0, chose: [] }],//隐形眼镜

      [{ name: '品牌', lists: [], tableClass: 1, chose: [] }, { name: '系列', lists: [], tableClass: 0, chose: [] }, { name: '容量', lists: [], tableClass: 0, chose: [] }],//护理液

      [{ name: '品牌', lists: [], tableClass: 1, chose: [] }, { name: '型号', lists: [], tableClass: 0, chose: [] }, { name: '材质', lists: [], tableClass: 0, chose: [] }, { name: '功能', lists: [], tableClass: 0, chose: [] }],//配件
    ]
  },


  //下拉刷新
  demo: function (event) {
    if (event.detail.scrollTop < -50 && flag) {
      wx.showLoading({
        title: '加载中',
      })
      unicode = {}
      var that = this;
      //获取屏幕的宽度 
      wx.getSystemInfo({
        success: function (res) {
          // console.log(res.screenWidth);
          that.setData({
            screenWidth: res.screenWidth,
            translateX: res.screenWidth,
          })
        }
      })
      store_id = app.globalData.store_id
      // var stock_type = options.Ptype
      // var TypeName = ''
      // switch (that.data.Ptype) {
      //   case '0': TypeName = '镜片'
      //     break;
      //   case '1': TypeName = '镜架'
      //     break;
      //   case '2': TypeName = '太阳眼镜'
      //     break;
      //   case '3': TypeName = '成品眼镜'
      //     break;
      //   case '4': TypeName = '隐形眼镜'
      //     break;
      //   case '5': TypeName = '护理液'
      //     break;
      //   case '6': TypeName = '配件'
      //     break;
      // }
      // that.setData({
      //   thisType: options.Ptype,
      //   TypeName: TypeName
      // })

      console.log(that.data.thisType)
      // console.log('store_id:'+app.globalData.store_id)
      //获取商品列表
      wx.request({
        url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/products',
        data: {
          store_id: store_id,
          type: that.data.thisType
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log(res)
          wx.hideLoading()
          console.log(res)
          if (res.data.code == 200) {
            var r_item = that.data.choseGoodsType
            console.log(that.data.thisType)
            switch (that.data.thisType) {
              case '0':
                r_item[0][0].lists = res.data.data.product_r.lens_brand
                r_item[0][1].lists = res.data.data.product_r.lens_refractivity
                r_item[0][2].lists = res.data.data.product_r.lens_colorFilm
                r_item[0][3].lists = res.data.data.product_r.lens_model
                r_item[0][4].lists = res.data.data.product_r.lens_material

                r_item[0][0].chose = res.data.data.choose.lens_brand
                r_item[0][1].chose = res.data.data.choose.lens_refractivity
                r_item[0][2].chose = res.data.data.choose.lens_colorFilm
                r_item[0][3].chose = res.data.data.choose.lens_model
                r_item[0][4].chose = res.data.data.choose.lens_material
                break
              case '1':
                r_item[1][0].lists = res.data.data.product_r.gframe_brand
                r_item[1][1].lists = res.data.data.product_r.gframe_style
                r_item[1][2].lists = res.data.data.product_r.gframe_model
                r_item[1][3].lists = res.data.data.product_r.gframe_material

                r_item[1][0].chose = res.data.data.choose.gframe_brand
                r_item[1][1].chose = res.data.data.choose.gframe_style
                r_item[1][2].chose = res.data.data.choose.gframe_model
                r_item[1][3].chose = res.data.data.choose.gframe_material
                break
              case '2':
                r_item[2][0].lists = res.data.data.product_r.sun_brand
                r_item[2][1].lists = res.data.data.product_r.sun_style
                r_item[2][2].lists = res.data.data.product_r.sun_model
                r_item[2][3].lists = res.data.data.product_r.sun_material

                r_item[2][0].chose = res.data.data.choose.sun_brand
                r_item[2][1].chose = res.data.data.choose.sun_style
                r_item[2][2].chose = res.data.data.choose.sun_model
                r_item[2][3].chose = res.data.data.choose.sun_material
                break
              case '3':
                r_item[3][0].lists = res.data.data.product_r.presbyopic_brand
                r_item[3][1].lists = res.data.data.product_r.presbyopic_style
                r_item[3][2].lists = res.data.data.product_r.presbyopic_model
                r_item[3][3].lists = res.data.data.product_r.presbyopic_frameMaterial

                r_item[3][0].chose = res.data.data.choose.presbyopic_brand
                r_item[3][1].chose = res.data.data.choose.presbyopic_style
                r_item[3][2].chose = res.data.data.choose.presbyopic_model
                r_item[3][3].chose = res.data.data.choose.presbyopic_frameMaterial
                break
              case '4':
                r_item[4][0].lists = res.data.data.product_r.contact_brand
                r_item[4][1].lists = res.data.data.product_r.o1
                r_item[4][2].lists = res.data.data.product_r.contact_model
                r_item[4][3].lists = res.data.data.product_r.contact_material

                r_item[4][0].chose = res.data.data.choose.contact_brand
                r_item[4][1].chose = res.data.data.choose.o1
                r_item[4][2].chose = res.data.data.choose.contact_model
                r_item[4][3].chose = res.data.data.choose.contact_material
                break
              case '5':
                r_item[5][0].lists = res.data.data.product_r.caresolution_brand
                r_item[5][1].lists = res.data.data.product_r.caresolution_model
                r_item[5][2].lists = res.data.data.product_r.caresolution_rule

                r_item[5][0].chose = res.data.data.choose.caresolution_brand
                r_item[5][1].chose = res.data.data.choose.caresolution_model
                r_item[5][2].chose = res.data.data.choose.caresolution_rule
                break
              case '6':
                r_item[6][0].lists = res.data.data.product_r.accessory_brand
                r_item[6][1].lists = res.data.data.product_r.accessory_model
                r_item[6][2].lists = res.data.data.product_r.accessory_material
                r_item[6][3].lists = res.data.data.product_r.accessory_function

                r_item[6][0].chose = res.data.data.choose.accessory_brand
                r_item[6][1].chose = res.data.data.choose.accessory_model
                r_item[6][2].chose = res.data.data.choose.accessory_material
                r_item[6][3].chose = res.data.data.choose.accessory_function
                break
            }

            that.setData({
              products: res.data.data.product_l,
              choseGoodsType: r_item
            })
            console.log(that.data.choseGoodsType)
            // console.log(r_item)
          } else {
            //无
            that.setData({
              isNull: true
            })
          }
        }
      })
      flag = false;
    } else if (event.detail.scrollTop == 0) {
      flag = true;
    }

  },
  //获取搜索框的内容
  searchContent:function(e){
    this.setData({
      searchContent: e.detail.value
    })
  },
  //搜索按钮
  search:function(){
    var that=this
    var searchContent = that.data.searchContent
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallDianwu/search',
      data: {
        store_id:store_id,
        searchContent: searchContent,
        type: that.data.thisType
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            // translateX: that.data.screenWidth,
            // scrollMe: true,
            products: res.data.data.product_l
          })
        } else {
          wx.showToast({
            title: '出错了！',
            image: '../images/warn.png'
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '出错了！',
          image: '../images/warn.png'
        })
      }
    })
  },
  bindPickerChange: function (e) {//之前选择镜片镜架的picker
    var type = e.detail.value
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      isNull: false
    })
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })

    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/product_list',
      data: {
        store_id: store_id,
        type: type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        var products = res.data
        // console.log(res)
        if (!products) {
          products = 0
        }
        that.setData({
          'products': products
        })
        if (products == 0) {
          that.setData({
            isNull: true
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '出错了！',
          image: '../images/warn.png'
        })
      }
    })
  },
  //筛选的大类点击事件
  thisClick: function (e) {
    var that = this
    var index = e.currentTarget.dataset.thisindex;
    var choseGoodsType = this.data.choseGoodsType;
    choseGoodsType[this.data.thisType].forEach(function (item, index1) {
      item.tableClass = 0;
      // console.log(item)
    });
    this.data.choseGoodsType[this.data.thisType][index].tableClass = 1;

    this.setData({
      contentIndex: index,
      choseGoodsType: choseGoodsType
    });
  },
  //筛选小类点击事件
  clickDetail: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.clickindex;
    var obj = this.data.choseGoodsType;
    var status = obj[this.data.thisType][this.data.contentIndex].chose[index];
    if (status == 0) {
      obj[this.data.thisType][this.data.contentIndex].chose.forEach(function (item, index1) {
        obj[that.data.thisType][that.data.contentIndex].chose[index1] = 0;
      });
      obj[this.data.thisType][this.data.contentIndex].chose[index] = 1;
    } else {
      obj[this.data.thisType][this.data.contentIndex].chose.forEach(function (item, index1) {
        obj[that.data.thisType][that.data.contentIndex].chose[index1] = 0;
      });
      // obj[this.data.thisType][this.data.contentIndex].chose[index]=0;
    }
    // obj[this.data.thisType][this.data.contentIndex].lists = [e.currentTarget.dataset.clickname]
    // obj[this.data.thisType][this.data.contentIndex].chose = ['1']
    this.setData({
      choseGoodsType: obj
    })



    //
    var that = this
    var submit_data = []
    var item_5 = that.data.choseGoodsType[that.data.thisType]
    console.log(item_5)

    for (var i = 0, len = item_5.length; i < len; i++) {
      if (typeof item_5[i].chose === 'undefined') {
        submit_data[i] = ''
      } else {
        if (item_5[i].chose[0] == 0 || item_5[i].chose[0] == 1) {
          for (var key in item_5[i].chose) {
            if (item_5[i].chose[key] == 1) {
              submit_data[i] = item_5[i].lists[key]
              break;
            } else {
              submit_data[i] = ''
            }
          }
        } else {
          submit_data[i] = ''
        }
      }
    }
    console.log(submit_data)
    // var store_id = 327
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/ajax_r_type',
      data: {
        store_id: store_id,
        type: that.data.thisType,
        submit_data: submit_data
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code = 200) {
          var r_item = []
          switch (that.data.thisType) {
            case '0': r_item = that.data.choseGoodsType
              var type_arr = ['lens_brand', 'lens_refractivity', 'lens_colorFilm', 'lens_model', 'lens_material']
              for (var i = 0, len = submit_data.length; i < len; i++) {
                if (!submit_data[i]) {
                  r_item[0][i].lists = res.data.data.product_r[type_arr[i]]
                  r_item[0][i].chose = res.data.data.choose[type_arr[i]]
                }
              }
              break;
            case '1': r_item = that.data.choseGoodsType
              var type_arr = ['gframe_brand', 'gframe_style', 'gframe_model', 'gframe_material']
              for (var i = 0, len = submit_data.length; i < len; i++) {
                if (!submit_data[i]) {
                  r_item[1][i].lists = res.data.data.product_r[type_arr[i]]
                  r_item[1][i].chose = res.data.data.choose[type_arr[i]]
                }
              }
              break;
            case '2': r_item = that.data.choseGoodsType
              var type_arr = ['sun_brand', 'sun_style', 'sun_model', 'sun_material']
              for (var i = 0, len = submit_data.length; i < len; i++) {
                if (!submit_data[i]) {
                  r_item[2][i].lists = res.data.data.product_r[type_arr[i]]
                  r_item[2][i].chose = res.data.data.choose[type_arr[i]]
                }
              }
              break;
            case '3': r_item = that.data.choseGoodsType
              var type_arr = ['presbyopic_brand', 'presbyopic_style', 'presbyopic_model', 'presbyopic_frameMaterial']
              for (var i = 0, len = submit_data.length; i < len; i++) {
                if (!submit_data[i]) {
                  r_item[3][i].lists = res.data.data.product_r[type_arr[i]]
                  r_item[3][i].chose = res.data.data.choose[type_arr[i]]
                }
              }
              break;
            case '4': r_item = that.data.choseGoodsType
              var type_arr = ['contact_brand', 'o1', 'contact_model', 'contact_material']
              for (var i = 0, len = submit_data.length; i < len; i++) {
                if (!submit_data[i]) {
                  r_item[4][i].lists = res.data.data.product_r[type_arr[i]]
                  r_item[4][i].chose = res.data.data.choose[type_arr[i]]
                }
              }
              break;
            case '5': r_item = that.data.choseGoodsType
              var type_arr = ['caresolution_brand', 'caresolution_model', 'caresolution_rule']
              for (var i = 0, len = submit_data.length; i < len; i++) {
                if (!submit_data[i]) {
                  r_item[5][i].lists = res.data.data.product_r[type_arr[i]]
                  r_item[5][i].chose = res.data.data.choose[type_arr[i]]
                }
              }
              break;
            case '6': r_item = that.data.choseGoodsType
              var type_arr = ['accessory_brand', 'accessory_model', 'accessory_material', 'accessory_function']
              for (var i = 0, len = submit_data.length; i < len; i++) {
                if (!submit_data[i]) {
                  r_item[6][i].lists = res.data.data.product_r[type_arr[i]]
                  r_item[6][i].chose = res.data.data.choose[type_arr[i]]
                }
              }
              break;

          }
          that.setData({
            choseGoodsType: r_item
          })

        }
      }
    })


  },
  //右侧滑动栏确认按钮//小类确定
  submit: function () {
    var that = this
    var submit_data = []
    var item_5 = that.data.choseGoodsType[that.data.thisType]
    for (var i = 0, len = item_5.length; i < len; i++) {
      if (typeof item_5[i].chose === 'undefined') {
        submit_data[i] = ''
      } else {
        if (item_5[i].chose[0] == 0 || item_5[i].chose[0] == 1) {
          for (var key in item_5[i].chose) {
            if (item_5[i].chose[key] == 1) {
              submit_data[i] = item_5[i].lists[key]
              break;
            } else {
              submit_data[i] = ''
            }
          }
        } else {
          submit_data[i] = ''
        }
      }
    }
    console.log(submit_data)
    //获取商品列表
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/ajax_product',
      data: {
        store_id: store_id,
        submit_data: submit_data,
        type: that.data.thisType
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          that.setData({
            translateX: that.data.screenWidth,
            scrollMe: true,
            products: res.data.data.product_l
          })
        } else {
          wx.showToast({
            title: '出错了！',
            image: '../images/warn.png'
          })
        }
      }
    })

  },
  //跳转至购物车
  shoppingcar: function (e) {
    app.globalData.products_add = []
    wx.navigateTo({
      url: '../pandian/pandian'
    })

  },
  //商品图片点击事件选择球柱镜
  clickMe: function (e) {
    var that = this
    that.setData({
      qz_obj: {},
      showQZJ: true,
      qiuzhujing: { Rqj: '+0.00', Rzj: '+0.00', Lqj: '+0.00', Lzj: '+0.00' },
      value1: [144, 0],
      value2: [144, 0]
    })
    console.log(e)
    //获取球柱镜对应的库存
    stock_id = e.currentTarget.dataset.stock_id
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/choose_qz',
      data: {
        stock_id: stock_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var obj = {}
        if (res.data.code == 200) {
          for (var i = 0, len = res.data.data.length; i < len; i++) {
            obj[res.data.data[i].degree_cyl] = res.data.data[i].numbers
          }
          var qz_item = '+0.00,+0.00'
          var kucun1 = '无'
          var kucun2 = '无'
          if (obj[qz_item]) {
            kucun1 = obj[qz_item]
            kucun2 = obj[qz_item]
          }
          that.setData({
            qz_obj: obj,
            kucun1: kucun1,
            kucun2: kucun2
          })
        } else {
          //无
        }
      }
    })

  },
  //选择色号//
  clickMe_jingjia: function (e) {
    var that = this
    var colors = {}
    that.setData({
      colors: {},
      value: ['0'],
    })
    //获取色号对应的库存
    stock_id = e.currentTarget.dataset.stock_id
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/choose_sh',
      data: {
        stock_id: stock_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          for (var i = 0, len = res.data.data.length; i < len; i++) {
            if (res.data.data[i].degree_colorNumber==''){
              res.data.data[i].degree_colorNumber='(空'+i+')'
            }
            colors[res.data.data[i].degree_colorNumber] = res.data.data[i].degree_id
            if (res.data.data[i].numbers) {
              jj_num[i] = res.data.data[i].numbers
            } else {
              jj_num[i] = 0
            }
          }
          that.setData({
            colors: colors,
            showQZJ: true,
            jj_number: jj_num[0]
          })
          console.log(that.data.colors)
        } else {
          //请求失败
          wx.showToast({
            title: '请求失败！',
            image: '../images/warn.png'
          })
        }
      }
    })
  },

  //打开侧滑筛选盒子的点击事件
  clickMe1: function () {
    var that = this;
    var scroll = !this.data.scrollMe;
    var translateX = 0;
    if (scroll) {
      translateX = that.data.screenWidth;
    } else {
      translateX = 0;
    }
    // console.log(translateX)
    this.setData({
      scrollMe: scroll,
      translateX: translateX
    });
    // console.log(this.data.scrollMe)
  },
  closeQZJ1: function () {//球柱镜选择确定按钮
    var that = this;
    setTimeout(function () {
      that.setData({
        showQZJ: false
      })
      console.log(that.data.qiuzhujing);
    }, 200)
  },
  closeQZJ2: function () {//球柱镜选择取消按钮
    var that = this;
    setTimeout(function () {
      that.setData({
        showQZJ: false
      })
      console.log(that.data.qiuzhujing);
    }, 200)
  },
  //右眼球柱镜的数据记录//R球柱
  bindChange1: function (e) {
    const val = e.detail.value
    var qiuzhujing = this.data.qiuzhujing;
    qiuzhujing.Rqj = this.data.qjArr[val[0]];
    qiuzhujing.Rzj = this.data.zjArr[val[1]];
    var qz_item = qiuzhujing.Rqj + ',' + qiuzhujing.Rzj;
    var kucun1 = '无'
    if (this.data.qz_obj[qz_item]) {
      kucun1 = this.data.qz_obj[qz_item]
    }
    this.setData({
      qiuzhujing: qiuzhujing,
      value1: val,
      kucun1: kucun1
    })
    console.log(val)
  },

  //左眼球柱镜的数据记录//L球柱
  bindChange2: function (e) {
    const val = e.detail.value
    var qiuzhujing = this.data.qiuzhujing;
    qiuzhujing.Lqj = this.data.qjArr[val[0]];
    qiuzhujing.Lzj = this.data.zjArr[val[1]];
    var qz_item = qiuzhujing.Lqj + ',' + qiuzhujing.Lzj;
    var kucun2 = '无'
    if (this.data.qz_obj[qz_item]) {
      kucun2 = this.data.qz_obj[qz_item]
    }
    this.setData({
      qiuzhujing: qiuzhujing,
      value2: val,
      kucun2: kucun2
    })
  },
  //侧滑页面触摸时记录手指初始位置
  touchStart: function (e) {
    // console.log(e.touches[0].pageX);
    this.setData({
      start: e.touches[0].pageX
    });
  },
  //侧滑页面侧滑时记录手指离开位置判断是否收起侧滑页面
  touchEnd: function (e) {
    var that = this;
    var end = e.changedTouches[0].pageX;
    // console.log(end)
    if (this.data.start - end < -100) {
      this.setData({
        translateX: that.data.screenWidth,
        scrollMe: true
      });
    }
  },
  //主页面触摸开始事件，记录手指初始位置
  mainStart: function (e) {
    var that = this;
    this.setData({
      start: e.touches[0].pageX
    })
  },
  //主页面触摸结束事件，判断是否展开侧滑筛选页面
  mainEnd: function (e) {
    var that = this;
    var end = e.changedTouches[0].pageX;
    if (this.data.start <= this.data.screenWidth && this.data.start >= this.data.screenWidth - 10 && this.data.start - end > 30) {
      this.setData({
        translateX: 0,
        scrollMe: false
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    unicode = {}
    var that = this;
    //获取屏幕的宽度 
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.screenWidth);
        that.setData({
          screenWidth: res.screenWidth,
          translateX: res.screenWidth,
        })
      }
    })
    store_id = app.globalData.store_id
    // var stock_type = options.Ptype
    var TypeName = ''
    switch (options.Ptype) {
      case '0': TypeName = '镜片'
        break;
      case '1': TypeName = '镜架'
        break;
      case '2': TypeName = '太阳眼镜'
        break;
      case '3': TypeName = '成品眼镜'
        break;
      case '4': TypeName = '隐形眼镜'
        break;
      case '5': TypeName = '护理液'
        break;
      case '6': TypeName = '配件'
        break;
    }
    that.setData({
      thisType: options.Ptype,
      TypeName: TypeName
    })

    console.log(that.data.thisType)
    // console.log('store_id:'+app.globalData.store_id)
    //获取商品列表
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/products',
      data: {
        store_id: store_id,
        type: that.data.thisType
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res)
        wx.hideLoading()
        console.log(res)
        if (res.data.code == 200) {
          var r_item = that.data.choseGoodsType
          console.log(that.data.thisType)
          switch (that.data.thisType) {
            case '0':
              r_item[0][0].lists = res.data.data.product_r.lens_brand
              r_item[0][1].lists = res.data.data.product_r.lens_refractivity
              r_item[0][2].lists = res.data.data.product_r.lens_colorFilm
              r_item[0][3].lists = res.data.data.product_r.lens_model
              r_item[0][4].lists = res.data.data.product_r.lens_material

              r_item[0][0].chose = res.data.data.choose.lens_brand
              r_item[0][1].chose = res.data.data.choose.lens_refractivity
              r_item[0][2].chose = res.data.data.choose.lens_colorFilm
              r_item[0][3].chose = res.data.data.choose.lens_model
              r_item[0][4].chose = res.data.data.choose.lens_material
              break
            case '1':
              r_item[1][0].lists = res.data.data.product_r.gframe_brand
              r_item[1][1].lists = res.data.data.product_r.gframe_style
              r_item[1][2].lists = res.data.data.product_r.gframe_model
              r_item[1][3].lists = res.data.data.product_r.gframe_material

              r_item[1][0].chose = res.data.data.choose.gframe_brand
              r_item[1][1].chose = res.data.data.choose.gframe_style
              r_item[1][2].chose = res.data.data.choose.gframe_model
              r_item[1][3].chose = res.data.data.choose.gframe_material
              break
            case '2':
              r_item[2][0].lists = res.data.data.product_r.sun_brand
              r_item[2][1].lists = res.data.data.product_r.sun_style
              r_item[2][2].lists = res.data.data.product_r.sun_model
              r_item[2][3].lists = res.data.data.product_r.sun_material

              r_item[2][0].chose = res.data.data.choose.sun_brand
              r_item[2][1].chose = res.data.data.choose.sun_style
              r_item[2][2].chose = res.data.data.choose.sun_model
              r_item[2][3].chose = res.data.data.choose.sun_material
              break
            case '3':
              r_item[3][0].lists = res.data.data.product_r.presbyopic_brand
              r_item[3][1].lists = res.data.data.product_r.presbyopic_style
              r_item[3][2].lists = res.data.data.product_r.presbyopic_model
              r_item[3][3].lists = res.data.data.product_r.presbyopic_frameMaterial

              r_item[3][0].chose = res.data.data.choose.presbyopic_brand
              r_item[3][1].chose = res.data.data.choose.presbyopic_style
              r_item[3][2].chose = res.data.data.choose.presbyopic_model
              r_item[3][3].chose = res.data.data.choose.presbyopic_frameMaterial
              break
            case '4':
              r_item[4][0].lists = res.data.data.product_r.contact_brand
              r_item[4][1].lists = res.data.data.product_r.o1
              r_item[4][2].lists = res.data.data.product_r.contact_model
              r_item[4][3].lists = res.data.data.product_r.contact_material

              r_item[4][0].chose = res.data.data.choose.contact_brand
              r_item[4][1].chose = res.data.data.choose.o1
              r_item[4][2].chose = res.data.data.choose.contact_model
              r_item[4][3].chose = res.data.data.choose.contact_material
              break
            case '5':
              r_item[5][0].lists = res.data.data.product_r.caresolution_brand
              r_item[5][1].lists = res.data.data.product_r.caresolution_model
              r_item[5][2].lists = res.data.data.product_r.caresolution_rule

              r_item[5][0].chose = res.data.data.choose.caresolution_brand
              r_item[5][1].chose = res.data.data.choose.caresolution_model
              r_item[5][2].chose = res.data.data.choose.caresolution_rule
              break
            case '6':
              r_item[6][0].lists = res.data.data.product_r.accessory_brand
              r_item[6][1].lists = res.data.data.product_r.accessory_model
              r_item[6][2].lists = res.data.data.product_r.accessory_material
              r_item[6][3].lists = res.data.data.product_r.accessory_function

              r_item[6][0].chose = res.data.data.choose.accessory_brand
              r_item[6][1].chose = res.data.data.choose.accessory_model
              r_item[6][2].chose = res.data.data.choose.accessory_material
              r_item[6][3].chose = res.data.data.choose.accessory_function
              break
          }

          that.setData({
            products: res.data.data.product_l,
            choseGoodsType: r_item
          })
          console.log(that.data.choseGoodsType)
          // console.log(r_item)
        } else {
          //无
          that.setData({
            isNull: true
          })
        }
      }
    })
  },

  //商品详情
  productdetail: function (e) {
    var degree_id = e.currentTarget.dataset.degree_id
    var stock_type = e.currentTarget.dataset.stock_type
    // console.log(degree_id)
    // console.log(stock_type)
    switch (stock_type) {
      case 1: wx.navigateTo({
        url: '../productdetail1/productdetail1?degree_id=' + degree_id + '&stock_type=' + stock_type
      })
        break;
      case 2: wx.navigateTo({
        url: '../productdetail2/productdetail2?degree_id=' + degree_id + '&stock_type=' + stock_type
      })
        break;
      case 3: wx.navigateTo({
        url: '../productdetail3/productdetail3?degree_id=' + degree_id + '&stock_type=' + stock_type
      })
        break;
      case 4: wx.navigateTo({
        url: '../productdetail4/productdetail4?degree_id=' + degree_id + '&stock_type=' + stock_type
      })
        break;
      case 5: wx.navigateTo({
        url: '../productdetail5/productdetail5?degree_id=' + degree_id + '&stock_type=' + stock_type
      })
        break;
      case 6: wx.navigateTo({
        url: '../productdetail6/productdetail6?degree_id=' + degree_id + '&stock_type=' + stock_type
      })
        break;
      case 7: wx.navigateTo({
        url: '../productdetail7/productdetail7?degree_id=' + degree_id + '&stock_type=' + stock_type
      })
        break;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      searchView: 'searchView'
    })
  },

  // 添加商品到购物车
  add_product: function (e) {
    // 将商品信息存入缓存中---缓存名为：products
    var products_add = wx.getStorageSync('products_add')
    var degree_id = e.target.dataset.degree_id
    var product_item = {}
    var that = this
    for (var key in this.data.products) {
      if (this.data.products[key].degree_id == degree_id) {
        product_item = this.data.products[key]
      }
    }
    

    if (products_add['g' + degree_id]) {
      wx.showToast({
        title: '该商品已添加！',
        image: '../images/warn.png'
      })
    } else {
      product_item.number = 1
      var num = that.data.goodsNum + 1;
      wx.setStorageSync('goodsNum_cache', num)
      products_add['g' + degree_id] = product_item
      wx.setStorageSync('products_add', products_add)
      //移动动画----------开始----------------------------------------------
      var animation = wx.createAnimation({
        duration: 800,//动画执行时间
        timingFunction: 'ease',//动画执行速度
      });

      this.animation = animation;

      this.animation.translateX(wx.getSystemInfoSync().windowWidth - e.touches[0].clientX - 25).translateY(-e.touches[0].clientY + 35).step();//动画偏移量
      // animation.translateX(0).translateY(0).step({ duration: 10 });
      var thats = 'animationData.' + e.target.dataset.degree_id;//拼接动画属性名
      // var thats1 = 'isHidden.' + e.target.dataset.degree_id;
      // console.log(thats);
      this.setData({
        isShow: e.target.dataset.degree_id,//让当前动画效果显示
      });
      setTimeout(function () {
        that.setData({
          [thats]: animation.export()//让当前动画执行
        })
      }, 0)

      setTimeout(function () {
        animation.translateX(0).translateY(0).step({ duration: 10 });
        that.setData({
          isShow: '',
          [thats]: animation.export(),
          goodsNum: num
        });
        // console.log(that.data.goodsNum);
      }.bind(this), 800);

    //移动动画----------开始----------------------------------------------
    }
  },

  //选择球柱镜中的确定//加入购物车
  sureProduct: function () {
    console.log(this.data.qiuzhujing)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/sureProduct',
      data: {
        stock_id: stock_id,
        l_qzj: that.data.qiuzhujing.Lqj + ',' + that.data.qiuzhujing.Lzj,
        r_qzj: that.data.qiuzhujing.Rqj + ',' + that.data.qiuzhujing.Rzj,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          for (var i = 0; i < 2; i++) {
            var products_add = wx.getStorageSync('products_add')
            var product_item = res.data.data[i]
            if (!products_add) {
              products_add = {}
            }
            product_item.number = 1
            product_item.urlcode = ''
            var g_degree = 'g' + product_item.degree_id
            if (products_add[g_degree]) {
              wx.showToast({
                title: '该商品已添加！',
                image: '../images/warn.png'
              })
            } else {
              products_add[g_degree] = product_item
              wx.setStorageSync('products_add', products_add)
              wx.setStorageSync('goodsNum_cache', that.data.goodsNum + 1)
              wx.hideLoading()
              that.setData({
                showQZJ: false,
                goodsNum: that.data.goodsNum + 1
              })
            }
            
          }
        } else {
          //请求失败
          wx.hideLoading()
          wx.showToast({
            title: '请求失败！',
            image: '../images/warn.png'
          })
          that.setData({
            showQZJ: false
          })
        }
      },
      fail: function () {
        //访问失败
        wx.hideLoading()
        wx.showToast({
          title: '访问失败！',
          image: '../images/warn.png'
        })
        that.setData({
          showQZJ: false
        })
      }
    })
  },


  //镜架  太阳眼镜  选择色号------------------------------------------------------------------------------------------
  //取消按钮  
  cancel: function () {
    this.setData({
      showQZJ: false
    });
  },
  //确认  
  confirm_jingjia: function (res) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var i = 0
    var degree_id = ''
    var that = this
    // var colors = this.data.colors
    console.log(that.data.colors)
    console.log(that.data.value)
    //获得degree_id
    for (var key in that.data.colors) {
      if (that.data.value[0] == i) {
        degree_id = that.data.colors[key]
      }
      i = i + 1
    }

    //--------发送请求----------
    console.log(degree_id)

    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/sureProduct_jj',
      data: {
        type: that.data.thisType,
        degree_id: degree_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          var products_add = wx.getStorageSync('products_add')
          var product_item = res.data.data
          wx.hideLoading()
          var g_degree = 'g' + product_item.degree_id//重复id
          if (products_add[g_degree]) {//重复
            // products_add[g_degree].number = products_add[g_degree].number + 1
            // wx.setStorage({
            //   key: "products_add",
            //   data: products_add
            // })
            wx.showToast({
              title: '该商品已添加！',
              image: '../images/warn.png'
            })
            that.setData({
              showQZJ: false
            })
            return
          } else {
            var num = that.data.goodsNum + 1
            if (!products_add) {
              products_add = {}
            }
            product_item.number = 1
            product_item.urlcode = ''
            that.setData({
              goodsNum: num
            })
            wx.setStorageSync('goodsNum_cache', num)
            products_add['g' + product_item.degree_id] = product_item
            wx.setStorageSync('products_add', products_add)
            console.log(products_add)
          }
          that.setData({
            showQZJ: false
          })
        } else {
          //请求失败
          wx.hideLoading()
          wx.showToast({
            title: '请求失败！',
            image: '../images/warn.png'
          })
          that.setData({
            showQZJ: false
          })
        }
      }
    })

  },
  //切换
  bindChange_jingjia: function (e) {
    console.log(e)
    var val = e.detail.value[0]
    this.setData({
      value: [val],
      jj_number: jj_num[val]
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var goods_num = wx.getStorageSync('goodsNum_cache')
    if (!goods_num) {
      goods_num = 0
    }
    this.setData({
      goodsNum: goods_num
    })
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

    console.log('123456');
    wx.showLoading({
      title: '加载中',
    })
    unicode = {}
    var that = this;
    //获取屏幕的宽度 
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.screenWidth);
        that.setData({
          screenWidth: res.screenWidth,
          translateX: res.screenWidth,
        })
      }
    })
    store_id = app.globalData.store_id
    // var stock_type = options.Ptype
    var TypeName = ''
    switch (options.Ptype) {
      case '0': TypeName = '镜片'
        break;
      case '1': TypeName = '镜架'
        break;
      case '2': TypeName = '太阳眼镜'
        break;
      case '3': TypeName = '成品眼镜'
        break;
      case '4': TypeName = '隐形眼镜'
        break;
      case '5': TypeName = '护理液'
        break;
      case '6': TypeName = '配件'
        break;
    }
    that.setData({
      thisType: options.Ptype,
      TypeName: TypeName
    })

    console.log(that.data.thisType)
    // console.log('store_id:'+app.globalData.store_id)
    //获取商品列表
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/products',
      data: {
        store_id: store_id,
        type: that.data.thisType
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res)
        wx.hideLoading()
        console.log(res)
        if (res.data.code == 200) {
          var r_item = that.data.choseGoodsType
          console.log(that.data.thisType)
          switch (that.data.thisType) {
            case '0':
              r_item[0][0].lists = res.data.data.product_r.lens_brand
              r_item[0][1].lists = res.data.data.product_r.lens_refractivity
              r_item[0][2].lists = res.data.data.product_r.lens_colorFilm
              r_item[0][3].lists = res.data.data.product_r.lens_model
              r_item[0][4].lists = res.data.data.product_r.lens_material

              r_item[0][0].chose = res.data.data.choose.lens_brand
              r_item[0][1].chose = res.data.data.choose.lens_refractivity
              r_item[0][2].chose = res.data.data.choose.lens_colorFilm
              r_item[0][3].chose = res.data.data.choose.lens_model
              r_item[0][4].chose = res.data.data.choose.lens_material
              break
            case '1':
              r_item[1][0].lists = res.data.data.product_r.gframe_brand
              r_item[1][1].lists = res.data.data.product_r.gframe_style
              r_item[1][2].lists = res.data.data.product_r.gframe_model
              r_item[1][3].lists = res.data.data.product_r.gframe_material

              r_item[1][0].chose = res.data.data.choose.gframe_brand
              r_item[1][1].chose = res.data.data.choose.gframe_style
              r_item[1][2].chose = res.data.data.choose.gframe_model
              r_item[1][3].chose = res.data.data.choose.gframe_material
              break
            case '2':
              r_item[2][0].lists = res.data.data.product_r.sun_brand
              r_item[2][1].lists = res.data.data.product_r.sun_style
              r_item[2][2].lists = res.data.data.product_r.sun_model
              r_item[2][3].lists = res.data.data.product_r.sun_material

              r_item[2][0].chose = res.data.data.choose.sun_brand
              r_item[2][1].chose = res.data.data.choose.sun_style
              r_item[2][2].chose = res.data.data.choose.sun_model
              r_item[2][3].chose = res.data.data.choose.sun_material
              break
            case '3':
              r_item[3][0].lists = res.data.data.product_r.presbyopic_brand
              r_item[3][1].lists = res.data.data.product_r.presbyopic_style
              r_item[3][2].lists = res.data.data.product_r.presbyopic_model
              r_item[3][3].lists = res.data.data.product_r.presbyopic_frameMaterial

              r_item[3][0].chose = res.data.data.choose.presbyopic_brand
              r_item[3][1].chose = res.data.data.choose.presbyopic_style
              r_item[3][2].chose = res.data.data.choose.presbyopic_model
              r_item[3][3].chose = res.data.data.choose.presbyopic_frameMaterial
              break
            case '4':
              r_item[4][0].lists = res.data.data.product_r.contact_brand
              r_item[4][1].lists = res.data.data.product_r.o1
              r_item[4][2].lists = res.data.data.product_r.contact_model
              r_item[4][3].lists = res.data.data.product_r.contact_material

              r_item[4][0].chose = res.data.data.choose.contact_brand
              r_item[4][1].chose = res.data.data.choose.o1
              r_item[4][2].chose = res.data.data.choose.contact_model
              r_item[4][3].chose = res.data.data.choose.contact_material
              break
            case '5':
              r_item[5][0].lists = res.data.data.product_r.caresolution_brand
              r_item[5][1].lists = res.data.data.product_r.caresolution_model
              r_item[5][2].lists = res.data.data.product_r.caresolution_rule

              r_item[5][0].chose = res.data.data.choose.caresolution_brand
              r_item[5][1].chose = res.data.data.choose.caresolution_model
              r_item[5][2].chose = res.data.data.choose.caresolution_rule
              break
            case '6':
              r_item[6][0].lists = res.data.data.product_r.accessory_brand
              r_item[6][1].lists = res.data.data.product_r.accessory_model
              r_item[6][2].lists = res.data.data.product_r.accessory_material
              r_item[6][3].lists = res.data.data.product_r.accessory_function

              r_item[6][0].chose = res.data.data.choose.accessory_brand
              r_item[6][1].chose = res.data.data.choose.accessory_model
              r_item[6][2].chose = res.data.data.choose.accessory_material
              r_item[6][3].chose = res.data.data.choose.accessory_function
              break
          }

          that.setData({
            products: res.data.data.product_l,
            choseGoodsType: r_item
          })
          console.log(that.data.choseGoodsType)
          // console.log(r_item)
        } else {
          //无
          that.setData({
            isNull: true
          })
        }
      }
    })
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