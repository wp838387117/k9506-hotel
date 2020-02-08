package com.kgc.service.impl;

import com.kgc.entity.RoomSale ;
import com.kgc.service.RoomSaleService ;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   销售记录的业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements RoomSaleService {
}
