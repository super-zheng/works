// pages/shopCar/shopCar.js
var app=getApp()
var shoppingProducts={}
var goods_num
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

    choseImg: {},
    details: {},
    checkImg:0,
    checkThis: ['cart_ic_check_box_normal','cart_ic_check_box_selected'],
    sumprice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goods = wx.getStorageSync('products_add')
    goods_num = wx.getStorageSync('goodsNum_cache')
    console.log('products_add')
    console.log(goods)
    var obj={};
    var choseImg = {};
    for (var i in goods){
      obj[i] = goods[i]
      choseImg[i] = 'cart_ic_check_box_selected';
      shoppingProducts[i] = goods[i]
    }
    that.setData({
      details: obj,
      choseImg: choseImg, 
      checkImg: 1
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
    this.sum()
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

  //点击勾选
  clikImg: function (e) {
    var that=this
    var choseImg = this.data.choseImg;
    console.log(choseImg)
    var imgStr = choseImg['g'+e.currentTarget.dataset.imgindex];
    if (imgStr == 'cart_ic_check_box_normal') {
      imgStr = 'cart_ic_check_box_selected';
    } else {
      imgStr = 'cart_ic_check_box_normal';
    }
    choseImg['g' +e.currentTarget.dataset.imgindex] = imgStr;
    console.log(choseImg)
    this.setData({
      choseImg: choseImg
    })
    //判断是否为全选
    var on=0
    for (var key in choseImg){
      if (choseImg[key] == 'cart_ic_check_box_selected'){
        on = on + 1
      }
    }
    if (on == Object.getOwnPropertyNames(choseImg).length){
      this.setData({
        checkImg: 1
      })
    }else{
      this.setData({
        checkImg: 0
      })
    }
    //判断选中的数据集中是否已经存在
    //不存在已选中的数据集中，则添加
    //合计
    if (shoppingProducts['g' +e.currentTarget.dataset.degree_id]){
      delete shoppingProducts['g' +e.currentTarget.dataset.degree_id]
    }else{
      shoppingProducts['g' + e.currentTarget.dataset.degree_id] = this.data.details['g' +e.currentTarget.dataset.degree_id]
    }
    this.sum()
  },

  //滑动显示删除
  isMove: function (e) {
    var that = this;
    var moves = e.changedTouches[0].pageX - that.data.startX;
    var live = 0;
    if (moves > 100) {
      live = 0;
    } else if(moves<-100){
      live = -that.data.windowWidth * .2;
    }
    var arr = this.data.left;
    // for (var i = 0; i < arr.length; i++) {
    //   arr[i] = 0;
    // }
    for(var k in arr){
      arr[k]=0;
    }
    arr[e.currentTarget.dataset.index] = live;
    this.setData({
      nowX: e.changedTouches[0].pageX,
      left: arr
    })
    console.log(e.currentTarget.dataset.index)
  },

  //合计
  sum:function(){
    
    var sumprice = 0
    if (shoppingProducts){
      for (var key in shoppingProducts) {
        if (Object.prototype.hasOwnProperty.call(shoppingProducts, key)) {
          sumprice += shoppingProducts[key].price * shoppingProducts[key].number
        }
      }
    }
    console.log(sumprice)
    this.setData({
      sumprice:sumprice
    })
  },

  //滑动后点击删除事件
  delete:function(e){
    //修改缓存中goods_num的数量
    console.log(goods_num)
    console.log(this.data.details['g' + e.currentTarget.dataset.degree_id].number)
    goods_num = goods_num - this.data.details['g' + e.currentTarget.dataset.degree_id].number
    wx.setStorageSync('goodsNum_cache', goods_num)
    console.log(goods_num)
    if (shoppingProducts['g' +e.currentTarget.dataset.degree_id]) {
      delete shoppingProducts['g' +e.currentTarget.dataset.degree_id]
    }
    var details = this.data.details
    delete details['g' +e.currentTarget.dataset.degree_id]
    this.setData({
      details:details
    })

    var goods = wx.getStorageSync('products_add')
    if (goods['g'+e.currentTarget.dataset.degree_id]){
      delete goods['g' +e.currentTarget.dataset.degree_id]
      wx.setStorageSync('products_add', goods)
    }
    this.sum()
    
  },

  //减数量
  jian:function(e){
    //修改缓存中goods_num的数量
    if (goods_num>1){
      goods_num = goods_num - 1
      wx.setStorageSync('goodsNum_cache', goods_num)

      var details = this.data.details
      if (details['g' + e.currentTarget.dataset.degree_id].number > 1) {
        details['g' + e.currentTarget.dataset.degree_id].number = details['g' + e.currentTarget.dataset.degree_id].number - 1
        this.setData({
          details: details
        })
      }

      if (shoppingProducts['g' + e.currentTarget.dataset.degree_id]) {
        shoppingProducts['g' + e.currentTarget.dataset.degree_id].number = shoppingProducts['g' + e.currentTarget.dataset.degree_id].number - 1
      }
      this.sum()

      //修改缓存中的数量
      var goods = wx.getStorageSync('products_add')
      if (goods['g' +e.currentTarget.dataset.degree_id].number > 0) {
        goods['g' + e.currentTarget.dataset.degree_id].number = goods['g' +e.currentTarget.dataset.degree_id].number - 1
        wx.setStorageSync('products_add', goods)
      }
    }  
  },

  //加数量
  jia:function(e){
    var details = this.data.details
    //修改缓存中goods_num的数量
    if (e.currentTarget.dataset.numbers <= details['g' + e.currentTarget.dataset.degree_id].number){
      wx.showToast({
        title: '库存不足',
      })
      return
    }
    goods_num = goods_num+ 1
    wx.setStorageSync('goodsNum_cache', goods_num)

    details['g' +e.currentTarget.dataset.degree_id].number++
    this.setData({
      details: details
    })
    //判断选中商品中是否有该商品
    if (shoppingProducts['g' +e.currentTarget.dataset.degree_id]) {
      shoppingProducts['g' + e.currentTarget.dataset.degree_id].number = details['g' +e.currentTarget.dataset.degree_id].number
      this.sum()
    }


    console.log(wx.getStorageSync('products_add'))
    //修改缓存中的数量
    var goods = wx.getStorageSync('products_add')
    if (goods['g'+e.currentTarget.dataset.degree_id].number > 0) {
      goods['g' + e.currentTarget.dataset.degree_id].number = goods['g' +e.currentTarget.dataset.degree_id].number + 1
      wx.setStorageSync('products_add', goods)
    }
  },
  

  //全选
  choseAll:function(e){
    //将缓存中的数据全部放入数据集中
    

    var checks= this.data.checkImg;
    var choseImg = this.data.choseImg;
    if(checks==1){
      checks=0;
      shoppingProducts = {}
      for (var key in choseImg){
        choseImg[key] = 'cart_ic_check_box_normal'
      }
    }else{
      checks=1;
      shoppingProducts = {}
      for (var key in this.data.details){
        shoppingProducts[key] = this.data.details[key]
      }
      for (var key in choseImg) {
        choseImg[key] = 'cart_ic_check_box_selected'
      }
    }
    this.setData({
      checkImg:checks,
      choseImg:choseImg
    })
    this.sum()
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


  //下单事件
  saleProduct: function () {
    wx.showLoading({
      title: '加载中',
    })
    // 取出products_add缓存中的商品信息，并向后台发送下单请求
    var user_id = app.globalData.user_id
    var store_id = app.globalData.store_id
    var submitdata=[]
    var item=[]
    console.log(shoppingProducts)
    for (var key in shoppingProducts){
      submitdata.push(shoppingProducts[key])
    }
    console.log(submitdata)
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallSale/saleProduct',
      data: {
        products: JSON.stringify(submitdata),
        user_id: user_id,
        store_id: store_id,
      },
      method:'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
        // 'Content-Type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data == 'success') {
          //清空购物车
          wx.setStorageSync('goodsNum_cache', 0)
          wx.setStorageSync('products_add', {})
          console.log('products_add:')
          console.log(wx.getStorageSync('products_add'))
          shoppingProducts = {}
          wx.showToast({
            title: '下单成功',
            duration: 2000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../salelists/salelists?type=1'
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '下单失败',
            duration: 2000
          })
        }
      },
      fail:function(){
        wx.hideLoading()
        wx.showToast({
          title: '请求失败',
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