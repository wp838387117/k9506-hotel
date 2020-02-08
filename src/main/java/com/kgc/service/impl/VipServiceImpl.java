package com.kgc.service.impl;

import com.kgc.entity.Vip;
import com.kgc.service.VipService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *   会员业务层实现类
 */

@Service
@Transactional(readOnly = false)
public class VipServiceImpl extends BaseServiceImpl<Vip> implements VipService  {
}
