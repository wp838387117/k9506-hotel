package com.kgc.service.impl;

import com.kgc.entity.Rooms;
import com.kgc.service.RoomsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   房屋业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomsServiceImpl extends BaseServiceImpl<Rooms> implements RoomsService {
}
