<template>
  <div>
    <p>Popular Tags</p>

    <div class="tag-list">
      <a class="tag-pill tag-default" v-for="tag of tags" :key="tag">{{tag}}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import TagsModule from "@/store/tags.module";
import { getModule } from "vuex-module-decorators";

@Component({
  computed: mapState<any>({
    tags: state => state.Tags.tags
  })
})
export default class TagList extends Vue {
  private tagsModule: TagsModule = getModule(TagsModule, this.$store);
  public created() {
    this.tagsModule.fetchTags();
  }
}
</script>
