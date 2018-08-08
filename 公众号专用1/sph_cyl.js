// import {qjArr} from './js/util'
// console.log(qjArr)
// var util = require('js/util.js');
//   console.log(util)

var qjArr1=[];
var qjArr2=[];
var zjArr=[];
for(var i=0;i<36;i+=0.25){
  qjArr1.push("+"+i.toFixed(2))
}


for(var j=0;j>-36;j-=0.25){
  if(j==0){
    qjArr2.push("+"+j.toFixed(2))
  }else{
    qjArr2.push(j.toFixed(2))
  }  
}


for(var k=0;k>-8;k-=0.25){
  if(k==0){
    zjArr.push("+"+k.toFixed(2))
  }else{
    zjArr.push(k.toFixed(2))
  }  
}
console.log(zjArr)

