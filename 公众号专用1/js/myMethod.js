document.write("<script language=javascript src='js/xlsx.full.min.js'></script>");
//document.write('<script src="http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js"></script>');
var suferMethod =new Object();
(function (){
	//创建一个input 的匹配搜索框
	//第一个参数是装搜索框的jQuery对象
	//第二个参数是匹配搜索的源数组
	suferMethod.searchInput=function(searchDiv,arr,callback){
		searchDiv.html("");
		var flag = true;
		searchDiv.css({'width':'100%','position':'relative','height':'100%'});
		var searchInput = $('<input type= text style="width:100%;border:1px solid #ccc;height:36px;padding-left:5px;border:1px solid #c2c2c2;box-sizing:border-box;" placeholder="'+arr[0]+'">');
		
		searchDiv.append(searchInput);
		var dlList = $('<dl style="width:100%;max-height:200px;overflow:auto;border:1px solid #ccc;border-bottom:none; position:absolute;top:'+(searchDiv.height()/1+5)+'px;left:0px;display:none;margin:0px;padding:0px;cursor:pointer;z-index:99;background-color:white"></dl>');
		searchDiv.append(dlList);
		searchInput.keyup(function(){
			var searh = $(this).val();
			var newArr = arr.filter(function(item,index){
				return (item+"").indexOf(searh)!=-1;
			});
			dlList.show();
			dlList.empty();
			 tosearch(newArr)
			if(dlList.find('dt').length==0){
				dlList.hide();
				
			}
		});
		searchInput.focus(function(){
			dlList.empty();
			dlList.fadeIn();
			 tosearch(arr);
		});

		function tosearch(arr){
			arr.forEach(function(item,index){
				dlList.append($('<dt style="border-bottom:1px solid #ccc;line-height:36px;height:36px;padding-left:5px;color:#111;">'+item+'</dt>'));
				dlList.find('dt:first-child').css({'margin-top':'5px','border-top':'1px solid #ccc'});
			});
			dlList.find('dt:first-child').css({'background-color':'#5FB878','color':'white'});
			searchInput.blur(function(){
				searchInput.attr('placeholder',dlList.find('dt:first-child').text());
				dlList.fadeOut();
			});
			dlList.find('dt').hover(function(){
				$(this).css({'background-color':'#eee','color':'#111'});
				dlList.find('dt:first-child').css({'background-color':'#5FB878','color':'white'});
			},function(){
				$(this).css({'background-color':'white','color':'#111'});
				dlList.find('dt:first-child').css({'background-color':'#5FB878','color':'white'});
			});
			dlList.find('dt').click(function(){
				searchInput.val($(this).text());
				dlList.find('dt').css('background-color','white');
				$(this).css({'background-color':'#5FB878','color':'white'});
				$(this).parent().fadeOut();
				if(callback){
					callback($(this).text());
				}
			})
		}	
	}
	//日期格式转换成yyyy-MM-dd HH:mm:ss
	//第一个参数是要转换的时间
	//第二个餐食是转换的格式字符串
	suferMethod.timeFormat = function(time,fmt){
		Date.prototype.Format = function (fmt) { //author: meizz 
		    var o = {
		        "M+": this.getMonth() + 1, //月份 
		        "d+": this.getDate(), //日 
		        "H+": this.getHours(), //小时
		        "m+": this.getMinutes(), //分 
		        "s+": this.getSeconds(), //秒 
		        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		        "S": this.getMilliseconds() //毫秒 
		     };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		}
		return time.Format(fmt);
	}

	//图片压缩
	//参数第一个是未压缩的base64字符串
	//第二个参数是生成图片的宽度，因为压缩会进行
	suferMethod.cutImageBase64 = function(base64,initWid,max,callback){
		if(base64.length/1024>200){
			compress(initWid,base64);
		}else{
			callback(base64);
		}
		
		function compress (wid1,base){
    	   	var img = new Image();
    		img.src = base64;
    		img.onload = function() {
		        var that = this;
		        //生成比例
		        var w = that.width,
		            h = that.height,
		            scale = w / h;
		            w = initWid<w?initWid:w||w;
		            h = w / scale;

		        //生成canvas
		        var canvas = document.createElement('canvas');
		        var ctx = canvas.getContext('2d');
		        $(canvas).attr({
		            width: w,
		            height: h
		        });
		        ctx.drawImage(that, 0, 0, w, h);

		        // 生成base64            
		        base64 = canvas.toDataURL('image/jpeg', 0.9);
		        console.log(base64.length/1024);
		        if(base64.length/1024>max){
		        	
		        	initWid-=20;
		        	compress(initWid,base64);
		        }else{
		        	callback(base64);
		        }
	    	}
	    };

	}
	//点击图片显示大图

	suferMethod.clickBigImg=function(dom){
			dom.click(function(){
				//创建遮罩层和显示的大图
				var sufer_NewDom = $('<div><img src="'+dom.attr('src')+'"></div>');
				//将元素追加进去
				
				dom.parents('body').append(sufer_NewDom);
				dom.parents('body').css('position','relative');
				sufer_NewDom.css({'width':$(this).parents('body').width(),'height':$(this).parents('body').height(),'background-color':'rgba(0,0,0,.7)','position':'absolute','left':'0px','top':'0px'});
				var ml = $(this).parents('body').width()/2-(sufer_NewDom.find('img').width()/2)
				var mt = $(this).parents('body').height()/2-(sufer_NewDom.find('img').height()/2)
				

				sufer_NewDom.find('img').css({'display':'inline-block','margin':mt+'px '+ml+'px'});
				sufer_NewDom.find('img')[0].onmousedown=function(e){
					e.preventDefault();
				}
				$(document).bind('mousewheel', function(event, delta) { return false; });
				sufer_NewDom.click(function(){
					$(this).remove();
					$(document).unbind('mousewheel');
				});
				
			});
		}
	//点击显示多张图片的展示 参数第一个是一个数组，要展示的多张图片的路径
	//第二个参数是点击元素的jquery对象 第三个参数当前点击的索引
	suferMethod.clickBigImgList=function(arr,that,index){
		var mark1 = index;
		var sufer_NewDom = $('<div><div><img src="'+arr[mark1]+'" style="max-width:500px;max-height:400px;"><span class="leftBtn" ><i class="layui-icon">&#xe603;</i> </span><span class="rightBtn"><i class="layui-icon">&#xe602;</i></span><h4 style="display:inline-block;width:200px;text-align:center;font-size:30px;font-weight:900;color:white;"><b >'+(mark1+1)+'</b>/<s style="text-decoration:none;">'+arr.length+'<s></h4></div></div>');
		that.parents('body').append(sufer_NewDom);
		that.parents('body').css('position','relative');
		sufer_NewDom.css({'width':that.parents('body').width(),'height':that.parents('body').height(),'background-color':'rgba(0,0,0,.7)','position':'absolute','left':'0px','top':'0px'});
		
		// sufer_NewDom.find('img').parent().css({'position':'relative','display':'inline-block','margin-left':ml+'px','margin-top':(that.parents('html').scrollTop()/1+200)+'px'});
		init()
		function init(){
			sufer_NewDom.find('img')[0].onload =function(){
				var ml =that.parents('body').width()/2-(sufer_NewDom.find('img').width()/2);
				var mt =(that.parents('html').scrollTop()/1+300)-(sufer_NewDom.find('img').height()/2);
				sufer_NewDom.find('img').parent().css({'display':'inline-block','margin-left':ml+'px','margin-top':mt+'px'});
				sufer_NewDom.find('span').css({'position':'absolute','z-index':'99','width':'70px','height':'150px','background-color':'rgba(0,0,0,.5)','line-height':'150px','text-align':'center'});
				sufer_NewDom.find('span i').css({'font-size':'50px','font-weight':'900','color':'white','cursor':'pointer'});
				sufer_NewDom.find('.leftBtn').css({'left':'10px','top':mt+(sufer_NewDom.find('img').height()/2)+'px'});
				sufer_NewDom.find('.rightBtn').css({'right':'10px','top':mt+(sufer_NewDom.find('img').height()/2)+'px'});
				sufer_NewDom.find('h4').css({'position':'absolute','top':mt+sufer_NewDom.find('img').height()/1+20+'px','left':ml+sufer_NewDom.find('img').width()/2-sufer_NewDom.find('h4').width()/2+'px'});
			}
		}
		sufer_NewDom.find('img').click(function(e2){
			e2.stopPropagation();
		});
		sufer_NewDom.find('span').click(function(e1){
			e1.stopPropagation();
			if($(this).hasClass('leftBtn')){
				mark1--;
				if(mark1<0){
					mark1=arr.length-1;
				}
			}else if($(this).hasClass('rightBtn')){
				mark1++;
				if(mark1>arr.length-1){
					mark1=0;
				}
			}
			sufer_NewDom.find('img').attr('src',arr[mark1]);
			sufer_NewDom.find('img').load(function(){

				sufer_NewDom.find('h4 b').text(mark1+1);
				
				var ml =that.parents('body').width()/2-(sufer_NewDom.find('img').width()/2);
				var mt =(that.parents('html').scrollTop()/1+300)-(sufer_NewDom.find('img').height()/2);
				sufer_NewDom.find('img').parent().css({'margin-left':ml+'px','margin-top':mt+'px'});
				sufer_NewDom.find('h4').css({'position':'absolute','top':mt+sufer_NewDom.find('img').height()/1+20+'px','left':ml+sufer_NewDom.find('img').width()/2-sufer_NewDom.find('h4').width()/2+'px'});
			})
		});
		sufer_NewDom.find('img')[0].onmousedown=function(e){
			e.preventDefault();
		}
		$(document).bind('mousewheel', function(event, delta) { return false; });
		sufer_NewDom.click(function(){
			$(this).remove();
			$(document).unbind('mousewheel');
		});
		window.onresize = function(){
			sufer_NewDom.css({'width':that.parents('body').width(),'height':that.parents('body').height(),'background-color':'rgba(0,0,0,.7)','position':'absolute','left':'0px','top':'0px'});
			var ml =that.parents('body').width()/2-(sufer_NewDom.find('img').width()/2);
				var mt =(that.parents('html').scrollTop()/1+300)-(sufer_NewDom.find('img').height()/2);
				sufer_NewDom.find('img').parent().css({'margin-left':ml+'px','margin-top':mt+'px'});
				sufer_NewDom.find('h4').css({'position':'absolute','top':mt+sufer_NewDom.find('img').height()/1+20+'px','left':ml+sufer_NewDom.find('img').width()/2-sufer_NewDom.find('h4').width()/2+'px'});

		}	

	}
	//验证身份证号：
	suferMethod.IsIDCard=function(input){

		input = input.toUpperCase();
		//验证身份证号码格式 [一代身份证号码为15位的数字；二代身份证号码为18位的数字或17位的数字加字母X]  
		if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(input))) {
			return false;
		}
		//验证省份  
		var arrCity = {
			11: '北京',
			12: '天津',
			13: '河北',
			14: '山西',
			15: '内蒙古',
			21: '辽宁',
			22: '吉林',
			23: '黑龙江 ',
			31: '上海',
			32: '江苏',
			33: '浙江',
			34: '安徽',
			35: '福建',
			36: '江西',
			37: '山东',
			41: '河南',
			42: '湖北',
			43: '湖南',
			44: '广东',
			45: '广西',
			46: '海南',
			50: '重庆',
			51: '四川',
			52: '贵州',
			53: '云南',
			54: '西藏',
			61: '陕西',
			62: '甘肃',
			63: '青海',
			64: '宁夏',
			65: '新疆',
			71: '台湾',
			81: '香港',
			82: '澳门',
			91: '国外'
		};
		if(arrCity[parseInt(input.substr(0, 2))] == null) {
			return false;
		}
		//验证出生日期  
		var regBirth, birthSplit, birth;
		var len = input.length;
		if(len == 15) {
			regBirth = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
			birthSplit = input.match(regBirth);
			birth = new Date('19' + birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
			if(!(birth.getYear() == Number(birthSplit[2]) && (birth.getMonth() + 1) == Number(birthSplit[3]) && birth.getDate() == Number(birthSplit[4]))) {
				return false;
			}
			return true;
		} else if(len == 18) {
			regBirth = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i);
			birthSplit = input.match(regBirth);
			birth = new Date(birthSplit[2] + '/' + birthSplit[3] + '/' + birthSplit[4]);
			if(!(birth.getFullYear() == Number(birthSplit[2]) && (birth.getMonth() + 1) == Number(birthSplit[3]) && birth.getDate() == Number(birthSplit[4]))) {
				return false;
			}
			//验证校验码  
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			for(i = 0; i < 17; i++) {
				nTemp += input.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if(valnum != input.substr(17, 1)) {
				return false;
			}
			return true;
		}
		return false;
		
	}
	suferMethod.IsLongitude=function(input) {
		var regex = /^[-\+]?((1[0-7]\d{1}|0?\d{1,2})\.\d{1,5}|180\.0{1,5})$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证纬度  
	suferMethod.IsLatitude=function(input) {
		var regex = /^[-\+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证价格
	suferMethod.IsMyPrice=function(input){
		var regex = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		if(input.match(regex)){
			return true;
		}else{
			return false;
		}
	}
	//验证字符串非空  
	suferMethod.IsNotEmpty=function(input) {
		if(input != '') {
			return true;
		} else {
			return false;
		}
	}
	//验证单价 【没有负号】
	suferMethod.IsMyNumber=function(input) {
		var regex = /^(\d+)(\.\d+)?$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证数字(double类型) [可以包含负号和小数点]  
	suferMethod.IsNumber=function(input) {
		var regex = /^-?\d+$|^(-?\d+)(\.\d+)?$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证整数  
	suferMethod.IsInteger=function(input) {
		var regex = /^-?\d+$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证非负整数  
	suferMethod.IsIntegerNotNagtive=function(input) {
		var regex = /^\d+$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证正整数  
	suferMethod.IsIntegerPositive=function(input) {
		var regex = /^[0-9]*[1-9][0-9]*$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证小数  
	suferMethod.IsDecimal=function(input) {
		var regex = /^([-+]?[1-9]\d*\.\d+|-?0\.\d*[1-9]\d*)$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证只包含英文字母  
	suferMethod.IsEnglishCharacter=function(input) {
		var regex = /^[A-Za-z]+$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证只包含数字和英文字母  
	suferMethod.IsIntegerAndEnglishCharacter=function(input) {
		var regex = /^[0-9A-Za-z]+$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证只包含汉字  
	suferMethod.IsChineseCharacter=function(input) {
		var regex = /^[\u4e00-\u9fa5]+$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证数字长度范围（数字前端的0计长度）[若要验证固定长度，可传入相同的两个长度数值]  
	suferMethod.IsIntegerLength=function(input, lengthBegin, lengthEnd) {
		var pattern = '^\\d{' + lengthBegin + ',' + lengthEnd + '}$';
		var regex = new RegExp(pattern);
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证字符串包含内容  
	suferMethod.IsStringInclude=function(input, withEnglishCharacter, withNumber, withChineseCharacter) {
		if(!Boolean(withEnglishCharacter) && !Boolean(withNumber) && !Boolean(withChineseCharacter)) {
			return false; //如果英文字母、数字和汉字都没有，则返回false  
		}
		var pattern = '^[';
		if(Boolean(withEnglishCharacter)) {
			pattern += 'a-zA-Z';
		}
		if(Boolean(withNumber)) {
			pattern += '0-9';
		}
		if(Boolean(withChineseCharacter)) {
			pattern += '\\u4E00-\\u9FA5';
		}
		pattern += ']+$';
		var regex = new RegExp(pattern);
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证字符串长度范围 [若要验证固定长度，可传入相同的两个长度数值]  
	suferMethod.IsStringLength=function(input, LengthBegin, LengthEnd) {
		var pattern = '^.{' + lengthBegin + ',' + lengthEnd + '}$';
		var regex = new RegExp(pattern);
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证字符串长度范围（字符串内只包含数字和/或英文字母）[若要验证固定长度，可传入相同的两个长度数值]  
	suferMethod.IsStringLengthOnlyNumberAndEnglishCharacter=function(input, LengthBegin, LengthEnd) {
		var pattern = '^[0-9a-zA-z]{' + lengthBegin + ',' + lengthEnd + '}$';
		var regex = new RegExp(pattern);
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证字符串长度范围 [若要验证固定长度，可传入相同的两个长度数值]  
	suferMethod.IsStringLengthByInclude=function(input, withEnglishCharacter, withNumber, withChineseCharacter, lengthBegin, lengthEnd) {
		if(!withEnglishCharacter && !withNumber && !withChineseCharacter) {
			return false; //如果英文字母、数字和汉字都没有，则返回false  
		}
		var pattern = '^[';
		if(Boolean(withEnglishCharacter))
			pattern += 'a-zA-Z';
		if(Boolean(withNumber))
			pattern += '0-9';
		if(Boolean(withChineseCharacter))
			pattern += '\\u4E00-\\u9FA5';
		pattern += ']{' + lengthBegin + ',' + lengthEnd + '}$';
		var regex = new RegExp(pattern);
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证字符串字节数长度范围 [若要验证固定长度，可传入相同的两个长度数值；每个汉字为两个字节长度]  
	suferMethod.IsStringByteLength=function(input, lengthBegin, lengthEnd) {
		var regex = /[^\x00-\xff]/g;
		var byteLength = input.replace(regex, 'ok').length;
		if(byteLength >= lengthBegin && byteLength <= lengthEnd) {
			return true;
		} else {
			return false;
		}
	}
	//验证日期 [只能验证日期，不能验证时间]  
	suferMethod.IsDateTime=function(input) {
		var regex = /((19|20)[0-9]{2})-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
		if(regex.test(input)) {
			var ymd = input.match(/(\d{4})-(\d+)-(\d+).*/);
			var year = parseInt(ymd[1]);
			var month = parseInt(ymd[2]);
			var day = parseInt(ymd[3]);
			if(day > 28) {
				//获取当月的最后一天
				var lastDay = new Date(year, month, 0).getDate();
				return(lastDay >= day);
			}
			return true;
		} else {
			return false;
		}
	}
	//验证固定电话号码 [3位或4位区号；区号可以用小括号括起来；区号可以省略；区号与本地号间可以用减号或空格隔开；可以有3位数的分机号，分机号前要加减号]  
	suferMethod.IsTelePhoneNumber=function(input) {
		var regex = /^(((0\d2|0\d{2})[- ]?)?\d{8}|((0\d3|0\d{3})[- ]?)?\d{7})(-\d{3})?$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证手机号码 [可匹配"(+86)013325656352"，括号可以省略，+号可以省略，(+86)可以省略，11位手机号前的0可以省略；11位手机号第二位数可以是3、4、5、7、8中的任意一个]  
	suferMethod.IsMobilePhoneNumber=function(input) {
		var regex = /^((\+)?86|((\+)?86)?)0?1[345789]\d{9}$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证电话号码（可以是固定电话号码或手机号码）  
	suferMethod.IsPhoneNumber=function(input) {
		// var regex = /^((\+)?86|((\+)?86)?)0?1[34578]\d{9}$|^(((0\d2|0\d{2})[- ]?)?\d{8}|((0\d3|0\d{3})[- ]?)?\d{7})(-\d{3})?$/;
		// if(input.match(regex)) {
		// 	return true;
		// } else {
		// 	return false;
		// }
		var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;//只验证固定电话
		return reg.test(input)
	}
	//验证邮政编码  
	suferMethod.IsZipCode=function(input) {
		var regex = /^\d{6}$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证电子邮箱 [@字符前可以包含字母、数字、下划线和点号；@字符后可以包含字母、数字、下划线和点号；@字符后至少包含一个点号且点号不能是最后一个字符；最后一个点号后只能是字母或数字]  
	suferMethod.IsEmail=function(input) {
		var regex = /^([\w-\.]+)@([\w-\.]+)(\.[a-zA-Z0-9]+)$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证网址（可以匹配IPv4地址但没对IPv4地址进行格式验证；IPv6暂时没做匹配）[允许省略"://"；可以添加端口号；允许层级；允许传参；域名中至少一个点号且此点号前要有内容]  
	suferMethod.IsURL=function(input) {
		////每级域名由字母、数字和减号构成（第一个字母不能是减号），不区分大小写，单个域长度不超过63，完整的域名全长不超过256个字符。在DNS系统中，全名是以一个点“.”来结束的，例如“www.nit.edu.cn.”。没有最后的那个点则表示一个相对地址。   
		////没有例如"http://"的前缀，没有传参的匹配  
		//var regex = /^([0-9a-zA-Z][0-9a-zA-Z-]{0,62}\.)+([0-9a-zA-Z][0-9a-zA-Z-]{0,62})\.?$/;  

		// var regex = /^(((file|gopher|news|nntp|telnet|http|ftp|https|ftps|sftp)://)|(www\.))+(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(/[a-zA-Z0-9\&%_\./-~-]*)?$/;  
		// var regex = /^([a-zA-Z]+:\/\/)?([\w-\.]+)(\.[a-zA-Z0-9]+)(:\d{0,5})?\/?([\w-\/]*)\.?([a-zA-Z]*)\??(([\w-]*=[\w%]*&?)*)$/;
		var regex= "^((https|http|ftp|rtsp|mms)?://)"
				  + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
				  + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
				  + "|" // 允许IP和DOMAIN（域名）
				  + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
				  + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
				  + "[a-z]{2,6})" // first level domain- .com or .museum 
				  + "(:[0-9]{1,4})?" // 端口- :80 
				  + "((/?)|" // a slash isn't required if there is no file name 
				  + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";


		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证IPv4地址 [第一位和最后一位数字不能是0或255；允许用0补位]  
	suferMethod.IsIPv4=function(input) {
		var regex = /^(25[0-4]|2[0-4]\d]|[01]?\d{2}|[1-9])\.(25[0-5]|2[0-4]\d]|[01]?\d?\d)\.(25[0-5]|2[0-4]\d]|[01]?\d?\d)\.(25[0-4]|2[0-4]\d]|[01]?\d{2}|[1-9])$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证IPv6地址 [可用于匹配任何一个合法的IPv6地址]  
	suferMethod.IsIPv6=function(input) {
		var regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//验证银行卡号
	
	suferMethod.BrankCard=function(input) {
		var regex = /^(\d{16}|\d{19})$/;
		if(input.match(regex)) {
			return true;
		} else {
			return false;
		}
	}
	//打印单图章
	suferMethod.sealSmall=function(str,right,top){
		var strPhoto = '<div style="z-index:99; width: 102.5px;height: 75px ;background:url(./admin/images/btn1.png) no-repeat center/cover;position: absolute;right:'+(right||30)+'px;top:'+(top||30)+'px;"><div style="width: 98px;height: 27px;position: absolute;top: 25px;left:2px;transform: rotate(-29deg);text-align:center;line-height:24px;"  class="suferMethodText"></div></div>'
		$('body').append($(strPhoto));
		$('body').css({'position':'absolute','z-index':'0'});
		$('.suferMethodText').text(str).css('color','#1E9FFF');
	}


	//单据加载动画 
	//第一个参数是页面刷新时执行ajax请求的个数，第二个参数是一个全局变量，初始值为0，每个页面刷新执行的ajax完成时自加1；
	suferMethod.orderLoad=function(num1,num2){
		if(num1==num2){
			setTimeout(function(){
				
				$('.jly_loader').hide();
				$('.jly_loader').next().fadeIn();
			},500);
			
		}
	}

	//生成uuid 
	//第一个参数是生成uuid 的长度 ，第二个参数是生成uuid的进制数
	suferMethod.uuid=function (len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [], i;
		radix = radix || chars.length;
		  
		if (len) {
		   // Compact form
		   for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		} else {
		   // rfc4122, version 4 form
		   var r;
		  
		   // rfc4122 requires these characters
		   uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		   uuid[14] = '4';
		  
		   // Fill in random data. At i==19 set the high bits of clock sequence as
		   // per rfc4122, sec. 4.1.5
		   	for (i = 0; i < 36; i++) {
		   		if (!uuid[i]) {
			    	r = 0 | Math.random()*16;
			     	uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		    	}
			}
		}
		  
		return uuid.join('');
	}
	//带时间戳的UUID
	suferMethod.generateUUID = function () {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  var r = (d + Math.random()*16)%16 | 0;
		  d = Math.floor(d/16);
		  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
	
	
	suferMethod.progress=function (time){
		var pro=$("<div id='progress'></div>").css({'width':'100%','height':'100%','background-color':'rgba(0,0,0,.2)','position':'absolute','z-index':'9999','top':'0px'});
		var progress = $('<div class="sf_gress"><span class="sf_color"></span></div>')
		$('body').append(pro);
		$('#progress').append(progress);
		$(document).bind('mousewheel', function(event, delta) { return false; });
		$('.sf_gress').css({'position':'absolute','height':'80px','width':'60%','top':'200px','left':'20%','background-color':'#fff','border-radius':'10px',});
		$('.sf_color').css({'width':'0px','height':'100%','transition':'all '+time+'s','background-color':'#1E9FFF','display':'block','border-radius':'10px'});
		
		setTimeout(function(){
			$('.sf_color').css('width','100%');
		},10);
		setTimeout(function(){
			$('#progress').remove();
			$(document).unbind('mousewheel');
		},time*1000+10);
	}


	//截屏功能存储到本地
	//依赖html2Canvas.js
	//第一个参数是选择器 需要截取对应选择器下的dom 
	//第二个参数是存储的文件名 
	//第三个是想保存图片的后缀名
	suferMethod.screenshot=function (selecter,filename,pointName){
		html2canvas(document.querySelector(selecter)).then(function(canvas) {
		    var img = convertCanvasToImage(canvas);
		    img.onload = function() {
		      download(img.src, filename, pointName);
		    };
		  });
		function convertCanvasToImage(canvas) {
			var image = new Image();
			image.src = canvas.toDataURL("image/png");
			return image;
		}
		function download(content, filename, extension) {  
            var BOM = '\uFEFF';   
            $('body').append('<a id="SaveAsId"></a>');  
            var saveAsElement = $('body > a#SaveAsId');  
            saveAsElement.attr('href', content);  
            saveAsElement.attr('download', filename + '.' + extension);  
            saveAsElement.attr('target', '_blank');  
            saveAsElement[0].click();  
            saveAsElement.remove(); 
        }  

	}

	//json 数据导出Excel 
	//第一个参数是导出数据对象 
	//第二个参数是导出Excel的文件名
	//第三个参数是表头对象
	//参数格式如下
	 // var data = {

	 // 		// title数组代表Excel表头 相当于thead  数组每项是一个对象，对象对应的value属性对应的是tr里面的th
  //           "title":[   
  //                       {"value":"商品类型", "type":"ROW_HEADER_HEADER", "datatype":"string"}, 
  //                       {"value":"品牌", "type":"ROW_HEADER_HEADER", "datatype":"string"}, 
  //                       {"value":"销售时间", "type":"ROW_HEADER_HEADER", "datatype":"string"}, 
  //                       {"value":"价格", "type":"ROW_HEADER_HEADER", "datatype":"string"}, 
  //                       {"value":"销售员", "type":"ROW_HEADER_HEADER", "datatype":"string"}, 
  //                       {"value":"是否加工", "type":"ROW_HEADER_HEADER", "datatype":"string"}, 
  //                   ],
  //           "data": [

  //           // data数组对应的是表身 里面的每一个数组相当于是tbody 里面的tr value 对应的是该tr里面的td  
  //                       [
  //                           {"value":"镜片", "type":"ROW_HEADER"}, 
  //                           {"value":"依视路", "type":"ROW_HEADER"},
  //                           {"value":"2018-01-23", "type":"ROW_HEADER"},
  //                           {"value":"120", "type":"ROW_HEADER"},
  //                           {"value":"陈雷", "type":"ROW_HEADER"},
  //                           {"value":"是", "type":"ROW_HEADER"}
  //                       ],
  //                       [
  //                           {"value":"镜架", "type":"ROW_HEADER"}, 
  //                           {"value":"帕罗的", "type":"ROW_HEADER"},
  //                           {"value":"2018-02-23", "type":"ROW_HEADER"},
  //                           {"value":"1201", "type":"ROW_HEADER"},
  //                           {"value":"肖卫卫", "type":"ROW_HEADER"},
  //                           {"value":"否", "type":"ROW_HEADER"}
  //                       ]
  //                   ]
  //               };  
  //       if(data == '')  return; 数据为空时 不执行下面函数

  //       //调用方式 第一个参数是表身的二维数组，第二个参数是导出Excel的文件名，第三个参数是表头的对象数组             
  //       suferMethod.JSONToExcelConvertor(data.data, "Report", data.title); 


	suferMethod.JSONToExcelConvertor=function (JSONData, FileName, ShowLabel) {  
            //先转化json  
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;  
              
            var excel = '<table>';      
              
            //设置表头  
            var row = "<tr>";  
            for (var i = 0, l = ShowLabel.length; i < l; i++) {  
                row += "<td>" + ShowLabel[i].value + '</td>';  
            }  
              
              
            //换行  
            excel += row + "</tr>";  
              
            //设置数据  
            /*for (var i = 0; i < arrData.length; i++) {  
                var row = "<tr>";  
                  
                for (var index = 0; index < arrData[i].length; index++) {  
                    var value = arrData[i][index].value === "." ? "" : arrData[i][index].value;  
                    row += '<td  >' + value + '</td>';  
                }  
                  
                excel += row + "</tr>";  
            }*/
            for (var i = 0; i < arrData.length; i++) {  
                var row = "<tr>";  
                  
                for (var index in arrData[i]) {
                	if(Object.prototype.hasOwnProperty.call(arrData[i],index)) {
	                    var value = arrData[i][index].value === "." ? "" : arrData[i][index].value; 
	                    if(arrData[i][index].type=='1'){
	                    	row += '<td style="vnd.ms-excel.numberformat:#,##0.00">' + value + '</td>';  
	                    } else{
	                    	row += '<td style="vnd.ms-excel.numberformat:@">' + value + '</td>';  
	                    }
	                    
                	}
                }  
                  
                excel += row + "</tr>";  
            }  

  
            excel += "</table>";  
            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";  
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';  
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';  
            excelFile += '; charset=UTF-8">';  
            excelFile += "<head>";  
            excelFile += "<!--[if gte mso 9]>";  
            excelFile += "<xml>";  
            excelFile += "<x:ExcelWorkbook>";  
            excelFile += "<x:ExcelWorksheets>";  
            excelFile += "<x:ExcelWorksheet>";  
            excelFile += "<x:Name>";  
            excelFile += "{worksheet}";  
            excelFile += "</x:Name>";  
            excelFile += "<x:WorksheetOptions>";  
            excelFile += "<x:DisplayGridlines/>";  
            excelFile += "</x:WorksheetOptions>";  
            excelFile += "</x:ExcelWorksheet>";  
            excelFile += "</x:ExcelWorksheets>";  
            excelFile += "</x:ExcelWorkbook>";  
            excelFile += "</xml>";  
            excelFile += "<![endif]-->";

            excelFile += "<style>";   
            excelFile += "td{text-align: center}";  
            excelFile += "</style>";
            excelFile += "</head>";  
            excelFile += "<body>";  
            excelFile += excel;  
            excelFile += "</body>";  
            excelFile += "</html>";  
            var ws = XLSX.utils.table_to_sheet(excel);
        	var wb = XLSX.utils.book_new();
        	XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        	XLSX.writeFile(wb, "linreg.xlsx");
              
//            var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);  
//              
//            var link = document.createElement("a");      
//            link.href = uri;  
//              
//            link.style = "visibility:hidden";  
//            link.download = FileName + ".xls";  
//              
//            document.body.appendChild(link);  
//            link.click();  
//            document.body.removeChild(link);  
        }


        //对应项目有隐藏tr 行的导出Excel  
        //数据的title属性变为二维数组  第一个数组是要隐藏的标题栏，第二个数组是显示的标题栏
        suferMethod.JSONToExcelConvertor1=function (JSONData, FileName, ShowLabel) {  
            //先转化json  
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;  
              
            var excel = '<table>';      
            var styleStr='';
            //设置表头  
            var row='';
            if(ShowLabel.length==1){
                row = "<tr>"
                for (var i = 0, l = ShowLabel[0].length; i < l; i++) {  
                    row += "<td>" + ShowLabel[0][i].value + '</td>';  
                }  
                row+='</tr>'
            }else if(ShowLabel.length==2){
                ShowLabel.forEach(function(item,index){
                    if(index==0){
                        row += "<tr class='head'>";
                    }else{
                        row += '<tr>';
                    }
                    
                    item.forEach(function(item1,index1){
                        row += '<td >' + item1.value + '</td>'; 
                    })
                    row+="</tr>"
                });
            }
            
            //console.log(row);
              
            //换行  
            excel += row;  
              
            //设置数据  
           /* for (var i = 0; i < arrData.length; i++) {  
                var row = "<tr>";  
                  
                for (var index in arrData[i]) {
                	if(Object.prototype.hasOwnProperty.call(arrData[i],index)) {
	                    var value = arrData[i][index].value === "." ? "" : arrData[i][index].value;  
	                    row += '<td style="vnd.ms-excel.numberformat:#,##0.00">' + value + '</td>';  
                	}
                }  
                  
                excel += row + "</tr>";  
            } */ 
            for (var i = 0; i < arrData.length; i++) {  
                var row = "<tr>";  
                  
                for (var index in arrData[i]) {
                	if(Object.prototype.hasOwnProperty.call(arrData[i],index)) {
	                    var value = arrData[i][index].value === "." ? "" : arrData[i][index].value; 
	                    if(arrData[i][index].type=='1'){
	                    	row += '<td style="vnd.ms-excel.numberformat:#,##0">' + value + '</td>';  
	                    } else{
	                    	row += '<td style="vnd.ms-excel.numberformat:@">' + value + '</td>';  
	                    }
	                    
                	}
                }  
                  
                excel += row + "</tr>";  
            }  
  
            excel += "</table>";  
  //console.log(excel)
            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";  
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';  
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';  
            excelFile += '; charset=UTF-8">';  
            excelFile += "<head>";  
            excelFile += "<!--[if gte mso 9]>";  
            excelFile += "<xml>";  
            excelFile += "<x:ExcelWorkbook>";  
            excelFile += "<x:ExcelWorksheets>";  
            excelFile += "<x:ExcelWorksheet>";  
            excelFile += "<x:Name>";  
            excelFile += "{worksheet}";  
            excelFile += "</x:Name>";  
            excelFile += "<x:WorksheetOptions>";  
            excelFile += "<x:DisplayGridlines/>";  
            excelFile += "</x:WorksheetOptions>";  
            excelFile += "</x:ExcelWorksheet>";  
            excelFile += "</x:ExcelWorksheets>";  
            excelFile += "</x:ExcelWorkbook>";  
            excelFile += "</xml>";  
            excelFile += "<![endif]-->";

            excelFile += "<style>";   
            excelFile += ".head{display:none}";  
            excelFile += "</style>";

            excelFile += "</head>";  
            excelFile += "<body>";  
            excelFile += excel;  
            excelFile += "</body>";  
            excelFile += "</html>";  
  
  
//            var ws = XLSX.utils.table_to_sheet($(excel).get(0));
        	var wb = XLSX.utils.book_new();
//        	XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            var elt = $(excel).get(0);
        	var ws = XLSX.utils.table_to_sheet(elt);
//            var wb = XLSX.utils.book_new();
        	console.log(ws)
        	console.log(wb);
        	XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        	XLSX.writeFile(wb, FileName+".xls");
        	
        	
//            var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);  
//              
//            var link = document.createElement("a");      
//            link.href = uri;  
//              
//            link.style = "visibility:hidden";  
//            link.download = FileName + ".xls";  
//              
//            document.body.appendChild(link);  
//            link.click();  
//            document.body.removeChild(link);  
        }    
	return suferMethod;
})();
	