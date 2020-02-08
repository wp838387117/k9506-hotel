package com.kgc.mapper;

import com.kgc.entity.Authority;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/*
* 公共的mapper代理对象
* */
public interface BaseMapper<T> {
    /**
     *   根据主键id删除单个数据
     * @param id  传入的主键id
     * @return  返回删除的数据条数
     */
    int deleteByPrimaryKey(Integer id)throws Exception;

    /**
     *   添加数据
     * @param t  传入的要被添加的对象
     * @return  添加的数据条数
     */
    int insert(T t)throws Exception;

    /**
     *   动态添加数据
     * @param t  传入的要被添加的对象
     * @return  添加的数据条数
     */
    int insertSelective(T t)throws Exception;

    /**
     *   根据主键id查询单个数据
     * @param id  传入的主键id
     * @return  查询的单个实体对象
     */
     Authority selectByPrimaryKey(Integer id)throws Exception;

    /**
     *   动态修改数据
     * @param t  传入的修改的对象
     * @return  修改的数据条数
     */
    int updateByPrimaryKeySelective(T t)throws Exception;

    /**
     *   根据主键进行数据修改
     * @param t  传入的要被修改的数据对象
     * @return   被修改的数据条数
     */
    int updateByPrimaryKey(T t)throws Exception;

    /***********************自定义的方法*********************/
    /**
     *   根据条件查询数据
     * @param t  传入查询的数据条件
     * @return  查询的数据对象list集合
     * @throws Exception
     */
    List<T> selectListTByPramas(@Param("t") T t) throws Exception;

    /**
     *    批量动态修改数据
     * @param ids   主键id的数组
     * @param t  要修改的数据的实体对象
     * @return   修改的结果
     * @throws Exception
     */
    Integer updBatchByPrimaryKeySelective(@Param("ids")Integer[] ids,@Param("t")T t) throws Exception;

    /**
     *    根据条件查询单个数据
     * @param t  传入的查询条件
     * @return  返回查询的数据对象
     */
    T selectTByPramas(@Param("t")T t) throws Exception;

    /**
     *     根据条件查询多个数据
     * @param t  传入的查询条件
     * @return   多个数据结果
     * @throws Exception
     */
    List<T> selectManyTByPramas(@Param("t")T t) throws Exception;

    /**
     *   查询所有数据
     * @return  查询的数据对象结果集
     * @throws Exception
     */
    List<T> selectAllT() throws Exception;

}
