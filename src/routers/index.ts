import * as VueRouter from "vue-router";
export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/home/index.vue"),
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   name: '404',
  //   component: defineAsyncComponent(() => import('../pages/404/index.vue'))
  // }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
export default router;
