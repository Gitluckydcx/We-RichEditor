/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://www.usambc.net:1443';
var hostwss = 'wss://www.usambc.net:1444';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        hostAPI: `${host}/mbcAPI`,
        // 登录地址，用于建立会话
        loginUrl: `${host}/mbcAPI/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/mbcAPI/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/mbcAPI/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/mbcAPI/upload`,

        wssUrl: `${hostwss}`

    }
};

module.exports = {
     config: config,
    /** 腾讯地图 **/
    map: {
        baseUrl: 'https://apis.map.qq.com/ws',
        key: '2TCBZ-IM7K5-XHCIZ-QXLRT-CIT4J-DEFSM',
    },

    /** 输入框控件设置 **/
    input: {
        charWidth: 14,  // 单个字符的宽度，in rpx
    },

    /** 本地存储 **/
    // TODO 数据通过API全部存储于服务端
    storage: {
        diaryListKey: 'bearDiaryList',
    }
}
