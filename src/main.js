// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式css
import '@/assets/css/index.css';
import moment from 'moment';

// 注册组件
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 注册全局过滤器
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
