import Vue from 'vue';
import Router from 'vue-router';
// 导入组件 所有的import都应该在文件的最上面
import Login from '@/views/Login';
// 导入首页
import Home from '@/views/Home';
// 导入用户组件
import User from '@/views/user/User';

// @代表的是src的绝对路径
// @是在build/webpack.base.conf.js
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        { name: 'user', path: '/user', component: User }
      ]
    }
  ]
});
