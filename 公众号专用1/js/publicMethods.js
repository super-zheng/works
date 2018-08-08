
class Methods {
    constructor() { };
    /*
** 时间戳转换成指定格式日期
** eg. 
** dateFormat(11111111111111, 'Y年m月d日 H时i分')
** → "2322年02月06日 03时45分"
dateFormat(11111111111111, 'Y-m-d H:i')
2322-02-06 03:45
*/
    dateFormat(timestamp, formats) {
        // formats格式包括
        // 1. Y-m-d
        // 2. Y-m-d H:i:s
        // 3. Y年m月d日
        // 4. Y年m月d日 H时i分
        formats = formats || 'Y-m-d';

        var zero = function (value) {
            if (value < 10) {
                return '0' + value;
            }
            return value;
        };

        var myDate = timestamp ? new Date(timestamp) : new Date();

        var year = myDate.getFullYear();
        var month = zero(myDate.getMonth() + 1);
        var day = zero(myDate.getDate());

        var hour = zero(myDate.getHours());
        var minite = zero(myDate.getMinutes());
        var second = zero(myDate.getSeconds());

        return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
            return ({
                Y: year,
                m: month,
                d: day,
                H: hour,
                i: minite,
                s: second
            })[matches];
        });
    };

    // jquery方法双击出现输入框 失去焦点后显示内容 ，移除文本框 
    changeInput(dom) {
       
       // dom.each(function (index, item) {
            $("body").on("tap",".td",function(){
                console.log(123123);
                var key=$(this).data("key");
                console.log(key)
                var that = $(this);
                dom.find('.input').remove();
                var inputDom = $('<input class="input" type="number" autofocus="autofocus"/>');
                $(this).append(inputDom);
                inputDom.focus();
                inputDom.val(that.text());
                $(this).find('.input').blur(function () {
                    degree_obj[key] = that.find('.input').val()
                    that.find("p").text(that.find('.input').val());
                    that.find('.input').remove()
                })
            })
            // $(item).tap(function () {              
            //    console.log(123123);
            //     var key=$(this).data("key");
            //     console.log(key)
            //     var that = $(this);
            //     dom.find('.input').remove();
            //     var inputDom = $('<input class="input" type="number" autofocus="autofocus"/>');
            //     $(this).append(inputDom);
            //     inputDom.focus();
            //     inputDom.val(that.text());
            //     $(this).find('.input').blur(function () {
            //         degree_obj[key] = that.find('.input').val()
            //         that.find("p").text(that.find('.input').val());
            //         that.find('.input').remove()
            //     })
            // });
      //  })
    }

    //jquery方法 控制input框只能输入第一位非零数字
    inputNumber(dom) {
        dom.keyup(function () {
            var o = $(this).val();
            var temp_amount = '';
            if (/[^\d]/.test(o)) { //替换非数字字符
                var temp_amount = o.replace(/[^\d]/g, '');
            } else if (/^[0]*/g.test(o)) {
                var temp_amount = RegExp.rightContext;
            }
            $(this).val(temp_amount);
        });
    }


    //base64加密函数
    base64Encode(a) {
        var rv = encodeURIComponent(a);
        rv = unescape(rv);
        rv = window.btoa(rv);
        return rv;
    }

    //base64解密函数
    base64Decode(b) {
        var rv = window.atob(b);
        rv = escape(rv);
        rv = decodeURIComponent(rv);
        return rv;
    }


}