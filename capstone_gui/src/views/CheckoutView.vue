<template>
    <div class="checkout-container">
      <!-- Book Details -->
      <div class="book-details" v-if="selectedBook">
        <img :src="selectedBook.bookUrl" class="book-image" :alt="selectedBook.bookName" />
        <h2>{{ selectedBook.bookName }}</h2>
        <p><strong>Total Number of Books:</strong> {{ selectedBook.totalBooks }}</p>
      </div>
  
      <!-- User Details-->
      <div class="user-details" v-if="user">
        <h2>User Details</h2>
        <p><strong>Name:</strong> {{ user.userName }}</p>
        <p><strong>Surname:</strong> {{ user.userSurname }}</p>
        <p><strong>Collection Date:</strong> {{ collection_date }}</p>
        <p><strong>Return Date:</strong> {{ return_date }}</p>
        <button @click="completeCheckout" class="proceed-button">Proceed to Checkout</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedBook: null,
        user: null,
        collection_date: "",
        return_date: "",
      };
    },
    mounted() {
      const bookId = this.$route.params.bookId;
      this.collection_date = '',
      this.return_date = ''
    },
    methods: {
      completeCheckout() {
        this.$router.push({ name: "confirmation" });
      },
    },
  };
  </script>
  
  <style scoped>
  .checkout-container {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    width: 100%;
  }
  
  .book-details {
    flex: 1;
    text-align: center;
  }
  
  .book-image {
    max-width: 100%;
    height: auto;
  }
  
  .user-details {
    flex: 1;
    padding: 20px;
  }
  
  .proceed-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  