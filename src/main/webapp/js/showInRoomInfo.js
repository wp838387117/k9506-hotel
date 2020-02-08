layui.use(['jquery', 'layer', 'table', 'form', 'laydate'], function () {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form,    //实例化表单对象
        laydate = layui.laydate;  //实例化日期对象

    var currentPage = 1;  //当前页，初始值为1

    var jsonSelINI = {};  //定义空的json数据

    var vipRate = 1;  //会员折扣

    loadINI(jsonSelINI);  //进行表格的初始化

    //日期时间选择器
    laydate.render({
        elem:"#endDate",
        value:new Date(),
        format:'yyyy/MM/dd HH:mm:ss',
        type:'datatime'
    });

    //数据的表格的方法级渲染
    function loadINI(jsonSelINI) {
        table.render({  //render：渲染的意思
            elem: '#demo'  //指定数据存放的容器位置
            , height: 450  //容器的高度
            , width: 1480   //容器的宽度render
            , where: jsonSelINI //传入到服务器端的查询条件
            , url: 'inRoomInfo/loadPageTByPramas' //后台服务器端的数据接口  后台返回的为Map<String,Object>类型的数据，必须将此类型数据JSON化
            , limit: 3  //每一页显示的数据条数
            , limits: [3, 5, 8, 10]
            , even: true
            , page: true //开启分页  Map<String,Object>中的数据有：1.count:数据的条数  2.data:查询出的List<Emp>集合数据  3.code:响应的状态,0为成功  4.msg:响应的结果提示（可以不写）
            , cols: [[ //表头  每一列   field: 'username'为实体对象的属性名  title: '用户名' 表格的列名  sort: true 根据此列数据进行排序
                {type: 'checkbox', align: 'center'}
                , {field: 'id', title: 'ID', width: 50, sort: true, align: 'center'}
                , {field: 'roomNum', title: '房间编号', width: 90, align: 'center', templet: '<div>{{d.rooms.roomNum}}</div>'}
                , {field: 'roomPic', title: '封面图', width: 120, sort: true, align: 'center', templet: '<div><img src="{{d.rooms.roomPic}}"/></div>'}
                , {field: 'roomTypeName', title: '类型名称', width: 100, align: 'center', templet: '<div>{{d.rooms.roomType.roomTypeName}}</div>'}
                , {field: 'roomPrice', title: '价格', width: 70, align: 'center', templet: '<div>{{d.rooms.roomType.roomPrice}}</div>'}
                , {field: 'customerName', title: '客户名', width: 80, sort: true, align: 'center'}
                , {field: 'gender', title: '性别', width: 80, sort: true, align: 'center', templet: '#genderTpl'}
                , {field: 'isVip', title: 'VIP', width: 60, align: 'center', templet: '#isVipTpl'}
                , {field: 'idcard', title: '身份证号', width: 180, align: 'center'}
                , {field: 'phone', title: '手机号', width: 120, align: 'center'}
                , {field: 'money', title: '押金', width: 70, align: 'center'}
                , {field: 'createDate', title: '入住时间', width: 140, align: 'center'}
                , {field: 'outRoomStatus', title: '状态', width: 80, align: 'center', templet: '#outRoomStatusTpl'}
                , {title: '操作', width: 180, align: 'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
            , done: function (res, curr, count) {  //进行表格加载数据后的函数回调
                /*
                 *res:服务器端控制器响应回页面的所有的数据Map<String,Object>
                 *curr:表示当前页  ，count:表示为总的数据条数
                 */
                currentPage = curr;
                hoverOpenImg();//显示大图
            }
        });
    }

    //放大图像的方法
    function hoverOpenImg() {
        var img_show = null; // tips提示
        $('td img').hover(function () {
            var img = "<img class='img_msg' src='" + $(this).attr('src') + "' style='width:230px;' />";
            img_show = layer.tips(img, this, {
                tips: [2, 'rgba(41,41,41,.5)']
                , area: ['260px']
            });
        }, function () {
            layer.close(img_show);
        });
        $('td img').attr('style', 'max-width:70px');
    }

    //监听条件查询功能
    form.on('submit(demo1)', function (data) {
        /* console.log(data.field); //获得当前容器的全部表单字段 ，形式为：{name:value}*/
        jsonSelINI = {};  //定义查询的条件
        //将查询的条件转成json数据
        jsonSelINI[data.field.queryName] = data.field.queryValue;
        //在控制台打印获得的数据
        console.log(jsonSelINI);
        currentPage = 1;  //将当前页重新为1
        //重新加载数据表格并传入查询的参数
        loadINI(jsonSelINI);
        return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可
    })

    //表的监听工具条
    table.on('tool(test)', function (obj) {//注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if (layEvent === "detail") {  //查看
            layer.msg("执行了查看操作！")
        } else if (layEvent === "del") { //删除功能
            layer.confirm("确定删除信息吗？", {icon: 3}, function (index) {
                //执行修改入住信息状态的服务器端操作
                updINIStatus(obj);
                layer.close(index);
            })
        } else if (layEvent === 'exitIRI') {//退房功能
            layer.confirm('您现在确定要退房码？',{icon: 7}, function(index){
                //1.将数据回显exitInRoomInfoForm 即 class="layui-form" 所在元素对应的 lay-filter="" 对应的值
                form.val("exitInRoomInfoForm", {
                    "roomNum": data.rooms.roomNum
                    ,"customerName": data.customerName
                    ,"idcard": data.idcard
                    ,"roomPrice": data.rooms.roomType.roomPrice
                    ,"createDate": data.createDate
                })
                //清空其他消费和退房备注
                $("#otherPrice").val(0);  //id选择器
                $("textarea").val("");  //标签选择器
                if(data.isVip=="1"){
                    //如果为会员
                    $("#isVip").val("是");
                    //根据身份证号查询会员信息
                    /*console.log(data.idcard);*/
                    loadVipByIdCard(data.idcard);
                }else {
                    //如果不是会员
                    $("#isVip").val("否");
                    $("#vipNum").val("无");
                    vipRate = 1;  //非会员的折扣为1
                }

                var startDate = getDateStr(data.createDate);  //得到处理过后的开始入住时间
                var endDate = getDateStr($("#endDate").val());  //得到处理过后的结束入住时间
                /*console.log(data.createDate); //2019/07/20 08:40:52
                console.log(startDate) ; //2019/07/20
                console.log(endDate); //2019/08/28*/
                //计算入住的天数
                var days = getDays(startDate,endDate); //调用计算入住天数的方法
                /*console.log(days)*/
                //如果入住当天就办理退房，系统计算出的时间就为0，那么这时候就将天数设为1
                if(days==0){
                    days = 1;
                }
                $("#days").text(days);  //将计算的入住天数在页面上显示出来
                //计算消费的金额（房间的消费金额）,弹框打开时就已计算  .toFixed(2)保留2位小数
                var rprice = (data.rooms.roomType.roomPrice * days * vipRate).toFixed(2);
                $("#zprice").text(rprice);
                //2.将退房的表单弹框显示
                layer.open({
                    type:1,
                    title:"退房操作界面",
                    area:['700px','550px'],
                    shade:0.6,
                    anim:4,
                    content:$("#exitInRoomInfoDiv")
                });
                //3.计算总的消费金额（房间的消费金额+其它消费）
                $("#otherPrice").blur(function () {
                    var otherPrice = $(this).val(); //获得输入的其他消费金额
                    if(otherPrice!=''){  //判断消费金额不为空
                        if(otherPrice>=0){ //并且大于0
                            //计算总共的消费金额=房间消费金额+其他消费金额
                            var zprice = (parseFloat(rprice) + parseFloat(otherPrice)).toFixed(2);
                            $("#zprice").text(zprice); //将计算的总金额添加到页面中
                        }else {
                            layer.msg("其它消费金额必须大于0！！",{icon: 7,time: 2000,shade: 0.5,anim: 6})
                        }
                    }else {
                        layer.msg("其它消费必填！！",{icon: 7,time: 2000,shade: 0.5,anim: 6})
                    }
                });
                layer.close(index); //关闭当前弹窗

                //监听退房的提交
                form.on('submit(demo3)',function (res) {
                    console.log(res.field);//当前容器的全部表单字段，名值对形式：{name: value}
                    var exitJsonRoom=res.field; //获得退房时的表单中的数据
                    var saveJsonOrders={};//定义添加订单的json数据的对象
                    saveJsonOrders['remark']=res.field.remark;
                    saveJsonOrders['orderMoney']=$("#zprice").text();
                    saveJsonOrders['orderStatus']="0";
                    saveJsonOrders['iriId']=data.id;
                    saveJsonOrders['createDate']=getNowDate(new Date());//yyyy/MM//dd HH:mm:ss
                    saveJsonOrders['flag']="1";
                    //获取订单编号  //yyyy/MM//dd HH:mm:ss  并将其转成 -->yyyyMMddHHMMss再加上6位的随机数
                    saveJsonOrders['orderNum']=dateReplace(saveJsonOrders.createDate)+getRandom(6);
                    //获取退房时的客人信息：房号+客户姓名+入住时间+入住天数   8201,独角大仙,2019/07/12 08:27:28,2019/07/14 10:14:41,2
                    saveJsonOrders['orderOther']=exitJsonRoom.roomNum+","+exitJsonRoom.customerName+","+exitJsonRoom.createDate+","+$("#days").text();
                    //退房时的各种金额:房价+其他消费+总消费
                    saveJsonOrders['orderPrice']=exitJsonRoom.roomPrice+","+exitJsonRoom.number+","+$("#zprice").text();
                    //在控制台打印退房后获得的客户订单信息，其作用是存入数据库中转成消费记录
                    console.log(saveJsonOrders);
                    saveOrders(saveJsonOrders);  //调用将退房后的订单信息添加数据库的方法
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                })
            });
        }
    });

    //批量删除
    $("#batchBtn").click(function () {
        table.che
        var checkStatus = table.checkStatus("demo");//从demo容器中获得用户选中的对象
        var data = checkStatus.data ////获取选中行的数据
        if (data.length == 0) {
            layer.msg("您还未选择删除的数据！", {icon: 7, time: 2000, shade: 0.5, anim: 6})
        } else {
            var falg = true; //判断是否执行批量删除
            var ids = "";//定义要删除的ids变量  18,30,32
            for (var i = 0; i < data.length; i++) {
                if (data[i].outRoomStatus == "0") {
                    falg = false;
                    break;
                }
                ids += data[i].id + ",";
            }
            if (falg) {
                layer.confirm('您确定要删除选中的入住信息码？', {icon: 3}, function (index) {
                    //表明选中的数据均可以删除
                    ids.substring(0, ids.length - 1);  //去掉最后一个逗号
                    //调用批量修改入住信息的方法并传入参数
                    updBatchINIStatus(ids);
                    layer.close(index); //关闭所有弹窗
                })
            } else {
                layer.msg("您选中的有未退房的，不能删除！", {icon: 7, time: 2000, shade: 0.5, anim: 6})
            }
        }
    });


    //执行修改入住信息状态的服务器端操作
    function updINIStatus(obj) {
        $.ajax({
            type: 'POST',
            url: 'inRoomInfo/updByPrimaryKeySelective',
            data: {'id': obj.data.id, 'status': 0},
            success: function (res) {
                if (res == 'success') {
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.msg("删除成功！", {icon: 1, time: 2000, shade: 0.5, anim: 4})
                } else {
                    layer.msg("删除失败！", {icon: 2, time: 2000, shade: 0.5, anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！", {icon: 3, time: 2000, shade: 0.5, anim: 4})
            }
        });
    }

    //批量修改入住信息的方法
    function updBatchINIStatus(ids) {
        $.ajax({
            type: "post",
            url: "inRoomInfo/updBatchByPrimaryKeySelective",
            data: {"ids": ids, "status": 0},
            success: function (res) {
                if (res === 'success') {
                    loadINI(jsonSelINI); //数据的表格的方法级渲染
                    layer.msg("批量删除成功！", {icon: 1, time: 2000, shade: 0.5, anim: 4})
                } else {
                    layer.msg("批量删除失败！", {icon: 2, time: 2000, shade: 0.5, anim: 4})
                }
            },
            error: function () {
                layer.msg("服务器异常！", {icon: 3, time: 2000, shade: 0.5, anim: 4})
            }
        })
    }
    //根据身份证号查询会员信息的方法
    function loadVipByIdCard(idcard) {
        $.ajax({
            type:"post",
            url:"vip/loadTByPramas",
            async:false, //允许外部变量取到ajax异步加载的数据
            data:{'idcard':idcard},
            success:function (res) {
                $("#vipNum").val(res.vipNum);
                vipRate=res.vipRate; //取到会员的折扣率
            },
            error:function () {
                layer.msg("服务器异常！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        })
    }

    //计算天数的方法
    function getDays(startDate,endDate){  //2019/09/09   2019/10/10
        var date1Str = startDate.split("/");
        var date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
        var date2Str = endDate.split("/");
        var date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
        var t1 = date1Obj.getTime();
        var t2 = date2Obj.getTime();
        var datetime=1000*60*60*24;
        var minusDays = Math.floor(((t2-t1)/datetime));
        var days = Math.abs(minusDays);
        return minusDays;
    }

    //将目前的时间格式2019/08/06 12:12:08 转成-->  2019/08/06，去掉时分秒
    function getDateStr(dateStr) {
        var indexOf = dateStr.indexOf(" ");  //取到空白处" "的下标
        dateStr = dateStr.substring(0,indexOf);  //第1个参数为下标，第2个参数为切割的字符串长度
        console.log(dateStr);
        return dateStr;
    }
    //获取当前时间字符串的方法，Date()   ---->  yyyy/MM//dd HH:mm:ss 格式的字符串
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

   //转化日期类型的方法,把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }

    //获取随机数的方法
    function getRandom(num) {
        var count = '';   //随机数
        for (var i=0;i<num;i++){
            count += parseInt(Math.random()*10)  //0.123123123...
        }
        return count;
    }

    //将退房后的订单信息添加数据库的方法
    function saveOrders(saveJsonOrders){
        $.ajax({
            type:'POST',
            url:'orders/saveT',
            data:saveJsonOrders,
            success:function (res) {
                console.log(res);
                if (res === 'success') {
                    loadINI(jsonSelINI); //数据的表格的方法级渲染
                    layer.close(index); //关闭所有弹窗
                    layer.msg("退房成功！。", {icon: 1, time: 2000, shade: 0.5, anim: 4})
                } else {
                    layer.msg("退房失败！", {icon: 2, time: 2000, shade: 0.5, anim: 4})
                }
            },
            error:function () {
                layer.msg("服务器异常！",{icon: 3,time: 2000,shade: 0.5,anim: 4});
            }
        });
    }
});


