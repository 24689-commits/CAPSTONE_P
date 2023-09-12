<template>
    <div>
      <h1>User Profile</h1>
      <div v-if="user">
        <div v-if="user">
            <p><strong>Name:</strong> {{ user.userName }} {{ user.userSurname }}</p>
            <p><strong>Email:</strong> {{ user.emailAdd }}</p>
            <p><strong>Cell Number:</strong> {{ user.cellNumber }}</p>
            <!-- Add other user details here -->
            <img :src="user.userImage" alt="User Image" />
      </div>
      <div v-else>
        <p>Loading user profile...</p>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['user']), // Map 'user' from Vuex state to this.user
      ...mapGetters(['getAuthToken']), // Map 'getAuthToken' from Vuex getters
    },
    mounted() {
      // Fetch user profile data when the component is mounted
      if (this.user && this.user.userID) { // Ensure user is not null and has a userID
        this.fetchUserProfile();
      } else {
        console.warn('User data is not available.');
      }
    },
    methods: {
      async fetchUserProfile() {
        const authToken = this.getAuthToken(); // Use the mapped getter
        const userId = this.user.userID; // Ensure user is not null
  
        try {
          const response = await this.$store.dispatch('fetchUserProfile', {
            id: userId,
            authToken: authToken,
          });
  
          // Handle success and error cases as needed
        } catch (error) {
          console.error(error);
          // Handle the error
        }
      },
    },
  };
  </script>
  