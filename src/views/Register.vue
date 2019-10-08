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
import Auth from "@/store/auth/auth.module";
import { isValidEmail } from "@/utils.ts";

@Component
export default class Register extends Vue {
  public name = "";
  public email = "";
  public password = "";
  public errors: string[] = [];

  private authModule = getModule(Auth, this.$store);

  public register() {
    const isValid = this.validateFields();
    if (!isValid) {
      return;
    }
  }

  private validateFields() {
    this.errors = [];
    if (!this.name.length) {
      this.errors.push("Name is required");
    }

    if (!this.email.length) {
      this.errors.push("Email is required");
    } else if (!isValidEmail(this.email)) {
      this.errors.push("Email is invalid");
    }

    if (!this.password.length) {
      this.errors.push("Password is required");
    }
    return this.errors.length === 0;
  }
}
</script>