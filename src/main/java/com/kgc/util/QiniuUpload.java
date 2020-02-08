package com.kgc.util;

import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 *   七牛云上传的工具类
 */
public class QiniuUpload {

    //设置好账号的ACCESS_KEY和SECRET_KEY;这两个登录七牛账号里面可以找到 
    static String ACCESS_KEY = "H97uWiOF_55fsIuBbo1PeV2OotHWeofcONWlQt3I";
    static String SECRET_KEY = "zGLtOQMkxbr8yCaGetTPzJlE69aw6udMaJaEKF6Q";
    //要上传的空间;对应到七牛上（自己建文件夹 注意设置公开）  
    static String bucketname = "image";
    //访问上传文件的域名
    static String path = "http://pxciogtf9.bkt.clouddn.com/";
    //密钥配置  
    static Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
    //创建上传对象  
    static UploadManager uploadManager = new UploadManager(new Configuration(Zone.zone2()));
    //简单上传，使用默认策略，只需要设置上传的空间名就可以了  
    public static String getUpToken(){
        return auth.uploadToken(bucketname);  
    }  
  
    //普通上传
    public static Map<String,Object> upload(MultipartFile myFile){
        Map<String,Object> map = new HashMap<String, Object>();
        //上传到七牛后保存的文件名
        String key = UUID.randomUUID().toString().replace("-", "");
        try {
        //调用put方法上传
          Response res = uploadManager.put(myFile.getBytes(),key,getUpToken());
          map.put("newFileName",path+key);
          map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            // 请求失败时打印的异常的信息
            map.put("code",200);
        }
        return map;
    }  

}  
	

