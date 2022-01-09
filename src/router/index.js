import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect:'/jsonTools'
  },

  {
    path: "/crypto",
    name: "Crypto",
    component: () =>
      import(/* webpackChunkName: "crypto" */ "../views/Crypto.vue"),
  },
  {
    path: "/annotation",
    name: "Annotation",
    component: () =>
      import(/* webpackChunkName: "annotation" */ "../views/Annotation.vue"),
  },
  {
    path: "/jsonTools",
    name: "JsonTools",
    component: () =>
      import(/* webpackChunkName: "jsontools" */ "../views/JsonTools.vue"),
  },
  {
    path: "/requestConfig/index",
    name: "RequestConfigIndex",
    component: () => import("../views/RequestConfigIndex.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
