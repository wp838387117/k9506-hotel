package com.kgc.controller;

import com.kgc.entity.Authority;
import com.kgc.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 *   权限控制器层
 */
@Controller
@RequestMapping("/authority")
public class AuthorityController extends BaseController<Authority> {
    //登录后去到酒店管理平台首页
    @RequestMapping("/toIndex")
    public String toIndex(HttpSession session,Model model){
        //从session容器中得到登录的用户对象
          User loginUser = (User)session.getAttribute("loginUser");
        try {
            //在页面跳转的时候装入菜单数据
            model.addAttribute("dataList",authorityService.findMenuByRoleId(loginUser.getRoleId()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }


    //根据角色id加载此角色所有的权限数据
    @RequestMapping("/loadAuthByRoleId")
    public @ResponseBody List<Authority> loadAuthByRoleId(Integer roleId){
        try {
            return authorityService.findAuthByRoleId(roleId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
