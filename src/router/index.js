import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // Auth
  {
    path: "/auth",
    name: "auth",
    component: () => import(/* webpackChunkName: "auth" */ "@/views/Auth.vue"),
  },
  {
    path: "/recover-password",
    name: "recover-password",
    component: () =>
      import(
        /* webpackChunkName: "recover-password" */ "@/views/RecoverPassword.vue"
      ),
  },
  {
    path: "/welcome",
    name: "welcome",
    component: () =>
      import(/* webpackChunkName: "welcome" */ "@/views/Welcome.vue"),
  },
  // Dashboard
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
