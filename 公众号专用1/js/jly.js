;(function(){
	function jly (){

	};
	jly.prototype.pickers = function(select, arr,showIndex, callback) {
		$(select).html('<div class="android-picker"><ul class="android-picker-showContent"><li class="android-picker-tran1"></li><li class="android-picker-tran2"></li><li class="android-picker-showthis"></li><li class="android-picker-tran2"></li><li class="android-picker-tran1"></li></ul><ul class="android-picker-choseMessage"></ul></div>');
		var listStr = '';
		arr.forEach(function(item, index) {
			listStr += '<li>' + item + '</li>'
		})
		$(select).find('.android-picker-choseMessage').html(listStr)
		$(select).find('.android-picker-choseMessage').css('top', -showIndex*30 + 'px');
		$(select).find('.android-picker-showContent').bind('touchstart', function(e) {
			var start = e.touches[0].clientY;
			var now;
			var top = $(select).find('.android-picker-choseMessage').css('top').replace('px', '') / 1;
			$(this).unbind('touchmove').bind('touchmove', function(e1) {
				e1.preventDefault();
				$(select).find('.android-picker-choseMessage').addClass('tansitionNone')
				now = e1.touches[0].clientY - start + top;
				if(now >= 60) {
					now = 60
				}
				if(now <= -(arr.length - 3) * 30) {
					now = -(arr.length - 3) * 30
				}
				

				$(select).find('.android-picker-choseMessage').css('top', now + 'px');
				$(this).unbind('touchend').bind('touchend', function() {
				$(select).find('.android-picker-choseMessage').removeClass('tansitionNone')
					now = Math.round(now / 30) * 30;
					setTimeout(function(){
						$(select).find('.android-picker-choseMessage').css('top', now + 'px');
						if(callback) {
							callback({
								'item': arr[-now / 30 + 2],
								'index': (-now / 30 + 2),
								'name':select
							}); 
						}
					},0)
				})
			})
		})
	}
	jly.prototype.getQZJ=function(){
		var qjArr=[];
		var zjArr=[];
		var demoNumQj=-14;
		var demoNumZj=0;
		while(demoNumQj<=36){
			if(demoNumQj.toFixed(2)<0){
				qjArr.push(demoNumQj.toFixed(2));
			}else{
				qjArr.push('+'+demoNumQj.toFixed(2));
			}
			
			demoNumQj+=0.25;
		}
		
		while(demoNumZj>=-14){
			if(demoNumZj.toFixed(2)<0){
				zjArr.push(demoNumZj.toFixed(2));
			}else{
				zjArr.push('+'+demoNumZj.toFixed(2));
			}
			
			demoNumZj-=0.25;
		}
		return [qjArr,zjArr]
	}
	jly.prototype.creatChoseQZJ = function (func){
		var choseQZJstr = '<div class="jly_ZQagrs"><div class="jly_pickers"><ul><li class="jly_qzTitle"><ol class="clearfix"><li class="fl jly_eye jly_empty"></li><li class="fl jly_qz">球镜</li><li class="fl jly_qz">柱镜</li></ol></li><li class="jly_mb1 jly_picS"><ol class="clearfix"><li class="fl jly_eye h150 lh150 fz5">R</li><li class="fl jly_qz h150" id="RQ"></li><li class="fl jly_qz h150" id="RZ"></li><li class="fl jly_stock h150"><div class="jly_kucun"><span>库存</span>:<b>100</b></div><div class="jly_price"><span>价格</span>:<b>100</b></div></li></ol></li><li class="jly_picS"><ol class="clearfix"><li class="fl jly_eye h150 lh150 fz5">L</li><li class="fl jly_qz h150" id="LQ"></li><li class="fl jly_qz h150" id="LZ"></li><li class="fl jly_stock h150"><div class="jly_kucun"><span>库存</span>:<b>100</b></div><div class="jly_price"><span>价格</span>:<b>100</b></div></li></ol></li></ul><div class="endBtn"><div class="jly_btn jly_yes ">确定</div><div class="jly_btn jly_no ">取消</div></div></div></div>';
		$('body').append($(choseQZJstr));
		var that  = this;
		var creat = [
			{'select':'#RQ','arr':that.getQZJ()[0],'index':54,'func':vertior},
			{'select':'#RZ','arr':that.getQZJ()[1],'index':-2,'func':vertior},
			{'select':'#LQ','arr':that.getQZJ()[0],'index':54,'func':vertior},
			{'select':'#LZ','arr':that.getQZJ()[1],'index':-2,'func':vertior}
		]
		creat.forEach(function(v , i ){
			that.pickers(v.select,v.arr,v.index,v.func);
		})

		function vertior (e){
			func(e);
		}
	}
	jly.prototype.getScreenWH = function(){
		let html = document.documentElement;
		var w = html.getBoundingClientRect().width / 1;
		var h = html.getBoundingClientRect().height / 1;
		return {'width':w ,'height':h}
	}
	return window.jly=jly;
})($)