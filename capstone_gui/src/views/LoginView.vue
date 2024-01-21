<template>
  <div class="image-fluid">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-6">
          <img
            src="https://i.imgur.com/HQTA4Wb.jpg"
            class="img-fluid"
            alt="Profile Image" loading="lazy"
          />
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h3 class="card-title">{{ isRegistering ? "REGISTER" : "WELCOME" }}</h3>
            <!-- Registration Form -->
            <div v-if="isRegistering">
              <div class="form-group">
                <input
                  v-model="userName"
                  @input="validateName"
                  type="text"
                  class="form-control"
                  placeholder="Name"
                />
                <span class="error">{{ errors.userName }}</span>
              </div>
              <div class="form-group">
                <input
                  v-model="userSurname"
                  @input="validateSurname"
                  type="text"
                  class="form-control"
                  placeholder="Surname"
                />
                <span class="error">{{ errors.userSurname }}</span>
              </div>
              <div class="form-group d-none d-md-block">
                <input
                  type="text"
                  class="form-control"
                  value="student"
                  disabled
                />
              </div>
              <div class="form-group">
                <input
                  v-model="cellNumber"
                  @input="validateCellNumber"
                  type="text"
                  class="form-control"
                  placeholder="Cell Number"
                />
                <span class="error">{{ errors.cellNumber }}</span>
              </div>
              <div class="form-group">
                <input
                  v-model="userImage"
                  type="text"
                  class="form-control"
                  placeholder="Image Link"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="registerEmail"
                  @input="validateEmail"
                  type="email"
                  class="form-control"
                  placeholder="Email Address"
                />
                <span class="error">{{ errors.registerEmail }}</span>
              </div>
              <div class="form-group">
                <input
                  v-model="registerPassword"
                  @input="validatePassword"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                />
                <span class="error">{{ errors.registerPassword }}</span>
              </div>
              <button @click="handleRegister" class="btn btn-success">Register</button>
              <button @click="toggleRegistration" class="btn btn-link">Back to Login</button>
            </div>
            <!-- Login Form -->
            <div v-else>
              <div class="form-group">
                <input
                  v-model="loginEmail"
                  type="email"
                  class="form-control"
                  placeholder="Email Address"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="loginPassword"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <button @click="handleLogin" class="btn btn-success">Login</button>
              <button @click="toggleAccountRecovery" class="btn btn-link">Can't access account?</button> |
              <button @click="toggleRegistration" class="btn btn-link">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";

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
      submitted: false, 
      errors: {
        userName: "",
        userSurname: "",
        cellNumber: "",
        registerEmail: "",
        registerPassword: "",
      },
    };
  },
  methods: {
    ...mapActions(["login", "register"]),
    handleLogin() {
  if (!this.loginEmail || !this.loginPassword) {
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Please provide both email and password.",
      timer: 3000,
    });
    return;
  }

  const payload = {
    emailAdd: this.loginEmail,
    userPassword: this.loginPassword,
  };
  this.login(payload);
},
    handleRegister() {
      this.submitted = true;
      this.validateName();
      this.validateSurname();
      this.validateCellNumber();
      this.validateEmail();
      this.validatePassword();

      if (this.isValidForm()) {
        const payload = {
          userName: this.userName,
          userSurname: this.userSurname,
          userRole: "student",
          cellNumber: this.cellNumber,
          userImage: this.userImage,
          emailAdd: this.registerEmail,
          userPassword: this.registerPassword,
        };
        this.register(payload);
      }
    },
    toggleRegistration() {
      this.isRegistering = !this.isRegistering;
    },
    validateName() {
      const namePattern = /^[A-Za-z]+$/;
      if (!namePattern.test(this.userName)) {
        this.errors.userName = "Name must not contain numbers.";
      } else {
        this.errors.userName = "";
      }
    },
    validateSurname() {
      const namePattern = /^[A-Za-z]+$/;
      if (!namePattern.test(this.userSurname)) {
        this.errors.userSurname = "Surname must not contain numbers.";
      } else {
        this.errors.userSurname = "";
      }
    },
    validateCellNumber() {
      const cellNumberPattern = /^0\d{9}$/;
      if (!cellNumberPattern.test(this.cellNumber)) {
        this.errors.cellNumber = "Cell Number must start with 0 and be 10 digits.";
      } else {
        this.errors.cellNumber = "";
      }
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.registerEmail)) {
        this.errors.registerEmail = "Please enter a valid email address.";
      } else {
        this.errors.registerEmail = "";
      }
    },
    validatePassword() {
      if (this.registerPassword.length < 5 || !/^\d+$/.test(this.registerPassword)) {
        this.errors.registerPassword = "Password must be at least 5 digits and contain only numbers.";
      } else {
        this.errors.registerPassword = "";
      }
    },
    isValidForm() {
      return (
        !this.errors.userName &&
        !this.errors.userSurname &&
        !this.errors.cellNumber &&
        !this.errors.registerEmail &&
        !this.errors.registerPassword
      );
  }
}
};
</script>

<style scoped>
.image-fluid{
  width: 100%;
  overflow-x: hidden;
  height: 120vh;
}
.btn-link {
  text-decoration: none;
  color: black;
}
.btn-link:hover{
  color: #3032b8;
}

.image-fluid {
  background-image: url('https://i.imgur.com/mfTtsuL.jpg');
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #D9D9D9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

.btn-success,
.btn-primary {
  width: 100%;
}

.image-container {
  text-align: center;
}

.img-fluid {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.error {
  color: red;
}
@media (max-width: 767px) {

  .card-title {
    font-size: 15px;
  }

  .form-control {
    font-size: 10px;
  }
  .img-fluid {
    margin-top: 20px;
    height: 80%;
  }
  .d-md-block {
    display: none;
  }
}
</style>
