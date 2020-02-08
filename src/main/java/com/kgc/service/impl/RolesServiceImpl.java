package com.kgc.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.kgc.entity.Authority;
import com.kgc.entity.Roles;
import com.kgc.service.RolesService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   角色业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RolesServiceImpl extends BaseServiceImpl<Roles> implements RolesService {
    //重写分页查询的方法
    @Override
    public Map<String, Object> findPageTByPramas(Integer page, Integer limit, Roles roles) throws Exception {
        //1.新建角色的分页数据Map集合
        Map<String, Object> dataMap = new HashMap<String, Object>();
        //2.查询到原有的角色的数据
        PageHelper.startPage(page, limit);
        //3.进行原有的分页查询
        PageInfo<Roles> pageInfo = new PageInfo<Roles>(baseMapper.selectListTByPramas(roles));
        //4.得到角色的list集合
        List<Roles> rolesList = pageInfo.getList();
        //5.通过循环得到一级权限名并设置到角色中
        for (int i = 0; i < rolesList.size(); i++) {
            Roles roles1 = rolesList.get(i);
            //6.查询出角色的一级权限
            List<Authority> authorities = authorityMapper.selectAuthByRoleIdAndParent(roles1.getId(), 0);
            //7.定义空的一级权限名
            String firstAuths = "";
            //8.通过对此角色拥有的一级权限进行循环拼接得到一级权限名
            for (int j = 0; j < authorities.size(); j++) {
                firstAuths += authorities.get(j).getAuthorityName() + ",";
            }
            firstAuths = firstAuths.substring(0, firstAuths.length() - 1);
            //将拼接后的一级权限名设置到此角色对象中
            roles1.setFirstAuths(firstAuths);
            //9.将此对象重写装入到角色的list集合
            rolesList.remove(i);  //将原有的集合元素移除掉
            rolesList.add(i, roles1);  //再在原有的位置加入新的元素
        }
        //设置数据的条数
        dataMap.put("count", pageInfo.getTotal());
        //重新设置响应的数据（包含了角色拥有的一级权限名）
        dataMap.put("data", rolesList);
        return dataMap;
    }
}