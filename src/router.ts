import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/register",
      component: () => import("./views/Register.vue")
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue")
    }
  ]
});
