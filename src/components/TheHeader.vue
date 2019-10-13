<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link active-class="active" class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" exact to="/">Home</router-link>
        </li>
        <li class="nav-item" v-if="user">
          <a class="nav-link" href>
            <i class="ion-compose"></i>&nbsp;New Post
          </a>
        </li>
        <li class="nav-item" v-if="!user">
          <router-link active-class="active" class="nav-link" to="/login">Sign In</router-link>
        </li>
        <li class="nav-item" v-if="!user">
          <router-link active-class="active" class="nav-link" to="/register">Sign Up</router-link>
        </li>
        <li class="nav-item" v-if="user">
          <router-link active-class="active" class="nav-link" to="/profile">{{user.username}}</router-link>
        </li>
        <li class="nav-item" v-if="user">
          <a class="nav-link" @click.prevent.stop="logout">Sign Out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { getModule } from "vuex-module-decorators";
import Auth from "@/store/auth/auth.module";

@Component({
  computed: mapState<any>({
    user: state => state.Auth.user
  })
})
export default class extends Vue {
  private authModule = getModule(Auth, this.$store);

  public logout() {
    this.authModule.logout();
  }
}
</script>