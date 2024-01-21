<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="https://i.imgur.com/bt7JDNG.png" alt="logo" style="height:70px">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-0 mb-lg-0">
            <li class="nav-item" v-if="!user">
              <router-link to="/Login">Login</router-link>
            </li>
            <template v-else>
              <li class="nav-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about11">About</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Books11">Books</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Checkout11">Checkout</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Contact11">Contact</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/FAQs11">FAQs</router-link>
              </li>
              <li class="nav-item" v-if="user && role === 'librarian'">
                <router-link to="/Admin11">Admin</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/profile11">Profile</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/logout" @click="handleLogout">Logout</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  computed: {
    user() {
      return this.$store.state.user || cookies.get("LegitUser");
    },
    role() {
      return this.user?.result?.userRole || cookies.get("LegitUser")?.result[0].userRole;
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("logout");
      cookies.remove("LegitUser");
      this.$router.push("/Login");
    },
  },
};
</script>

<style scoped>
.container-fluid {
  background-color: #AAA8A8;
  padding: 0!important;
  margin: 0!important;
  height: 70px;
}
</style>