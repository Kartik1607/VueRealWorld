<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">Have an account?</router-link>
          </p>

          <ul v-if="errors.length" class="error-messages">
            <li v-for="(error,index) in errors" :key="index">{{error}}</li>
          </ul>

          <form @submit.prevent="register">
            <fieldset class="form-group">
              <input
                v-model="name"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
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
            <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
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

@Component({
  computed: mapState<any>({
    errors: state => state.Auth.errors
  })
})
export default class Register extends Vue {
  public name = "";
  public email = "";
  public password = "";

  private authModule = getModule(Auth, this.$store);

  public register() {
    this.authModule.register({
      name: this.name,
      email: this.email,
      password: this.password
    });
  }
}
</script>