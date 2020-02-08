package com.kgc.util;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：  ksfxhw3818@sandbox.com   111111
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016101400681017";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key ="MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVnCBHfkVsNB6qEzGtBL68cviLaZuXcJQtehl+l7KiOtl0fMToBKNX+VS6GI7G6FzTo7+HqiRJRIJk/FU6qPjlEIp/C+tTNV3+iOvHhzBgUYd6BZTZ2CQUY72wcCL07P2mWBNOCVpDEFKt1kk5VjqFUsRY1JOYhi8LNmeZk9L5ta6XhfgatXDieiMwfLDlbh8tiQf572Yh60NBgMVG3rfA0Svvilra87s2hwCKP9oZEuwiv+bPmfRm/1hzKQMFz94px6CHGT/NEEWgbiYo4PZGoLjOHS6u8Yj/Jj/c9ecNZiV7XBX/nP9QjDAP0A98yyKHEN+j/uoUyynJVohEqNZxAgMBAAECggEAVkb9Dn2xR18fN/Ftult8K20aDDvQ8JqJuVgqj6in6YqKkPTLEQprsHYm+FLlM6wYrCxIbdIeruoFUHt8IyICtwa899tF0Gx8Uidf4WcC7OjXefTyDFbrJ58Fa1SftCNfe6hbKauXFAm7xGhJPfmOMgizFo8wtsrbIlozkIuBJWNLEH+P/MMWKYcTSBxVeYwTOlULfvpAehsFAN/rME4sWLTvlqjgQa7TYecdGad7T7fjlrYGc7/md7Oru7jXvZ4Mm7QX0xaLZl7hWW/DThs9DnqGqLyCw2GWB+713iIQNiEjjHIfMYZO8kdAJn7qGlRe4D7lfdKx6hVct62hp1bEAQKBgQD2kR2O3A+33fqQlvnKfraMCFz3iM8sBTWZx85a2jzmBGZETqMeZ1/VJbbzMizKByM1GtmpsgACq4abb5IrJMg0lD0sB2pdiWJyLYNmMQ1FUeCAL9RxF6JoQ2kuqX+2EtGB/qdbhNSELZw0JJcUrwfJ81ktMmrZWqMX950BxtJKoQKBgQCbVWkSVnS3bat5MNXWmyk62xg4BsTlX1nwwtTkiV6wWZUoAdflA7mwHbhBr1dR9/xKmHoVi8cYaXvG1vz6iwHSdR4pnaWZy2tWrYAyXGIvgGyukIagkudmye3g+roPYXLF4tcIPhTzihIC85ZliHrY4K4pYe4g3r0YmWulwHJJ0QKBgE5MzyIq6CLvrz5zc2fGzZmynjNNktzb2qW3OeTIIUa6Zu+SOWLSWTCLBYo9iNOvaJLYr/6ftDkk115NFBH3YEyyNqrgv/psQoMXyP6O3TQCSFTs233+j2ik36Yd1ZywZS/u+p6plANVqKE2bXP4EXUkflFIDX5wthJKY+XIiceBAoGBAIESeqmjL38P4TFl0/psmdjvH3PGpCuYjMrTikWQpB7TgW5qAbSp4M0oFOh3w444CusNQjzPFhQB6rkyAapKgawYZ4TbGzTtY/b1WpX+UBP6mdSAAW5CQ4gU+NY+YQbQyacHM/kEZTJtI0RSlkEuJC48nFuEpXOoweZD7cAgZpdRAoGAMRI5f6Tk1MVtNj7pb+3hdk4ZnTrBcaGjT2f12GjwNL8n0BK+6e34wyw+J107Y45gh6Mtz21gxSeForbSQPcqQzlDxyU7xgXe9f/wOTFEn3ntKKAf1PIEKlTj4TYh7wUfPsHNwwv76n7vII0esGLb2YY7rMkxk4trcimCaHgM4E8=";
	
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlZwgR35FbDQeqhMxrQS+vHL4i2mbl3CULXoZfpeyojrZdHzE6ASjV/lUuhiOxuhc06O/h6okSUSCZPxVOqj45RCKfwvrUzVd/ojrx4cwYFGHegWU2dgkFGO9sHAi9Oz9plgTTglaQxBSrdZJOVY6hVLEWNSTmIYvCzZnmZPS+bWul4X4GrVw4nojMHyw5W4fLYkH+e9mIetDQYDFRt63wNEr74pa2vO7NocAij/aGRLsIr/mz5n0Zv9YcykDBc/eKceghxk/zRBFoG4mKOD2RqC4zh0urvGI/yY/3PXnDWYle1wV/5z/UIwwD9APfMsihxDfo/7qFMspyVaIRKjWcQIDAQAB";

	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://工程公网访问地址/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://localhost:8080/orders/updOrdersByPaied";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

