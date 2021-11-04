import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import { defineAsyncComponent } from "vue";
import NProgress from "../util/nprogress";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: () => import(`../layout/main.vue`),
    meta: { title: "主页", keepAlive: true },
    children: [
      {
        path: "/index",
        meta: { title: "首页", icon: "icon-home", isMenu: true },
        component: () => import(`../views/test1.vue`),
      },
      {
        path: "/icon",
        meta: { title: "图标", icon: "icon-xiaolian", isMenu: true },
        component: () => import(`../layout/content.vue`),
        children: [
          {
            path: "/icon/icon",
            meta: { title: "图标显示", isMenu: true },
            component: () => import(`../views/icon/icon.vue`),
          }
        ],
      },
      {
        path: "/table",
        meta: { title: "表格", icon: "icon-biaoge", isMenu: true },
        component: () => import(`../layout/content.vue`),
        redirect: "/table/table",
        children: [
          {
            path: "/table/table",
            meta: { title: "表格显示", isMenu: true },
            component: () => import(`../views/table/table.vue`),
          }
        ],
      },
      {
        path: "/error",
        meta: { title: "异常页", icon: "icon-xwtubiaoku-13", isMenu: true },
        component: () => import(`../layout/content.vue`),
        redirect: "/error/error",
        children: [
          {
            path: "/error/404",
            meta: { title: "404", isMenu: true },
            component: () => import(`../views/error/404.vue`),
          }, {
            path: "/error/403",
            meta: { title: "403", isMenu: true },
            component: () => import(`../views/error/403.vue`),
          },{
            path: "/error/500",
            meta: { title: "500", icon: "icon-biaodan", isMenu: true },
            component: () => import(`../views/error/500.vue`),
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/login/login.vue"),
  }, {
    path: '/404',
    component: () => import("../views/error/404.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to: any, from: any, next: any) => {
  NProgress.start();
  let token = localStorage.getItem("token") || '12321';//这里需要取出token
  if (token) {
    next();
  } else {
    if (to.fullPath == "/login") {
      next();
    } else {
      router.push("/login");
    }
  }
});
//路由进入后
router.afterEach(() => {
  NProgress.done();
});
// const router = {
//   "/test": test,
// };

export default router;
