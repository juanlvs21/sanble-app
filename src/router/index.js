import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },
  // Auth
  {
    path: "/auth",
    name: "auth",
    component: () => import(/* webpackChunkName: "auth" */ "@/views/Auth.vue"),
  },
  // Auth
  {
    path: "/recover-password",
    name: "recover-password",
    component: () =>
      import(
        /* webpackChunkName: "recover-password" */ "@/views/RecoverPassword.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
