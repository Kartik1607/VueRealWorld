<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link to="/register">Need an account?</router-link>
          </p>

          <error-list :errors="errors"></error-list>

          <form @submit.prevent="login">
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import Auth from "@/store/auth.module";
import { isValidEmail } from "@/utils.ts";
import { mapState } from "vuex";
import ErrorList from "@/components/Errors.vue";

@Component({
  components: {
    ErrorList
  },
  computed: mapState<any>({
    errors: state => state.Auth.errors
  })
})
export default class Login extends Vue {
  public email = "";
  public password = "";

  private authModule = getModule(Auth, this.$store);

  public login() {
    this.authModule.login({
      email: this.email,
      password: this.password
    });
  }
}
</script>