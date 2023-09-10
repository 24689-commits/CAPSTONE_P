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
    <div class="row" v-if="filteredBooks.length">
      <div class="col-sm-4" v-for="book in filteredBooks" :key="book.bookID">
        <div class="card mb-3">
          <img :src="book.bookUrl" class="card-img-top img-fluid" :alt="book.bookName" />
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
      <h2>No books found</h2>
    </div>
    <div v-if="showDetail" class="book-detail full-screen">
      <div class="book-info">
        <img :src="selectedBook.bookUrl" class="card-img-top img-fluid" :alt="selectedBook.bookName" />
        <h2>{{ selectedBook.bookName }}</h2>
        <p><strong>Author:</strong> {{ selectedBook.author }}</p>
        <p><strong>Category:</strong> {{ selectedBook.category }}</p>
        <router-link :to="{ name: 'checkout', params: { bookID: selectedBook.bookID } }" class="btn btn-secondary">Borrow</router-link>
      </div>
      <div class="close-button">
        <button @click="closeDetail">Close</button>
      </div>
    </div>
  </div>
</template>


<script>
import SpinnerComp from '@/components/SpinnerComp.vue';
export default {
  components: {
   SpinnerComp
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
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 350px;
}
.card:hover {
  transform: scale(1.03);
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

.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.9);
  overflow-y: auto;
}

.book-info {
  margin: auto;
  padding: 20px;
  text-align: center;
}

.close-button {
  text-align: right;
}


</style>
