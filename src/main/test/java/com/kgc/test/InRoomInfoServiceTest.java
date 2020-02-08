package com.kgc.test;

import com.kgc.entity.InRoomInfo ;
import com.kgc.service.InRoomInfoService ;
import com.kgc.service.impl.InRoomInfoServiceImpl ;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;
import java.util.Map;

/**
 *   房屋入住信息业务层测试类
 */
public class InRoomInfoServiceTest {

    //日志对象
    private static final Logger log = LogManager.getLogger(InRoomInfoServiceTest.class);

    //依赖引入员工业务层对象
    private InRoomInfoService inRoomInfoService;

    //读取spring.xml文件
    @Before
    public void init() {
        ClassPathXmlApplicationContext cxt = new ClassPathXmlApplicationContext("spring-main.xml");
        inRoomInfoService = cxt.getBean("inRoomInfoServiceImpl", InRoomInfoServiceImpl.class);
    }

    //测试根据条件分页查询入住信息
    @Test
    public void test01(){
        //新建查询条件
        InRoomInfo pramasInRoomInfo = new InRoomInfo();
     //   pramasInRoomInfo.setPhone("15699998899"); //查询条件
      //  pramasInRoomInfo.setIdcard("421101016809098989");//查询条件
     //   pramasInRoomInfo.setCustomerName("玉");//查询条件
        pramasInRoomInfo.setOutRoomStatus("1");
        try {
            Map<String,Object> map = inRoomInfoService.findPageTByPramas(1,2,pramasInRoomInfo);
            log.info("共有："+map.get("count")+"条数据。。。");
            List<InRoomInfo> inRoomInfos = (List<InRoomInfo>)map.get("data");
            for (InRoomInfo inRoomInfo:inRoomInfos) {
                log.info(inRoomInfo.getCustomerName()+"    "+inRoomInfo.getPhone());
                log.info(inRoomInfo.getRooms());
                log.info(inRoomInfo.getRooms().getRoomType());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
