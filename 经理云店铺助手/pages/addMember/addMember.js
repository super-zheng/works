var utils = require('../../utils/util.js');
var nowTime = new Date().Format('yyyy-MM-dd');
var telflag = true;
var app = getApp();
var customerID = null;
function newvip(that){//
    var id = {}
    id['store_id'] = app.globalData.store_id;
    var o = that.data.customerdetil;
    o.customer_birthday = that.data.customer_birthday;
    o.vip_type = 0;
    id['jsonobj'] = o;
    wx.request({
      url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
      data: {
        par1: 'android',
        par2: 'saveStoreVip',
        ids: id,
      }, header: {
        'content-type': 'application/json' // 默认值
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '新增成功！',
            duration: 500
          }) 
          app.globalData.newvip = res.data.data[0].customer_id;
          res.data.data[0].detail.customer_tel = res.data.data[0].detail.vip_tel;
          app.globalData.cutdetil = res.data.data[0].detail;
        } else if (res.data.code == 201) {
          wx.showToast({
            title: '修改成功！',
            duration: 500
          })
          app.globalData.newvip = res.data.data[0].customer_id;
          res.data.data[0].detail.customer_tel = res.data.data[0].detail.vip_tel;
          app.globalData.cutdetil = res.data.data[0].detail;
        } else {
          wx.showToast({
            title: '请重试！',
            duration: 500
          })
        }

      }
    })
}
//select b.*,a.vip_type,a.vip_yue,a.vip_id,a.store_id,a.vip_cardId,a.vip_tel,a.vip_score,vip_rank,a.vip_registTime,a.vip_status,a.vip_remarks,a.vip_storeid from tb_vip a join tb_customer b on a.customer_id = b.customer_id where a.customer_id =
// function loadvip(){}
function loadvip(that,id){
  wx.request({
    url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    data: {
      par1: 'php',
      par2: 'findoptometry',
      ids: id,
    }, header: {
      'content-type': 'application/json' // 默认值
    },
    method: "GET",
    success: function (res) {
      console.log(res)
      if (res.data.code == 200) {
        var customerdetil = res.data.data[0].gkdetil[0]
        var birthday = customerdetil.customer_birthday ? new Date(customerdetil.customer_birthday).Format('yyyy-MM-dd') : "";
        that.setData({
          customerdetil: customerdetil,
          customer_tel: customerdetil.customer_tel,//  电话
          customer_name: customerdetil.customer_name,//姓名
          customer_sex: customerdetil.customer_sex,//性别（ 0 其他，1 男 2 女）
          customer_birthday: birthday,//生日
          vip_remarks: customerdetil.vip_remarks,//备注
        })
        console.log(that.data.customerdetil)
        wx.showToast({
          title: '加载成功！',
          duration: 500
        })
      } else if (res.data.code == 201) {
        wx.showToast({
          title: '此会员无详情！',
          duration: 500
        })
      } else {
        wx.showToast({
          title: '请重试！',
          duration: 500
        })
      }

    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_tel: '',//  电话
    customer_name: '',//姓名
    customer_sex: '1',//性别（ 0 其他，1 男 2 女）
    customer_birthday: '',//生日
    vip_remarks: '',//备注
    customer_status: '0',//状态（ 直接给0）
    endTime: nowTime,
    options:'',//url参数
    customerdetil:{},
    vipdetil: {},
    yanzheng: {
      toPhone: false,
      toName: false
    }
  },
  //电话号码填写
  phoneNumber: function (e) {
    var that = this;
    this.setData({
      customer_tel: e.detail.value
    })
    var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(e.detail.value)) {
      var id = {
        "code": "A10", "accesstoken": "select b.*,a.vip_type,a.vip_yue,a.vip_id,a.store_id,a.vip_cardId,a.vip_tel,a.vip_score,vip_rank,a.vip_registTime,a.vip_status,a.vip_remarks,a.vip_storeid from tb_vip a join tb_customer b on a.customer_id = b.customer_id where a.store_id = " + app.globalData.zd_id + " and vip_type = 0 and a.vip_tel ='" + e.detail.value + "'"
      };
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
            customerID = res.data.data[0].customer_id;
            var customerdetil = res.data.data[0];
            var birthday = customerdetil.customer_birthday ? new Date(customerdetil.customer_birthday).Format('yyyy-MM-dd') : "";
            var vip_remarks = customerdetil.vip_remarks ? customerdetil.vip_remarks : "";
            that.setData({
              customerdetil: customerdetil,
              customer_name: customerdetil.customer_name,//姓名
              customer_sex: customerdetil.customer_sex,//性别（ 0 其他，1 男 2 女）
              customer_birthday: birthday,//生日
              vip_remarks: vip_remarks,//备注
            })
          } else {
            customerID = null;
          }
        }
      });
    }else{
      customerID = null;
    }
    
  },
  //保存按钮
  yanzheng: function (e) {
    setTimeout(submit,200);
    var that = this;
    function submit(){
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      var text = '';
      var type = '';
      if (!reg.test(that.data.customer_tel) && that.data.options.status != 1) {
        text = "请输入正确的手机号码";
        type = 'toPhone';


      } else if (that.data.customer_name == '') {
        text = "请输入您的姓名";
        type = 'toName';
        console.log(12312)
      }
      console.log(text)
      if (text != '') {
        wx.showModal({
          title: '提示',
          content: text,
          showCancel: false, //不显示取消按钮
          confirmText: '确定',
          success: function (res) {
            if (res.confirm) {
              var yz = that.data.yanzheng;
              yz[type] = true;
              that.setData({
                yanzheng: yz
              })
            } else if (res.cancel) {
            }
          }
        })
      } else {
        //此处验证成功进行数据保存  跳回主页面 进行刷新
        that.data.customerdetil.customer_tel = that.data.customer_tel//  电话
        that.data.customerdetil.customer_name = that.data.customer_name//姓名
        that.data.customerdetil.customer_sex = that.data.customer_sex//性别（ 0 其他，1 男 2 女）
        that.data.customerdetil.customer_birthday = new Date(that.data.customer_birthday).getTime()//生日
        that.data.vipdetil.vip_remarks = that.data.vip_remarks//备注

        that.data.vipdetil.store_id = app.globalData.zd_id
        that.data.vipdetil.vip_storeid = app.globalData.store_id
        that.data.vipdetil.vip_tel = that.data.customer_tel
        var ups = [{ "OType": "u", "OObjs": [] }];
        if (that.data.options.status == 1) {
          that.data.customerdetil.customer_id = app.globalData.chosecutid
          that.data.vipdetil.vip_id = app.globalData.cutdetil.vip_id
          that.data.vipdetil.customer_id = app.globalData.cutdetil.customer_id
          that.data.vipdetil.vip_cardId = app.globalData.cutdetil.vip_cardId
          that.data.vipdetil.vip_score = app.globalData.cutdetil.vip_score
          that.data.vipdetil.vip_registTime = app.globalData.cutdetil.vip_registTime
          that.data.vipdetil.vip_status = app.globalData.cutdetil.vip_status
          that.data.vipdetil.vip_type = app.globalData.cutdetil.vip_type
          that.data.vipdetil.vip_yue = app.globalData.cutdetil.vip_yue

          var cusu = {};
          cusu['customer_tel'] = that.data.customer_tel;
          cusu['customer_name'] = that.data.customer_name;
          cusu['customer_sex'] = that.data.customer_sex ? that.data.customer_sex : 0;
          if (that.data.customer_birthday) {
            cusu['customer_birthday'] = new Date(that.data.customer_birthday).Format('yyyy-MM-dd HH:mm:ss');
          }
          var obj1 = {};
          obj1['tbOrView_name'] = "Customer";
          obj1['whereConditions'] = "where customer_id=" + app.globalData.chosecutid;
          obj1['entities'] = [];
          obj1['entities'].push(cusu);
          var obj2 = {};
          obj2['tbOrView_name'] = "Vip";
          obj2['whereConditions'] = "where vip_id=" + app.globalData.cutdetil.vip_id;
          obj2['entities'] = [];
          var vipu = {};
          vipu['vip_remarks'] = that.data.vip_remarks ? that.data.vip_remarks : "null";
          vipu['vip_tel'] = that.data.customer_tel ? that.data.customer_tel : "null";
          obj2['entities'].push(vipu);
          ups[0]['OObjs'].push(obj1);
          ups[0]['OObjs'].push(obj2);
        } else {
          that.data.vipdetil.vip_cardId = (Math.floor(Math.random() * 89999999999) + 10000000000)
          that.data.vipdetil.vip_score = 0
          that.data.vipdetil.vip_registTime = new Date().getTime()
          that.data.vipdetil.vip_status = 0
          that.data.vipdetil.vip_type = 0
          that.data.vipdetil.vip_yue = 0
        }
        //app.globalData.cutdetil = [];
        console.log(that.data.customerdetil)
        console.log(app.globalData.cutdetil)
        var id = { 'user': that.data.customerdetil, 'vip': that.data.vipdetil }
        console.log(JSON.stringify(ups))
        wx.showLoading({
          title: '加载中',
        })
        if (that.data.options.status == 1) {
          wx.request({
            url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
            data: {
              par1: 'web',
              par2: 'stsSaveorUpdate',
              ids: { "jsonParams": ups },
            }, header: {
              'content-type': 'application/json' // 默认值
            },
            method: "GET",
            success: function (res) {
              console.log(res)
              if (res.data.code == 201) {
                wx.showToast({
                  title: '保存成功！',
                  duration: 500
                })
                app.globalData.newvip = app.globalData.chosecutid;
                app.globalData.cutdetil.customer_tel = that.data.customer_tel;
              } else {
                wx.showToast({
                  title: '保存失败！',
                  image: '../images/warn.png',
                  duration: 1000
                })
              }
            }
          })
        } else {
          newvip(that);
        }

      }
    }

  },
  //清空按钮事件
  qingkong:function(){
    this.setData({
      customer_tel: '',//  电话
      customer_name: '',//姓名
      customer_sex: '1',//性别（ 0 其他，1 男 2 女）
      customer_birthday: '',//生日
      vip_remarks: '',//备注
      customer_status: '0',//状态（ 直接给0）
      endTime: nowTime,
      yanzheng: {
        toPhone: false,
        toName: false
      }
    })
  },
  //姓名填写
  customerName: function (e) {
    this.setData({
      customer_name: e.detail.value
    })
  },
  //性别选择事件
  checkSex: function (e) {
    console.log(e.currentTarget.dataset.sex)
    this.setData({
      customer_sex: e.currentTarget.dataset.sex
    })
  },
  //备注事件注册
  bindTextAreaBlur: function (e) {
    this.setData({
      vip_remarks: e.detail.value
    })
    console.log(this.data)
  },
  //生日选择
  bindDateChange: function (e) {
    this.setData({
      customer_birthday: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)    
    this.setData({
      options: options
      })
    // 如果是原先有会员信息  要执行下面方法  将导航栏的文字修改成个人信息
    if (options.status==1){//获取URL参数为1是个人信息 0是添加会员
      wx.setNavigationBarTitle({
        title: '个人信息'
      })
      if (app.globalData.chosecutid == 0 || app.globalData.chosecutid == "" ||!app.globalData.chosecutid){
        console.log("该店暂无会员");
        //return false;
      }
      var that = this;
      var id = { 'user_id': app.globalData.chosecutid, 'store_id': app.globalData.store_id }
      console.log(id)
      wx.showLoading({
        title: '加载中',
      })
      loadvip(that,id);
    }
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