/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '/';
// let routerMode = 'hash';
let baseImgUrl = '/';
let timeout = 5000;

if (process.env.NODE_ENV == 'development') {
    baseUrl = '/api';
    baseImgUrl = '/api';
} else {
    baseUrl = '';
    baseImgUrl = '';
}
/**
 * 网络请求返回的字段配置
 * 仅仅在调用封装的网络请求时并且设置为isSubmit会启用
 * info:饿了么的消息弹窗组件同样的设置格式
 * code:标识码
 * path：如果设置将会进行跳转对应的路由
 * */
// let httpCode=[{
//     code:1,
//     info:{
//         //  饿了么的消息弹窗组件同样的设置格式
//         type:'success',
//         message: '请求成功',
//     },
//     path:'/index'
//
// }];
export {
    baseUrl,
    // routerMode,
    baseImgUrl,
    timeout
}
