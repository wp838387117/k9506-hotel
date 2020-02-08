layui.use(['jquery','layer','table','form'], function() {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form;   //实例化表单对象

    //进行是否登录的提示
    if($("#loginMsg").val()=='loginMsg'){
        layer.msg("你未登录，请先登录！！！",{icon:7,time: 2000,shade: 0.5,anim: 6})
    }

    var yzmIf = false;  //判断验证码

    //验证码验证
    $("#yzm").blur(function () {
        yzVerifyCode($(this).val());
    });

    //自定义验证（用户名，密码）
    form.verify({
        //userName：自定义的验证的名字
        userName: [/^[\S]{3,18}$/,'用户名必须3到18位，且不能出现空格']
        ,pwd: [/^[\S]{6,12}$/,'密码必须2到6位，且不能出现空格']
    });

    //登录的提交的监听
    form.on('submit(login)', function(data){
        if(yzmIf){
            var jsonLoginUser = data.field;//当前容器的全部表单字段，名值对形式：{name: value}
            console.log(jsonLoginUser);
            login(jsonLoginUser);  //执行登录
        }else {
            layer.tips('验证码输入错误！！', '#yzm', {tips: [2,'#c62e3d'], time:3000});
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //验证验证码
    function yzVerifyCode(verifyCode) {
        $.ajax({
            type: 'POST',
            url: 'user/yzVerifyCode',
            async:false,  //允许外部变量取到ajax异步加载的数据
            data: {"verifyCode":verifyCode},
            success: function (res) {
                if(res=="success"){
                    yzmIf = true;
                    layer.tips('验证码输入正确。。', '#yzm', {tips: [2,'#28cf70'], time:3000});
                }else {
                    yzmIf = false;
                    layer.tips('验证码输入错误！！', '#yzm', {tips: [2,'#c62e3d'], time:3000});
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //登录
    function login(jsonLoginUser){
        $.ajax({
            type: 'POST',
            url: 'user/login',
            data: jsonLoginUser,
            success: function (res) {
                console.log(res);
                if(res=="success"){
                    setTimeout('window.location="authority/toIndex"',2000);
                    layer.msg("登录成功。。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("登录失败！！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

});