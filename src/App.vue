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

@Component({
  components: {
    TheHeader,
    TheFooter
  }
})
export default class App extends Vue {}
</script>