<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<!--会员修改的表单-->
<div style="display: none;margin-top: 20px;" id="updVipDiv">
    <form class="layui-form layui-form-pane" action="" style="margin-left: 50px;" lay-filter="updVipForm">
        <input type="hidden" name="id"/> <%--隐藏域id--%>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">手机号</label>
                <div class="layui-input-inline">
                    <input type="text" name="phone" id="phone" lay-verify="required|phone" autocomplete="off" class="layui-input" placeholder="请输入手机号">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">原类型：</label>
                <div class="layui-input-block">
                    <input type="text" id="oldVipType" name="oldVipType" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">会员类型：</label>
            <div class="layui-input-inline">
                <select id="vipRate" name="vipRate" lay-verify="required">
                    <option value="">请选择会员类型</option>
                    <option value="0.9">普通会员</option>
                    <option value="0.8">超级会员</option>
                </select>
            </div>
        </div>
        <div class="layui-form-item" style="margin-left: 70px;margin-top: 30px;">
            <button class="layui-btn layui-btn-lg" lay-submit="" lay-filter="demo3"><i class="layui-icon">&#xe605;</i>确认修改</button>
        </div>
    </form>
</div>

</body>
</html>
