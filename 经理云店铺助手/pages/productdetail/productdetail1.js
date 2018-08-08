// pages/goodsDetail/goodsDtail.js
var app = getApp();
// 镜片
var product_type1=['lens_brand', 'lens_model', 'trade', 'productName', 'lens_refractivity', 'lens_colorFilm', 'colour', 'lens_function', 'lens_rule', 'lens_diameter', 'lens_material', 'lens_abbeNO', 'transmittance', 'lens_centerthickness', 'lens_rank', 'degree_leftAndRight', 'lens_shelfLife', 'productionLicenseNumber', 'manufacturer', 'place', 'dealer', 'phone', 'classify', 'o1', 'lens_operativeNorm', 'address', 'first_upload']
var product_name1= ['品牌', '品类', '贸易名', '品名', '折射率', '加膜色', '色泽', '功能', '设计', '直径', '材质', '阿贝数/散系数', '透射比', '中心厚度', '等级', '左右眼', '保质期天数', '生产许可证编号', '制造商', '产地', '经销商', '经销商电话', '镜片分类', '系列', '执行标准', '地址', '店ID']
// 镜架
var product_type2 = ['model_code', 'gframe_brand', 'gframe_style', 'gframe_model', 'gframe_material', 'gframe_frameSize', 'gframe_noseSize', 'gframe_legSize', 'gframe_legHeight', 'gframe_frameWidth', 'gframe_frameInsideWidth', 'gframe_frameType', 'gframe_temporalDistance', 'gframe_outsideAngle', 'gframe_positiveRake', 'gframe_specularAngle', 'gframe_mirrorEyeDistance', 'gframe_MirrorLegTiltAngle', 'gframe_MirrorFootLongBend', 'gframe_frameCenter', 'gframe_frameSpacing', 'gframe_operativeNorm', 'gframe_shelfLife','first_upload']
var product_name2 = ['系列码', '品牌', '型号', '系列', '材质', '镜框尺寸', '鼻梁尺寸', '镜腿尺寸', '镜腿高度', '镜框外宽', '镜框内宽', '镜框类型', '颞距', '外张角', '前倾角', '镜面角', '镜眼距', '身腿倾斜角', '镜脚弯点长', '镜框几何中心点', '镜框几何中心距离', '执行标准', '保质期天数', '店ID']
// 太阳眼镜
var product_type3 = ['model_code', 'sun_brand', 'sun_style', 'sun_model', 'sun_material', 'sun_function', 'sun_frameSize', 'sun_noseSize', 'sun_legSize', 'sun_legHeight', 'sun_frameWidth', 'gframe_frameType', 'sun_frameInsideWidth', 'sun_frameType', 'sun_temporalDistance', 'sun_outsideAngle', 'sun_positiveRake', 'sun_specularAngle', 'sun_mirrorEyeDistance', 'sun_MirrorLegTiltAngle', 'sun_MirrorFootLongBend', 'sun_frameCenter', 'sun_frameSpacing', 'sun_operativeNorm', 'sun_shelfLife', 'first_upload']
var product_name3 = ['系列码', '品牌', '型号', '系列', '材质', '镜片功能', '镜框尺寸', '鼻梁尺寸', '镜腿尺寸', '镜腿高度', '镜框外宽', '镜框类型', '镜框内宽', '镜框类型', '颞距', '外张角', '前倾角', '镜面角', '镜眼距', '身腿倾斜角', '镜脚弯点长', '镜框几何中心点', '镜框几何中心距离', '执行标准', '保质期天数', '店ID']
// 成品眼镜
var product_type4 = ['model_code', 'presbyopic_brand', 'presbyopic_style', 'presbyopic_model', 'presbyopic_frameMaterial', 'presbyopic_lensMaterial', 'presbyopic_colorCode', 'presbyopic_function', 'presbyopic_frameSize', 'presbyopic_noseSize', 'presbyopic_legSize', 'presbyopic_legHeight', 'presbyopic_frameWidth', 'presbyopic_frameInsideWidth', 'presbyopic_frameType', 'presbyopic_temporalDistance', 'presbyopic_outsideAngle', 'presbyopic_positiveRake', 'presbyopic_specularAngle', 'presbyopic_mirrorEyeDistance', 'presbyopic_MirrorLegTiltAngle', 'presbyopic_MirrorFootLongBend', 'presbyopic_frameCenter', 'presbyopic_frameSpacing', 'presbyopic_refractivity', 'presbyopic_diameter', 'presbyopic_abbeNO', 'presbyopic_operativeNorm', 'presbyopic_shelfLife', 'first_upload']
var product_name4 = ['系列码', '品牌', '型号', '系列', '镜架材质', '镜片材质', '颜色编码', '功能镜片', '镜框尺寸', '鼻梁尺寸', '镜腿尺寸', '镜腿高度', '镜框外宽', '镜框内宽', '镜框类型', '颞距', '外张角', '前倾角', '镜面角', '镜眼距', '身腿倾斜角', '镜脚弯点长', '镜框几何中心点', '镜框几何中心距离', '折射率', '直径', '阿贝数', '执行标准', '保质期天数','店ID']
// 隐形眼镜
var product_type5 = ['系列码', '品牌', '型号', '系列', '材质', '含水量(百分比)', '直径', '功能镜片', '基弧', '中心厚度', '包装类型', '使用时间', '阿贝数', '执行标准', '保质期天数', '店ID']
var product_name5 = ['model_code', 'contact_brand', 'contact_model', 'presbyopic_model', 'contact_material', 'contact_watercontent', 'contact_diameter', 'contact_function', 'contact_basedarc', 'contact_centerThickness', 'contact_packingType', 'contact_usetime', 'contact_abbeNO', 'contact_operativeNorm', 'contact_shelfLife', 'first_upload']
// 护理液
var product_type6 = ['系列码', '品牌', '型号', '成分', '功能', '规格、剂型', '使用方法和使用范围', '医疗器械注册证号', '生产企业卫生许可证号', '执行标准', '保质期天数', '店ID']
var product_name6 = ['model_code', 'caresolution_brand', 'caresolution_model', 'caresolution_material', 'caresolution_function', 'caresolution_rule', 'caresolution_works', 'caresolution_deviceRegistNO', 'caresolution_healthPermitNO', 'caresolution_operativeNorm', 'caresolution_shelfLife', 'first_upload']
// 配件
var product_type6 = ['系列码', '品牌', '型号', '尺寸', '自定义名称', '备注', '功能', '执行标准', '保质期天数', '店ID', '规格']
var product_name6 = ['model_code', 'accessory_brand', 'accessory_model', 'accessory_size', 'accessory_userDefinedName', 'accessory_material', 'accessory_function', 'accessory_operativeNorm', 'accessory_shelfLife', 'first_upload', 'accessory_size']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_data:[],
    movies: [],
    product_data:{},
    product_t:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var degree_id = options.degree_id
    var stock_type = options.stock_type
    var that=this
    console.log(degree_id)
    console.log(stock_type)
    wx.request({
      url: 'https://www.jingliyun.cn/index.php/Home/SmallCommon/productdetail',
      data: {
        degree_id: degree_id,
        stock_type: stock_type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var img_arr=[]
        for(var i=0;i<res.data.img.length;i++){
          var img={}
          img.url = res.data.img[i]
          img_arr.push(img)
        }
        var obj={}
        var product_type=''
        switch (stock_type){
          case '1': for (var i = 0, len = product_type1.length; i < len; i++) {
                    obj[product_name1[i]] = res.data[product_type1[i]]
                  }
            product_type = '镜片'
                  break;
          case '2': for (var i = 0, gframe = product_type2.length; i < gframe; i++) {
            obj[product_name2[i]] = res.data[product_type2[i]]
          }
            product_type = '镜架'
            break;
          case '3': for (var i = 0, sun = product_type3.length; i < sun; i++) {
            obj[product_name3[i]] = res.data[product_type3[i]]
          }
            product_type = '太阳眼镜'
            break;
          case '4': for (var i = 0, pre = product_type4.length; i < pre; i++) {
            obj[product_name4[i]] = res.data[product_type4[i]]
          }
            product_type = '成品眼镜'
            break;
          case '5': for (var i = 0, con = product_type5.length; i < con; i++) {
            obj[product_name5[i]] = res.data[product_type5[i]]
          }
            product_type = '隐形眼镜'
            break;
          case '6': for (var i = 0, car = product_type6.length; i < car; i++) {
            obj[product_name6[i]] = res.data[product_type6[i]]
          }
            product_type = '护理液'
            break;
          case '7': for (var i = 0, acc = product_type7.length; i < acc; i++) {
            obj[product_name7[i]] = res.data[product_type7[i]]
          }
            product_type = '配件'
            break;
        }
        that.setData({
          product_data: obj,
          product_t:product_type,
          movies: img_arr
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