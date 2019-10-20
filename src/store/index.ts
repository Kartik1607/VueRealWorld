import Vue from "vue";
import Vuex from "vuex";
import Auth from "./auth.module";
import Article from "./article.module";
import Tags from "./tags.module";
import Comments from "./comment.module";
import Profile from "./profile.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Article,
    Tags,
    Comments,
    Profile
  }
});
