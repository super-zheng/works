const orderStaus ={
  '0':'已付清',
  '-1':'未付清',
  '1':'已交付',
  '200':'手机单'
}
const color = {
  '0': 'colorOrange',
  '-1': 'color777',
  '1': 'colorblue'
}
var app = getApp();
function sends(obj) {
  var padarr = app.globalData.pads;
  console.log(padarr)
  for (var i = 0, len = padarr.length; i < len; i++) {
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
  if (padarr.length > 0) {
    wx.showToast({
      title: '推送成功',
      duration: 500
    })
  }else{
    wx.showToast({
      title: '没有找到收银机',
      image: '../images/warn.png',
      duration: 1000
    })
  }
}
//加载会员相关
function loadvip(that){
  var vipid = that.data.options.vipid;
  if (vipid && vipid!="undefined"){
    var ids = { "code": "A10", "accesstoken": "SELECT a.vip_tel,b.customer_address,b.customer_name,b.customer_id FROM tb_vip a LEFT JOIN tb_customer b on a.customer_id = b.customer_id where a.vip_id = " + vipid};
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'common',
        par2: 'api',
        ids: ids,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        if(res.data.code==200){
          var temp = res.data.data[0];
          var pageObj = that.data.pageObj;
          pageObj['name'] = temp.customer_name ? temp.customer_name:'暂无';
          pageObj['phone'] = temp.vip_tel ? temp.vip_tel:'暂无';
          pageObj['adress'] = temp.customer_address ? temp.vip_tel:'暂无';
          that.setData({
            pageObj: pageObj
          });
        }
      }
    })

  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageObj:{
      orderNum:'',//销售单号
      orderTime:'',//销售时间
      name:'暂无',//姓名
      phone:'暂无',//电话
      adress:'暂无',//地址
      status:'0',//状态
      shihsou:''//实收
    },
    goodsLists: [
      // { src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面1', price: '121', num: '11' },
      // { src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面2', price: '122', num: '12' },
      // { src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面3', price: '123', num: '13' },
      // { src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面4', price: '124', num: '14' },
      // { src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面5', price: '125', num: '15' },
      // { src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面6', price: '126', num: '16' },
      // { src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面7', price: '127', num: '17' },
      // { src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面8', price: '128', num: '18' },
      // { src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面9', price: '129', num: '19' },
    ],
    orderStaus: orderStaus,//订单状态
    nums: 0,//总数量selectforgoods
    money:0,//总价
    color:color,
    options:{}
  },
  sends:function(e){
    var that = this;
    var obj = {};
    obj['ity_id'] = that.data.options.ity_id;
    obj['tel'] = that.data.pageObj.phone == '暂无' || that.data.pageObj.phone == '' ?'':that.data.pageObj.phone;
    obj['vip_id'] = that.data.options.vipid && that.data.options.vipid != "undefined" ? that.data.options.vipid:"";
    sends(obj);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   
    var nums = 0;
    var money = 0;
    console.log(options)
    that.setData({
      options: options
    });
    var vip_id = options.vipid;
    var ids = { "store_id": app.globalData.store_id, "where": "where ity_id=" + options.ity_id+""};
    console.log(ids)
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'android',
        par2: 'getList',
        ids: ids,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        if(res.data.code==200){
          var list = res.data.data;
          var goodlist = [];
          loadvip(that);
          for(var i=0,len=list.length;i<len;i++){
            var temp = list[i];
            var obj = {};
            var goodstype = temp.goodsType;
            //{ src: '../images/jingpian.png', message: '依视路非球面依视美1.655非球面9', price: '129', num: '19' }
            obj['src'] = temp.stock_imgPath == "" ? (app.globalData.storelogimg == '' ? app.globalData.logo : app.globalData.path + 'ImagePath/' + app.globalData.storelogimg) : app.globalData.path + app.globalData.GoodsName[goodstype - 1] + '/' + temp.stock_imgPath.split(';')[0];
            obj['message'] = temp.goods_pinming;
            obj['price'] = temp.goods_danjia;
            obj['num'] = temp.goodsCounts;
            goodlist.push(obj);
          }
          // orderNum: '',//销售单号
          //   orderTime:'',//销售时间
          //     name:'',//姓名
          //       phone:'',//电话
          //         adress:'',//地址
          //           status:'0',//状态
          //             shihsou:''//实收
          var page = that.data.pageObj;
          page['shihsou'] = list[0].ity_paidPrice;
          page['orderNum'] = list[0].ity_Number;
          page['orderTime'] = new Date(list[0].ity_date).Format('yyyy-MM-dd HH:mm:ss');
          page['status'] = list[0].ity_status;
          that.setData({
            goodsLists: goodlist,
            pageObj: page
          });
          var goodsLists = that.data.goodsLists;
          goodsLists.forEach(function (item, index) {
            nums += item.num / 1;
            money += item.num * item.price;
          })
          that.setData({
            nums: nums,
            money: money
          })
        }else{
          wx.showToast({
            title: '暂无数据',
            image: '../images/warn.png',
            duration: 1000
          })
        }
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
  onShow: function (options) {
      
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