<template>
  <div class="container">
    <div v-if="selectedBook" class="book-detail full-screen">
      <div class="book-info">
        <img :src="selectedBook.bookUrl" class="card-img-top img-fluid" :alt="selectedBook.bookName" />
        <h2>{{ selectedBook.bookName }}</h2>
        <p><strong>Author:</strong> {{ selectedBook.author }}</p>
        <p><strong>Category:</strong> {{ selectedBook.category }}</p>
        <button @click="borrowBook(selectedBook.bookID)" class="btn btn-primary">Borrow</button>
      </div>
      <div class="close-button">
        <router-link :to="{ name: 'Books' }" class="btn btn-secondary">Back to Books</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';
import { setAuthToken, clearAuthToken } from "../services/authService";

export default {
  computed: {
    selectedBook() {
      // Retrieve the selected book from the store or route params
      // You may need to update this logic based on your store structure
      return this.$store.state.selectedBook;
    },
  },
  methods: {
    borrowBook(bookID) {
      // Implement the borrowBook action to send a request to your API
      // to borrow the selected book
      this.$store.dispatch('borrowBook', bookID)
        .then((message) => {
          // Handle success, e.g., show a success message
          console.log(message);
        })
        .catch((error) => {
          // Handle failure, e.g., show an error message
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
