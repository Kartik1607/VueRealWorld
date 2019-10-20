import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios, { AxiosError, AxiosResponse } from "axios";

Vue.config.productionTip = false;

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  if ((error.response as AxiosResponse).status === 404) {
    router.replace("/notfound");
  }
  throw error;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
