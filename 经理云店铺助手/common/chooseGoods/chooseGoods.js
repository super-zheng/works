
var types = ['镜片', '镜架', '太阳眼镜', '成品眼镜', '隐形眼镜', '护理液', '配件'];
var uncode = ["", "colorNumber", "colorNumber", "", "", "caresolution_rule", "accessory_size", "", ""];// 色号，批次号，规格大小
var lists = [];
var tiaojian = [
  [{ 'name': '品牌', 'key': 'lens_brand' }, { 'name': '品类', 'key': 'lens_model' }, { 'name': '材质', 'key': 'lens_material' }, { 'name': '折射率', 'key': 'lens_refractivity' }],
  [{ 'name': '品牌', 'key': 'gframe_brand' }, { 'name': '品类', 'key': 'gframe_model' }, { 'name': '型号', 'key': 'gframe_material' }, { 'name': '材质', 'key': 'gframe_style' }, { 'name': '色号', 'key': 'colorNumber' }],
  [{ 'name': '品牌', 'key': 'sun_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '型号', 'key': 'sun_style' }, { 'name': '材质', 'key': 'sun_material' }, { 'name': '色号', 'key': 'colorNumber' }],
  [{ 'name': '品牌', 'key': 'presbyopic_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '材质', 'key': 'presbyopic_lensMaterial' }, { 'name': '功能', 'key': 'presbyopic_function' }],
  [{ 'name': '品牌', 'key': 'contact_brand' }, { 'name': '品类', 'key': 'o1' }, { 'name': '型号', 'key': 'contact_model' }, { 'name': '材质', 'key': 'contact_material' }],
  [{ 'name': '品牌', 'key': 'caresolution_brand' }, { 'name': '系列', 'key': 'o1' }, { 'name': '容量', 'key': 'caresolution_rule' }],
  [{ 'name': '品牌', 'key': 'accessory_brand' }, { 'name': '型号', 'key': 'accessory_model' }, { 'name': '材质', 'key': 'accessory_material' }, { 'name': '功能', 'key': 'accessory_function' }]

]
var app = getApp()
var brand = ["lens_brand", "gframe_brand", "sun_brand", "presbyopic_brand", "contact_brand", "caresolution_brand", "accessory_brand", "lens_brand"]
Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden  
    modalMsg: {
      type: String,
      value: ' ',
    },
    modalArr: {// 商品详细参数的数组 要和
      type: Array,
      value: []
    }
  },
  data: {
    inputValue: '',//搜索条件
    checkId: '',//页面商品筛选的ID
    openChoose: true,
    types: types,
    typeBtnCheck: 0,//商品类型
    indexpage: 0,//下滑更新第几页
    chooseType: tiaojian,//通过类型 动态渲染赛选条件
    bigType: 'lens_brand',
    // detail: ['1231', '1232', '1233', '1234', '1235', '1236', '1237', '123123', 'a', 'b', 'm'],
    detailIndex: {},
  },
  methods: {
    //商品类型选择点击事件注册
    typeBtnCheck: function (e) {
      var that = this;
      this.setData({
        typeBtnCheck: e.currentTarget.id,
        bigType: that.data.chooseType[e.currentTarget.id][0].key,
        detailIndex: {}
      })
      var setObj = this.data.detailIndex;
      setObj.type = this.data.typeBtnCheck;
      setObj.select = brand[setObj.type];
      this.triggerEvent('getDetail', setObj);//发送条件更新详细信息数组
    },
    //大类选择点击事件
    bigClassCheck: function (e) {
      var that = this;
      this.setData({
        bigType: e.currentTarget.id
      })
      var setObj = JSON.parse(JSON.stringify(this.data.detailIndex));
      console.log(setObj)
      delete setObj[e.currentTarget.id];
      console.log(this.data.detailIndex)
      setObj.type = this.data.typeBtnCheck;
      setObj.select = e.currentTarget.id;
      this.triggerEvent('getDetail', setObj);//发送条件更新详细信息数组
    },
    //信息点击事件
    checkDetail: function (e) {
      var that = this;
      var detailIndex = this.data.detailIndex;
      if (detailIndex[that.data.bigType] != e.currentTarget.id) {
        detailIndex[that.data.bigType] = e.currentTarget.id;
      } else {
        delete detailIndex[that.data.bigType];
        var setObj = JSON.parse(JSON.stringify(this.data.detailIndex));
        setObj.type = this.data.typeBtnCheck;
        setObj.select = that.data.bigType;
        console.log(setObj)
        this.triggerEvent('getDetail', setObj);//发送条件更新详细信息数组
      }
      this.setData({
        detailIndex: detailIndex
      })
      
    },
    yes: function () {
      //这里发请求 筛选条件是 商品类型是this.data.typeBtnCheck  筛选条件是this.data.detailIndex
      //请求拿到的数据渲染到  lists
      var detilindexlist = this.data.detailIndex;
      //确定后筛选初始化
      this.setData({
        modalHidden: false,
      })
      var setObj = JSON.parse(JSON.stringify(this.data.detailIndex));
      setObj.type = this.data.typeBtnCheck;
      this.triggerEvent('myevent', setObj) //myevent自定义名称事件，父组件中使用;发送筛选条件，将列表渲染
    },
    closeSider: function () {
      this.setData({
        modalHidden: false,
      })
    }

  }
})