<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <a class="nav-link disabled">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active">Global Feed</a>
              </li>
            </ul>
          </div>

          <article-list></article-list>
        </div>

        <div class="col-md-3">
          <tag-list class="sidebar"></tag-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { mapState } from "vuex";
import TagList from "@/components/TagList.vue";
import ArticleList from "@/components/ArticleList.vue";

@Component({
  components: {
    HelloWorld,
    TagList,
    ArticleList
  },
  computed: mapState<any>({
    user: state => state.Auth.user
  })
})
export default class Home extends Vue {}
</script>
