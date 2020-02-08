<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
    <blockquote class="layui-elem-quote">订单信息详情</blockquote>
    <!--查询的表单-->
    <form class="layui-form" action="" lay-filter="example">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">订单编号</label>
                <div class="layui-input-inline">
                    <input type="text" name="orderNum" autocomplete="off" class="layui-input" placeholder="请输入订单编号">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">时间范围</label>
                <div class="layui-input-inline" style="width: 250px;">
                    <input type="text" class="layui-input" id="test3" placeholder="请选择时间范围" name="queryTimes">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">订单状态</label>
                <div class="layui-input-block" >
                    <select name="orderStatus">
                        <option value="" selected>全部</option>
                        <option value="1">已支付</option>
                        <option value="0">未支付</option>
                    </select>
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button class="layui-btn" lay-submit="" lay-filter="demo1"><i class="layui-icon">&#xe615;</i>查询</button>
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button type="button" class="layui-btn layui-btn-danger" id="batchBtn"><i class="layui-icon">&#xe640;</i>批量删除</button>
                </div>
            </div>
        </div>
    </form>
    <!--存放表格中数据的容器-->
    <table id="demo" lay-filter="test"></table>
</body>
<!--引入自定义的js文件-->
<script src="js/showOrders.js"></script>
<!--数据表格的工具条-->
<script type="text/html" id="barDemo">
    {{#  if(d.orderStatus == 1){ }}
       <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    {{#  } else { }}
       <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="ordersPay"><i class="layui-icon">&#xe6b2;</i>支付</a>
    {{#  } }}
</script>
<!--是否会员的自定义模板-->
<script type="text/html" id="isVipTpl">
    {{#  if(d.isVip == 1){ }}
       <font color="red">否</font>
    {{#  } else { }}
       <font color="gray">是</font>
    {{#  } }}
</script>
<!--入住信息状态的自定义模板-->
<script type="text/html" id="orderStatusTpl">
    {{#  if(d.orderStatus == 1){ }}
    <font color="green">已支付</font>
    {{#  } else { }}
    <font color="red">未支付</font>
    {{#  } }}
</script>
</html>