package com.kgc.mapper;

import com.kgc.entity.Authority;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *   权限Mapper代理对象
 */
public interface AuthorityMapper extends BaseMapper<Authority> {
        //根据角色id和权限的类型进行权限查询
    List<Authority> selectAuthByRoleIdAndParent(@Param("roleId") Integer roleId,@Param("parent") Integer parent) throws Exception;

    //根据角色id查询出此角色所有的权限数据
    List<Authority> selectAuthByRoleId(Integer roleId) throws Exception;

}