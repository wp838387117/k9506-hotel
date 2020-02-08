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

    <!--引入ztree相关css和js文件-->
    <link rel="stylesheet" href="lib/zTree/css/icomoon_styles.css" type="text/css">
    <link rel="stylesheet" href="lib/zTree/css/metroStyle.css" type="text/css">
    <script type="text/javascript" src="lib/zTree/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.exedit.js"></script>

    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
    <blockquote class="layui-elem-quote">角色信息详情</blockquote>
    <div align="center">
        <!--权限树形容器-->
        <div id="ztreeDiv" class="content_wrap" style="display: none;">
            <div class="zTreeDemoBackground left">
                <ul id="test1" class="ztree"></ul>
            </div>
        </div>
        <!--存放表格中数据的容器-->
        <table id="demo" lay-filter="test"></table>
    </div>
</body>
<!--引入自定义的js文件-->
<script src="js/showRoles.js"></script>
<!--数据表格的工具条-->
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="query">查看</a>
</script>
<!--角色状态的自定义模板-->
<script type="text/html" id="statusTpl">
    {{#  if(d.status == 1){ }}
    <font color="#663399">启用</font>
    {{#  } else { }}
    <font color="#ff1493">禁用</font>
    {{#  } }}
</script>
<!--角色类型的自定义模板-->
<script type="text/html" id="flagTpl">
    {{#  if(d.flag == 1){ }}
    <font color="red">超级角色</font>
    {{#  } else { }}
    <font color="gray">普通角色</font>
    {{#  } }}
</script>
</html>