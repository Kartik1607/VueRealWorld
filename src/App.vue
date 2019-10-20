<template>
  <div id="app">
    <the-header></the-header>
    <router-view />
    <the-footer></the-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { getModule } from "vuex-module-decorators";
import Auth from "@/store/auth.module";
import router from "./router";

@Component({
  components: {
    TheHeader,
    TheFooter
  }
})
export default class App extends Vue {
  private authModule = getModule(Auth, this.$store);

  constructor() {
    super();
    this.authModule.initUser();
  }
}
</script>