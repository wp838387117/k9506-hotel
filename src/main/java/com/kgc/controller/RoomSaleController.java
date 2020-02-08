package com.kgc.controller;

import com.kgc.entity.RoomSale ;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *   销售记录控制器
 */
@Controller
@RequestMapping("/roomSale")
public class RoomSaleController extends BaseController<RoomSale> {
}
