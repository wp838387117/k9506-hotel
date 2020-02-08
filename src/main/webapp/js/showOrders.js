layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,  //实例化jquery对象
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form,    //实例化表单对象
        laydate = layui.laydate;  //实例化日期对象

    var currentPage = 1;   //当前页，初始值为1

    var jsonSelOrders = {};   //查询订单的条件

    //数据初始化
    loadOrders(jsonSelOrders);
    //日期时间范围
    laydate.render({
        elem: '#test3'
        ,type: 'datetime'
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,max:0   //当前时间后可选择的最大时间
        ,range: true   //使用时间范围的选择
    });

    //加载订单
    function loadOrders(jsonSelOrders) {
    table.render({  //底层使用的依然是jquery中的ajax
        elem: '#demo'  //指定数据存放的容器位置
        ,height: 350   //容器的高度
        ,width:1480 //容器的宽度
        ,where:jsonSelOrders  //查询的参数作为条件
        ,url: 'orders/loadPageTByPramas' //后台服务器端的数据接口  后台返回的为Map<String,Object>类型的数据，必须将此类型数据JSON化
        ,limit:3  //每一页显示的数据条数
        ,limits:[2,3,5,8,10]
        ,even:true
        ,page: true //开启分页  Map<String,Object>中的数据有：1.count:数据的条数  2.data:查询出的List<Emp>集合数据  3.code:响应的状态,0为成功  4.msg:响应的结果提示（可以不写）
        ,cols: [[ //表头  每一列   field: 'username'为实体对象的属性名  title: '用户名' 表格的列名  sort: true 根据此列数据进行排序
            {type:'checkbox',align:'center'}
            ,{field: 'id', title: 'ID', width:55, sort: true,align:'center'}
            ,{field: 'orderNum', title: '订单编号', width:200,align:'center'}
            ,{field: 'customerName', title: '客人姓名', width:100, sort: true,align:'center',templet: '<div>{{d.inRoomInfo.customerName}}</div>'}
            ,{field: 'idcard', title: '身份证号', width:190,align:'center',templet: '<div>{{d.inRoomInfo.idcard}}</div>'}
            ,{field: 'isVip', title: 'VIP', width:60,align:'center',templet:'#isVipTpl'} //templet:模板的意思   #isVipTpl：通过id选择器定位到showOrders.jsp类中的自定义模板，从而获得值
            ,{field: 'phone', title: '手机号', width: 150, sort: true,align:'center',templet: '<div>{{d.inRoomInfo.phone}}</div>'}
            ,{field: 'createDate', title: '下单时间', width: 180, sort: true,align:'center'}
            ,{field: 'orderMoney', title: '总价', width:80,align:'center',event: 'setOrderMoney'}  //event:设置事件
            ,{field: 'remark', title: '备注', width: 220,align:'center',edit: 'text'} //edit:增加编辑的文本框
            ,{field: 'orderStatus', title: '状态', width: 80,align:'center',templet:'#orderStatusTpl'}
            ,{title: '操作', width:100, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
        ]]
        ,done:function (res, curr, count) {  //进行表格加载数据后的函数回调
            /*
             *res:服务器端控制器响应回页面的所有的数据Map<String,Object>
             *curr:表示当前页  ，count:表示为总的数据条数
             */
            currentPage = curr;
        }
    });
    }
    //监听条件查询功能
    form.on('submit(demo1)', function(data){
        jsonSelOrders = data.field; //将从前台获得的数据对象转成Json对象
       /* console.log(data.field);*/
        if(jsonSelOrders.queryTimes!=''){ //判断用户在Json对象中的查询时间的属性是否有输入
            //通过切割字符串queryTimes，得到查询的时间的数组
            var arrTimes = jsonSelOrders.queryTimes.split(" - ");
            jsonSelOrders['startDate'] = arrTimes[0]; //得到开始时间
            jsonSelOrders['endDate'] = arrTimes[1];//得到结束时间
        }
        //将jsonSelOrders对象中queryTimes的属性删除
        delete jsonSelOrders['queryTimes'];
        currentPage = 1;  //将当前页重新为1
        loadOrders(jsonSelOrders);  //执行条件查询的方法
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //事件监听工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if(layEvent === 'ordersPay'){ //支付的功能
            console.log(obj.data);
           /* console.log(obj);*/
           layer.confirm("真的要支付订单吗?",function (index) {
               window.open("orders/toOrdersPay?orderNum="+data.orderNum+"&orderMoney="+data.orderMoney);
               layer.close(index);
           })
        } else if(layEvent === 'del'){ //删除的功能
            layer.confirm('真的删除此订单么？',{icon:7}, function(index){
                updOrdersFlag(obj);//调用删除单条数据的方法
                layer.close(index);
            });
        }else if(layEvent === 'setOrderMoney'){//设置总价的功能
            if(data.orderStatus=='0'){
                layer.prompt({
                    formType: 2
                    ,title: '修改客人姓名为 ['+ data.inRoomInfo.customerName +'] 的订单总价（最低再打8折）'
                    ,value: data.orderMoney  //原有的订单总价
                }, function(value, index){//value:为当前用户输入的值
                    var minPrice = data.orderMoney*0.8.toFixed(2);//设定的最小值
                    if(value>=minPrice){
                        if(value<=data.orderMoney){  //value范围在原有价格的0.8-1
                            //进行数据库的订单总价的修改，这里一般是发送修改的Ajax请求
                            updOrdersMoney(obj,value);
                        }else {
                            layer.msg("新输入的订单总价不能大于原有的！！！",{icon:3,time: 2000,shade: 0.5,anim: 6})
                        }
                    }else {
                        layer.msg("您输入的订单总价有误！！！",{icon:7,time: 2000,shade: 0.5,anim: 6})
                    }
                    layer.close(index);
                });
            }else {
                layer.msg("您选中订单已支付，不能修改！！！",{icon:7,time: 2000,shade: 0.5,anim: 6})
            }
        }
    });

    //批量删除
    $("#batchBtn").click(function () {
        var checkStatus = table.checkStatus('demo'); //idTest 即为基础参数 id 对应的值
        var data = checkStatus.data;  //选中的数据数组
        if(data.length!=0){
            //定义删除的订单ids
            var ids = '';
            //判断是否存在未支付订单的变量
            var flag = true;
            for (var i=0;i<data.length;i++){
                if(data[i].orderStatus=='0'){   //选中的订单存在未支付
                    flag = false;
                    break;  //跳出循环
                }
                ids += data[i].id + ",";
            }
            if(flag){  //选中的订单中没有未支付的
                layer.confirm('真的删除选中的订单么？',{icon:3}, function(index) {
                    ids = ids.substring(0, ids.length - 1);
                    updBatchStatus(ids);  //批量修改订单状态
                    layer.close(index);  //关闭当前询问框
                });
            }else {
                layer.msg("您选中的订单有未支付的！！！",{icon:3,time: 2000,shade: 0.5,anim: 6})
            }
        }else {
            layer.msg("您还未选择删除的订单！！！",{icon:7,time: 2000,shade: 0.5,anim: 6})
        }
    });

    //监听单元格编辑(修改订单备注)
    table.on('edit(test)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //所在行的所有相关修改后数据
        if(data.orderStatus!='1'){
            updOrdersRemark(data.id,data.remark);
        }else {
            flush(jsonSelOrders);  //不能让用户修改已支付的订单备注，刷新显示表格
            layer.msg("已支付订单不能修改备注！！！",{icon: 3,time: 2000,shade: 0.5,anim: 6})
        }
    });
    
    //表格刷新
/*    function flush(jsonSelOrders) {
        table.reload('demo', {
            where: jsonSelOrders
            ,page: {
                curr: currentPage //重新从第 1 页开始
            }
        }); //只重载数据
    }*/

    //完成订单状态的修改
    function updOrdersFlag(obj) {
        $.ajax({
            type:'POST',
            url:'orders/updByPrimaryKeySelective',
            data:{'id':obj.data.id,'flag':'0'},
            success:function (res) {
                if(res=='success'){
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.msg("订单删除成功。。",{icon: 1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("订单删除失败！！",{icon: 2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //批量修改订单状态的方法
    function updBatchStatus(ids) {
        $.ajax({
            type:'POST',
            url:'orders/updBatchByPrimaryKeySelective',
            data:{'ids':ids,'flag':'0'},
            success:function (res) {
                if(res=='success'){
                    flush(jsonSelOrders);
                    layer.msg("订单批量删除成功。。",{icon: 1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("订单批量删除失败！！",{icon: 2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //修改订单备注
    function updOrdersRemark(id,remark) {
        $.ajax({
            type:'POST',
            url:'orders/updByPrimaryKeySelective',
            data:{'id':id,'remark':remark},
            success:function (res) {
                if(res=='success'){
                    layer.msg("订单备注修改成功。。",{icon: 1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("订单备注修改失败！！",{icon: 2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }

    //修改订单总价的方法
    function updOrdersMoney(obj,value) {  //value是上面传下来的
        $.ajax({
            type:'POST',
            url:'orders/updByPrimaryKeySelective',
            data:{'id':obj.data.id,'orderMoney':value},
            success:function (res) {
                if(res=='success'){
                    //同步更新表格和缓存对应的值
                    obj.update({  //页面缓存数据的修改（数据库的修改成功后再被使用）
                        orderMoney: value   //name = value;
                    });
                    layer.msg("订单总价修改成功。。",{icon: 1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg("订单总价修改失败！！",{icon: 2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }
});