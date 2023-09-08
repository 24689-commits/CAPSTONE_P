<template>
  <div class="container">
    <div class="home align-center">
      <div class="row justify-content-center">
        <div class="col-md-6 image-container">
          <!-- Your profile image -->
        </div>
        <div class="col-md-6 card-wrapper gray-background">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{{ isRegistering ? "REGISTER" : "WELCOME" }}</h3>
              <!-- Registration Form -->
              <div v-if="isRegistering">
                <div class="form-group">
                  <input v-model="userName" type="text" class="form-control" placeholder="User Name">
                </div>
                <div class="form-group">
                  <input v-model="userSurname" type="text" class="form-control" placeholder="User Surname">
                </div>
                <div class="form-group">
                  <input v-model="userRole" type="text" class="form-control" placeholder="User Role">
                </div>
                <div class="form-group">
                  <input v-model="cellNumber" type="text" class="form-control" placeholder="Cell Number">
                </div>
                <div class="form-group">
                  <input v-model="userImage" type="text" class="form-control" placeholder="User Image URL">
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
        userRole: this.userRole,
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.home {
  display: flex;
}

.image-container {
  padding: 20px;
  text-align: center;
}

.card-wrapper {
  padding: 20px;
}

.gray-background {
  background-color: #f0f0f0;
}

.card-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
  border: none;
}

.btn-success:hover {
  background-color: #1e7e34;
}

.btn-link {
  color: #007bff;
  text-decoration: underline;
  background-color: transparent;
  border: none;
}
</style>
