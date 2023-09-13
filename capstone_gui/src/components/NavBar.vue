<template>
  <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">LOGO</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto mb-0 mb-lg-0">
                <li class="nav-item">
                  <router-link to="/Login">Login</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/about">About</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/Books">Books</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/Checkout">Checkout</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/Contact">Contact</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/FAQs">FAQs</router-link>
                </li>
                <li class="nav-item" v-show="userRole === 'librarian'">
                  <router-link to="/Admin">Admin</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/profile">Profile</router-link>
                </li>
                
              </ul>
            </div>
          </div>
      </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userRole"]),
  },
};
</script>

<style scoped>
.container-fluid {
  background-color: #8e6f6f;
 padding: 0!important;

}

</style>
