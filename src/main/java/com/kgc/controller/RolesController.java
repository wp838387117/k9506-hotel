package com.kgc.controller;

import com.kgc.entity.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/roles")
public class RolesController extends BaseController<Roles> {
}
