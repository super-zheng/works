;
(function($, window) {
	var jly_publicNum = function() {
		this.yanguang = function(callback, initObj) {

			$('body').append($('<div class="jly_qiuzhujingChoice"><ul class="jly_RLChange" type ="R"><li><img src="./imgs/R.png" alt=""></li><li><img src="./imgs/L.png" alt=""></li></ul><ul class="clearfix jly_qiuzhujingChoseBox" now="0"><li class="flexItem"><p class="jly_typeTitle">球镜SPH</p><div class="jly_picker"><ul class="jly_pickerMask" name="SPH" num="2" arr="qjArr" value="+0.00"><li class="jly_tran1"></li><li class="jly_tran2"></li><li class="jly_thisValue"></li><li class="jly_tran2"></li><li class="jly_tran1"></li></ul><ol class="jly_pickView"></ol></div><p class="jly_typeTitle jly_mt3">瞳距（PD）<i class="jly_checkBtn  jly_separate "></i></p><div class="jly_picker jly_picker3"><ul class="jly_pickerMask" name="PD" num="1" arr="pdArr" value="18.00"><li class="jly_tran1"></li><li class="jly_thisValue"></li><li class="jly_tran1"></li></ul><ol class="jly_pickView tongju"></ol></div></li><li class="flexItem"><p class="jly_typeTitle">柱镜CYL</p><div class="jly_picker"><ul class="jly_pickerMask" name="CYL" value="+0.00" num="2" arr="zjArr"><li class="jly_tran1"></li><li class="jly_tran2"></li><li class="jly_thisValue"></li><li class="jly_tran2"></li><li class="jly_tran1"></li></ul><ol class="jly_pickView"></ol></div><p class="jly_typeTitle">轴位(AX)</p><div class="jly_dashboard"><div class="jly_plus jly_fuhao noselect"></div><div class="jly_reduce jly_fuhao noselect"></div><div class="jly_mark"></div></div><div class="jly_showRound">0</div></li><li class="flexItem"><p class="jly_typeTitle">下加光ADD</p><div class="jly_picker"><ul class="jly_pickerMask" name="ADD" value="+0.00" num="2" arr="addArr"><li class="jly_tran1"></li><li class="jly_tran2"></li><li class="jly_thisValue"></li><li class="jly_tran2"></li><li class="jly_tran1"></li></ul><ol class="jly_pickView"></ol></div><div class="jly_twopicker"><div class="jingyong jly_oncePick"><p class="jly_typeTitle jly_mt3">近用瞳距(PD)<i class="jly_checkChose"></i></p><div class="jly_picker jly_picker3"><ul class="jly_pickerMask" name="jingyong" num="1" arr="jingyongArr" value="16"><li class="jly_tran1"></li><li class="jly_thisValue"></li><li class="jly_tran1"></li></ul><ol class="jly_pickView"></ol></div></div><div class="tonggao jly_oncePick"><p class="jly_typeTitle jly_mt3">瞳高(VD)<i class="jly_checkChose"></i></p><div class="jly_picker jly_picker3"><ul class="jly_pickerMask" name="VD" num="1" arr="vdArr" value="31"><li class="jly_tran1"></li><li class="jly_thisValue"></li><li class="jly_tran1"></li></ul><ol class="jly_pickView"></ol></div></div></div></li></ul><div class="jly_bottomBtn"><div class="jly_picker_btn fl jly_picker_cancel">取消</div><div class="jly_picker_btn fl jly_confirm">确定</div></div></div>'));

			var obj = {
				'R': {
					'CYL': '+0.00',
					'PD': '60',
					'SPH': '+0.00',
					'AX': '0',
					'ADD': '+0.00',
					'jingyong': '15',
					'VD': '31',
				},
				'L': {
					'CYL': '+0.00',
					'PD': '60',
					'SPH': '+0.00',
					'AX': '0',
					'ADD': '+0.00',
					'jingyong': '15',
					'VD': '31',
				},
				'hebing': true
			}
			if(initObj) {
				obj = initObj;
			}
			var supportsVibrate = "vibrate" in navigator;
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
			while(demoNumQj <= 36) {
				if(demoNumQj.toFixed(2) < 0) {
					qjArr.push(demoNumQj.toFixed(2));
				} else {
					qjArr.push('+' + demoNumQj.toFixed(2));
				}

				demoNumQj += 0.25;
			}
			while(demoNumZj >= -8) {
				if(demoNumZj.toFixed(2) < 0) {
					zjArr.push(demoNumZj.toFixed(2));
				} else {
					zjArr.push('+' + demoNumZj.toFixed(2));
				}

				demoNumZj -= 0.25;
			}

			while(demoPd <= 49.5) {
				pdArr.push(demoPd + '');
				jingyongArr.push(demoPd + '');
				demoPd += .5;
			}
			while(demoAdd <= 5) {
				addArr.push("+"+demoAdd.toFixed(2));
				demoAdd += .25;
			}
			while(demoVd <= 55) {
				vdArr.push(demoVd + '');
				demoVd += 1;
			}

			var html = document.documentElement;
			var h = html.getBoundingClientRect().height / 1;
			$('.jly_qiuzhujingChoice').css('height', h + 'px');
			var w = $('.jly_qiuzhujingChoseBox').css('width').replace('px', '') / 1;
			var position = $('.jly_dashboard')[0].getBoundingClientRect()
			//获取圆形的坐标

			var init = {
				'x': position.left + position.width / 2 - w,
				'y': position.top + position.height
			}
			if(obj.hebing) {
				//当前为合并
				pdArr = pdArr.map(function(item, index) {
					return item * 2 + ''
				});
				$('.jly_separate').addClass('jly_merge')
			} else {
				pdArr = pdArr.map(function(item, index) {
					return item / 2 + ''
				});
				$('.jly_separate').removeClass('jly_merge')
			}
			render(obj) //渲染默认状态
			//球镜柱镜进行选择
			$('.jly_qiuzhujingChoseBox').on('touchstart', function(e1) {
				e1.preventDefault();
				// console.log(e1.touches[0].clientX)
				var abs;
				var initX = $(this).css('left').replace('px', '') / 1;
				var start = e1.touches[0].clientX;
				$(this).css('transition-duration', '0s');
				$(this).unbind('touchmove').on('touchmove', function(e2) {
					e2.preventDefault();
					w = $('.jly_qiuzhujingChoseBox').css('width').replace('px', '') / 1;
					// console.log(e2.touches[0].clientX);
					abs = e2.touches[0].clientX - start;
					var now = abs + initX;
					if(now > 0) {
						now = 0;
					} else if(-(w / 3 * 2) > now) {
						now = -(w / 3 * 2);
					}
					$(this).css('left', now + 'px')
				});
				$(this).unbind('touchend').on('touchend', function(e3) {
					e3.preventDefault();
					$(this).css('transition-duration', '.4s');
					w = $('.jly_qiuzhujingChoseBox').css('width').replace('px', '') / 1;
					var left = $(this).css('left').replace('px', '') / 1;
					if(abs > 0) {
						left += w / 7;
					} else {
						left -= w / 7;
					}
					var nowLeft = Math.round(left * 3 / w) * w / 3;
					$(this).css('left', Math.round(left * 3 / w) * w / 3 + 'px');
					$(this).attr('now', -nowLeft / w * 3);
					setTimeout(function() {

						position = $('.jly_dashboard')[0].getBoundingClientRect()
						//获取圆形的坐标

						init = {
							'x': position.left + position.width / 2,
							'y': position.top + position.height
						}
					}, 410)
				})

			})

			//左右眼切换

			$('.jly_RLChange').on('touchstart', function(e1) {
				e1.preventDefault();
				// console.log(e1.touches[0].clientX)
				var abs;
				var initX = $(this).css('left').replace('px', '') / 1;
				var start = e1.touches[0].clientX;
				$(this).css('transition-duration', '0s');
				$(this).unbind('touchmove').on('touchmove', function(e2) {
					e2.preventDefault();
					w = $(this).css('width').replace('px', '') / 1;
					// console.log(e2.touches[0].clientX);
					abs = e2.touches[0].clientX - start;
					var now = abs + initX;
					if(now > 0) {
						now = 0;
					} else if(-(w / 2) > now) {
						now = -(w / 2);
					}
					$(this).css('left', now + 'px')
				});
				$(this).unbind('touchend').on('touchend', function(e3) {
					e3.preventDefault();
					$(this).css('transition-duration', '.4s');
					w = $(this).css('width').replace('px', '') / 1;
					var left = $(this).css('left').replace('px', '') / 1;
					if(abs > 0) {
						left += w / 7;
					} else {
						left -= w / 7;
					}
					left = Math.round(left * 2 / w) * w / 2;
					$(this).css('left', left + 'px');

					//左右眼切换后重新渲染选择的参数
					//通过left值进行记录当前选择的是左眼还是右眼
					if(left < 0) {
						$(this).attr('type', 'L');
					} else {
						$(this).attr('type', 'R');
					}

					render(obj)

				})
			})

			//jly_picker 滑动事件注册
			//创建picker选择项
			//jly_picker 选项渲染
			var w1 = 30;
			renderPicker()

			function renderPicker() {
				var windowHeight = document.documentElement.clientHeight;
				$('.jly_qiuzhujingChoice').css({
					'height': windowHeight + 'px',
					'overflow': 'hidden'
				});
				$('.jly_qiuzhujingChoice').on('touchmove', function(e) {
					e.preventDefault();
				});
				$('.jly_picker').each(function(index, item) {
					var str = '';
					eval($(item).find('.jly_pickerMask').attr('arr')).forEach(function(item1, index1) {
						str += '<li>' + item1 + '</li>'
					})
					$(item).find('.jly_pickView').html(str);
					var thisPiker = $(item).find('.jly_pickerMask');
					var nowCheck = -eval(thisPiker.attr('arr')).indexOf(thisPiker.attr('value')) + thisPiker.attr('num') / 1;
					console.log(thisPiker, eval(thisPiker.attr('arr')).indexOf(thisPiker.attr('value')))
					$(item).find('.jly_pickView').css('top', nowCheck * w1 + 'px');
				})
			}

			$('.jly_pickerMask').on('touchstart', function(e1) {
				//获取1rem 的大小;
				w1 = 30;
				e1.preventDefault();
				e1.stopPropagation();
				var start = e1.touches[0].clientY;
				var now;
				var top = $(this).parent().find('.jly_pickView').css('top').replace('px', '') / 1;
				$(this).unbind('touchmove').on('touchmove', function(e2) {
					e2.preventDefault();
					e2.stopPropagation();
					now = e2.touches[0].clientY - start + top;
					if(now >= $(this).attr('num') * w1) {
						now = $(this).attr('num') * w1;
					}
					if(now <= -($(this).parent().find('.jly_pickView li').length - ($(this).attr('num') / 1 + 1)) * w1) {
						now = -($(this).parent().find('.jly_pickView li').length - ($(this).attr('num') / 1 + 1)) * w1
					}

					$(this).parent().find('.jly_pickView').css('top', now + 'px');
				})
				$(this).unbind('touchend').bind('touchend', function() {

					now = Math.round(now / w1) * w1;
					// console.log(now);
					$(this).parent().find('.jly_pickView').css('top', now + 'px');
					$(this).attr('value', eval($(this).attr('arr'))[Math.abs(now / w1 - $(this).attr('num') / 1)])
					obj[$('.jly_RLChange').attr('type')][$(this).attr('name')] = eval($(this).attr('arr'))[Math.abs(now / w1 - $(this).attr('num') / 1)];
					if($(this).attr('name') == 'PD' && obj.hebing) {
						obj.R.PD = eval($(this).attr('arr'))[Math.abs(now / w1 - $(this).attr('num') / 1)];
						obj.L.PD = eval($(this).attr('arr'))[Math.abs(now / w1 - $(this).attr('num') / 1)];
					}
				})
			})

			//仪表盘事件注册
			$('.jly_dashboard').on('touchstart', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var x = e.touches[0].clientX;
				var y = e.touches[0].clientY;
				round = -Math.round(Math.atan2(init.x - x, init.y - y) * 180 / Math.PI) - 90;
				if(-round > 180) {
					round = -180;
				} else if(round > 0) {
					round = 0;
				}
				$('.jly_mark').css('transition-duration', '.3s');
				$(this).find('.jly_mark').css('transform', 'translateY(-8px) rotate(' + round + 'deg)');
				$('.jly_showRound').text(Math.abs(round))
				$(this).unbind('touchmove').on('touchmove', function(e1) {
					e1.preventDefault();
					e1.stopPropagation();
					var x = e1.touches[0].clientX;
					var y = e1.touches[0].clientY;
					$('.jly_mark').css('transition-duration', '0s');
					round = -Math.round(Math.atan2(init.x - x, init.y - y) * 180 / Math.PI) - 90;
					if(-round > 180) {
						round = -180;
					} else if(round > 0) {
						round = 0;
					}
					$(this).find('.jly_mark').css('transform', 'translateY(-8px) rotate(' + round + 'deg)');
					$('.jly_showRound').text(Math.abs(round));
				})
				$(this).unbind('touchend').on('touchend', function() {
					$('.jly_showRound').text(Math.abs(round));
					obj[$('.jly_RLChange').attr('type')].AX = Math.abs(round);
				})

			});
			$('.jly_fuhao').on('touchstart', function(e) {
				e.stopPropagation();
				e.preventDefault();
				if($(this).hasClass('jly_plus')) {
					round--;
				} else if($(this).hasClass('jly_reduce')) {
					round++;
				}
				if(-round > 180) {
					round = -180;
				} else if(round > 0) {
					round = 0;
				}
				$(this).parent().find('.jly_mark').css('transform', 'translateY(-8px) rotate(' + round + 'deg)');
				$('.jly_showRound').text(Math.abs(round));
				obj[$('.jly_RLChange').attr('type')].AX = Math.abs(round);
				console.log(obj);

			});
			$('.jly_fuhao').on('touchmove', function(e) {
				e.stopPropagation();
				e.preventDefault();
			})

			function render(obj) {
				var nowObj = obj[$('.jly_RLChange').attr('type')];
				$('.jly_picker').each(function(index, item) {
					var nowDom = $(item).find('.jly_pickerMask');
					if(nowDom.attr('name') == 'jingyong') {
						if(nowObj[nowDom.attr('name')] == '无') {
							nowDom.attr('value', '15');
							nowDom.parent().hide();
							nowDom.parent().prev().find('i').addClass('jly_hidePicker');
						} else {
							nowDom.attr('value', nowObj[nowDom.attr('name')]);
						}
					} else if(nowDom.attr('name') == 'VD') {
						if(nowObj[nowDom.attr('name')] == '无') {
							nowDom.attr('value', '31');
							nowDom.parent().hide();
							nowDom.parent().prev().find('i').addClass('jly_hidePicker');
						} else {
							nowDom.attr('value', nowObj[nowDom.attr('name')]);
						}
					} else {
						nowDom.attr('value', nowObj[nowDom.attr('name')]);
					}
					var nowCheck = -eval(nowDom.attr('arr')).indexOf(nowDom.attr('value')) + nowDom.attr('num') / 1;
					$(item).find('.jly_pickView').css('top', nowCheck * w1 + 'px');
				});

				$('.jly_dashboard').find('.jly_mark').css('transform', 'translateY(-8px) rotate(-' + nowObj.AX + 'deg)');
				$('.jly_showRound').text(nowObj.AX);

			}

			$('.jly_separate').tap(function() {
				$(this).toggleClass('jly_merge');
				if($(this).hasClass('jly_merge')) {
					//当前为合并
					pdArr = pdArr.map(function(item, index) {
						return item * 2 + ''
					});
					obj.R.PD = obj.R.PD * 2;
					obj.L.PD = obj.R.PD;
					obj.hebing = true;
				} else {
					pdArr = pdArr.map(function(item, index) {
						return item / 2 + ''
					});

					obj.R.PD = obj.R.PD / 2 + '';
					obj.L.PD = obj.R.PD + '';
					obj.hebing = false;
				}
				$(this).parent().next().find('.jly_pickerMask').attr('value', obj.R.PD + '');
				console.log(obj.R.PD + '');
				renderPicker();
				render(obj);
			})

			$('.jly_checkChose').tap(function() {
				$(this).toggleClass('jly_hidePicker');
				if($(this).hasClass('jly_hidePicker')) { //隐藏
					$(this).parent().next().hide();
					obj.R[$(this).parent().next().find('.jly_pickerMask').attr('name')] = '无';
					obj.L[$(this).parent().next().find('.jly_pickerMask').attr('name')] = '无';

				} else {
					$(this).parent().next().show();
					obj.R[$(this).parent().next().find('.jly_pickerMask').attr('name')] = $(this).parent().next().find('.jly_pickerMask').attr('value');
					obj.L[$(this).parent().next().find('.jly_pickerMask').attr('name')] = $(this).parent().next().find('.jly_pickerMask').attr('value');
				}
			})

			$('.jly_picker_cancel').tap(function() {
				$('.jly_qiuzhujingChoice').remove();
			})
			$('.jly_confirm').tap(function() {
				callback(obj);
				$('.jly_qiuzhujingChoice').remove();
			})
		}

	}

	window.jly_publicNum = jly_publicNum;
	//数组去重
	Array.prototype.unique = function() {
		var res = [];
		var json = {};
		for(var i = 0; i < this.length; i++) {
			if(!json[this[i]]) {
				res.push(this[i]);
				json[this[i]] = 1;
			}
		}
		return res;
	}
})($, window)