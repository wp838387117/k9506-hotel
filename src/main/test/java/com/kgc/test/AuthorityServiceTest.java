package com.kgc.test;

import com.kgc.entity.Authority;
import com.kgc.service.AuthorityService;
import com.kgc.service.impl.AuthorityServiceImpl;
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
public class AuthorityServiceTest {
    //日志对象
    private static final Logger log = LogManager.getLogger(AuthorityServiceTest.class);

    //依赖引入员工业务层对象
    private AuthorityService authorityService;

    //读取spring.xml文件
    @Before
    public void init() {
        ClassPathXmlApplicationContext cxt = new ClassPathXmlApplicationContext("spring-main.xml");
        authorityService = cxt.getBean("authorityServiceImpl", AuthorityServiceImpl.class);
    }

    //测试修改
    @Test
    public void test01(){
        try {
            List<Map<String,Object>> dataList = authorityService.findMenuByRoleId(1);
            for (Map<String,Object> data:dataList) {
                log.info("----------------------------------------------");
                log.info("一级权限id:"+data.get("firstAuthId"));
                log.info("一级权限名字:"+data.get("firstAuthName"));
                List<Authority> authorities = (List<Authority>)data.get("secondAuths");
                for (Authority authority:authorities) {
                    log.info(authority);
                }
                log.info("----------------------------------------------");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //测试根据角色id查询权限数据
    @Test
    public void test02(){
        try {
            List<Authority> authorities = authorityService.findAuthByRoleId(2);
            for (Authority authority:authorities) {
                log.info(authority);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
