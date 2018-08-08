const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function request(obj) {
  var urls = obj.url ? obj.url : 'https://www.jingliyun.cn/jlyyj/index.php/Home/Javatosmall/Javaapi';
  var datas = obj.data;
  var method = obj.method ? obj.method : 'GET';
  wx.request({
    url: urls,
    data: datas,
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: method,
    success: function (res) {
      return res;
    }
  });
}

//最下面一定要加上你自定义的方法（作用：将模块接口暴露出来），否则会报错：util.trim is not a function;
module.exports = {
  formatTime: formatTime,
  request: request
}
