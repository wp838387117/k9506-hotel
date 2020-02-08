package com.kgc.service;

import java.util.List;
import java.util.Map;

/**
 *   公共的业务层接口
 * @param <T >  泛指实体对象类型
 */
public interface BaseService<T> {

    /**
     *    根据条件进行分页查询数据
     * @param page  当前页
     * @param limit  每一页显示的数据条数
     * @param t  传入的查询的条件
     * @return   查询的结果集（查询的数据条数，查询的list数据对象集合）
     * @throws Exception
     */
    Map<String,Object> findPageTByPramas(Integer page, Integer limit, T t) throws Exception;

    /**
     *    根据主键id进行数据的动态修改
     * @param t  传入的要修改参数数据实体对象
     * @return   修改的结果
     * @throws Exception
     */
    String updByPrimaryKeySelective(T t) throws Exception;

    /**
     *    批量修改数据
     * @param ids  主键数组
     * @param t   要修改的数据实体对象
     * @return   修改的结果
     * @throws Exception
     */
    String updBatchByPrimaryKeySelective(Integer[] ids,T t) throws Exception;


    /**
     *    根据条件查询单个数据
     * @param t  传入的查询条件
     * @return  返回查询的数据对象
     */
    T findTByPramas(T t) throws Exception;

    /**
     *    添加数据
     * @param t  要添加的数据的对象
     * @return  添加结果
     * @throws Exception
     */
    String saveT(T t) throws Exception;

    /**
     *     根据条件查询多个数据
     * @param t  传入的查询条件
     * @return   多个数据结果
     * @throws Exception
     */
    List<T> findManyTByPramas(T t) throws Exception;

    /**
     *   查询所有数据
     * @return  查询的数据对象结果集
     * @throws Exception
     */
    List<T> findAllT()throws Exception;

}