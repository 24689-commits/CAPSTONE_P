<template>
  <div>
    <h1>User Profile</h1>
      <div v-if="user">
          <img :src="user.userImage" alt="User Image" />
          <p><strong>Name:</strong> {{ userName, 'cvhjk' }} {{ userSurname }}</p>
          <p><strong>Email:</strong> {{ emailAdd }}</p>
          <p><strong>Cell Number:</strong> {{ user.cellNumber }}</p>
    </div>
    <div v-else>
      <p>Loading user profile...</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
    ...mapGetters(['getAuthToken']), 
  },
  mounted() {
    if (this.user && this.user.userID) { 
      this.fetchUserProfile();
    } else {
      console.log('User data is not available.');
    }
  },
  methods: {
    async fetchUserProfile() {
      const userId = this.user.userID;

      try {
        this.dispatch('fetchUserProfile', {
          id: userId,
        });

      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

