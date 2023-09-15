<template>
    <li class="nav-item" v-if="user">
      <router-link to="/logout" @click="handleLogout">Logout</router-link>
    </li>
  </template>
  
  <script>
  import { useCookies } from "vue3-cookies";
  const {cookies} = useCookies()
  
  export default {
    computed: {
      user() {
        return this.$store.state.user || cookies.get("LegitUser");
      },
    },
    methods: {
      handleLogout() {
        this.$store.dispatch("logout");
        const { cookies } = useCookies();
        cookies.remove("LegitUser");

        this.$router.push("/Login");
      },
    },
  };
  </script>
  