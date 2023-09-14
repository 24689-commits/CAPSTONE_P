<template>
  <div>
    <h1>User Profile</h1>
      <div v-if="result">
          <img :src="result.userImage" alt="User Image" />
          <p><strong>Name:</strong> {{ result.userName}} {{ result.userSurname }}</p>
          <p><strong>Email:</strong> {{ result.emailAdd }}</p>
          <p><strong>Cell Number:</strong> {{ result.cellNumber }}</p>
    </div>
    <div v-else>
      <p>Loading user profile...</p>
    </div>
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies()

export default {
  computed: {
    user(){
      return this.$store.state.user || cookies.get("LegitUser")
    },
    result() {
      return this.user?.result
    }
  
  },
  mounted() {
    console.log(this.result);
  }
};
</script>

