package com.kgc.interceptor;

import com.kgc.entity.User ;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *   自定义用户登录的拦截器
 */
public class MyInterceptor implements HandlerInterceptor {

    //日志对象
    private static final Logger log = LogManager.getLogger(MyInterceptor.class);

    //拦截的核心方法
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        log.info("执行了preHandle方法。。。。");
        //1.得到session容器
        HttpSession session = request.getSession();
        //2.取到session容器中的登录的用户
        User loginUser = (User)session.getAttribute("loginUser");
        //3.根据用户是否存在判断其有没有登录
        if(loginUser!=null){
            return true;  //此拦截器放行该请求，继续执行其它的拦截器
        }else {
            //4.转发到登录页面
            request.setAttribute("loginMsg","loginMsg");
            request.getRequestDispatcher("/model/toLogin").forward(request,response);
            return false;  //表示该请求被拦截下来了
        }

    }

    //拦截的执行POST请求的方法
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView modelAndView) throws Exception {
        log.info("执行了postHandle方法。。。。");
    }

    //拦截的执行之后的方法
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object o, Exception e) throws Exception {
        log.info("执行了afterCompletion方法。。。。");
    }
}
