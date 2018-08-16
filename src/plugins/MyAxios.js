// Vue的插件机制 由于main.js入口文件不适合放太多代码
// 所以把axios封装成一个vue的插件
// Vue的插件应当有一个公开的方法install,这个方法的第一个参数是
// Vue构造器,第二个参数是一个可选的选项对象
import axios from 'axios';
import { Message } from 'element-ui';
const Myplugin = {};
Myplugin.install = function (Vue) {
  // 全局的axios默认值
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  // 给Vue实例添加一个成员$http
  Vue.prototype.$http = axios;

  // 使用axios请求拦截器 判断 除了login的请求之外都携带token
  // 在请求被then或catch处理前拦截
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    // console.log(config.url); 路由的标识
    if (config.url.toLocaleString() !== 'login') {
      var token = sessionStorage.getItem('token');
      // 全局设置请求头携带token
      config.headers.common['Authorization'] = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 使用axios的响应拦截器 对响应的数据进行判断
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log(response);
    const { meta: { msg, status } } = response.data;
    if (status === 200 || status === 201) {
    } else {
      Message.error(msg);
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
};
// 导出成员
export default Myplugin;
