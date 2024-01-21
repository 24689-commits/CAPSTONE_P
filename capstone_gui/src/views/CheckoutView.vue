<template>
  <div class="image">
  <div class="container">
    <div v-if="wishlist.length > 0">
      <h2>Your Wishlist</h2>
      <ul>
        <li class="row" v-for="book in wishlist" :key="book.bookID">
          <div class="col-md-6">
          <img :src="book.bookUrl" class="card-img-top img-fluid" :alt="book.bookName" />
        </div>
        <div class="col-md-6">
          {{ book.bookName }} by {{ book.author }}
          <button @click="removeFromWishlist(book.bookID)">Remove</button>
        </div>
        </li>
      </ul>
      <button @click="checkoutAll">Proceed to Checkout</button>
    </div>
    <div v-else>
      <p>Your wishlist is empty.</p>
    </div>
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
  },
  mounted() {
    this.whishlist
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
.container{
  height: 100vh;
}
.image{
  background-image: url('https://i.imgur.com/mfTtsuL.jpg');
}
.card-img-top {
  width: 100px;
  height: 100px;
}
p{
  font-size: 40px;
}
</style>
