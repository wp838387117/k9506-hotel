package com.kgc.controller;

import com.kgc.entity.User ;
import com.kgc.util.MD5 ;
import com.kgc.util.VerifyCodeUtils ;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 *   用户控制器层
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController<User>{

    //获取登录验证验证码
    @RequestMapping("/getVerifyCode")
    public void getVerifyCode(HttpServletResponse response, HttpSession session){
        //获取5位长度的验证码
        String verifyCode = VerifyCodeUtils.generateVerifyCode(5);
        //将验证码放入到session容器中（可以不区分大小写，存时全部转为小写）
        session.setAttribute("verifyCode",verifyCode.toLowerCase());
        try {
            //将生成的验证码响应显示到页面中
            VerifyCodeUtils.outputImage(250,35,response.getOutputStream(),verifyCode);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //验证用户输入验证码是否正确
    @RequestMapping("/yzVerifyCode")
    public @ResponseBody String yzVerifyCode(String verifyCode, HttpSession session){
        //得到用户输入之前的显示的验证码与用户输入的验证码进行比较
        if(verifyCode.toLowerCase().equals(session.getAttribute("verifyCode"))){
            return "success";
        }else {
            return "fail";
        }
    }

    //用户登录
    @RequestMapping("/login")
    public @ResponseBody String login(User user,HttpSession session){
        //将用户输入的密码进行加密（去登录）
        user.setPwd(MD5.md5crypt(user.getPwd()));
        try {
            //根据用户名和密码进行登录
            User loginUser = baseService.findTByPramas(user);
            if(loginUser!=null){
                //登录成功将用户对象放入到session容器中
                session.setAttribute("loginUser",loginUser);
                return "success";
            }else {
                return "fail";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    //用户退出
    @RequestMapping("/exitUser")
    @ResponseBody
    public String exitUser(HttpSession session){
        session.removeAttribute("loginUser");
        return "success";
    }
}
