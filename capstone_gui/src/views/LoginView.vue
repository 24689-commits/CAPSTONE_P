<template>
<div class="image-fluid">
  <div class="container">
    <div class="home align-center">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="image-container">
            <img src="https://i.postimg.cc/hjGv0VTy/2221e8be-f780-4528-b1c1-19fbce13f220.jpg0" class="img-fluid" alt="Profile Image">
          </div>
        </div>
        <div class="col-md-6 card-wrapper gray-background">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{{ isRegistering ? "REGISTER" : "WELCOME" }}</h3>
              <!-- Registration Form -->
              <div v-if="isRegistering">
                <div class="form-group">
                  <input v-model="userName" type="text" class="form-control" placeholder="Name">
                </div>
                <div class="form-group">
                  <input v-model="userSurname" type="text" class="form-control" placeholder="Surname">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" value="student" disabled>
                </div>
                <div class="form-group">
                  <input v-model="cellNumber" type="text" class="form-control" placeholder="Cell Number">
                </div>
                <div class="form-group">
                  <input v-model="userImage" type="text" class="form-control" placeholder="Image Link">
                </div>
                <div class="form-group">
                  <input v-model="registerEmail" type="email" class="form-control" placeholder="Email Address">
                </div>
                <div class="form-group">
                  <input v-model="registerPassword" type="password" class="form-control" placeholder="Password">
                </div>
                <button @click="handleRegister" class="btn btn-success">Register</button>
                <button @click="toggleRegistration" class="btn btn-link">Back to Login</button>
              </div>
              <!-- Login Form -->
              <div v-else>
                <div class="form-group">
                  <input v-model="loginEmail" type="email" class="form-control" placeholder="Email Address">
                </div>
                <div class="form-group">
                  <input v-model="loginPassword" type="password" class="form-control" placeholder="Password">
                </div>
                <button @click="handleLogin" class="btn btn-primary">Login</button>
                <button @click="toggleRegistration" class="btn btn-link">Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
      userName: "",
      userSurname: "",
      userRole: "",
      cellNumber: "",
      userImage: "",
      isRegistering: false,
    };
  },
  methods: {
    ...mapActions(["login", "register"]),
    handleLogin() {
      const payload = {
        emailAdd: this.loginEmail,
        userPassword: this.loginPassword,
      };
      this.login(payload);
    },
    handleRegister() {
      const payload = {
        userName: this.userName,
        userSurname: this.userSurname,
        userRole: "Student",
        cellNumber: this.cellNumber,
        userImage: this.userImage,
        emailAdd: this.registerEmail,
        userPassword: this.registerPassword,
      };
      this.register(payload);
    },
    toggleRegistration() {
      this.isRegistering = !this.isRegistering;
    },
  },
};
</script>

<style scoped>
.image-fluid{
  background-image: url('https://i.postimg.cc/j56F9jgh/solid-light-grey-simple-background-767953.jpg');
}
.container {
  width: 100%;
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.home {
  width: 100%;
  max-width: 800px; 
  text-align: center;
}

.card-wrapper {
  width: 50%;
  background-color: #f5f5f5; 
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.btn-success, .btn-primary {
  width: 100%;
}
.image-container {
  text-align: center;
}

.img-fluid {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
}

</style>

