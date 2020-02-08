package com.kgc.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.kgc.mapper.*;
import com.kgc.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   公共的业务层实现类
 * @param <T>  泛指实体对象类型
 *    此时的业务层实现类不能将其实例化（此时并没有指明实体对象类型）
 */
public class BaseServiceImpl<T> implements BaseService<T> {

    ///依赖公共Mapper代理对象
    @Autowired
    protected BaseMapper<T> baseMapper;

    //将入住信息的Mapper代理对象注入
    @Autowired
    protected InRoomInfoMapper inRoomInfoMapper;

    //将房屋的Mapper代理对象注入
    @Autowired
    protected RoomsMapper roomsMapper;

    //房间销售记录的Mapper代理对象
    @Autowired
    protected RoomSaleMapper roomSaleMapper;

    //权限的Mapper代理对象
    @Autowired
    protected AuthorityMapper authorityMapper;

    /**
     *    根据条件进行分页查询数据
     * @param page  当前页
     * @param limit  每一页显示的数据条数
     * @param t  传入的查询的条件
     * @return   查询的结果集（查询的数据条数，查询的list数据对象集合）
     * @throws Exception
     */
    @Override
    public Map<String, Object> findPageTByPramas(Integer page, Integer limit, T t) throws Exception {
        //新建一个Map集合
        Map<String,Object> map = new HashMap<String, Object>();
        //开启分页
        PageHelper.startPage(page,limit);
        //进行分页查询操作
        PageInfo<T> pageInfo = new PageInfo<T>(baseMapper.selectListTByPramas(t));
        //得到数据条数
        map.put("count",pageInfo.getTotal());
        //得到查询的对象集合
        map.put("data",pageInfo.getList());
        return map;
    }

    /**
     *    根据主键id进行数据的动态修改
     * @param t  传入的要修改参数数据实体对象
     * @return   修改的结果
     * @throws Exception
     */
    @Override
    public String updByPrimaryKeySelective(T t) throws Exception {
        if(baseMapper.updateByPrimaryKeySelective(t)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    /**
     *    批量修改数据
     * @param ids  主键数组
     * @param t   要修改的数据实体对象
     * @return   修改的结果
     * @throws Exception
     */
    @Override
    public String updBatchByPrimaryKeySelective(Integer[] ids, T t) throws Exception {
        if(baseMapper.updBatchByPrimaryKeySelective(ids,t)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    /**
     *    根据条件查询单个数据
     * @param t  传入的查询条件
     * @return  返回查询的数据对象
     */
    @Override
    public T findTByPramas(T t) throws Exception {
        return baseMapper.selectTByPramas(t);
    }

    /**
     *    添加数据
     * @param t  要添加的数据的对象
     * @return  添加结果
     * @throws Exception
     */
    @Override
    public String saveT(T t) throws Exception {
        if(baseMapper.insert(t)>0){
            return "success";
        }else{
            return "fail";
        }
    }

    /**
     *     根据条件查询多个数据
     * @param t  传入的查询条件
     * @return   多个数据结果
     * @throws Exception
     */
    @Override
    public List<T> findManyTByPramas(T t) throws Exception {
        return baseMapper.selectManyTByPramas(t);
    }

    /**
     *   查询所有数据
     * @return  查询的数据对象结果集
     * @throws Exception
     */
    @Override
    public List<T> findAllT() throws Exception {
        return baseMapper.selectAllT();
    }
}
