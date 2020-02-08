package com.kgc.controller;

import com.kgc.entity.InRoomInfo ;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *   房屋入住信息控制器
 */
@Controller
@RequestMapping("/inRoomInfo")
public class InRoomInfoController extends BaseController<InRoomInfo>{
}
