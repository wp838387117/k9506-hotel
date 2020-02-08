package com.kgc.service.impl;

import com.kgc.entity.RoomType;
import com.kgc.service.RoomTypeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   房间类型的业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class RoomTypeServiceImpl extends BaseServiceImpl<RoomType>  implements RoomTypeService {
}
