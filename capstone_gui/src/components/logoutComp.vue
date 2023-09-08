
<template>
    <div>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  import { isAuthenticated } from "@/authService";
  
  export default {
    methods: {
      ...mapActions(["logout"]),
    },
    computed: {
      isAuthenticated() {
        return isAuthenticated();
      },
    },
  };
  </script>
  