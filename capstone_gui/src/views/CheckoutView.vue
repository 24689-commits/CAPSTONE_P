<template>
  <div>
    <h2>Checkout Page</h2>
    <p>User Name: {{ userName }} {{ userSurname }}</p>
    <h3>Selected Books:</h3>
    <ul>
      <li v-for="book in selectedBook" :key="book.bookID">
        {{ book.bookName }} by {{ book.author }}
        <button @click="removeFromWishlist(book)">Remove</button>
      </li>
    </ul>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios for making API requests

export default {
  data() {
    return {
      userName: '', // Populate this with the user's name from your store
      userSurname: '', // Populate this with the user's surname from your store
      selectedBook: [], // An array to store selected books
    };
  },
  created() {
    // Fetch user information here and populate userName and userSurname
    this.fetchUser(); // Call the fetchUser function
  },
  methods: {
    async fetchUser() { // Define the fetchUser function
      try {
        const response = await axios.get(`${"https://capstone-qfm7.onrender.com/"}user/:id/`); // Adjust the API route accordingly
        this.userName = response.data.userName;
        this.userSurname = response.data.userSurname;
      } catch (error) {
        console.error(error);
      }
    },
    addToWishlist(book) {
      // Add the selected book to the wishlist
      this.selectedBook.push(book);
    },
    removeFromWishlist(book) {
      // Remove the selected book from the wishlist
      const index = this.selectedBook.findIndex(b => b.bookID === book.bookID);
      if (index !== -1) {
        this.selectedBook.splice(index, 1);
      }
    },
    checkout() {
      // Send a request to the server to complete the checkout
      const selectedBookIds = this.selectedBook.map(book => book.bookID);
      axios.post(`${"https://capstone-qfm7.onrender.com/"}user/:id/booking`, { bookIDs: selectedBookIds })
        .then(response => {
          // Handle successful checkout (e.g., show a success message)
          console.log('Checkout successful.');
        })
        .catch(error => {
          // Handle error (e.g., show an error message)
          console.error(error);
        });
    },
    
  },
};
</script>
