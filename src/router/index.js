import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'

import Search from '@/views/search/index.vue'
import List from '@/views/search/list.vue'
import ProDetail from '@/views/proDetail/index.vue'
import Pay from '@/views/pay/index.vue'
import Order from '@/views/order/index.vue'

import store from '@/store/'

// 路由懒加载
// 以下为默认加载，而上方的import则为按需加载
// 改造为异步组件
const Layout = () => import('@/views/layout/index.vue')
const Home = () => import('@/views/layout/home.vue')
const category = () => import('@/views/layout/category.vue')
const Cart = () => import('@/views/layout/cart.vue')
const User = () => import('@/views/layout/user.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    /* 重定向到home */
    redirect: '/home',
    /* 二级路由配置 */
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
  },
  { path: '/search', component: Search },
  { path: '/search-list', component: List },

  // 动态路由传参, id用于确定是哪个商品
  { path: '/pro-detail/:id', component: ProDetail },
  { path: '/pay', component: Pay },
  { path: '/myorder', component: Order }

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫 → 更多请查阅 Vue router 官网
/**
 * @param {VueRouter} to - 即将要进入的目标 路由对象
 * @param {VueRouter} from - 当前导航正要离开的路由
 * @param {function} next - 是否放行的函数，
 *    i.  next()表示直接放行到 to 所指向的路径
 *    ii. next(path) 则将进行拦截与导航
 */

// 定义需要权限的页面
const authUrls = ['/pay', '/order']

router.beforeEach((to, from, next) => {
  // 如果是不需要权限的界面
  if (!authUrls.includes(to.path)) {
    next()
    // 否则需要验证是否已经登录
    // 访问子模块的语法：store.state.subModuleName.properties
  } else if (store.state.user.userInfo.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
