<template>
  <div class="background">
    <div class="profile-container">
      <h1 class="profile-heading">Manage your profile</h1>
      <div v-if="result" class="profile-info">
        <img :src="result.userImage" alt="User Image" class="profile-image" />
        <div class="profile-details">
          <p><strong>Name:</strong> {{ result.userName }} {{ result.userSurname }}</p>
          <p><strong>Email:</strong> {{ result.emailAdd }}</p>
          <p><strong>Cell Number:</strong> {{ result.cellNumber }}</p>
          <p><strong>Role:</strong> {{ result.userRole }}</p>
        </div>
      </div>
      <div v-else>
        <p>Loading user profile...</p>
      </div>
      <div class="profile-buttons">
        <button @click="editProfile" v-if="result" class="edit-button">Edit Profile</button>
        <button @click="deleteProfile" v-if="result" class="delete-button">Delete Profile</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';
import Swal from "sweetalert2";
import { mapActions } from "vuex";

const { cookies } = useCookies();

export default {
  computed: {
    user() {
      return this.$store.state.user || cookies.get("LegitUser");
    },
    result() {
      return this.user?.result;
    },
  },
  methods: {
    ...mapActions(["updateUserProfile", "deleteUserProfile"]),

    editProfile() {
    },

    async deleteProfile() {
      const confirmation = await Swal.fire({
        title: "Delete Profile",
        text: "Are you sure you want to delete your profile?",
        icon: "warning",
        showCancelButton: true,
      });

      if (confirmation.isConfirmed) {
        try {
          await this.deleteUserProfile();
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.background {
  height: 90vh;
  background-color: #d2d2d2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.profile-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.profile-image {
  height: 250px;
  width: 250px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
}

.profile-details {
  text-align: left;
  margin-top: 10px;
}

.profile-buttons {
  margin-top: 20px;
}

.edit-button,
.delete-button{
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease, color 0.3s ease;
}

.edit-button:hover{
  background-color: #4caf50;
  color: #fff;
  background-color: #45a049;
}

.delete-button:hover{
  background-color: #f44336;
  color: #fff;
  background-color: #f44336; 
}
</style>
