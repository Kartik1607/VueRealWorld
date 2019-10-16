<template>
  <ul v-if="errors.length" class="error-messages">
    <li v-for="(error,index) in errors" :key="index">{{error}}</li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ErrorList extends Vue {
  @Prop()
  public errors!: string[];
}
</script>