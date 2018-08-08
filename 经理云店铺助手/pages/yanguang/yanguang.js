//验光参数基础数据
var qjArr = [];
var zjArr = [];
var addArr = ["+0.00"];
var vdArr = [];
var demoNumQj = -36;
var demoNumZj = 0;
var pdArr = [];
var demoPd = 15;
var demoAdd = 0.50;
var demoVd = 11;
var round = 0;
var jingyongArr = [];
var cvaBiaozhunArr = ["4.00", "4.10", "4.20", "4.30", "4.40", "4.50", "4.60", "4.70", "4.80", "4.90", "5.00", "5.10", "5.20"];
var cvaDuishuArr = ["0.10", "0.12", "0.15", "0.20", "0.25", "0.30", "0.40", "0.50",
  "0.60", "0.80", "1.00", "1.20", "1.50", "2.00"];
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

while (demoPd <= 49.5) {
  pdArr.push(demoPd + '');
  jingyongArr.push(demoPd + '');
  demoPd += .5;
}
while (demoAdd <= 5) {
  addArr.push("+" + demoAdd.toFixed(2));
  demoAdd += .25;
}
while (demoVd <= 55) {
  vdArr.push(demoVd + '');
  demoVd += 1;
}
pdArr = pdArr.map(function (item, index) { return item * 2 })

function goto(){
  wx.showModal({
    title: '是否选购商品？',
    success: function (bool) {
      if (bool.confirm){
        wx.redirectTo({
          url: '../chooseGoods/chooseGoods',
        })
      }
    }
  })
}
var app = getApp();
var customer = {
  customer_tel: '',// 顾客电话
  customer_name: '',//  顾客姓名
  customer_sex: 0,//顾客性别
};
//球柱镜设置页面缓存数据
var yanguangshi;
var submitObj = {
  optometry_sph_left: '+0.00',//左眼球镜
  optometry_cyl_left: '+0.00',// 左眼柱镜
  optometry_OA_left: '0',//左眼轴位
  optometry_ADD: '无',//左眼下加光ADD
  optometry_PD_left: '30',//左眼瞳距
  optometry_PDjin: '无',//近用瞳距左眼
  optometry_PH_left: '无',// 左眼瞳高
  optometry_sph_right: '+0.00',//右眼球镜
  optometry_cyl_right: '+0.00',//右眼柱镜
  optometry_OA_right: '0',// 右眼轴位
  optometry_R: '无',//右眼下加光ADD
  optometry_PD_right: '30',// 右眼瞳距
  optometry_o1: '无',// 右眼近用瞳距
  optometry_PH_right: '无',// 右眼瞳高
  optometry_CVA_right2: '5.00',//右眼矫正视力
  optometry_CVA_left2: '5.00'//左眼矫正视力
}

function setValue(subObj, obj) {
  var moren = {
    qjValue: [[144], [144]],//球镜默认
    zjValue: [[0], [0]],//柱镜默认
    pdValue: [[30], [30]],//瞳距默认
    addValue: [[0], [0]],//下加光默认
    jingyongValue: [[0], [0]],//近用瞳距默认
    vdValue: [[20], [20]],//瞳高默认值
    axValue: [[0], [0]],//轴位默认，
    cvaValue: [[10], [10]]//矫正视力默认值
  }
  for (var k in subObj) {
    switch (k) {
      //左眼
      case "optometry_sph_left":
        moren.qjValue[1][0] = qjArr.indexOf(submitObj[k]);
        break;
      case "optometry_cyl_left":
        moren.zjValue[1][0] = zjArr.indexOf(submitObj[k]);
        break;
      case "optometry_OA_left":
        moren.axValue[1][0] = submitObj[k];
        break;
      case "optometry_ADD":
        if (submitObj[k]=='无'){
          moren.addValue = [[0], [0]];
        }else{
          moren.addValue[1][0] = addArr.indexOf(submitObj[k]);
        }
        break;
      case "optometry_PD_left":
        console.log(obj.data);
        
        moren.pdValue[1][0] = obj.data.initArr.pdArr.indexOf(submitObj[k]*(obj.data.hebing?2:1));
        break;
      case "optometry_PDjin":
        if (submitObj[k]=='无'){
          moren.jingyongValue = [[0], [0]];
        }else{
          moren.jingyongValue[1][0] = jingyongArr.indexOf(submitObj[k]);
        }
        break;
      case "optometry_PH_left":
        if (submitObj[k]){
          moren.vdValue = [[20], [20]];
        }else{
          moren.vdValue[1][0] = vdArr.indexOf(submitObj[k]);
        }
        break;
      case "optometry_CVA_left2":
        moren.cvaValue[1][0] = obj.data.initArr.cvaArr.indexOf(submitObj[k]);
        break;


      //右眼
      case "optometry_sph_right":
        moren.qjValue[0][0] = qjArr.indexOf(submitObj[k]);
        break;
      case "optometry_cyl_right":
        moren.zjValue[0][0] = zjArr.indexOf(submitObj[k]);
        break;
      case "optometry_OA_right":
        moren.axValue[0][0] = submitObj[k];
        break;
      case "optometry_R":
        if (submitObj[k] == '无') {
          moren.addValue = [[0], [0]];
        } else {
          moren.addValue[0][0] = addArr.indexOf(submitObj[k]);
        }
        break;
      case "optometry_PD_right":
        moren.pdValue[0][0] = obj.data.initArr.pdArr.indexOf(submitObj[k] * (obj.data.hebing ? 2 : 1));;
        break;
      case "optometry_o1":
        if (submitObj[k] == '无') {
          moren.jingyongValue = [[0], [0]];
        } else {
          moren.jingyongValue[0][0] = jingyongArr.indexOf(submitObj[k]);
        }
        break;
      case "optometry_PH_right":
        if (submitObj[k]) {
          moren.vdValue = [[20], [20]];
        } else {
          moren.vdValue[0][0] = vdArr.indexOf(submitObj[k]);
        }
        break;
      case "optometry_CVA_right2":
        moren.cvaValue[0][0] = obj.data.initArr.cvaArr.indexOf(submitObj[k]);
        break;
    }
  }
  return moren
}
//设置轴位
function setRound(obj, OBJ) {
  var round;
  // var query = wx.createSelectorQuery();
  // query.select('#mjltest').boundingClientRect();
  // query.exec(function (res) {
  //   //res就是 所有标签为mjltest的元素的信息 的数组
  //   // console.log(res);
  //   var centerPosition = { 'x': res[0].left + res[0].width / 2, 'y': res[0].top + res[0].height };
  //   round = -Math.round(Math.atan2(centerPosition.x - obj.x, centerPosition.y - obj.y) * 180 / Math.PI) - 90;
  //   if (-round > 180) {
  //     round = -180;
  //   } else if (round > 0) {
  //     round = 0;
  //   }
  //   var nowCurrent = OBJ.data.nowCurrent;
  //   var moren = OBJ.data.moren;
  //   if (nowCurrent == 0) {
  //     submitObj.optometry_OA_right = -round;
  //   } else if (nowCurrent == 1) {
  //     submitObj.optometry_OA_left = -round;
  //   }
  //   moren.axValue[nowCurrent] = [-round];
  //   OBJ.setData({
  //     moren: moren,
  //   })

  // })
  
  var centerPosition = OBJ.data.axPosition;
  round = -Math.round(Math.atan2(centerPosition.x - obj.x, centerPosition.y - obj.y) * 180 / Math.PI) - 90;
  if (-round > 180) {
    round = -180;
  } else if (round > 0) {
    round = 0;
  }
  var nowCurrent = OBJ.data.nowCurrent;
  var moren = OBJ.data.moren;
  if (nowCurrent == 0) {
    submitObj.optometry_OA_right = -round;
  } else if (nowCurrent == 1) {
    submitObj.optometry_OA_left = -round;
  }
  moren.axValue[nowCurrent] = [-round];
  OBJ.setData({
    moren: moren,
  })
 
}
//保存验光单单据
function saveotp(that,id){
  id.opt.optometry_NO = new Date().Format('yyyyMMddHHmm') + (Math.floor(Math.random() * 8999) + 1000);
  id.opt.optometry_time = new Date().Format('yyyy-MM-dd HH:mm:ss');
  wx.request({
    url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
    data: {
      par1: 'php',
      par2: 'saveorupopt',
      ids: id,
    }, header: {
      'content-type': 'application/json' // 默认值
    },
    method: "GET",
    success: function (res) {
      console.log(res)
      if (res.data.code == 200) {
        wx.showToast({
          title: '保存成功！',
          duration: 1000
        })
        var ops = { "qjR": that.data.submitObj.optometry_sph_right, "zjR": that.data.submitObj.optometry_cyl_right, "qjL": that.data.submitObj.optometry_sph_left, "zjL": that.data.submitObj.optometry_cyl_left};
        app.globalData.optometrys[app.globalData.chosecutid] = ops;
        goto();
      } else {
        wx.showToast({
          title: '保存失败！',
          image: '../images/warn.png',
          duration: 1000
        })
      }
    }
  })
}
function checkCustomer(o,p){
  var flag = true;
    for(var i in o){
      if(o[i]!=p[i]){
        flag = false;
        return false;
      }
    }
    return flag;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isZhedie:true,
    img:"../images/xia.png",
    qiehuanId:2,
    showToast: false,//是否显示选择球柱镜
    RL: ['R', 'L'],//球柱镜选择的左右眼图标圈
    transition: .2,//过渡时间
    nowCurrent: 0,//当前球柱镜选择的是左眼还是右眼
    nowCurrent1: 0,//当前的界面
    hebing: true,//是否合并
    kaiguan: [false, false, false],//下加光，近用瞳距，瞳高是否关闭
    checkdingpei: true,//订配单左右眼状态
    chooseBiaoqian: true,//选择标签模态框状态
    chooseYanguangshi: true,//选择验光师模态框状态
    jiaozheng: true,//矫正视力是否为标准模式
    axPosition:{},
    biaoqian: [
      { text: '加膜', check: false },
      { text: '倒边', check: false },
      { text: '染色', check: false },
      { text: '明天取货', check: false }
    ],
    yanguangshi: [
      // { user_realname: '梅梅', user_id: '0' },
      // { user_realname: '微微', user_id: '1' },
      // { user_realname: '成成', user_id: '2' },
      // { user_realname: '彬彬', user_id: '3' },
      // { user_realname: '盼盼', user_id: '4' },
    ],
    initArr: {
      qjArr: qjArr,//球镜范围数组,
      zjArr: zjArr,//柱镜范围数组,
      pdArr: pdArr,//瞳距范围数组,
      addArr: addArr,//下加光范围数组
      jingyongArr: jingyongArr,//近用瞳距范围数组
      vdArr: vdArr,//瞳高范围数组,
      cvaArr: cvaBiaozhunArr//矫正视力范围数组
    },
    moren: {
      qjValue: [[144], [144]],//球镜默认
      zjValue: [[0], [0]],//柱镜默认
      pdValue: [[30], [30]],//瞳距默认
      addValue: [[0], [0]],//下加光默认
      jingyongValue: [[0], [0]],//近用瞳距默认
      vdValue: [[20], [20]],//瞳高默认值
      axValue: [[0], [0]],//轴位默认，
      cvaValue: [[10], [10]]//矫正视力默认值
    },
    submitObj: {
      optometry_id:'',//验光单ID
      optometry_sph_left: '',//左眼球镜
      optometry_cyl_left: '',// 左眼柱镜
      optometry_OA_left: '',//左眼轴位
      optometry_ADD: '',//左眼下加光ADD
      optometry_PD_left: '',//左眼瞳距
      optometry_PDjin: '',//近用瞳距左眼
      optometry_PH_left: '',// 左眼瞳高
      optometry_sph_right: '',//右眼球镜
      optometry_cyl_right: '',//右眼柱镜
      optometry_OA_right: '',// 右眼轴位
      optometry_R: '',//右眼下加光ADD
      optometry_PD_right: '',// 右眼瞳距
      optometry_o1: '',// 右眼近用瞳距
      optometry_PH_right: '',// 右眼瞳高
      optometry_jiuR: '',// 右旧镜视力
      optometry_NV_right: '',// 右眼裸眼视力
      optometry_sanR2: '',// 右眼散瞳视力
      optometry_prism_right: '',//  右眼棱镜prism
      optometry_fundus_right: '',// 右眼眼底
      optometry_jiu: '',// 左旧镜视力
      optometry_NV_left: '',// 左眼裸眼视力
      optometry_san2: '',// 左眼散瞳视力
      optometry_prism_left: '',//  左眼棱镜prism
      optometry_fundus_left: '',//  左眼眼底
      optometry_other2: '',// 其他
      customer_tel: '',// 顾客电话
      customer_name: '',//  顾客姓名
      customer_sex: 0,//顾客性别
      customer_id:'',
      vip_id:'',
      vip_type:"",
      optometry_use: 0,//订配用途
      optometry_optistId: '',//验光师ID
      optometry_optistName: '',//验光师姓名
      optometry_CVA_right2: '',//右眼矫正视力
      optometry_CVA_left2: ''//左眼矫正视力

    }
  },
  //页面显示合并分离事件
  checkHebingShow: function () {
    var initArr = this.data.initArr;
    initArr.pdArr = (this.data.hebing ? pdArr.map(function (item, index) { return item / 2 }) : pdArr);
    this.setData({
      hebing: !this.data.hebing,
      initArr: initArr
    })
  },  //选择标签点击事件
  chooseBiaoqian: function () {
    this.setData({
      chooseBiaoqian: false
    })
  },
  //标签文字选择事件
  checkBiaoqian: function (e) {
    console.log(e.currentTarget.dataset.num);
    var num = e.currentTarget.dataset.num;
    var biaoqian = this.data.biaoqian;
    biaoqian[num].check = !biaoqian[num].check;
    this.setData({
      biaoqian: biaoqian,
    })
  },
  //选择标签确定按钮
  confirm1: function () {
    var str = this.data.biaoqian.filter(function (item, index) { return item.check }).map(function (item, index) { return item.text }).join('/');
    console.log(str);
    var submitObj = this.data.submitObj;
    submitObj.optometry_other2 = str;
    this.setData({
      submitObj: submitObj,
      chooseBiaoqian: true
    })
  },
  cancel1: function () {
    this.setData({
      chooseBiaoqian: true
    })
  },
  //验光师弹框打开点击事件
  chooseYANGUANG: function () {
    this.setData({
      chooseYanguangshi: false
    })
  },
  //验光师选择事件
  yanguangshi: function (e) {
    var yanPeople = this.data.yanguangshi;
    yanguangshi = { optometry_optistName: yanPeople[e.detail.value[0]].user_realname, optometry_optistId: yanPeople[e.detail.value[0]].user_id }
    console.log(yanguangshi);
  },
  //验光师选择取消按钮
  cancel2: function () {
    this.setData({
      chooseYanguangshi: true
    })
  },
  //验光师选择确定按钮
  confirm2: function () {
    var submitObj = this.data.submitObj;
    if (!yanguangshi) {
      var yanguangshiArr = this.data.yanguangshi;
      submitObj.optometry_optistId = yanguangshiArr[0].user_id;
      submitObj.optometry_optistName = yanguangshiArr[0].user_realname;

    } else {
      for (var k in yanguangshi) {
        submitObj[k] = yanguangshi[k]
      }
    }

    this.setData({
      submitObj: submitObj,
      chooseYanguangshi: true
    })
    console.log(this.data.submitObj.optometry_optistName);
  },
  //订配单显示右眼还是左眼的信息
  checkDingpei: function (e) {
    var type = e.currentTarget.dataset.check
    this.setData({
      nowCurrent: type
    })

  },
  //打开球柱镜选择页面
  openToast: function () {
    this.setData({
      showToast: true
    })
  },
  //获取当前显示的是左眼还是右眼
  getIndex: function (e) {
    this.setData({
      nowCurrent: e.detail.current
    });
  },
  //找到当前页面为设置轴位
  getIndex1: function (e) {
    var that = this;
    this.setData({
      nowCurrent1: e.detail.current
    });
    if(e.detail.current == 1){
      var query = wx.createSelectorQuery();
      query.select('#mjltest').boundingClientRect();
      query.exec(function (res) {
        //res就是 所有标签为mjltest的元素的信息 的数组
        // console.log(res);
        var centerPosition = { 'x': res[0].left + res[0].width / 2, 'y': res[0].top + res[0].height };
        that.setData({
          axPosition: centerPosition
        })
      });
    }
  },
  //input输入内容数据绑定
  changeInput: function (e) {
    var submitObj = this.data.submitObj;
    submitObj[e.currentTarget.dataset.name] = e.detail.value;
    this.setData({
      submitObj: submitObj
    })
  },
  //input 失去焦点事件
  blurInput:function(e){
    console.log(e.detail.value);
    if (e.detail.value.length!=11){
      wx.showToast({
        title: '填写会员信息',
        image: '../images/warn.png',
        duration: 1000
      })
    }else{
      var zd_id = app.globalData.zd_id ? app.globalData.zd_id : app.globalData.store_id;
      let sql = "SELECT a.customer_id, a.vip_tel AS customer_tel, a.vip_type, b.customer_name, a.vip_id from tb_vip a LEFT JOIN tb_customer b on a.customer_id = b.customer_id where a.vip_tel = '" + e.detail.value + "' and store_id = " + zd_id;
      var ids = {"code":"A10","accesstoken":sql};
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
            var list = res.data.data[0];
          }else{
            
          }
        }
      })

    }
  },
  //多选按钮点击事件
  checkBox: function (e) {
    var submitObj = this.data.submitObj;
    submitObj[e.currentTarget.dataset.name] = e.currentTarget.dataset.num;
    this.setData({
      submitObj: submitObj
    })
  },
  //瞳距是否合并
  checkHebing: function () {
    var initArr = this.data.initArr;
    initArr.pdArr = (this.data.hebing ? pdArr.map(function (item, index) { return item / 2 }) : pdArr);
    this.setData({
      hebing: !this.data.hebing,
      initArr: initArr
    })
  },
  //矫正视力标准和对数切换事件
  checkJiaozheng: function () {
    this.setData({
      jiaozheng: !this.data.jiaozheng
    })
    var arr;
    var initArr = this.data.initArr;
    var moren = this.data.moren;
    moren.cvaValue = [[10], [10]];
    if (this.data.jiaozheng) {
      arr = cvaBiaozhunArr;
      submitObj.optometry_CVA_left2 = '5.00';
      submitObj.optometry_CVA_right2 = '5.00';
    } else {
      arr = cvaDuishuArr
      submitObj.optometry_CVA_left2 = '1.00';
      submitObj.optometry_CVA_right2 = '1.00';
    }
    initArr.cvaArr = arr;
    this.setData({
      initArr: initArr,
      moren: moren
    })
  },
  //设置轴位
  setZhouwei: function (e) {
    var that = this;
    setRound(e.detail, that);
  },
  //轴位是指划动、
  targerMove: function (e) {
    console.log(new Date().getTime());
    this.setData({
      transition: 0
    })
    setRound({ x: e.touches[0].pageX, y: e.touches[0].pageY }, this);
  },
  //过渡效果处理
  targetLeave: function () {
    this.setData({
      transition: .2
    })
  },
  //pickerView 事件
  bindChange: function (e) {
    var argsArr = e.target.dataset.name.split(',');
    var initArr = this.data.initArr;
    var moren = this.data.moren;
    if (e.target.dataset.name == 'optometry_PD_right,optometry_PD_left' && this.data.hebing) {
      moren[e.target.dataset.value][0] = [e.detail.value[0]];
      moren[e.target.dataset.value][1] = [e.detail.value[0]];
      submitObj[argsArr[0]] = initArr[e.target.dataset.arr][e.detail.value[0]] / 2;
      submitObj[argsArr[1]] = initArr[e.target.dataset.arr][e.detail.value[0]] / 2;
    } else {
      moren[e.target.dataset.value][this.data.nowCurrent] = [e.detail.value[0]];
      submitObj[argsArr[this.data.nowCurrent]] = initArr[e.target.dataset.arr][e.detail.value[0]];
    }
    this.setData({
      moren: moren
    })
    console.log(12321);
  },
  //是否关闭打开ADD 近用瞳距 瞳高
  checkOpen: function (e) {
    var kaiguan = this.data.kaiguan;
    kaiguan[e.currentTarget.dataset.num] = !kaiguan[e.currentTarget.dataset.num];
    var moren = this.data.moren;
    //当关闭按钮时，将对应的提交数据更改为暂无 并将默认值恢复
    if (!kaiguan[e.currentTarget.dataset.num]) {
      console.log(340)
      switch (e.currentTarget.dataset.num / 1) {
        case 0:
          submitObj.optometry_ADD = "无";
          submitObj.optometry_R = "无";
          break;
        case 1:
          submitObj.optometry_PDjin = "无";
          submitObj.optometry_o1 = "无";
          break;
        case 2:
          submitObj.optometry_PH_left = "无";

          submitObj.optometry_PH_right = "无";
          break;
      }
      console.log(submitObj.optometry_PH_right)
    } else {
      switch (e.currentTarget.dataset.num / 1) {
        case 0:
          submitObj.optometry_ADD = "+0.00";
          submitObj.optometry_R = "+0.00";
          moren.addValue = [[0], [0]];
          break;
        case 1:
          submitObj.optometry_PDjin = "15";
          submitObj.optometry_o1 = "15";
          moren.jingyongValue = [[0], [0]];
          break;
        case 2:
          submitObj.optometry_PH_left = "31";
          submitObj.optometry_PH_right = "31";
          moren.vdValue = [[20], [20]];
          break;
      }
    }
    console.log(submitObj.optometry_PH_right)
    this.setData({
      moren: moren,
      kaiguan: kaiguan
    })
    console.log(JSON.stringify(submitObj))
    console.log(submitObj.optometry_PH_right)
  },
  //阻止加减按钮划动默认事件
  demo1: function () { },
  //加减按钮事件
  jiajian: function (e) {
    var nowCurrent = this.data.nowCurrent;
    var moren = this.data.moren;
    var round = moren.axValue[nowCurrent][0];
    round -= e.currentTarget.dataset.add;
    if (round < 0) {
      round = 0;
    } else if (round > 180) {
      round = 180;
    }
    if (nowCurrent == 0) {
      submitObj.optometry_OA_right = round;
    } else if (nowCurrent == 1) {
      submitObj.optometry_OA_left = round;
    }
    moren.axValue[nowCurrent] = [round];
    this.setData({
      moren: moren,
    })
  },
  //球柱镜选择取消按钮
  cancelSet: function () {
    for (var k in submitObj){
      submitObj[k] = this.data.submitObj[k];
    }
    setValue(submitObj, this)
    this.setData({
      moren: setValue(submitObj, this),
      showToast: false
    })
  },
  //球柱镜选择确定按钮
  resSet: function () {
    var thisSubmitObj = this.data.submitObj;
    for (var k in submitObj) {
      thisSubmitObj[k] = submitObj[k];
    }
    this.setData({
      submitObj: thisSubmitObj,
      showToast: false
    })
  },
  //保存的点击事件
  save: function () {
    var that = this;
    this.data.submitObj.store_id = app.globalData.store_id
    this.data.submitObj.optometry_time = new Date().Format('yyyy-MM-dd HH:mm:ss')
    this.data.submitObj.optometry_NO = new Date().Format('yyyyMMddHHmm') + (Math.floor(Math.random() * 8999) + 1000);
    console.log(this.data.submitObj)
    var userObj = {
      'customer_QQ': this.data.submitObj.customer_QQ,
      'customer_address': this.data.submitObj.customer_address,
      'customer_age': this.data.submitObj.customer_age,
      'customer_birthday': this.data.submitObj.customer_birthday,
      'customer_email': this.data.submitObj.customer_email,
      'customer_id': this.data.submitObj.customer_id,
      'customer_idCard': this.data.submitObj.customer_idCard,
      'customer_name': this.data.submitObj.customer_name,
      'customer_openid': this.data.submitObj.customer_openid,
      'customer_phone': this.data.submitObj.customer_phone,
      'customer_registTime': this.data.submitObj.customer_registTime,
      'customer_remark': this.data.submitObj.customer_remark,
      'customer_sex': this.data.submitObj.customer_sex,
      'customer_status': this.data.submitObj.customer_status,
      'customer_tel': this.data.submitObj.customer_tel,
      'customer_wechat': this.data.submitObj.customer_wechat
    }
    // var id = { 'opt': that.data.submitObj, 'customer': userObj}
    
    //console.log(id)
    wx.showLoading({
      title: '保存中',
    })
    
    if (this.data.submitObj.customer_name == "" && this.data.submitObj.customer_tel == ""){
      wx.showToast({
        title: '填写会员信息',
        image: '../images/warn.png',
        duration: 1000
      })
      return false;
    }else{

      if (that.data.submitObj.customer_id!=""){
        if (checkCustomer(customer, that.data.submitObj)){
          var id = {
            'opt': that.data.submitObj
          };
          saveotp(that, id);
        }else{
          var ups = [{ "OType": "u", "OObjs": [] }];
          var cusu = {};
          cusu['customer_tel'] = that.data.submitObj.customer_tel;
          cusu['customer_name'] = that.data.submitObj.customer_name;
          cusu['customer_sex'] = that.data.submitObj.customer_sex ? that.data.submitObj.customer_sex : 0;
          var obj1 = {};
          obj1['tbOrView_name'] = "Customer";
          obj1['whereConditions'] = "where customer_id=" + that.data.submitObj.customer_id;
          obj1['entities'] = [];
          obj1['entities'].push(cusu);
          var obj2 = {};
          obj2['tbOrView_name'] = "Vip";
          obj2['whereConditions'] = "where vip_id=" + that.data.submitObj.vip_id;
          obj2['entities'] = [];
          var vipu = {};

          vipu['vip_tel'] = that.data.submitObj.customer_tel ? that.data.submitObj.customer_tel : "null";
          obj2['entities'].push(vipu);
          ups[0]['OObjs'].push(obj1);
          ups[0]['OObjs'].push(obj2);
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
                var id = {
                  'opt': that.data.submitObj
                };
                saveotp(that, id);
              } else {
                wx.showToast({
                  title: '保存失败！',
                  image: '../images/warn.png',
                  duration: 1000
                })
              }
            }
          })
        }
        
      }else{
        var new_vip = {};
        new_vip['store_id'] = app.globalData.store_id;
        var jsonObj = {};
        jsonObj['customer_tel'] = that.data.submitObj.customer_tel;
        jsonObj['customer_name'] = that.data.submitObj.customer_name;
        jsonObj['vip_type'] = that.data.submitObj.vip_type ? that.data.submitObj.vip_type : 0;
        new_vip['jsonobj'] = jsonObj;
        wx.request({
          url: 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi',
          data: {
            par1: 'android',
            par2: 'saveStoreVip',
            ids: new_vip,
          }, header: {
            'content-type': 'application/json' // 默认值
          },
          method: "GET",
          success: function (res) {
            if (res.data.code == 200 || res.data.code == 201) {
              var list = res.data.data[0].detail;
              var thisSubmitObj = that.data.submitObj;
              for (var k in thisSubmitObj) {
                thisSubmitObj[k] = list[k];
              }
              thisSubmitObj.store_id=app.globalData.store_id;
              app.globalData.newvip = res.data.data[0].customer_id;
              app.globalData.chosecutid = res.data.data[0].customer_id;
              res.data.data[0].detail.customer_tel = res.data.data[0].detail.vip_tel;
              app.globalData.cutdetil = res.data.data[0].detail;
              var id = {
                'opt': thisSubmitObj
                };
              saveotp(that, id);
            }else{
              wx.showToast({
                title: '保存失败！',
                image: '../images/warn.png',
                duration: 1000
              })
            } 
          }
        });
      }
      
    }
    //saveotp(that, id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.chosecutid)
    var id = {'user_id':  app.globalData.chosecutid ,'store_id':app.globalData.store_id}
    console.log(id)
    var sql = { "code": "A10", "accesstoken": "SELECT IF(user_realname is null,'未实名',user_realname) as user_realname,tb_user.user_id FROM tb_user left JOIN tb_user_store ON tb_user.user_id = tb_user_store.user_id where tb_user_store.user_store_status=0 and store_id = " + app.globalData.store_id};
    wx.showLoading({
      title: '加载中',
    })
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
        console.log(res)
        if(res.data.code==200){
          var ygs = res.data.data;
          that.setData({
            yanguangshi:ygs
          })
          that.data.submitObj.optometry_optistName = ygs[0].user_realname;
          that.data.submitObj.optometry_optistId = ygs[0].user_id;
        }
      }
    })
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
        // console.log(that)
        if (res.data.code == 200) {
          var optdetil = res.data.data[0];
          var thisSubmitObj = that.data.submitObj;
          for (var k in thisSubmitObj) {
            if (optdetil.gkdetil[0][k]){
              thisSubmitObj[k] = optdetil.gkdetil[0][k];
            }
          }
          customer
          for (var k in customer){
            customer[k] = optdetil.gkdetil[0][k];
          }
          that.setData({
            submitObj: thisSubmitObj,
            showToast: false
          })
          if (optdetil.list.length==0){
            app.globalData.optid = ''//没有验光单清空数据
            wx.showToast({
              title: '请填写验光单',
              duration: 1000
            })
          }else{
            // submitObj = {
            //   optometry_sph_left: optdetil.list.optometry_sph_left,//左眼球镜
            //   optometry_cyl_left: optdetil.list.optometry_cyl_left,// 左眼柱镜
            //   optometry_OA_left: optdetil.list.optometry_OA_left,//左眼轴位
            //   optometry_ADD: optdetil.list.optometry_ADD,//左眼下加光ADD
            //   optometry_PD_left: optdetil.list.optometry_PD_left,//左眼瞳距
            //   optometry_PDjin: optdetil.list.optometry_PDjin,//近用瞳距左眼
            //   optometry_PH_left: optdetil.list.optometry_PH_left,// 左眼瞳高
            //   optometry_sph_right: optdetil.list.optometry_sph_right,//右眼球镜
            //   optometry_cyl_right: optdetil.list.optometry_cyl_right,//右眼柱镜
            //   optometry_OA_right: optdetil.list.optometry_OA_right,// 右眼轴位
            //   optometry_R: optdetil.list.optometry_R,//右眼下加光ADD
            //   optometry_PD_right: optdetil.list.optometry_PD_right,// 右眼瞳距
            //   optometry_o1: optdetil.list.optometry_o1,// 右眼近用瞳距
            //   optometry_PH_right: optdetil.list.optometry_PH_right,// 右眼瞳高
            //   optometry_CVA_right2: optdetil.list.optometry_CVA_right2,//右眼矫正视力
            //   optometry_CVA_left2: optdetil.list.optometry_CVA_left2//左眼矫正视力
            // }
            for (var k in submitObj){
              if (optdetil.list[0][k] != "" && optdetil.list[0][k]){
                submitObj[k] = optdetil.list[0][k];
              }
            }
            console.log(optdetil.list)
            app.globalData.optid = optdetil.list[0].optometry_id;//有验光单保存验光单ID 用作修改单据
            for (var k in optdetil.list[0]) {
              // console.log(optdetil.list[0][k])
              // console.log(k);
              thisSubmitObj[k] = optdetil.list[0][k];
            }
            // console.log(thisSubmitObj)
            // console.log(submitObj)
            // console.log(that)
          }
          // if (optdetil.gkdetil[0] != null && optdetil.gkdetil[0] != undefined && optdetil.gkdetil[0] != '') {
          //   for (var k in thisSubmitObj) {
          //     thisSubmitObj[k] = optdetil.gkdetil[0][k];
          //   }
          // }
            that.setData({
              submitObj: thisSubmitObj,
              showToast: false
            })
           
          wx.showToast({
            title: '加载成功！',
            duration: 500
          })
          setValue(submitObj,that);
          that.setData({
            moren: setValue(submitObj, that)
          });
          // console.log(that.moren)
        } else if (res.data.code == 201) {
          var optdetil = res.data.data[0];
          var thisSubmitObj = that.data.submitObj;
          if (optdetil.gkdetil[0] != null && optdetil.gkdetil[0] != undefined && optdetil.gkdetil[0]!=''){
            for (var k in thisSubmitObj) {
              if (optdetil.gkdetil[0][k] && optdetil.gkdetil[0][k]!=""){
                thisSubmitObj[k] = optdetil.gkdetil[0][k];  
              }
            }
            for (var k in customer) {
              customer[k] = optdetil.gkdetil[0][k];
            }
            that.setData({
              submitObj: thisSubmitObj,
              showToast: false
            })
          }
          that.data.submitObj.optometry_optistId = app.globalData.user_id;
          that.data.submitObj.optometry_optistName = app.globalData.userdetil.user_realname ? app.globalData.userdetil.user_realname:"未实名";
          that.setData({
            submitObj: that.data.submitObj
          })
          wx.showToast({
            title: '请填写信息',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '服务器出错啦！',
            image: '../images/warn.png',
            duration: 1000
          })
        }
      }
    })
  },
//tab栏切换
  qiehuan:function(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      qiehuanId: e.currentTarget.dataset.id
    })
  },

  //折叠
  changeImg:function(){
    if(this.data.isZhedie){
      this.setData({
        img: "../images/shang.png",
        isZhedie: !this.data.isZhedie
      })
    }else{
      this.setData({
        img: "../images/xia.png",
        isZhedie: !this.data.isZhedie
      })
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