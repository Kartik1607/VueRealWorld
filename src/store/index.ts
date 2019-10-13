import Vue from "vue";
import Vuex from "vuex";
import Auth from "./auth.module";
import Article from "./article.module";
import Tags from "./tags.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Article,
    Tags
  }
});
