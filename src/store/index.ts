import Vue from "vue";
import Vuex from "vuex";
import Auth from "./auth.module";
import ArticleModule from "./article.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    ArticleModule
  }
});
