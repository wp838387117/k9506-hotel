package com.kgc.test;


import com.kgc.entity.Orders ;
import com.kgc.service.OrdersService ;
import com.kgc.service.impl.OrdersServiceImpl ;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;


/**
 *   房屋入住信息业务层测试类
 */
public class OrdersServiceTest {

    //日志对象
    private static final Logger log = LogManager.getLogger(OrdersServiceTest.class);

    //依赖引入员工业务层对象
    private OrdersService ordersService;

    //读取spring.xml文件
    @Before
    public void init() {
        ClassPathXmlApplicationContext cxt = new ClassPathXmlApplicationContext("spring-main.xml");
        ordersService = cxt.getBean("ordersServiceImpl", OrdersServiceImpl.class);
    }

    //测试修改
    @Test
    public void test01(){
        Orders orders = new Orders();
        orders.setOrderNum("20190720082331908990");
        try {
            String updIf = ordersService.updByPrimaryKeySelective(orders);
            log.info(updIf);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
