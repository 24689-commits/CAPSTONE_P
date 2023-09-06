<template>
  <div class="container">
    <div class="filters-container">
      <div class="search-container">
        <input v-model="searchQuery" @input="performSearch" class="search-input" type="text" placeholder="Search book...">
      </div>
      <div class="filters">
        <select v-model="selectedCategory" class="form-select" @change="applyCategoryFilter">
          <option value="">Show All</option>
          <option value="Horror">Horror</option>
          <option value="History">History</option>
          <option value="fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Educational">Educational</option>
        </select>
        <select v-model="sortingOption" class="form-select" @change="applySorting">
          <option value="default">Sort By:</option>
          <option value="nameAsc">Name: A-Z</option>
          <option value="nameDesc">Name: Z-A</option>
        </select>
      </div>
    </div>
    <div class="col-md-11">
      <div class="row justify-content-center" v-if="filteredBooks">
        <div v-for="book in filteredBooks" class="col-3" :key="book.bookID">
          <div class="col">
            <img :src="book.bookUrl" class="card-img-top img fluid" :alt="book.bookName" />
            <div class="card-body">
              <h6 class="card-title-bold">{{ book.bookName }}</h6>
              <h6 class="card-text">Author: {{ book.author }}</h6>
              <h6 class="card-title">Category: {{ book.category }}</h6>
              <button class="view" @click="viewDetails(book)">View More</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row justify-content-center">
        <SpinnerCompVue /> 
      </div>
    </div>
    <div v-if="showDetail" class="book-detail">
      <div class="book-info">
        <img :src="selectedBook.bookUrl" class="card-img-top img fluid" :alt="selectedBook.bookName" />
        <h2>{{ selectedBook.bookName }}</h2>
        <p><strong>Author:</strong> {{ selectedBook.author }}</p>
        <p><strong>Category:</strong> {{ selectedBook.category }}</p>
        <router-link :to="{ name: 'checkout', params: { bookId: selectedBook.bookID } }" class="btn btn-secondary">Borrow</router-link>
      </div>
      <div class="close-button">
        <button @click="closeDetail">Close</button>
      </div>
    </div>
  </div>
</template>


<script>
import SpinnerCompVue from '../components/SpinnerComp.vue';

export default {
  components: {
    SpinnerCompVue
  },
  computed: {
    Books() {
      return this.$store.state.Books;
    },
    filteredBooks() {
      let filtered = this.Books;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(book => book.bookName.toLowerCase().includes(query));
      }
      if (this.selectedCategory) {
        filtered = filtered.filter(book => book.category === this.selectedCategory);
      }
      if (this.sortingOption === 'nameAsc') {
        filtered.sort((a, b) => a.bookName.localeCompare(b.bookName));
      } else if (this.sortingOption === 'nameDesc') {
        filtered.sort((a, b) => b.bookName.localeCompare(a.bookName));
      }
      return filtered;
    },
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortingOption: 'default',
      showDetail: false,
      selectedBook: null,
    };
  },
  methods: {
    performSearch() {
    },
    applyCategoryFilter() {
    },
    applySorting() {
    },
    viewDetails(book) {
    this.selectedBook = book;
    this.showDetail = true;
    this.$store.dispatch('fetchBooks', book.bookID);
  },
    closeDetail() {
      this.showDetail = false;
      this.selectedBook = null;
    },
  },
  mounted() {
    this.$store.dispatch('fetchBooks');
  },
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; 
  padding: 20px;
}

.filters-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.search-container {
  display: flex-start;
  display: flex;
  align-items: center;
}

.filters {
  display: flex;
  align-items: center;
}

.books-container {
  width: 100%;
}

.card-img-top {
  object-fit: cover;
  height: 350px;
}

.book-detail {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.book-info {
  flex: 1;
}

.close-button {
  text-align: right;
}

</style>
