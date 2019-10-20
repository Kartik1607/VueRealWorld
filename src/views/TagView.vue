<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <h4>{{tag}}</h4>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active">Articles</a>
              </li>
            </ul>
          </div>

          <article-list :tag="tag"></article-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { mapState } from "vuex";
import ErrorList from "@/components/ErrorList.vue";
import Profile from "@/store/profile.module";
import ArticleList from "@/components/ArticleList.vue";

@Component({
  components: {
    ErrorList,
    ArticleList
  },
  computed: mapState<any>({
    errors: state => state.Profile.errors,
    profile: state => state.Profile.profile,
    user: state => state.Auth.user
  })
})
export default class TagView extends Vue {
  public tag = "";

  @Watch("$route.params.tag")
  public getArticle(tag: string) {
    this.tag = tag;
  }

  public created() {
    this.tag = this.$route.params.tag;
  }
}
</script>