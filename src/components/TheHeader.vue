<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link active-class="active" class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" exact to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href>
            <i class="ion-compose"></i>&nbsp;New Post
          </a>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" to="/login" v-if="!user">Sign In</router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" to="/register" v-if="!user">Sign Up</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-if="user" @click.prevent.stop="logout">Sign Out</a>
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