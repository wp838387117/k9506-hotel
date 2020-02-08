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
    <jsp:include page="updVip.jsp"/>

    <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
        <legend>Vip会员信息页面</legend>
    </fieldset>
    <!--批量删除的按钮-->
    <p style="margin-top:10px;margin-left: 20px;" >
    <form class="layui-form layui-form-pane" action="" style="display: inline-block;float: right;">
        <div class="layui-form-item" style="display: inline-block;">
            <div class="layui-inline" style="margin-top: 8px;">
                <label class="layui-form-label">身份证号</label>
                <div class="layui-input-inline" >
                    <input type="text" name="idcard" id="idcard" autocomplete="off" class="layui-input" placeholder="请输入身份证号">
                </div>
            </div>
            <div class="layui-inline" style="margin-top: 8px;">
                <label class="layui-form-label">会员卡号</label>
                <div class="layui-input-inline">
                    <input type="text" name="vipNum" id="vip_num" autocomplete="off" class="layui-input" placeholder="请输入会员卡号">
                </div>
            </div>
            <div class="layui-inline" style="margin-top: 8px;">
                <label class="layui-form-label">会员类型</label>
                <div class="layui-input-inline">
                    <select name="vipRate">
                        <option value="" selected>全部</option>
                        <option value="0.8">超级会员</option>
                        <option value="0.9">普通会员</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="layui-form-item" style="display: inline-block;">
            <button class="layui-btn" lay-submit="" lay-filter="demo2"><i class="layui-icon">&#xe615;</i>查询</button>
        </div>
    </form>
    </p>
    <!--数据表格展示-->
    <div align="center" style="float: left;">
       <table id="demo" lay-filter="test"></table>
    </div>
</body>
<!--引入自定义的js文件-->
<script src="js/showVip.js"></script>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="editVip"><i class="layui-icon">&#xe609;</i>修改</a>
</script>
<script type="text/html" id="genderTpl">
    {{#  if(d.gender == 1){ }}
        <font color="#663399">男</font>
    {{#  } else { }}
        <font color="#ff1493">女</font>
    {{#  } }}
</script>
<script type="text/html" id="vipTypeTpl">
    {{#  if(d.vipRate == 0.9){ }}
    <font color="#8a2be2">普通会员</font>
    {{#  } else { }}
    <font color="#ffd700">超级会员</font>
    {{#  } }}
</script>

</html>