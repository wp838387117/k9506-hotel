package com.kgc.controller;

import com.kgc.entity.Orders ;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 *   订单控制器层
 */
@Controller
@RequestMapping("/orders")
public class OrdersController extends BaseController<Orders> {
    //去到支付页面，完成订单支付
    @RequestMapping("/toOrdersPay")
    public String toOrdersPay(HttpServletRequest request,String orderNum,Double orderMoney){
        //往订单支付的请求对象中设置订单编号和总价
        System.out.println(orderNum+" "+orderMoney);
        request.setAttribute("orderNum",orderNum);
        request.setAttribute("orderMoney",orderMoney);
        return "alipay/ordersPay";
    }
    //支付完成后，修改该订单的状态
    @RequestMapping("/updOrdersByPaied")
    public String updOrdersByPaied(String out_trade_no){
        Orders orders = new Orders();
        orders.setOrderNum(out_trade_no);
        try {
            //修改订单的状态
            baseService.updByPrimaryKeySelective(orders);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //重定向到酒店管理平台首页
        return "redirect:/authority/toIndex";
    }

}
