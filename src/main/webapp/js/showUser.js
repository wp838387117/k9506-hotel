layui.use(['jquery','layer','table','form','laydate','element'], function() {
    var $ = layui.jquery,
        layer = layui.layer,   //实例化弹出层对象
        table = layui.table,   //实例化数据表格对象
        form = layui.form,    //实例化表单对象
        laydate = layui.laydate,  //实例化日期对象
        element = layui.element;

    var jsonSelUser = {};  //定义一个json变量

    var currentPage = 1;  //设置当前页为1

    loadUser();  //初始化用户信息

    //表格的数据加载
    function loadUser(){
        table.render({  //底层使用的依然是jquery中的ajax
            elem: '#demo'  //指定数据存放的容器位置
            ,height: 312   //容器的高度
            ,width:1480   //容器的宽度
            ,url: 'user/loadPageTByPramas' //后台服务器端的数据接口  后台返回的为Map<String,Object>类型的数据，必须将此类型数据JSON化
            ,where :jsonSelUser
            ,limit:3  //每一页显示的数据条数
            ,limits:[2,3,5,8,10]
            ,even:true
            ,page: true //开启分页  Map<String,Object>中的数据有：1.count:数据的条数  2.data:查询出的List<Emp>集合数据  3.code:响应的状态,0为成功  4.msg:响应的结果提示（可以不写）
            ,cols: [[ //表头  每一列   field: 'username'为实体对象的属性名  title: '用户名' 表格的列名  sort: true 根据此列数据进行排序
                {type:'checkbox',align:'center'}
                ,{field: 'id', title: 'ID', width:90, sort: true,align:'center'}
                ,{field: 'username', title: '用户名', width:120,align:'center'}
                ,{field: 'pwd', title: '用户密码', width:330, sort: true,align:'center'}
                ,{field: 'createDate', title: '创建时间', width:240, sort: true,align:'center'}
                ,{field: 'useStatus', title: '是否可用', width: 170,align:'center',templet:'#useStatusTpl'}
                ,{field: 'isAdmin', title: '用户类型', width:180,align:'center'}
                ,{field: 'roleName', title: '角色名', width: 180,align:'center',templet:'<div>{{d.roles.roleName}}</div>'}
                ,{title: '操作', width:110, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
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


    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if(layEvent === 'query'){ //查看

        }
    });

    //监听复选框进行用户状态的修改
    form.on('checkbox(statusCheckbox)', function(data){//data是用户点击复选框后获得的数据
        //是否被选中，如果选中，数据库用户状态改为启用，否则禁用
        var updIf = data.elem.checked;//得到的值为true或false
        var updUser = {};
        console.log(data); //打印出来的值：{elem: input, value: "15", othis: pe.fn.init(1)}
        console.log(data.value);//获得用户选中的id，打印出来的值为：15
        updUser['id'] = data.value;//将获得的id添加到json对象中
        var updMsg;
        if(updIf){
            //修改为启用
            updUser['useStatus'] = '1';
            updMsg = "启用"
        }else {
            //修改为禁用
            updUser['useStatus'] = '0';
            updMsg = "禁用"
        }
        //执行用户状态的修改的方法
        updUserStatus(updUser,updMsg);
    });

    //监听选项卡的选中事件
    element.on('tab(test)', function(elem){
        //jsonSelUser是全局变量，在将其作为参数，传入loadUser方法中
        jsonSelUser['useStatus'] = $(this).attr('status'); //获得用户选中数据的id
        loadUser();  //根据用户的选择重新加载表格
    });

    //修改用户状态
    function updUserStatus(updUser,updMsg) {
        $.ajax({
            type:'POST',
            url:'user/updByPrimaryKeySelective',
            data:updUser,
            success:function (res) {
                if(res=='success'){
                    layer.msg(updMsg+"修改成功。。。",{icon: 1,time: 2000,shade: 0.5,anim: 4})
                }else {
                    layer.msg(updMsg+"修改失败！！！",{icon: 2,time: 2000,shade: 0.5,anim: 4})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 3,time: 2000,shade: 0.5,anim: 4})
            }
        });
    }
});