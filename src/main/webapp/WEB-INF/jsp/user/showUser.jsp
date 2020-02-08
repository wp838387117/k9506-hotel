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
    <blockquote class="layui-elem-quote">平台用户信息详情</blockquote>
    <div align="center">
        <div class="layui-tab" lay-filter="test" style="margin-left: 25px;">
            <ul class="layui-tab-title">
                <li class="layui-this" status="">全部</li>
                <li status="1">启用</li>
                <li status="0">禁用</li>
            </ul>
        </div>
        <!--存放表格中数据的容器-->
        <table id="demo" lay-filter="test"></table>
    </div>
</body>
<!--引入自定义的js文件-->
<script src="js/showUser.js"></script>
<!--数据表格的工具条-->
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="query">查看</a>
</script>
<!--角色状态的自定义模板-->
<script type="text/html" id="useStatusTpl">
    {{#  if(d.useStatus == 1){ }}
        <input type="checkbox" value="{{d.id}}" name="useStatus" lay-filter="statusCheckbox" title="启用" checked>
    {{#  } else { }}
        <input type="checkbox" value="{{d.id}}" name="useStatus" lay-filter="statusCheckbox" title="启用">
    {{#  } }}
</script>
</html>