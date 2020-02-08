package com.kgc.controller;

import com.kgc.service.AuthorityService;
import com.kgc.service.BaseService ;
import com.kgc.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   公共控制器层对象
 * @param <T>  泛指实体对象类型
 */
public class BaseController<T> {

    //依赖公共的业务层对象
    @Autowired
    protected BaseService<T> baseService;

    //订单业务层对象
    @Autowired
    protected OrdersService ordersService;

    //权限业务层对象
    @Autowired
    protected AuthorityService authorityService;


    @RequestMapping("/loadPageTByPramas")
    public @ResponseBody Map<String,Object> loadPageTByPramas(Integer page, Integer limit, T t){
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            map = baseService.findPageTByPramas(page,limit,t);
            map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",200);
        }
        return map;
    }

    /**
     *    根据主键id进行数据的动态修改
     * @param t  传入的要修改参数数据实体对象
     * @return   修改的结果
     */
    @RequestMapping("/updByPrimaryKeySelective")
    @ResponseBody
    public String updByPrimaryKeySelective(T t){
        try {
            return baseService.updByPrimaryKeySelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *    批量修改数据
     * @param ids  主键数组
     * @param t   要修改的数据实体对象
     * @return   修改的结果
     */
    @RequestMapping("/updBatchByPrimaryKeySelective")
    @ResponseBody
    public String updBatchByPrimaryKeySelective(Integer[] ids,T t){
        try {
            return baseService.updBatchByPrimaryKeySelective(ids,t);
        } catch (Exception e) {
            return "error";
        }
    }


    /**
     *    根据条件查询单个数据
     * @param t  传入的查询条件
     * @return  返回查询的数据对象
     */
    @RequestMapping("/loadTByPramas")
    @ResponseBody
    public T loadTByPramas(T t){
        try {
            return baseService.findTByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *    添加数据
     * @param t  要添加的数据的对象
     * @return  添加结果
     * @throws Exception
     */
    @RequestMapping("/saveT")
    public @ResponseBody String saveT(T t){
        try {
            return baseService.saveT(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *     根据条件查询多个数据
     * @param t  传入的查询条件
     * @return   多个数据结果
     * @throws Exception
     */
    @RequestMapping("/loadManyTByPramas")
    @ResponseBody
    public List<T> loadManyTByPramas(T t){
        try {
           return  baseService.findManyTByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *   查询所有数据
     * @return  查询的数据对象结果集
     * @throws Exception
     */
    @RequestMapping("/loadAllT")
    public @ResponseBody List<T> loadAllT(){
        try {
            return baseService.findAllT();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
