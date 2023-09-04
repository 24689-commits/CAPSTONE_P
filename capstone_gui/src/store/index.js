import { createStore } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2'

const cUrl = "http://localhost:3001/";

export default createStore({
  state: {
    users: [],
    user: null,
    Books: [],
    Book: null,
    spinner: false,
    token: null,
    msg: null
  },
  getters: {
    getUsers: state => state.users,
    getBooks: state => state.Books

  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setBooks(state, Books) {
      state.Books = Books;
    },
    setBook(state, Book) {
      state.Book = Book;
    },
    setSpinner(state, value) {
      state.spinner = value;
    },
    setToken(state, token) {
      state.token = token;
    },
    setMsg(state, msg) {
      state.msg = msg;
    }
  },
  actions: {
    async fetchUsers(context) {
      try {
        const response = await axios.get(`${cUrl}users`);
        context.commit("setUsers", response.data.results);
      } catch (error) {
        console.error(error);
      }
    },
    async addUser(context, newUser) {
      try {
        let {msg} = (await axios.post(`${cUrl}register`, newUser)).data;
        if (msg) {
          context.dispatch('fetchUsers');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateUser(context, editUserData) {
      try {
        if (editUserData.userDOB) {
          editUserData.userDOB = new Date(editUserData.userDOB).toISOString().slice(0, 19).replace('T', ' ');
        }
    
        let { msg } = (await axios.put(`${cUrl}user/${editUserData.userID}`, editUserData)).data;
        if (msg) {
          context.dispatch('fetchUsers');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser(context, id) {
      try {
        let {msg} = (await axios.delete(`${cUrl}user/${id}`)).data;
        if (msg) {
          context.dispatch('fetchUsers');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },

    async fetchBooks(context) {
      try {
        const response = await axios.get(`${cUrl}books`);
        context.commit("setBooks", response.data.results);
      } catch (error) {
        console.error(error);
      }
    },
    async addBook(context, newBook) {
      try {
        let {msg} = (await axios.post(`${cUrl}addBook`, newBook)).data;
        if (msg) {
          context.dispatch('fetchBooks'); 
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateBook(context, editBookData) {
      try {
        let {msg} = (await axios.put(`${cUrl}book/${editBookData.prodID}`, editBookData)).data;
        if (msg){
          context.dispatch('fetchBooks'); 
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBook(context, id) {
      try {
        let {msg} = (await axios.delete(`${cUrl}book/${id}`)).data;
        if (msg){
          await context.dispatch('fetchBooks'); 
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  modules: {}
});
