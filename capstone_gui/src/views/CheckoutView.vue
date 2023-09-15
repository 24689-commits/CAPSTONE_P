<template>
  <div class="container">
    <div v-if="wishlist.length > 0">
      <h2>Your Wishlist</h2>
      <ul>
        <li class="row" v-for="book in wishlist" :key="book.bookID">
          <div class="col-md-3">
            <img :src="book.bookUrl" class="card-img-top img-fluid" :alt="book.bookName" />
          </div>
          <div class="col-md-6">
            <p><strong>{{ book.bookName }}</strong> by {{ book.author }}</p>
          </div>
          <div class="col-md-3">
            <button @click="removeFromWishlist(book.bookID)">Remove</button>
          </div>
        </li>
      </ul>
      <button @click="checkoutAll" class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-else>
      <p>Your wishlist is empty.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { useCookies} from "vue3-cookies";
const {cookies} = useCookies()

export default {
  computed: {
    ...mapState(["wishlist"]) || cookies.get("LegitUser"),
    user(){
    cookies.get("LegitUser")
    }
  },
  mounted() {
    this.wishlist;
  },
  methods: {
    ...mapActions(["removeFromWishlist", "fetchUserBookings", "addUserBooking"]),
    async checkoutAll() {
      try {
        const promises = this.wishlist.map(async (book) => {
          const bookingData = {
            bookID: book.bookID,
          };

         
          return this.addUserBooking({
            userId: this.user.userId, 
            data: bookingData,
          }) || cookies.get("LegitUser");
        });

        const results = await Promise.all(promises);

        if (results.every((result) => result)) {
          this.wishlist.forEach((book) => this.removeFromWishlist(book.bookID));

          this.fetchUserBookings(this.user.userId);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.col-md-6 {
  flex: 1;
}

.card-img-top {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

p {
  font-size: 18px;
  color: #555;
  margin-top: 20px;
}

.checkout-button {
  margin-top: 20px;
}

</style>


