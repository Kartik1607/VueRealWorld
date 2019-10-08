<template>
  <div id="app">
    <the-header></the-header>
    <!-- <router-view /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "./components/TheHeader.vue";

@Component({
  components: {
    TheHeader
  }
})
export default class App extends Vue {}
</script>