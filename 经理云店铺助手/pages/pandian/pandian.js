// pages/shopCar/shopCar.js
var app = getApp()
var shoppingProducts = {}
var goods_num
var code_obj={}
var finish_obj={}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    deleWidth: '',
    showMsgWidth: '',
    startX: 0,
    nowX: 0,
    left: {},
    remark:'',
    details: {},
    degree_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    that.setData({
      degree_id: wx.getStorageSync('pandian_degree_id')
    })
    if (wx.getStorageSync('code_obj')!='{}'){
      code_obj = wx.getStorageSync('code_obj')
    }else{
      code_obj = {}
    }
    
    var goods = wx.getStorageSync('products_add')
    goods_num = wx.getStorageSync('goodsNum_cache')
    console.log('products_add')
    console.log(goods)
    var obj = {}
    for (var i in goods) {
      goods[i]['numbers_ori'] = goods[i]['numbers']
      if (goods[i]['numbers_yi']>0){

      }else{
        goods[i]['numbers_yi'] = 0
      }
      obj[i] = goods[i]
      shoppingProducts[i] = goods[i]
    }
    that.setData({
      details: obj
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          deleWidth: 'width:' + res.windowWidth * .2 + 'px',
          showMsgWidth: 'width:' + res.windowWidth + 'px'
        })
      }
    })
    // var choseImg = this.data.choseImg;
    // this.setData({
    //   choseImg: choseImg
    // })
  },

  moveStart: function (e) {
    this.setData({
      startX: e.touches[0].pageX
    })

  },

  //滑动显示删除
  isMove: function (e) {
    var that = this;
    var moves = e.changedTouches[0].pageX - that.data.startX;
    var live = 0;
    if (moves > 100) {
      live = 0;
    } else if (moves < -100) {
      live = -that.data.windowWidth * .2;
    }
    var arr = this.data.left;
    // for (var i = 0; i < arr.length; i++) {
    //   arr[i] = 0;
    // }
    for (var k in arr) {
      arr[k] = 0;
    }
    arr[e.currentTarget.dataset.index] = live;
    this.setData({
      nowX: e.changedTouches[0].pageX,
      left: arr
    })
    console.log(e.currentTarget.dataset.index)
  },

  //滑动后点击删除事件
  delete: function (e) {
    //修改缓存中goods_num的数量
    console.log(goods_num)
    console.log(this.data.details['g' + e.currentTarget.dataset.degree_id].number)
    goods_num = goods_num - this.data.details['g' + e.currentTarget.dataset.degree_id].number
    wx.setStorageSync('goodsNum_cache', goods_num)
    console.log(goods_num)
    if (shoppingProducts['g' + e.currentTarget.dataset.degree_id]) {
      delete shoppingProducts['g' + e.currentTarget.dataset.degree_id]
    }
    var details = this.data.details
    delete details['g' + e.currentTarget.dataset.degree_id]
    this.setData({
      details: details
    })

    var goods = wx.getStorageSync('products_add')
    if (goods['g' + e.currentTarget.dataset.degree_id]) {
      delete goods['g' + e.currentTarget.dataset.degree_id]
      wx.setStorageSync('products_add', goods)
    }

  },

  //商品详情
  productdetail: function (e) {
    var degree_id = e.currentTarget.dataset.degree_id
    var stock_type = e.currentTarget.dataset.stock_type
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

  //扫码盘点
  scan_pandian:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var store_id=app.globalData.store_id
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: function (res) {
        var code = '';
        if (res.result) {
          if (res.result.indexOf('id=') > 0) {
            code = res.result.substring(res.result.indexOf('id=') + 3)

            //避免重复扫码
            if (code_obj['c' + code]){
              wx.hideLoading()
              wx.showToast({
                title: '扫码重复！',
                image: '../images/warn.png',
                duration: 2000
              })
              return
            }

            wx.request({
              url: 'https://www.jingliyun.cn/index.php/Home/SmallProgram/ScanPD',
              data: {
                store_id: store_id,
                code: code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                code_obj['c' + code] = code
                wx.setStorageSync('code_obj', code_obj)
                wx.hideLoading()
                console.log(res)
                if (res.data.code==200){
                  var goods = that.data.details
                  if (goods['g' + res.data.data]) {
                    that.setData({
                      'degree_id': res.data.data
                    })
                    wx.setStorageSync('pandian_degree_id', res.data.data)
                    goods['g' + res.data.data]['numbers_yi'] = goods['g' + res.data.data]['numbers_yi']+1
                    goods['g' + res.data.data]['numbers'] = goods['g' + res.data.data]['numbers'] - 1
                  }else{
                    wx.showToast({
                      title: '该商品未被选中！',
                      image: '../images/warn.png',
                      duration: 2000
                    })
                  }

                  that.setData({
                    details: goods
                  })
                  wx.setStorageSync('products_add', goods)
                }else{
                  wx.showToast({
                    title: '未找到商品！',
                    image: '../images/warn.png',
                    duration: 2000
                  })
                }
              },
              fail: function () {
                wx.hideLoading()
                wx.showToast({
                  title: '出错了！',
                  image: '../images/warn.png',
                  duration: 2000
                })
              }
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '暂只支持商品码',
              duration: 2000
            })
          }
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '扫码失败',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '扫码失败',
          duration: 2000,
        })
      }
    })
  },

  //获取备注的内容
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  //盘点完成，提交盘点结果
  save_pandian:function(){
    app.globalData.pandian=0
    wx.showLoading({
      title: '加载中',
    })
    var goods = this.data.details
    var remark = this.data.remark
    var store_id = app.globalData.store_id
    var user_id = app.globalData.user_id
    // console.log(goods)
    // console.log(store_id)
    // console.log(user_id)
    // console.log(finish_obj)
    // goods=Object.assign(goods,finish_obj)
    // return
    if (!store_id || !user_id || (JSON.stringify(goods)=='{}' && JSON.stringify(finish_obj)=='{}')){
      wx.hideLoading()
      wx.showToast({
        title: '数据错误！',
        image: '../images/warn.png',
        duration: 2000
      })
      return
    }

    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallDianwu/pandian',
      data: {
        remark: remark,
        store_id: store_id,
        user_id: user_id,
        goods: JSON.stringify(goods)
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if(res.data.code==200){
          app.globalData.pandian = 0
          wx.setStorageSync('goodsNum_cache', 0)
          wx.setStorageSync('products_add', {})
          wx.setStorageSync('pandian_degree_id', 0)
          code_obj={}
          wx.setStorageSync('code_obj', code_obj)
          wx.showToast({
            title: '盘点成功！',
            duration: 2000
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '../pandianlists/pandianlists?type=12'
            })
          },2000)
        }else{
          wx.showToast({ 
            title: '盘点失败！',
            image: '../images/warn.png',
            duration: 2000
          })
        }

      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '出错了！',
          image: '../images/warn.png',
          duration: 2000
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