layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form,    //实例化表单对象
        laydate = layui.laydate;  //实例化日期对象

    var checkIdcardIf = false;

    var checkPhoneIf = false;

    var createDate;  //当前时间

    //用失去焦点事件来验证身份证号的唯一性
    $("#idcard").blur(function () {
        var idcard = $(this).val();
        console.log(idcard);
        if(idcard.length==18){
            //验证手机号
            checkIdcard(idcard);
        }
    });

    //验证手机号的唯一性
    $("#phone").blur(function () {
        var phone = $(this).val();
        if(phone.length==11){
            //验证手机号
            checkPhone(phone);
        }
    });

    //监听下拉框随机生成会员卡号
    form.on('select(vipRate)', function(data){
        createDate = getNowDate(new Date());
        var vipNum = dateReplace(createDate)+getRandom(2);
        $("#vipNum").val(vipNum);
    });

    //执行会员的添加监听
    form.on('submit(demo2)', function(res){
        if(checkIdcardIf&&checkPhoneIf){
            var jsonSaveVip = res.field; //当前容器的全部表单字段，名值对形式：{name: value}
            jsonSaveVip['createDate'] = createDate;
            saveVip(jsonSaveVip);
        }else {
            if(!checkIdcardIf&&checkPhoneIf){
                layer.tips('该身份证号已存在', '#idcard', {tips: [2,'#c62e3d'], time:3000});
            }else if(checkIdcardIf&&!checkPhoneIf){
                layer.tips('该手机号已存在', '#phone', {tips: [2,'#c62e3d'], time:3000});
            }else {
                layer.tips('该身份证号已存在', '#idcard',{tips: [2,'#c62e3d'], time:3000,tipsMore: true});
                layer.tips('该手机号已存在', '#phone', {tips: [2,'#c62e3d'], time:3000,tipsMore: true});
            }

        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //根据身份证号查询vip单个数据
    function checkIdcard(idcard) {
        $.ajax({
            type: 'POST',
            url: 'vip/loadTByPramas',
            async:false,  //允许外部变量取到ajax异步加载的数据
            data: {"idcard":idcard},
            success: function (res) {
                console.log(res);
                if(res==""){
                    checkIdcardIf = true;
                    layer.tips('该身份证号可用。。', '#idcard', {tips: [2,'#28cf70'], time:3000});
                }else {
                    checkIdcardIf = false;
                    layer.tips('该身份证号已存在', '#idcard', {tips: [2,'#c62e3d'], time:3000});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }


    //根据手机号查询vip单个数据
    function checkPhone(phone) {
        $.ajax({
            type: 'POST',
            url: 'vip/loadTByPramas',
            async:false,  //允许外部变量取到ajax异步加载的数据
            data: {"phone":phone},
            success: function (res) {
                if(res==""){
                    checkPhoneIf = true;
                    layer.tips('该手机号可用。。', '#phone', {tips: [2,'#28cf70'], time:3000});
                }else {
                    checkPhoneIf = false;
                    layer.tips('该手机号已存在', '#phone', {tips: [2,'#c62e3d'], time:3000});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //获取当前时间字符串     Date()   ---->  yyyy/MM/dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }

    //获取随机数
    function getRandom(num) {
        var count = '';   //随机数
        for (var i=0;i<num;i++){
            count += parseInt(Math.random()*10)  //0.123123123...
        }
        return count;
    }

    //添加会员信息
    function saveVip(jsonSaveVip) {
        $.ajax({
            type: 'POST',
            url: 'vip/saveT',
            data: jsonSaveVip,
            success: function (res) {
                if(res=="success"){
                    setTimeout('window.location="model/toShowVip"',2000);
                    layer.msg("会员信息添加成功。。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("会员信息添加失败！！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }



});