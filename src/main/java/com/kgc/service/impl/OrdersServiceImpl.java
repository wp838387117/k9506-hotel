package com.kgc.service.impl;

import com.kgc.entity.InRoomInfo ;
import com.kgc.entity.Orders ;
import com.kgc.entity.RoomSale;
import com.kgc.entity.Rooms ;
import com.kgc.service.OrdersService ;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;

/**
 *    订单业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class  OrdersServiceImpl extends BaseServiceImpl<Orders> implements OrdersService {

    //重写订单添加的方法
    @Override
    public String saveT(Orders orders) throws Exception {
        //1.完成订单的添加   baseMapper  里面的实体对象泛型为Orders
        Integer insOrdersIf = baseMapper.insert(orders);
        //2.完成入住信息的修改
        //新建要修改的入住信息对象
        InRoomInfo inRoomInfo = new InRoomInfo();
        inRoomInfo.setId(orders.getIriId());
        inRoomInfo.setOutRoomStatus("1");
        //执行入住信息的修改
        Integer updINIIf = inRoomInfoMapper.updateByPrimaryKeySelective(inRoomInfo);
        /*int i = 1/0; //用来测试事务的*/
        //3.完成房屋的状态的修改
        //新建要修改的房屋对象
        Rooms rooms = new Rooms();
        //从前台页面获取的数据：orderOther: "8206,貂蝉,2019/07/20 08:40:52,39"，需要那到房间号8206对房屋状态进行修改
        String[] orderOther = orders.getOrderOther().split(",");
        rooms.setRoomNum(orderOther[0]);
        System.out.println(rooms.getRoomNum());//打印获得的房间号
        rooms.setRoomStatus("2");
        //执行房屋状态的修改
        Integer updRoomsIf = roomsMapper.updateByPrimaryKeySelective(rooms);
        //Spring会对数据进行事务管理，所以if判断可以省去不写
        if(insOrdersIf>0&&updINIIf>0&&updRoomsIf>0){
            return "success";
        }else {
            int i = 1/0;
            return "fail";
        }
    }

    //重写修改订单状态的方法
    @Override
    public String updByPrimaryKeySelective(Orders orders) throws Exception {
        orders.setOrderStatus("1");
        //完成订单状态的提交
        Integer  updOrdersIf  = baseMapper.updateByPrimaryKeySelective(orders);
        //根据订单编号查询单个订单数据
        Orders orders1 = baseMapper.selectTByPramas(orders);
        //取到销售记录的数据
        String[] orderOther = orders1.getOrderOther().split(",");
        String[] orderPrice = orders1.getOrderPrice().split(",");
        RoomSale roomSale = new RoomSale();
        roomSale.setRoomNum(orderOther[0]);
        roomSale.setCustomerName(orderOther[1]);
        roomSale.setStartDate(new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").parse(orderOther[2]));
        roomSale.setEndDate(new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").parse(orderOther[3]));
        roomSale.setDays(Integer.parseInt(orderOther[4]));
        roomSale.setRoomPrice(Double.parseDouble(orderPrice[0]));
        roomSale.setOtherPrice(Double.parseDouble(orderPrice[1]));
        roomSale.setRentPrice(Double.parseDouble(orderPrice[2]));
        roomSale.setSalePrice(orders1.getOrderMoney());
        Double discountPrice = Integer.parseInt(orderOther[4])*Double.parseDouble(orderPrice[0])-Double.parseDouble(orderPrice[2]);
        roomSale.setDiscountPrice(discountPrice);
        Integer insRoomSaleIf = roomSaleMapper.insert(roomSale);
        if(updOrdersIf>0&&insRoomSaleIf>0){
            return "success";
        }else {
            int i = 10/0;
            return "fail";
        }
    }
}
