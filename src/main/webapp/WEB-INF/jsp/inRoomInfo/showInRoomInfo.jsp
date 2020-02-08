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
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
        .layui-table td img{
            width:60px;
            height: 60px;
        }
    </style>
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
    <!--关联退房的jsp页面-->
    <jsp:include page="exitRooms.jsp"/>
    <blockquote class="layui-elem-quote">入住信息查询</blockquote>
    <!--查询的表单-->
    <form class="layui-form" action="" lay-filter="example" >
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">选择分类</label>
                <div class="layui-input-block">
                    <select name="queryName">
                        <option value="" selected>全部</option>
                        <option value="rooms.roomNum">房间号</option>
                        <option value="customerName">客人姓名</option>
                        <option value="phone">手机号</option>
                        <option value="idcard">身份证号</option>
                    </select>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">关键字</label>
                <div class="layui-input-inline">
                    <input type="text" name="queryValue" autocomplete="off" class="layui-input" >
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button class="layui-btn" lay-submit="" lay-filter="demo1"><i class="layui-icon">&#xe615;</i>搜索</button>
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
<script src="js/showInRoomInfo.js"></script>
<!--数据表格的工具条-->
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="detail"><i class="layui-icon">&#xe615;</i>查看</a>
    {{#  if(d.outRoomStatus == 1){ }}
       <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
    {{#  } else { }}
       <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="exitIRI"><i class="layui-icon">&#xe6b2;</i>退房</a>
    {{#  } }}
</script>
<!--性别的自定义模板-->
<script type="text/html" id="genderTpl">
    {{#  if(d.gender == 1){ }}
        <font color="#663399">男</font>
    {{#  } else { }}
        <font color="#ff1493">女</font>
    {{#  } }}
</script>
<!--是否会员的自定义模板-->
<script type="text/html" id="isVipTpl">
    {{#  if(d.isVip == 1){ }}
       <font color="red">是</font>
    {{#  } else { }}
       <font color="gray">否</font>
    {{#  } }}
</script>
<!--入住信息状态的自定义模板-->
<script type="text/html" id="outRoomStatusTpl">
    {{#  if(d.outRoomStatus == 1){ }}
    <font color="green">已退房</font>
    {{#  } else { }}
    <font color="red">未退房</font>
    {{#  } }}
</script>
</html>

