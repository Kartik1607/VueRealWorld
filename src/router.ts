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
    },
    {
      path: "/profile/:username",
      component: () => import("./views/Profile.vue")
    },
    {
      name: "ArticleView",
      path: "/articles/:slug",
      component: () => import("./views/ArticleView.vue")
    },
    {
      name: "TagView",
      path: "/tags/:tag",
      component: () => import("./views/TagView.vue")
    },
    {
      name: "ArticleCreate",
      path: "/articlecreate",
      component: () => import("./views/ArticleCreate.vue")
    },
    {
      name: "ArticleCreate",
      path: "/articlecreate/:slug",
      component: () => import("./views/ArticleCreate.vue")
    },
    {
      name: "NotFound",
      path: "*",
      component: () => import("./views/NotFound.vue")
    }
  ]
});
