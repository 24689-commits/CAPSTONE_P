import { createStore } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
import { useCookies } from "vue3-cookies";
import { setAuthToken, clearAuthToken } from "../services/authService";

const cUrl = "https://capstone-qfm7.onrender.com/";
const { cookies } = useCookies();
export default createStore({
  state: {
    users: [],
    user: null,
    Books: [],
    Book: null,
    spinner: false,
    token: null,
    msg: null,
  },
  getters: {
    getUsers: (state) => state.users,
    getBooks: (state) => state.Books,
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
    setSelectedBook(state, bookID) {
      state.selectedBook = state.Books.find((book) => book.bookID === bookID);
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
    },
  },
  actions: {
    // Login
    async login(context, payload) {
      try {
        const response = await axios.post(`${cUrl}login`, payload);
        const { msg, token, result } = response.data;

        if (result) {
          context.commit("setUser", { result, msg });
          cookies.set("LegitUser", { token, msg, result });
          setAuthToken(token);

          Swal.fire({
            title: msg,
            icon: "success",
            text: `Welcome back ${result?.userName}`,
            timer: 3000,
          });

          router.push({ name: "home" });
        }
      } catch (error) {
        console.log("clicked");
        const msg =
          error.response?.data?.msg || "An error occurred during login";

        Swal.fire({
          title: "Error",
          icon: "error",
          text: msg,
          timer: 3000,
        });
      }
    },

    // logout

    logout(context) {
      clearAuthToken();
      context.commit("setUser", null);
    },

    // Register
    async register(context, payload) {
      try {
        const response = await axios.post(`${cUrl}register`, payload);
        console.log(response);
        const { msg, result } = response.data;

        if (result) {
          context.commit("setUser", { result, msg });
          Swal.fire({
            title: msg,
            icon: "success",
            text: `You have been registered ${result?.userName}`,
            timer: 3000,
          });
          router.push({ name: "Login" });
        }
      } catch (error) {
        const msg =
          error.response?.data?.msg || "An error occurred during registration";

        Swal.fire({
          title: "Error",
          icon: "error",
          text: msg,
          timer: 3000,
        });
      }
    },

    // :::::::::::::::::::::::::::::::::::::::::::::::::::USERS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
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
        let { msg } = (await axios.post(`${cUrl}register`, newUser)).data;
        if (msg) {
          context.dispatch("fetchUsers");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateUser(context, editUserData) {
      try {
        let { msg } = (
          await axios.put(`${cUrl}user/${editUserData.userID}`, editUserData)
        ).data;
        if (msg) {
          context.dispatch("fetchUsers");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser(context, id) {
      try {
        let { msg } = (await axios.delete(`${cUrl}user/${id}`)).data;
        if (msg) {
          context.dispatch("fetchUsers");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    //::::::::::::::::::::::::::::::::::::::::::::::BOOKS:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    async fetchBooks(context) {
      try {
        const response = await axios.get(`${cUrl}books`);
        context.commit("setBooks", response.data.results);
      } catch (error) {
        console.error(error);
      }
    },
    ///////////////////
    async fetchBook(context, bookId) {
      try {
        const response = await axios.get(`${cUrl}books`);
        context.commit("setBooks", response.data.results);
        context.commit("setSelectedBook", bookId);
      } catch (error) {
        console.error(error);
      }
    },
    ///////////////////////////////
    async addBook(context, newBook) {
      try {
        let { msg } = (await axios.post(`${cUrl}addBook`, newBook)).data;
        if (msg) {
          context.dispatch("fetchBooks");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateBook(context, editBookData) {
      try {
        let { msg } = (
          await axios.put(`${cUrl}book/${editBookData.bookID}`, editBookData)
        ).data;
        if (msg) {
          context.dispatch("fetchBooks");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBook(context, id) {
      try {
        let { msg } = (await axios.delete(`${cUrl}book/${id}`)).data;
        if (msg) {
          await context.dispatch("fetchBooks");
          Swal.fire({
            icon: "success",
            title: "Success",
            text: msg,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  async borrowBook(context, bookID) {
    try {
      await axios.post(`${cUrl}user/:id/booking`, { bookID });
      context.commit("markBookAsBorrowed", bookID);
      return Promise.resolve("Book successfully borrowed.");
    } catch (error) {
      console.error(error);
      return Promise.reject("Failed to borrow the book.");
    }
  },
  modules: {},
});
