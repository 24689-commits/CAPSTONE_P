<template>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="d-flex">
            <div class="search-container">
              <input v-model="searchQuery" @input="performSearch" class="search-input" type="text" placeholder="Search books...">
              <select v-model="sortingOption" class="form-select" @change="applySorting">
                <option value="default">Sort By:</option>
                <option value="nameAsc">Name: A-Z</option>
                <option value="nameDesc">Name: Z-A</option>
              </select>
            </div>
            <div class="filters">
              <h4>Filter By</h4>
              <ul>
                <li @click="clearFilters">Show All</li>
                <li @click="applyCategoryFilter('Horror')">Horror</li>
                <li @click="applyCategoryFilter('History')">History</li>
                <li @click="applyCategoryFilter('fiction')">Fiction</li>
                <li @click="applyCategoryFilter('Non-fiction')">Non-fiction</li>
                <li @click="applyCategoryFilter('Educational')">Educational</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <h2 class="display-2">Books</h2>
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
      applyCategoryFilter(category) {
        this.selectedCategory = category;
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
  .container{
    display: flex;
  }
  .sidebar {
    background-color: #F0F0F0;
    padding: 20px;
    position: fixed;
    top: 5rem;
    left: 3rem;
    bottom: 0;
  }
  .search-container {
    margin-bottom: 40px;
    margin-top: 2rem;
  }
  .search-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .filters {
    margin-top: 20px;
  }
  .filters ul {
    list-style: none;
    padding: 0;
  }
  .filters li {
    cursor: pointer;
    margin-bottom: 5px;
  }
  .form-select {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  li{
    padding: .4rem;
  }
  li:hover{
    color:blue;
  }
  .card-img-top {
    object-fit: cover;
    height: 200px;
  }
  .card-body {
    padding: 10px;
  }
  .row{
    margin-left: 7rem;
  }
  .card {
    background-color: transparent;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 1000px;
    width: 90%;
  }
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }
  .modal-dialog {
    position: absolute;
    top: 30%;
    left:30%;
    height:800px;
    width:800px;
    z-index: 10001
  }
  .view-button{
    margin-top: 10px;
    border: 1px solid black;
    border-radius: 10px;
    width:100px;
    height:40px;
    cursor: pointer;
  }
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: 1px solid black;
    border-radius: 10px;
    width:100px;
    height:50px;
    cursor: pointer;
    z-index: 10002;
    background-color:#d2d2d2
  }
  .card-body {
    padding: 20px;
    text-align: center;
  }
  .card-body h6{
    font-size: 16px;
   
  }
  .card-title-bold{
    font-weight: bolder;
  }
  .card-title {
    font-size: 24px;
  }
  .card-text {
    font-size: 18px;
  }
  </style>