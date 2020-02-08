package com.kgc.test;

import com.kgc.entity.User ;
import com.kgc.service.UserService ;
import com.kgc.service.impl.UserServiceImpl ;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;
import java.util.Map;

/**
 *   用户业务层测试类
 */
public class UserServiceTest {

    //日志对象
    private static final Logger log = LogManager.getLogger(UserServiceTest.class);

    //依赖引入员工业务层对象
    private UserService userService;

    //读取spring.xml文件
    @Before
    public void init() {
        ClassPathXmlApplicationContext cxt = new ClassPathXmlApplicationContext("spring-main.xml");
        userService = cxt.getBean("userServiceImpl", UserServiceImpl.class);
    }

    //测试分页查询用户以及其角色数据
    @Test
    public void test01(){
        User praUser = new User();
        try {
            Map<String,Object> map = userService.findPageTByPramas(1,2,praUser);
            log.info("共有："+map.get("count")+"条数据。。");
            List<User> users = (List<User>) map.get("data");
            for (User user:users) {
                log.info(user.getUsername()+"   "+user.getPwd());
                log.info(user.getRoles());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
