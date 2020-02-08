package com.kgc.test;

import com.kgc.entity.Roles ;
import com.kgc.service.RolesService ;
import com.kgc.service.impl.RolesServiceImpl ;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import java.util.List;
import java.util.Map;

/**
 *   权限业务层测试类
 */
public class RoleServiceTest {

    //日志对象
    private static final Logger log = LogManager.getLogger(RoleServiceTest.class);

    //依赖引入员工业务层对象
    private RolesService rolesService;

    //读取spring.xml文件
    @Before
    public void init() {
        ClassPathXmlApplicationContext cxt = new ClassPathXmlApplicationContext("spring-main.xml");
        rolesService = cxt.getBean("rolesServiceImpl", RolesServiceImpl.class);
    }

    //测试修改
    @Test
    public void test01(){
        Roles rolesPramas = new Roles();
        try {
            Map<String,Object> dataMap = rolesService.findPageTByPramas(1,2,rolesPramas);
            log.info("--------------------");
            log.info(dataMap);
            log.info(dataMap.get("count"));
            log.info("--------------------");
            List<Roles> rolesList = (List<Roles>) dataMap.get("data");
            for (Roles roles:rolesList) {
                log.info(roles);
            }
            log.info("--------------------");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
