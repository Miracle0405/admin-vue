// Vue的插件机制 由于main.js入口文件不适合放太多代码
// 所以把axios封装成一个vue的插件
// Vue的插件应当有一个公开的方法install,这个方法的第一个参数是
// Vue构造器,第二个参数是一个可选的选项对象
import axios from 'axios';
const Myplugin = {};
Myplugin.install = function (Vue) {
  // 全局的axios默认值
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  // 给Vue实例添加一个成员$http
  Vue.prototype.$http = axios;
};
// 导出成员
export default Myplugin;
