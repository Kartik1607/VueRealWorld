<template>
  <div class="profile-page">
    <div class="user-info" v-if="profile">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>
            <button
              @click="toggleFollow()"
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="user && user.username !== profile.username"
            >
              <i
                :class="{'ion-plus-round': !profile.following, 'ion-minus-round': profile.following}"
              ></i>
              &nbsp;
              {{profile.following ? 'Unfollow' : 'Follow'}} {{profile.username}}
            </button>
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
                <a class="nav-link active">My Articles</a>
              </li>
            </ul>
          </div>

          <article-list :author="profile.username" v-if="profile"></article-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { mapState } from "vuex";
import ErrorList from "@/components/ErrorList.vue";
import Profile from "@/store/profile.module";
import ArticleList from "@/components/ArticleList.vue";
import { UserProfile } from "../models";

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
export default class ProfileView extends Vue {
  public profile!: UserProfile;
  private profileModule = getModule(Profile, this.$store);

  public created() {
    this.loadProfile(this.$route.params.username);
  }

  public loadProfile(username = "") {
    this.profileModule.getProfile(username);
  }

  public toggleFollow() {
    if (this.profile) {
      if (!this.profile.following) {
        this.profileModule.followUser(this.profile.username).then(_ => {
          this.profile.following = true;
        });
      } else {
        this.profileModule.unfollowUser(this.profile.username).then(_ => {
          this.profile.following = false;
        });
      }
    }
  }
}
</script>