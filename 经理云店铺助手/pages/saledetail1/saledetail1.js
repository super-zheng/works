// pages/saledetail/saledetail.js
function render(that, o) {
  var arr = [];
  for (var i = 0, len = o.length; i < len; i++) {
    var obj = {};
    obj['goodsTypes'] = '';
    switch (o[i].goodsType) {
      case 1:
        obj['brand'] = o[i].lens_brand;
        obj['code'] = o[i].degree_cyl;
        obj['counts'] = o[i].goodsCounts;
        obj['goodsPrice'] = o[i].goods_danjia;
        obj['glasses_price'] = o[i].glasses_price;
        obj['goodsTypes'] = '镜片';
        break
      case 2:
        obj['brand'] = o[i].gframe_brand;
        obj['code'] = o[i].colorNumber;
        obj['counts'] = o[i].goodsCounts;
        obj['goodsPrice'] = o[i].goods_danjia;
        obj['glasses_price'] = o[i].glasses_price;
        obj['goodsTypes'] = '镜架'
        break
      case 3:
        obj['brand'] = o[i].sun_brand;
        obj['code'] = o[i].colorNumber;
        obj['counts'] = o[i].goodsCounts;
        obj['goodsPrice'] = o[i].goods_danjia;
        obj['glasses_price'] = o[i].glasses_price;
        obj['goodsTypes'] = '太阳眼镜'
        break
      case 4:
        obj['brand'] = o[i].presbyopic_brand;
        obj['code'] = o[i].degree_cyl;
        obj['counts'] = o[i].goodsCounts;
        obj['goodsPrice'] = o[i].goods_danjia;
        obj['glasses_price'] = o[i].glasses_price;
        obj['goodsTypes'] = '成品眼镜'
        break
      case 5:
        obj['brand'] = o[i].contact_brand;
        obj['code'] = o[i].degree_cyl;
        obj['counts'] = o[i].goodsCounts;
        obj['goodsPrice'] = o[i].goods_danjia;
        obj['glasses_price'] = o[i].glasses_price;
        obj['goodsTypes'] = '隐形眼镜'
        break
      case 6:
        obj['brand'] = o[i].caresolution_brand;
        obj['code'] = o[i].caresolution_rule;
        obj['counts'] = o[i].goodsCounts;
        obj['goodsPrice'] = o[i].goods_danjia;
        obj['glasses_price'] = o[i].glasses_price;
        obj['goodsTypes'] = '护理液'
        break
      case 7:
        obj['brand'] = o[i].accessory_brand;
        obj['code'] = o[i].accessory_size;
        obj['counts'] = o[i].goodsCounts;
        obj['goodsPrice'] = o[i].goods_danjia;
        obj['glasses_price'] = o[i].glasses_price;
        obj['goodsTypes'] = '配件'
        break
    }


    arr.push(obj);
  }
  that.setData({
    saledetail: arr
  });
}
var app = getApp()
var QRCode = require('../../utils/weapp-qrcode.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saledetail: [],
    store_name: '',
    ity_Number: 0,
    user_realname: '',
    totalcounts: 0,
    ity_date: '',
    jifen: 0,
    wholediscount: 0,
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })




    var ity_id = options.ity_id
    var ity_glassesNum1 = ''
    console.log(ity_id)
    var that = this
    // console.log(ity_Number)
    wx.request({
      url: "https://www.jingliyun.cn/jlyyj/index.php/Small/SmallGeren/list_detail",
      data: {
        ity_id: ity_id
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        // var totalpointCutted = res.data.header_info.ity_paidPrice + res.data.header_info.ity_unpaidPrice - res.data.header_info.ity_boxNumber
        // 销售时间
        var time = new Date(res.data.header_info.ity_date).Format('yyyy-MM-dd HH:mm:ss');
        ity_glassesNum1 = res.data.header_info.ity_glassesNum1;
        that.setData({
          // saledetail:res.data,
          // saledetail:res.data.goods_info,
          store_name: res.data.header_info.store_name,
          ity_Number: res.data.header_info.ity_Number,
          user_realname: res.data.header_info.user_realname,
          totalcounts: res.data.header_info.ity_operatPerson1,
          ity_date: time,
          jifen: res.data.goods_info[0].glasses_price,
          wholediscount: res.data.header_info.wholediscount,
          youhuiPrice: res.data.header_info.youhuiPrice,
          yifu_price: res.data.header_info.ity_paidPrice,
          weifu_price: res.data.header_info.ity_unpaidPrice,
          totalpointCutted: res.data.header_info.ity_boxNumber,
          ity_status: res.data.header_info.ity_status,
          ity_glassesNum1: ity_glassesNum1,
        })
        render(that, res.data.goods_info);

        //传入wxml中二维码canvas的canvas-id
        var qrcode = new QRCode('canvas', {
          // usingIn: this,
          text: ity_glassesNum1,
          width: 150,
          height: 150,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });


        if (res.data[1] == '') {
          wx.showToast({
            title: '加载失败',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../geren/geren',
            })
          }, 1000)
        }

      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          duration: 1000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../geren/geren',
          })
        }, 1000)

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