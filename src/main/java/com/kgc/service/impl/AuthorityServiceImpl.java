package com.kgc.service.impl;

import com.kgc.entity.Authority;
import com.kgc.service.AuthorityService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 *   权限业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class AuthorityServiceImpl extends BaseServiceImpl<Authority> implements AuthorityService {
    //查询角色的权限（菜单）
    @Override
    public List<Map<String, Object>> findMenuByRoleId(Integer roleId) throws Exception {
        //1.新建一个所有权限List集合
        List<Map<String, Object>> dataList = new ArrayList<Map<String, Object>>();
        //2.查询此角色下所有的一级权限
        List<Authority> firstAuths = authorityMapper.selectAuthByRoleIdAndParent(roleId,0);
        //3.通过循环查询每一个一级权限中其所拥有的二级权限
        for (int i = 0;i<firstAuths.size();i++){
            //4.新建一级权限的Map集合（一级权限的名字，二级权限的List集合）
            Map<String,Object> firstAuthMap = new HashMap<String, Object>();
            //5.取到循环中的每一个一级权限对象
            Authority firstAuth = firstAuths.get(i);
            //6.将已有的一级权限的id和名字设置到一级权限的Map集合
            firstAuthMap.put("firstAuthId",firstAuth.getId());
            firstAuthMap.put("firstAuthName",firstAuth.getAuthorityName());
            //7.根据一级权限查询其所有的二级权限并设置到一级权限的Map集合
            Authority secPam = new Authority();  //新建二级权限查询的条件
            secPam.setParent(firstAuth.getId());   //将一级权限的id设置为二级权限查询的条件
            List<Authority> secondAuths = baseMapper.selectManyTByPramas(secPam);  //执行查询得到其下的二级权限
            firstAuthMap.put("secondAuths",secondAuths);  //将二级权限的数据设置到一级权限的Map集合
            //8.将封装后的一级权限Map集合装入到整个权限List集合中
            dataList.add(firstAuthMap);
        }
        return dataList;
    }


    //根据角色id查询出此角色所有的权限数据
    @Override
    public List<Authority> findAuthByRoleId(Integer roleId) throws Exception {
        return authorityMapper.selectAuthByRoleId(roleId);
    }
}
