function getQueryString(e) {
	var r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i");
	var t = window.location.search.substr(1).match(r);
	if(t != null) {
		return decodeURI(t[2])
	}
	return null
}
layui.use(["layer", "laytpl", "form"], function() {
	var N = layui.layer,
		e = layui.form(),
		v = layui.laytpl;
	var h = parent.LensPriceDatas;
	var C = GetRequest().store_id;
	var r = ["<th>序号</th><th>系列码</th><th>品牌</th><th>系列</th><th>品类</th><th>品种</th><th>折射率</th><th>加膜色</th><th>优先级(1-7)</th><th>起SPH</th><th>止SPH</th><th>起CYL</th><th>止CYL</th><th>联合区间</th><th>现片/定制片</th><th>供货时间</th><th>进货价</th><th>批发价</th><th>建议零售价</th>"];
	var c = [
		["number_uniCode", "lens_brand", "o1", "lens_model", "o4", "lens_refractivity", "lens_colorFilm", "degree_pri", "SPH_Q", "SPH_Z", "CYL_Q", "CYL_Z", "degree_interval", "degree_existing", "degree_offerTime", "orderPrice", "degree_wholesalePrice", "price"]
	];
	var p = [];
	var L = [];
	var _ = {
		head: r[0],
		list: []
	};
	S();
	parent.$("#xlf").val("");

	function S() {
		var e = {};
		var r = [];
		for(var t = 0; t < h.length; t++) {
			if(isNaN(h[t]["degree_pri"] / 1) || h[t]["degree_pri"] == "" || h[t]["degree_pri"] == undefined || h[t]["degree_pri"] == null || h[t]["degree_pri"] / 1 > 7) {
				h[t]["degree_pri"] = 7
			} else if(h[t]["degree_pri"] / 1 < 1) {
				h[t]["degree_pri"] = 1
			}
			if(e[h[t]["degree_pri"]] == "" || e[h[t]["degree_pri"]] == null || e[h[t]["degree_pri"]] == undefined) {
				e[h[t]["degree_pri"]] = [];
				r.push(h[t]["degree_pri"] / 1)
			}
			e[h[t]["degree_pri"]].push(h[t])
		}
		r.sort(function(e, r) {
			return r - e
		});
		h = [];
		for(var t = 0; t < r.length; t++) {
			for(var a = 0; a < e[r[t]].length; a++) {
				h.push(e[r[t]][a])
			}
		}
		L = [];
		var i = "";
		for(var t = 0; t < h.length; t++) {
			if(h[t][c[0][15]] == undefined) {
				h[t][c[0][15]] = 0
			} else if(h[t][c[0][16]] == undefined) {
				h[t][c[0][16]] == 0
			}
			var n = "";
			var d = h[t][c[0][8]] / 1;
			var o = h[t][c[0][9]] / 1;
			var l = h[t][c[0][10]] / 1;
			var s = h[t][c[0][11]] / 1;
			if(h[t][c[0][12]] == "是" && h[t][c[0][11]] / 1 - h[t][c[0][10]] / 1 != h[t][c[0][9]] / 1 - h[t][c[0][8]] / 1) {
				n = "background-color:red;"
			} else if(isNaN(o) || isNaN(d) || isNaN(s) || isNaN(l) || isNaN(h[t][c[0][16]] / 1) || isNaN(h[t][c[0][17]] / 1) || isNaN(h[t][c[0][15]] / 1) || (d > 36 || o < -36) || (o > 36 || d < -36) || (l > 0 || l < -14) || (s > 0 || s < -14)) {
				n = "background-color:red;"
			} else if(!h[t][c[0][0]]) {
				n = "background-color:red;"
			} else if(h[t][c[0][11]] == "" || h[t][c[0][11]] == undefined || h[t][c[0][10]] == "" || h[t][c[0][10]] == undefined || h[t][c[0][9]] == "" || h[t][c[0][9]] == undefined || h[t][c[0][8]] == "" || h[t][c[0][8]] == undefined || h[t][c[0][17]] == "" || h[t][c[0][17]] == undefined || h[t][c[0][7]] == "" || h[t][c[0][7]] == undefined) {
				n = "background-color:red;"
			} else if(h[t][c[0][12]] != "是" && h[t][c[0][12]] != "否") {
				n = "background-color:red;"
			} else {
				p[t] = 1;
				L.push(h[t])
			}
			i += '<tr style="' + n + '"><td >' + (t + 1) + "</td>";
			var u = h[t];
			for(var a = 0; a < c[0].length; a++) {
				var f = u[c[0][a]] ? u[c[0][a]] : "";
				i += '<td index="' + (t + 1) + '" field="' + c[0][a] + '">' + f + "</td>"
			}
			i += "</tr>"
		}
		_.list = [];
		_.list.push(i);
		v(demo.innerHTML).render(_, function(e) {
			document.getElementById("view_tb").innerHTML = e;
			g($(".layui-table tbody td"))
		})
	}

	function t(e, r) {
		return e - r
	}
	$("#yan").click(function() {
		S()
	});
	$("#ok").click(function() {
		var e = $("#view_tb").find("tbody").find("tr");
		for(var r = 0; r < e.length; r++) {
			if($(e[r]).attr("style") == "background-color:red;") {
				N.msg("请修改错误行数据,如果已经确认修改则请点击重新校验");
				return
			}
		}
		var t = [];
		var a = L;
		for(var r = 0; r < a.length; r++) {
			var i = 0;
			var n = 0;
			var d = 0;
			var o = 0;
			var l = [];
			var s = {};
			s["number_uniCode"] = a[r]["number_uniCode"];
			s["degree_pri"] = a[r]["degree_pri"];
			s["orderPrice"] = a[r]["orderPrice"];
			s["degree_wholesalePrice"] = a[r]["degree_wholesalePrice"];
			s["price"] = a[r]["price"];
			s["degree_existing"] = a[r]["degree_existing"];
			s["degree_offerTime"] = a[r]["degree_offerTime"];
			s["degree_interval"] = a[r]["degree_interval"];
			if(a[r]["SPH_Q"] / 1 < a[r]["SPH_Z"] / 1) {
				i = a[r]["SPH_Q"];
				n = a[r]["SPH_Z"]
			} else {
				i = a[r]["SPH_Z"];
				n = a[r]["SPH_Q"]
			}
			if(a[r]["CYL_Q"] / 1 < a[r]["CYL_Z"] / 1) {
				d = a[r]["CYL_Q"];
				o = a[r]["CYL_Z"]
			} else {
				d = a[r]["CYL_Z"];
				o = a[r]["CYL_Q"]
			}
			var u = parseFloat(i);
			var f = parseFloat(n);
			var v = parseFloat(d);
			var h = parseFloat(o);
			var c = u % .25 == 0 ? u : (parseInt(u / .25) + 1) * .25;
			var p = f % .25 == 0 ? f : parseInt(f / .25) * .25;
			var _ = v % .25 == 0 ? v : (parseInt(v / .25) + 1) * .25;
			var g = h % .25 == 0 ? h : parseInt(h / .25) * .25;
			if(a[r]["degree_interval"] == "是") {
				for(var m = g; m >= _; m -= .25) {
					for(var y = c; y <= p; y += .25) {
						var x = y < "0" ? parseFloat(y).toFixed(2) : "+" + parseFloat(y).toFixed(2);
						var F = m < "0" ? parseFloat(m).toFixed(2) : "+" + parseFloat(m).toFixed(2);
						var b = x + "," + F;
						l.push(b)
					}
					c = c / 1 + .25
				}
			} else {
				for(var y = c; y <= p; y += .25) {
					for(var m = _; m <= g; m += .25) {
						var x = y < "0" ? parseFloat(y).toFixed(2) : "+" + parseFloat(y).toFixed(2);
						var F = m < "0" ? parseFloat(m).toFixed(2) : "+" + parseFloat(m).toFixed(2);
						var b = x + "," + F;
						l.push(b)
					}
				}
			}
			s["arr"] = l;
			t.push(s)
		}
		var P = {
			sheet: t,
			store_id: C,
			type: 1
		};
		$.ajax({
			url: "/jly5.0/web/leadPrice.do",
			type: "post",
			data: {
				id: JSON.stringify(P)
			},
			success: function(e) {
				N.open({
					title: "导入信息",
					content: e.msg
				});
				S()
			},
			error: function() {
				N.open({
					title: "导入信息",
					content: "导入失败！"
				})
			}
		})
	});

	function a(e) {
		return e.toString().replace(new RegExp(" ", "gm"), "")
	}

	function g(n) {
		n.each(function(e, r) {
			$(r).dblclick(function() {
				var t = $(this);
				var a = $(this).attr("index");
				var i = $(this).attr("field");
				n.find("input").remove();
				var e = $('<input type="text" class="active" autofocus="autofocus"/>');
				$(this).append(e);
				e.focus();
				e.val(t.text());
				$(this).find("input").blur(function() {
					var e = $(this).val();
					var r = $(this).attr("index");
					h[a - 1][i] = e;
					t.text(t.find("input").val()).find("input").remove()
				})
			})
		})
	}

	function i(e) {
		var r = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
		var t = e.match(r);
		if(t == null) {
			return false
		} else {
			return true
		}
	}

	function n(e) {
		var r = /^((\+)?86|((\+)?86)?)0?1[34578]\d{9}$|^(((0\d2|0\d{2})[- ]?)?\d{8}|((0\d3|0\d{3})[- ]?)?\d{7})(-\d{3})?$/;
		var t = e.match(r);
		if(t == null) {
			return false
		} else {
			return true
		}
	}

	function d(e) {
		var r = e.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		if(r == null) {
			return false
		} else {
			return true
		}
	}
});