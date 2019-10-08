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
          <router-link active-class="active" class="nav-link" to="/login">Sign In</router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" to="/register">Sign Up</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>