import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        redirect: '/jsonTools'
    },

    {
        path: "/crypto",
        name: "Crypto",
        component: () =>
            import ( /* webpackChunkName: "crypto" */ "../views/Crypto.vue"),
    },
    {
        path: "/annotation",
        name: "Annotation",
        component: () =>
            import ( /* webpackChunkName: "annotation" */ "../views/Annotation.vue"),
    },
    {
        path: "/jsonTools",
        name: "JsonTools",
        component: () =>
            import ( /* webpackChunkName: "jsontools" */ "../views/JsonTools.vue"),
    },
    {
        path: "/responder/index",
        name: "ResponderIndex",
        component: () =>
            import ("../views/ResponderIndex.vue"),
    },
    {
        path: "/responder/detail/:id",
        name: "ResponderDetail",
        component: () =>
            import ("../views/ResponderDetail.vue"),
    },

];

const router = new VueRouter({
    routes,
});

export default router;