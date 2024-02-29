import VueRouter from "vue-router";
import Vue from "vue";
import LandPage from "@/views/LandPage.vue";
import ErrorPage from "@/views/ErrorPage.vue";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        component: LandPage,
    },
    {
        path: "/card",
        component: () => import("../components/Card.vue"),
    },
    {
        path: "/*",
        component: ErrorPage,
    },
];

const router = new VueRouter({ mode: 'history', routes });
export default router;