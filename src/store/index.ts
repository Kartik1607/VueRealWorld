import Vue from "vue";
import Vuex from "vuex";
import Auth from "./auth/auth.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth
  }
});
