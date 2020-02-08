package com.kgc.controller;

import com.kgc.entity.Rooms;
import com.kgc.util.FileUploadUtil;
import com.kgc.util.QiniuUpload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

/**
 *   房屋控制器层
 */
@RequestMapping("/rooms")
@Controller
public class RoomsController extends BaseController<Rooms> {
 /*   //房屋封面图的上传-插件版
    @RequestMapping("/uploadRoomsPic")
    @ResponseBody
    public Map<String,Object> uploadRoomsPic(MultipartFile myFile, String path){
        System.out.println(myFile);
        System.out.println(path);
        return FileUploadUtil.upload(myFile,path);
    }*/

    //房屋封面图的上传—七牛云版
    @RequestMapping("/uploadRoomsPic")
    public @ResponseBody Map<String,Object> uploadRoomsPic(MultipartFile myFile){
        System.out.println(myFile);
        return QiniuUpload.upload(myFile);
    }
}
