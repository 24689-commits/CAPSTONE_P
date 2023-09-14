<template>
  <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div class="container-fluid">
            <a class="navbar-brand" href="/" ><img src="https://i.postimg.cc/5yXXPmCF/The-Knowledge-hub-1-removebg-preview.png" alt="logo" style="height:70px"></a>
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
                <li class="nav-item" v-show="role == 'librarian'">
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
import { useCookies } from "vue3-cookies";
const {cookies} = useCookies()
export default {
  computed: {
    user(){
     return this.$store.state.user || cookies.get("LegitUser")
    },
    role(){
      return this.user?.result?.userRole || cookies.get("LegitUser")?.result[0].userRole
      
    }
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
