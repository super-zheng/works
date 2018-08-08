// pages/dianwu/scancontent.js
var app = getApp()
var scan_code = '';
var obj = {};
var dingdanCount = 0;
var scan_type2 = ''
var unicode = {}
var scan_type
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    dingdan: true,
    scan_type: true,
    isfinish: true,
    scan_type2: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    unicode = {}
    var scan_products = {}
    var that = this
    var code = options.code
    // var code = 'r6msj9ec'
    // scan_type='ruku'
    // var scan_type2 = 1
    // scan_type = options.scan_type//区分是入库还是退货
    // var scan_type2 = options.scan_type2//区分是单个商品还是整单
    // console.log(options)
    var store_id = app.globalData.store_id
    wx.setStorageSync('scan_products', {})
    wx.showLoading({
      title: '加载中',
    })

    // if (scan_type == 'ruku') {//入库操作
    //   that.setData({
    //     scan_type: true,
    //     products: {},
    //     scan_type2: scan_type2
    //   })
    // } else {//退货操作
      that.setData({
        scan_type: false,
        products: {},
        scan_type2: scan_type2
      })
    // }
    scan_code = code
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallProgram/ScanTT',
      data: {
        code: code,
        store_id: store_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log('11111122')
        console.log(res)
        // if (scan_type == 'ruku') {
        //   //判断该商品是否已入库
        //   if (res.data == 201) {
        //     wx.showToast({
        //       title: '该商品已被入库',
        //       image: '../images/warn.png'
        //     })
        //     return
        //   } else if (res.data == 202) {
        //     // that.setData({
        //     //   isfinish: false
        //     // })
        //     wx.showToast({
        //       title: '该订单已入库',
        //       image: '../images/warn.png'
        //     })
        //     return
        //   } else if (res.data == 203) {
        //     // that.setData({
        //     //   isfinish: false
        //     // })
        //     wx.showToast({
        //       title: '该订单已退货',
        //       image: '../images/warn.png'
        //     })
        //     return
        //   } else {
        //     unicode['c' + code] = code
        //   }
        // } else {//退货的判断
          if (res.data == 204) {
            // that.setData({
            //   isfinish: false
            // })
            wx.showToast({
              title: '该商品未销售',
              image: '../images/warn.png'
            })
            return
          } else if (res.data == 205){
            wx.showToast({
              title: '该店暂无该商品',
              image: '../images/warn.png'
            })
            return
          } else if (res.data == 206){//该商品暂无库存
            wx.showToast({
              title: '该商品暂无库存',
              image: '../images/warn.png'
            })
            return
          }
          unicode['c' + code] = code
        // }

        //判断该订单是否已入库或退货
        // if(res.data[0].isfinish_ruku==true){
        //   
        // } else if (res.data[0].isfinish_tuihuo == true){
        //   that.setData({
        //     isfinish: false
        //   })
        //   wx.showToast({
        //     title: '该订单已退货',
        //     image: '../images/warn.png'
        //   })
        //   return
        // }
        for (var key in res.data) {
          var product_item = {}
          product_item['price'] = res.data[key].price
          product_item['orderPrice'] = res.data[key].orderPrice
          product_item['numbers'] = res.data[key].numbers
          product_item['stock_imgPath'] = res.data[key].stock_imgPath
          product_item['degree_id'] = res.data[key].degree_id
          product_item['stock_type'] = res.data[key].stock_type

          // console.log(res.data[key].stock_type)

          // product_item['sun_brand'] = res.data[key].sun_brand
          // product_item['sun_style'] = res.data[key].sun_style
          // product_item['sun_model'] = res.data[key].sun_model
          // product_item['sun_material'] = res.data[key].sun_material


          switch (res.data[key].stock_type) {
            case 1:
              product_item['lens_brand'] = res.data[key].lens_brand
              product_item['lens_refractivity'] = res.data[key].lens_refractivity
              product_item['lens_colorFilm'] = res.data[key].lens_colorFilm
              product_item['lens_model'] = res.data[key].lens_model
              product_item['lens_material'] = res.data[key].lens_material
              break
            case 2:
              product_item['gframe_brand'] = res.data[key].gframe_brand
              product_item['gframe_style'] = res.data[key].gframe_style
              product_item['gframe_model'] = res.data[key].gframe_model
              product_item['gframe_material'] = res.data[key].gframe_material
              product_item['degree_colorNumber'] = res.data[key].degree_colorNumber
              break
            case 3:
              product_item['sun_brand'] = res.data[key].sun_brand
              product_item['sun_style'] = res.data[key].sun_style
              product_item['sun_model'] = res.data[key].sun_model
              product_item['sun_material'] = res.data[key].sun_material
              product_item['degree_colorNumber'] = res.data[key].degree_colorNumber
              break
            case 4:
              product_item['presbyopic_brand'] = res.data[key].presbyopic_brand
              product_item['presbyopic_style'] = res.data[key].presbyopic_style
              product_item['presbyopic_model'] = res.data[key].presbyopic_model
              product_item['presbyopic_frameMaterial'] = res.data[key].presbyopic_frameMaterial
              break
            case 5:
              product_item['contact_brand'] = res.data[key].contact_brand
              product_item['o1'] = res.data[key].o1
              product_item['contact_model'] = res.data[key].contact_model
              product_item['contact_material'] = res.data[key].contact_material
              break
            case 6:
              product_item['caresolution_brand'] = res.data[key].caresolution_brand
              product_item['caresolution_model'] = res.data[key].caresolution_model
              product_item['caresolution_rule'] = res.data[key].caresolution_rule
              break
            case 7:
              product_item['accessory_brand'] = res.data[key].accessory_brand
              product_item['accessory_model'] = res.data[key].accessory_model
              product_item['accessory_material'] = res.data[key].accessory_material
              product_item['accessory_function'] = res.data[key].accessory_function
              break
          }
          
          // product_item['goods_pinming'] = res.data[key].goods_pinming
          // scan_products.push(product_item)
          scan_products['g' + res.data[key].degree_id] = product_item

          console.log(product_item)
        }
        wx.setStorage({
          key: "scan_products",
          data: scan_products
        })
        that.setData({
          products: scan_products
        })
      },
      fail: function () {
        wx.hideLoading()
        console.log('失败')
        wx.showToast({
          title: '加载失败',
          image: '../images/warn.png',
          duration: 1000
        })
      }
    })
  },


  //商品详情
  productdetail: function (e) {
    var degree_id = e.currentTarget.dataset.degree_id
    var stock_type = e.currentTarget.dataset.stock_type
    console.log(degree_id)
    console.log(stock_type)
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


  //清空商品
  clearproducts: function () {
    try {
      wx.setStorageSync('scan_products', {})
      this.setData({
        products: {},
        isfinish: true
      })
    } catch (e) {
    }
  },


  //继续扫描
  Scan_ruku: function () {
    wx.showLoading({
      title: '加载中',
    })
    var scan_products = wx.getStorageSync('scan_products')
    if (!scan_products) {
      scan_products = {}
    }
    console.log(scan_products)
    var that = this;
    var store_id = app.globalData.store_id
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function (res) {
        //获取商品
        console.log(res)
        // res.result ='http://jingliyun.com/cx?id=000001-0.50+0.000152822480210375817663812502030000';
        // res.result = 'http://jingliyun.com/out?zLKH2UDQ';
        var code = '';
        if (res.result.indexOf('id=') > 0) {
          code = res.result.substring(res.result.indexOf('id=') + 3)
          scan_type2 = 1
        } else {
          code = res.result.substring(res.result.indexOf('?') + 1)
          scan_type2 = 2
        }
        scan_code = code
        // if (obj[code]) {
        //   return false;
        // } else {
        //   obj[code] = 1;
        // }
        // console.log(obj);
        //判断该码是否已被扫
        if (unicode['c' + code]) {
          wx.showToast({
            title: '扫码重复',
            image: '../images/warn.png'
          })
          return
        }
        console.log(unicode)
        wx.request({
          url: 'https://www.jingliyun.cn/index.php/Home/SmallProgram/ScanTT',
          data: {
            code: code,
            store_id: store_id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log('继续扫描123')
            console.log(res)
              if (res.data == 204) {
                wx.showToast({
                  title: '该商品未销售',
                  image: '../images/warn.png'
                })
                return
              } else if (res.data == 205){
                wx.showToast({
                  title: '该店暂无该商品',
                  image: '../images/warn.png'
                })
                return
              } else if (res.data == 206) {//该商品暂无库存
                wx.showToast({
                  title: '该商品暂无库存',
                  image: '../images/warn.png'
                })
                return
              }
              unicode['c' + code] = code
            for (var key in res.data) {
              var product_item = {}
              product_item['price'] = res.data[key].price
              product_item['orderPrice'] = res.data[key].orderPrice
              product_item['numbers'] = res.data[key].numbers
              product_item['stock_imgPath'] = res.data[key].stock_imgPath
              product_item['degree_id'] = res.data[key].degree_id
              product_item['stock_type'] = res.data[key].stock_type
              
              switch (res.data[key].stock_type) {
                case 1:
                  product_item['lens_brand'] = res.data[key].lens_brand
                  product_item['lens_refractivity'] = res.data[key].lens_refractivity
                  product_item['lens_colorFilm'] = res.data[key].lens_colorFilm
                  product_item['lens_model'] = res.data[key].lens_model
                  product_item['lens_material'] = res.data[key].lens_material
                  break
                case 2:
                  product_item['gframe_brand'] = res.data[key].gframe_brand
                  product_item['gframe_style'] = res.data[key].gframe_style
                  product_item['gframe_model'] = res.data[key].gframe_model
                  product_item['gframe_material'] = res.data[key].gframe_material
                  break
                case 3:
                  product_item['sun_brand'] = res.data[key].sun_brand
                  product_item['sun_style'] = res.data[key].sun_style
                  product_item['sun_model'] = res.data[key].sun_model
                  product_item['sun_material'] = res.data[key].sun_material
                  break
                case 4:
                  product_item['presbyopic_brand'] = res.data[key].presbyopic_brand
                  product_item['presbyopic_style'] = res.data[key].presbyopic_style
                  product_item['presbyopic_model'] = res.data[key].presbyopic_model
                  product_item['presbyopic_frameMaterial'] = res.data[key].presbyopic_frameMaterial
                  break
                case 5:
                  product_item['contact_brand'] = res.data[key].contact_brand
                  product_item['o1'] = res.data[key].o1
                  product_item['contact_model'] = res.data[key].contact_model
                  product_item['contact_material'] = res.data[key].contact_material
                  break
                case 6:
                  product_item['caresolution_brand'] = res.data[key].caresolution_brand
                  product_item['caresolution_model'] = res.data[key].caresolution_model
                  product_item['caresolution_rule'] = res.data[key].caresolution_rule
                  break
                case 7:
                  product_item['accessory_brand'] = res.data[key].accessory_brand
                  product_item['accessory_model'] = res.data[key].accessory_model
                  product_item['accessory_material'] = res.data[key].accessory_material
                  product_item['accessory_function'] = res.data[key].accessory_function
                  break
              }
              // scan_products['g' + res.data[key].degree_id] = product_item
            
            console.log(product_item)
            var chongfu = 0
            for (var key2 in scan_products) {
              if (res.data[key].degree_id == scan_products[key2]['degree_id']) {
                scan_products[key2]['numbers'] = scan_products[key2]['numbers'] + 1
                chongfu = 1
                console.log('重复了');
              }
            }
            if (chongfu==0) {
              scan_products['g' + res.data[key].degree_id] = product_item
            }
            }
            console.log(scan_products);
            wx.setStorageSync('scan_products', scan_products)
            wx.hideLoading()
            that.setData({
              products: scan_products
            })
          }
        })
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
  },
  //退货
  Tuihuo: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var store_id = app.globalData.store_id
    var user_id = app.globalData.user_id
    var scan_products = wx.getStorageSync('scan_products')
    console.log(scan_products)
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallDianwu/Scan_tuihuo',
      data: {
        scan_products: scan_products,
        store_id: store_id,
        user_id: user_id,
        unicode: unicode
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data == 'success') {
          //清空扫描内容
          wx.setStorage({
            key: "scan_products",
            data: ''
          })
          that.setData({
            products: ''
          })
          wx.showToast({
            title: '退货成功',
            duration: 500
          })
          obj = {}

          wx.showToast({
            title: '退货成功',
            duration: 2000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../tuihuolists/tuihuolists?type=4'
            })
          }, 2000)
        } else {
          //清空扫描内容
          // wx.setStorage({
          //   key: "scan_products",
          //   data: ''
          // })
          // that.setData({
          //   products: ''
          // })
          wx.showToast({
            title: '退货失败',
            image: '../images/warn.png',
            duration: 500
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          image: '../images/warn.png',
          duration: 500
        })
      }
    })
  },

  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  show: function () {
    this.setData({
      hidden: false
    });
  },
  confirm: function () {
    this.setData({
      hidden: true
    });
  },
  //修改商品价格
  // changePrice: function (e) {
  //   let scan_products = wx.getStorageSync('scan_products')
  //   let degree_id = e.currentTarget.dataset.degree_id
  //   scan_products['g' + degree_id].price = e.detail.value
  //   scan_products['g' + degree_id].orderPrice = e.detail.value
  //   wx.setStorageSync('scan_products', scan_products)
  //   this.setData({
  //     products: scan_products
  //   })
  //   console.log(scan_products)
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('123123123')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('456465465')
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