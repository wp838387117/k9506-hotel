layui.use(['jquery', 'layer', 'form', 'upload'], function () {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        form = layui.form,    //实例化表单对象
        upload = layui.upload;  //实例化文件上传对象

    var arrUl = $("#LAY_preview").find("ul");  //房屋显示的ul容器数组

    var saveOrUpd = 0;   //0表示不可以添加  1表示可以添加  2表示可以修改

    //初始化房屋的信息
    loadAllRooms();

    //初始化所有的房间类型
    loadAllRoomType();

    //加载所有的房屋数据
    function loadAllRooms() {
        $.ajax({
            type: 'post',
            url: "rooms/loadAllT",
            dateType: 'json',
            success: function (res) {
                console.log(res)
                var roomStatus0 = "";
                var roomStatus1 = "";
                var roomStatus2 = "";
                $.each(res, function (i, item) {
                    if (item.roomStatus == '0') {
                        roomStatus0 += '<li style="background-color: #009688;">';
                        roomStatus0 += '<img class="layui-anim" id="demo1" src="' + item.roomPic + '" width="135px" height="135px"/>';
                        roomStatus0 += '<div class="code">';
                        roomStatus0 += '<span style="display: block;color: #0C0C0C;">' + item.roomNum + '-' + item.roomType.roomTypeName + '-' + item.roomType.roomPrice + '元/天</span>';
                        roomStatus0 += '<button type="button" value="del" roomid="' + item.id + '" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus0 += '</div>';
                        roomStatus0 += '</li>';
                    } else if (item.roomStatus == '1') {
                        roomStatus1 += '<li style="background-color: red;">';
                        roomStatus1 += '<img class="layui-anim" id="demo1" src="' + item.roomPic + '" width="135px" height="135px"/>';
                        roomStatus1 += '<div class="code">';
                        roomStatus1 += '<span style="display: block;color: #0C0C0C;">' + item.roomNum + '-' + item.roomType.roomTypeName + '-' + item.roomType.roomPrice + '元/天</span>';
                        roomStatus1 += '</div>';
                        roomStatus1 += '</li>';
                    } else {
                        roomStatus2 += '<li style="background-color: blueviolet;">';
                        roomStatus2 += '<img class="layui-anim" id="demo1" src="' + item.roomPic + '" width="135px" height="135px"/>';
                        roomStatus2 += '<div class="code">';
                        roomStatus2 += '<span style="display: block;color: #0C0C0C;">' + item.roomNum + '-' + item.roomType.roomTypeName + '-' + item.roomType.roomPrice + '元/天</span>';
                        roomStatus2 += '<button type="button" value="del" roomid="' + item.id + '" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus2 += '<button type="button" value="upd" roomid="' + item.id + '" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                        roomStatus2 += '</div>';
                        roomStatus2 += '</li>';
                    }
                });
                //    roomStatus0 += '<li><button type="button" value="save" class="layui-btn layui-btn-warm layui-btn-lg"><i class="layui-icon">&#xe654;</i>添加</button></li>';
                $(arrUl[0]).html(roomStatus0);
                $(arrUl[1]).html(roomStatus1);
                $(arrUl[2]).html(roomStatus2);
            },
            error: function () {
                layer.msg("服务器异常！！！", {icon: 3, time: 2000, shade: 0.5, anim: 4})
            }
        })
    }
    //修改空闲房间的功能(从可用-->不可用)
    $("ul").eq(0).on('click','button',function () {
        var roomButton = $(this); //获得当前用户点击的房屋数据对象
        console.log(roomButton);
        layer.confirm('真的删除该房间么？',{icon:3}, function(index) {
            //根据id修改房屋是否可用
            updRooms(roomButton);
            layer.close(index);  //关闭当前询问框
        });
    });


    //打扫的房间的操作
    $("ul").eq(2).on("click","button",function () {
        var roomButton = $(this);
        var event = $(this).val();
        if(event=='del'){  //(从可用-->不可用)
            layer.confirm('真的删除该房间么？',{icon:3}, function(index) {
                //根据id修改房屋是否可用
                updRooms(roomButton);
                layer.close(index);  //关闭当前询问框
            });
        }else if(event=='upd'){
            layer.confirm('将此房间改成空闲的么？',{icon:7}, function(index) {
                updRoomstatus(roomButton);
                layer.close(index);  //关闭当前询问框
            });
        }
    })

    //添加房间
    $("#saveRoomsUI").click(function () {
        $("form").eq(0).find("input").val("");//清空添加页面的内容
        //给roomPicId便签设置默认的图片
        $("#roomPicId").val("http://pxciogtf9.bkt.clouddn.com/moren.jpg");
        //从新给demo1的便签设置stc属性和值
        $('#demo1').attr('src', "http://pxciogtf9.bkt.clouddn.com/moren.jpg");
        layer.open({
            type:1,
            title:'添加房间操作界面',
            area:['450px','500px'],
            shade:0.6,
            anim:4,
            content:$("#saveRoomsDiv")
        });
    });

    //普通图片上传
    var uploadInst = upload.render({  //此时配置上传为自动上传
        elem: '#test1'  //绑定的选择上传文件的按钮
        ,url: 'rooms/uploadRoomsPic'   //服务器端上传的路径
        ,field: 'myFile'   //源文件的传到服务器端的文件名，默认为：file
       /* ,data: {"path":"D:/img"}  //上传时的目标文件路径，如果用七牛云就不需要填写该属性*/
        ,before: function(obj){  //上传之前的函数回调
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo1').attr('src', result); //图片链接（base64）将图片回显在页面中
            });
        }
        ,done: function(res){  //上传后的函数回调
            //如果上传失败
            if(res.code == 200){
                return layer.msg('上传失败！！');
            }else if(res.code == 0){
                //将新上传的文件名字加入到隐藏域中，添加房间的时候将新房间封面图路径加入到数据库
                $("#roomPicId").val(res.newFileName);
                return layer.msg('上传成功。。');
            }
            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });

    //输入房间号码
    $("#roomNum").blur(function () {
        var roomNum = $(this).val();//获得用户输入的房间号
        console.log(roomNum);
        //调用根据输入的房间号查询房间信息的方法
        loadRoomsByRoomNum(roomNum);
    });

    //房间添加或者修改的提交监听
    form.on('submit(demo3)', function(data){
        var jsonRooms = data.field //当前容器的全部表单字段，名值对形式：{name: value}
        console.log(jsonRooms);
        jsonRooms['roomStatus'] = '0';
        jsonRooms['flag'] = '1';
        if(saveOrUpd==0){//上面有将saveOrUpd定义为全局变量
            layer.msg("房间号重复saveOrUpd！！！",{icon:2,time: 2000,shade: 0.5,anim: 6})
        }else if(saveOrUpd==1){
            saveRooms(jsonRooms);  //执行添加的方法
            layer.closeAll();
        }else {
            updRoomsFlag(jsonRooms); //执行修改的方法
            layer.closeAll();
        }
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //(从不可用-->可用)
    function updRoomsFlag(jsonRooms) {
        $.ajax({
            type: 'POST',
            url: 'rooms/updByPrimaryKeySelective',
            data:jsonRooms,
            success: function (res) {
                if(res=='success'){
                    loadAllRooms();  //刷新房间信息
                    layer.msg("房屋重新可用成功。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("房屋重新可用失败！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });

    }

    //添加房间的方法
    function saveRooms(jsonRooms) {
        $.ajax({
            type: 'POST',
            url: 'rooms/saveT',
            data:jsonRooms,
            success: function (res) {
                if(res=='success'){
                    loadAllRooms();  //执行刷新房间信息的方法
                    layer.msg("房屋添加成功。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("房屋添加失败！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }


    //根据输入的房间号查询房间数据的方法
    function loadRoomsByRoomNum(roomNum) {
        $.ajax({
            type: 'POST',
            url: 'rooms/loadTByPramas',
            async:false,  //允许外部变量取到ajax异步加载的数据
            data: {"roomNum":roomNum},
            success: function (res) {
                if(res==""){
                    saveOrUpd = 1;
                    layer.tips('该房间号可用。。', '#roomNum', {tips: [2,'#28cf70'], time:3000});
                }else {
                    if(res.flag=='1'){
                        saveOrUpd = 0;
                        layer.tips('该房间已存在，不可用', '#roomNum', {tips: [2,'#c62e3d'], time:3000});
                    }else {
                        saveOrUpd = 2;
                        layer.tips('该房间已存在，可用', '#roomNum', {tips: [2,'#2e6bc6'], time:3000});
                    }
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }



    //修改房间状态显示的方法（1：显示 0不显示）(从可用-->不可用)
    function updRooms(roomButton) {
        $.ajax({
            type: 'POST',
            url: 'rooms/updByPrimaryKeySelective',
            data:{"id":roomButton.attr("roomid"),"flag":'0'},
            success: function (res) {
                if(res=='success'){
                    roomButton.parent().parent().remove();  //删除页面的房屋标签元素
                    layer.msg("房屋删除成功。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("房屋删除失败！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });

    }

    //修改房间状态的方法(0空闲，1已入住，2打扫)(从打扫-->空闲)
    function updRoomstatus(roomButton) {
        $.ajax({
            type: 'POST',
            url: 'rooms/updByPrimaryKeySelective',
            data:{"id":roomButton.attr("roomid"),"roomStatus":'0'},
            success: function (res) {
                if(res=='success'){
                    loadAllRooms();  //加载页面数据
                    layer.msg("房屋状态修改成功。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("房屋状态修改失败！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });

    }


    //修改空闲房间状态的方法(从可用-->不可用)
    function updRooms(roomButton) {
        console.log(roomButton.attr("roomid"));
        $.ajax({
            type: 'POST',
            url: 'rooms/updByPrimaryKeySelective',
            data:{"id":roomButton.attr("roomid"),"flag":'0'},
            success: function (res) {
                if(res=='success'){
                    roomButton.parent().parent().remove();  //删除页面的房屋标签元素
                    layer.msg("房屋删除成功。。",{icon:1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("房屋删除失败！！",{icon:2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });

    }

    //加载所有房间类型
    function loadAllRoomType() {
        $.ajax({
            type: 'POST',
            url: 'roomType/loadAllT',
            success: function (res) {
                var roomTypeStr = '<option value="" selected>--请选择房间类型--</option>';
                $.each(res,function (i,item) {
                    roomTypeStr += '<option value="'+item.id+'">'+item.roomTypeName+'--'+item.roomPrice+'</option>';
                })
                $("#selRoomType").html(roomTypeStr);
                form.render("select");
            },
            error: function () {
                layer.msg("服务器异常！！！",{icon:3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }


});