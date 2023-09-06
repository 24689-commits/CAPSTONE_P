<template>
    <div id="contact">
      <div class="container me-2">
        <div class="row align-items-center">
          <div class="col ms-6">
            <h1 class="top">Drop us a Line</h1>
            <p>Contact us on <span>hello@knowledgehub.com, +27 (0)21 486 1860</span> or <br> submit the form below.</p>
            <form action="https://formspree.io/f/xgebdjdv" method="POST" @submit.prevent="validateForm">
              <div class="mb-4">
                <input type="text" class="form-control" ref="fnameInput" name="first_name" placeholder="First Name">
                <div v-if="errors.firstName" class="text-danger">{{ errors.firstName }}</div>
              </div>
              <div class="mb-4">
                <input type="text" class="form-control" ref="lnameInput" name="last_name" placeholder="Last Name">
                <div v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</div>
              </div>
              <div class="mb-4">
                <input type="email" class="form-control" ref="emailInput" name="email" placeholder="name@email.com">
                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
              </div>
              <div class="mb-4">
                <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" name="message" ref="subjectInput" rows="3" placeholder="A brief description of what you require"></textarea>
                <div v-if="errors.subject" class="text-danger">{{ errors.subject }}</div>
              </div>
              
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
          <div class="col ms-6" id="address">
            <div class="row mb-4">
              <h5 class="card-title">CAPE TOWN(HQ)</h5>
              <p class="card-text">
                <ul>
                  <li>4th Floor, Central Building
                  </li>
                  <li>Blue River Park</li>
                  <li>2 Car Street, Observatory</li>
                  <li class="line">Cape Town, South Africa</li>
                  <li class="break">cpt@knowledgehub.com</li>
                  <li class="break">+27 (0)21 486 1860</li>
                </ul>
              </p>
            </div>
            <div class="row mb-4">
              <h5 class="card-title">JOHANNESBURG</h5>
              <p class="card-text">
                <ul>
                  <li>Block A, Cairo Office Park</li>
                  <li>17 Belville South</li>
                  <li>Bryanston</li>
                  <li class="line">Johannesburg, South Africa</li>
                  <li class="break">jhb@knowledgehub.com</li>
                  <li class="break">+27 (0)11 706 0279</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        errors: {
          firstName: "",
          lastName: "",
          email: "",
          subject: ""
        }
      };
    },
    methods: {
      validateForm(event) {
        this.errors = {}; 
  
        const firstName = this.$refs.fnameInput.value;
        const lastName = this.$refs.lnameInput.value;
        const email = this.$refs.emailInput.value;
        const subject = this.$refs.subjectInput.value;
  
        if (firstName.trim() === "") {
          this.errors.firstName = "Please enter your first name.";
        } else if (!/^[a-zA-Z\s]*$/.test(firstName)) {
          this.errors.firstName = "First name should only contain letters.";
        }
  
        if (lastName.trim() === "") {
          this.errors.lastName = "Please enter your last name.";
        } else if (!/^[a-zA-Z\s]*$/.test(lastName)) {
          this.errors.lastName = "Last name should only contain letters.";
        }
  
        if (email.trim() === "") {
          this.errors.email = "Please enter your email address.";
        } else if (!email.includes("@") || !email.includes(".")) {
          this.errors.email = "Please enter a valid email address.";
        }
  
        if (subject.trim() === "") {
          this.errors.subject = "Please enter a message.";
        }
  
        if (Object.keys(this.errors).length === 0) {
          event.target.submit();
        }
      }
    }
  };
  
  </script>
  
  <style>
  
  div h1{
    padding-bottom: 20px;
    padding-right: 80px;
    font-size: 70px;
    font-weight: normal;
    font-style: italic;
  }
  #address{
    margin-top: 70px;
    margin-right: 100px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  ul li{
    font-size: 14px;
  }
  .line{
    padding-bottom: 8px;
  }
  .break{
    padding-bottom: 14px;
    color: rgb(241, 108, 223);
  }
  div h5{
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  input {
    width: 500px !important;
  }
  
  textarea {
    width: 500px !important;
  }
  p {
    padding-right: 80px;
    padding-bottom: 22px;
    font-size: 14px;
    font-weight: normal;
  }
  
  p span{
    color: rgb(241, 108, 223);
  }
  @media screen and (max-width: 570px) {
    div h1 {
      font-size: 30px;
      padding-left: 80px;
    }
  
    #address {
      margin-top: 30px;
      margin-right: 0;
    }
  
    input,
    textarea {
      width: 100% !important; 
    }
  }
  p{
    padding-left: 70px;
  }
  
  @media screen and (max-width: 300px) {
    div h1 {
      font-size: 30px;
    }
  
    p {
      font-size: 12px;
      padding-left: 70px;
    }
  }
  </style>