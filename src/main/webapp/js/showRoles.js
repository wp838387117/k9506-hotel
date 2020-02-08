layui.use(['layer','table','form','laydate'], function() {
    var layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form,    //实例化表单对象
        laydate = layui.laydate;  //实例化日期对象

    var jsonSelRole = {};

    //表格的数据加载
    table.render({  //底层使用的依然是jquery中的ajax
        elem: '#demo'  //指定数据存放的容器位置
        ,height: 312   //容器的高度
        ,width:1500   //容器的宽度
        ,url: 'roles/loadPageTByPramas' //后台服务器端的数据接口  后台返回的为Map<String,Object>类型的数据，必须将此类型数据JSON化
        ,where :jsonSelRole
        ,limit:3  //每一页显示的数据条数
        ,limits:[2,3,5,8,10]
        ,even:true
        ,page: true //开启分页  Map<String,Object>中的数据有：1.count:数据的条数  2.data:查询出的List<Emp>集合数据  3.code:响应的状态,0为成功  4.msg:响应的结果提示（可以不写）
        ,cols: [[ //表头  每一列   field: 'username'为实体对象的属性名  title: '用户名' 表格的列名  sort: true 根据此列数据进行排序
            {type:'checkbox',align:'center'}
            ,{field: 'id', title: 'ID', width:90, sort: true,align:'center'}
            ,{field: 'roleName', title: '角色名', width:150,align:'center'}
            ,{field: 'createDate', title: '创建时间', width:240, sort: true,align:'center'}
            ,{field: 'firstAuths', title: '二级权限', width: 480,align:'center'}
            ,{field: 'status', title: '状态', width:160,align:'center',templet:'#statusTpl'}
            ,{field: 'flag', title: '角色类型', width: 190,align:'center',templet:'#flagTpl'}
            ,{title: '操作', width:140, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
        ]]
        ,done:function (res, curr, count) {  //进行表格加载数据后的函数回调
            /*
             *res:服务器端控制器响应回页面的所有的数据Map<String,Object>
             *curr:表示当前页  ，count:表示为总的数据条数
             */
            currentPage = curr;
        }
    });
    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'query'){ //查看
            //1.将角色的权限树形图进行初始化
            loadZtree('authority/loadAuthByRoleId?roleId='+data.id);
            //2.将初始化的树形图弹框显示
            layer.open({
                type:1,
                title:'<font color="red">'+data.roleName+'：</font>角色权限树形图显示界面',
                area:['350px','500px'],
                shade:0.6,
                anim:4,
                content:$("#ztreeDiv"),
                cancel: function(){
                    //右上角关闭回调
                    $("#ztreeDiv").hide();  //将树形图的弹框从新隐藏
                }
            });
        }
    });

    //加载角色的权限树形图
    function loadZtree(dataUrl) {
        var setting = {
            data : {
                simpleData : {
                    enable : true,   //使用格式化后的数据
                    idKey : "id",       // 结点的id,对应到Json中的id
                    pIdKey : "parent",     // 结点的pId,父节点id,对应到Json中的pid
                    rootPId : 0         // 根节点设置为0
                },
                key : {
                    name : "authorityName" // 结点显示的name属性，对应到Json中的rName
                }
            },
            check: {
                enable: true   //是否使用节点复选框，默认为false(不使用)
            },
            async : {
                enable : true,  //使用异步数据：从服务器端获取数据
                url:dataUrl,    //服务器端访问路径
                autoParam:["id", "name=n", "level=lv"],
                otherParam:{"otherParam":"zTreeAsyncTest"}
            }
        };
        $.fn.zTree.init($("#test1"), setting);  //树形结构的数据初始化
    }


});