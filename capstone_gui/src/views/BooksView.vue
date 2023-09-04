<template>
  <div class="container">
    <div class="filters-container">
      <div class="search-container">
        <input v-model="searchQuery" @input="performSearch" class="search-input" type="text" placeholder="Search books...">
        <select v-model="sortingOption" class="form-select" @change="applySorting">
          <option value="default">Sort By:</option>
          <option value="nameAsc">Name: A-Z</option>
          <option value="nameDesc">Name: Z-A</option>
        </select>
      </div>
      <div class="filters">
        <select v-model="selectedCategory" class="form-select" @change="applyCategoryFilter">
          <option value="">Show All</option>
          <option value="Horror">Horror</option>
          <option value="History">History</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Educational">Educational</option>
        </select>
      </div>
    </div>
    <div class="books-container">
      <div class="row justify-content-center" v-if="filteredBooks">
        <div v-for="book in filteredBooks" class="col-4" :key="book.bookID">
          <div class="col">
            <img :src="book.bookUrl" class="card-img-top img fluid" :alt="book.bookName" />
            <div class="card-body">
              <h6 class="card-title-bold">{{ book.bookName }}</h6>
              <h6 class="card-text">Author: {{ book.author }}</h6>
              <h6 class="card-title">Category: {{ book.category }}</h6>
              <h6 class="card-title">Quantity: {{ book.quantity }}</h6>
              <a href="./CheckoutView.vue">Borrow</a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row justify-content-center">
        <SpinnerCompVue />
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
      selectedGender: '',
      sortingOption: 'default',
      product:{
        showPopover:false,
        bookUrl: '',
        bookName: '',
        category: '',
        author: '',
      }
    };
  },
  methods: {
    performSearch() {
    },
    applyCategoryFilter() {
    },
    clearFilters() {
      this.selectedCategory = '';
    },
    applySorting() {
    },
    showPopover(book) {
      book.showPopover = true;
    },
    closeModal(book) {
      book.showPopover = false;
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
   flex: 1;
   display: flex;
   align-items: center;
 }
 
 .filters {
   flex: 1;
   display: flex;
   align-items: center;
 }
 
 .books-container {
   width: 100%;
 }
 
 </style>
 