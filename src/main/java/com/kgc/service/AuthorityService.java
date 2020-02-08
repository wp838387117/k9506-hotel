package com.kgc.service;

import com.kgc.entity.Authority;

import java.util.List;
import java.util.Map;

/**
 *   权限业务层接口
 */
public interface AuthorityService extends BaseService<Authority> {
    //查询角色的权限（菜单）
    List<Map<String,Object>> findMenuByRoleId(Integer roleId)throws Exception;

    //根据角色id查询出此角色所有的权限数据
    List<Authority> findAuthByRoleId(Integer roleId) throws Exception;
}
