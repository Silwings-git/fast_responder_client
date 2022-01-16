import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        redirect: '/responder/index'
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
    {
        path: "/responder/docs",
        name: "Docs",
        component: () =>
            import ("../views/Docs.vue"),
    }

];

const router = new VueRouter({
    routes,
});

export default router;