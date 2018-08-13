import Vue from 'vue';
import Router from 'vue-router';
// 导入组件 所有的import都应该在文件的最上面
import Login from '@/views/Login';
// 导入首页
import Home from '@/views/Home';
// 导入用户组件
import User from '@/views/user/User';
// 导入权限列表组件
import Rights from '@/views/Rights/Rights';
// 导入角色列表组件
import Roles from '@/views/Rights/Role';
// 导入商品列表组件
import Goods from '@/views/goods/Goods';
// 导入分类参数组价
import Params from '@/views/goods/Params';
// 导入商品分类组件
import Shops from '@/views/goods/Shop';
import { Message } from 'element-ui';

// @代表的是src的绝对路径
// @是在build/webpack.base.conf.js
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

const router = new Router({
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        { name: 'user', path: '/users', component: User },
        { name: 'rights', path: '/rights', component: Rights },
        { name: 'roles', path: '/roles', component: Roles },
        { name: 'goods', path: '/goods', component: Goods },
        { name: 'params', path: '/params', component: Params },
        { name: 'categories', path: '/categories', component: Shops }
      ]
    }
  ]
});

// 路由的全局前置守卫（拦截器）--路由跳转之前执行
// to 即将要跳转到哪去 路由规则对象
// from 从哪开始跳
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // 如果是登录不判断token，不是登录才判断token
  if (to.name && to.name.toLocaleLowerCase() !== 'login') {
    // 判断token
    const token = sessionStorage.getItem('token');
    if (!token) {
      // token不存在  跳转到登录页
      // this.$router.push(); 以前是在vue组件中使用 this指向vue实例对象
      // 现在在当前模块中 不能使用this 但是可以直接使用使用router
      router.push('/login');
      // 提示请先登录
      // this.$message.success(); 之前用的是全局方法 element为vue.prototype注册了全局方法
      // 所以在vue组件中可以使用
      // 当前在的模块不是vue的实例 this不指向vue的实例 所以不可以用this.$message.error();
      // 看文档得知需要单独引入Message
      Message.warning('请先登录');
      return;
    }
  }
  next();
});

export default router;
