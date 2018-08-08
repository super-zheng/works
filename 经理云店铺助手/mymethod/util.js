var qjArr = [];
var qjArr1 = [];
var qjArr2 = [];
var zjArr = [];
var demoNumQj = -36;
var demoNumZj = 0;
var demoNumQjs=0;

while (demoNumQjs <= 36) {
  qjArr1.push('+' +demoNumQjs.toFixed(2));
  demoNumQjs += 0.25;
}
demoNumQjs=0;
while (demoNumQjs >= -36) {
  if(demoNumQjs==0){
    qjArr2.push('+' + demoNumQjs.toFixed(2));
  }else{
    qjArr2.push(demoNumQjs.toFixed(2));
  }
  
  demoNumQjs -= 0.25;
}
// while (demoNumQj <= 36) {
//   if (demoNumQj.toFixed(2) < 0) {
//     qjArr.push(demoNumQj.toFixed(2));
//   } else {
//     qjArr.push('+' + demoNumQj.toFixed(2));
//   }

//   demoNumQj += 0.25;
// }
// while (demoNumQj <= 36) {
//   if (demoNumQj.toFixed(2) < 0) {
//     qjArr.push(demoNumQj.toFixed(2));
//   } else {
//     qjArr.push('+' + demoNumQj.toFixed(2));
//   }

//   demoNumQj += 0.25;
// }
//console.log(qjArr)
while (demoNumZj >= -8) {
  if (demoNumZj.toFixed(2) < 0) {
    zjArr.push(demoNumZj.toFixed(2));
  } else {
    zjArr.push('+' + demoNumZj.toFixed(2));
  }

  demoNumZj -= 0.25;
}
//商品信息1：品牌；2：品类；3型号/折射率；4材质；5色号/球柱镜/容量/尺寸
var goods_All = {
  brand: ["lens_brand", "gframe_brand", "sun_brand", "presbyopic_brand", "contact_brand", "caresolution_brand", "accessory_brand", "lens_brand"],//品牌
  model: ["lens_model", "gframe_model", "o1", "o1", "o1", "o1", "category",
    "lens_model"],//品类
  rec: ["lens_refractivity", "gframe_style", "sun_style", "presbyopic_style",
    "contact_model", "caresolution_model", "accessory_model", "lens_refractivity"],//型号
  mat: ["lens_material", "gframe_material", "sun_material", "presbyopic_frameMaterial", "contact_material", "caresolution_material", "accessory_material"],//材质
  col: ["", "colorNumber", "colorNumber", "", "",
    "caresolution_rule", "accessory_size", ""],//色号
}
module.exports = {
  qjArr: qjArr,
  zjArr: zjArr,
  qjArr1: qjArr1,
  qjArr2: qjArr2,
  goods_All: goods_All
}