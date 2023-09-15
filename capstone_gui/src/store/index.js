import { createStore } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";
import { useCookies, createCookie, getCookie, deleteCookie } from "vue3-cookies";
import { setAuthToken, clearAuthToken, getAuthToken } from "../services/authService";
const cUrl = "https://capstone-qfm7.onrender.com/";
const { cookies } = useCookies();
export default createStore({
  state: {
    wishlist: [],
    userBookings: [],
    userBooking: null,
    users: [],
    user: null,
    Books: [],
    Book: null,
    spinner: false,
    token: null,
    msg: null,
  },
  getters: {
    getUserBookings: (state) => state.userBookings,
    getUserBooking: (state) => state.userBooking,
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
    getBooks: (state) => state.Books,
    getAuthToken(state) {
      return state.authToken;
    },
  },
  mutations: {
    addToWishlist(state, book) {
      state.wishlist.push(book);
    },
    removeFromWishlist(state, bookID) {
      state.wishlist = state.wishlist.filter((book) => book.bookID !== bookID);
    },
    setUserBookings(state, bookings) {
      state.userBookings = bookings;
    },
    setUserBooking(state, booking) {
      state.userBooking = booking;
    },
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
    setUser(state, user) {
      state.user = user;
      state.userRole = user?.result?.userRole;
    },
  },
  actions: {
    //:::::::::::::::::WISHLIST::::::::::::::::::::::::::::::
    addToWishlist({ commit }, book) {
      commit("addToWishlist", book);
    },
    removeFromWishlist({ commit }, bookID) {
      commit("removeFromWishlist", bookID);
    },
    async checkoutBook({  commit }, bookID) {
      try {
        const response = await axios.post(`/checkout/${bookID}`);
        if (response.status === 200) {
          commit("removeFromWishlist", bookID);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },


    // Login
async login(context, payload) {
  try {
    const response = await axios.post(`${cUrl}login`, payload);
    const { msg, token, result } = response.data;

    if (result) {
      context.commit("setToken", token);
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
        const {data} = await axios.post(`${cUrl}register`, payload);
        console.log(data);
        const { msg, result } = data;

        if (msg) {
          context.commit("setUser", { result, msg });
          Swal.fire({
            title: msg,
            icon: "success",
            text: `You have been registered successfully`,
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
    
    //:::::::::::::::::USER PROFILE:::::::::::::::::
    async fetchUserProfile(context, id) {
      try {
        const response = await axios.get(`${cUrl}user/${id}`);
        console.log(response.data.result);
        context.commit("setUser", response.data.result);
      } catch (error) {
        console.error(error);
      }
    },
    async updateUserProfile(context, updatedUser) {
      try {
        const userId = context.state.user.userId;
        const response = await axios.put(`${cUrl}user/${userId}`, updatedUser);
  
        if (response.data.msg) {
          context.commit("setUser", response.data.result);
  
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Profile updated successfully",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  
    async deleteUserProfile(context) {
      try {
        const userId = context.state.user.userId; // Get the user's ID from the state
        const response = await axios.delete(`${cUrl}user/${userId}`);
  
        if (response.data.msg) {
          context.commit("setUser", null);
          context.dispatch("logout");
  
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Profile deleted successfully",
          });
          router.push({ name: "Login" });
        }
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
  
 //::::::::::::::::::::::::::::::::::::USER PROFILE::::::::::::::::::::::::::::::::::::::::

//  async fetchUserProfile({ commit }, payload) { // Receive the payload here
//   const { id, authToken } = payload; // Extract the ID and authToken from the payload
//   try {
//     const response = await axios.get(`${cUrl}user/${id}`, {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });

//     if (response.data.result.length === 0) {
//       console.warn('User profile data is empty.');
//       commit('setUser', null);
//     } else {
//       commit('setUser', response.data.result);
//     }

//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// },

//::::::::::::::::::::::::::: BOOKINGS :::::::::::::::::::::::::::::::::::::::::

async fetchUserBookings(context, userId) {
  try {
    const response = await axios.get(`${cUrl}/user/${userId}/bookings`);
    context.commit("setUserBookings", response.data.result);
  } catch (error) {
    console.error(error);
  }
},

async fetchUserBooking(context, { userId, bookingId }) {
  try {
    const response = await axios.get(`${cUrl}/user/${userId}/booking/${bookingId}`);
    context.commit("setUserBooking", response.data.result);
  } catch (error) {
    console.error(error);
  }
},

async addUserBooking(context, { userId, data }) {
  try {
    const response = await axios.post(`${cUrl}/user/${userId}/booking`, data);
    context.dispatch("setUserBooking");
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
},

async updateUserBooking(context, { userId, bookingId, data }) {
  try {
    const response = await axios.put(`${cUrl}/user/${userId}/booking/${bookingId}`, data);
    context.dispatch("setUserBooking");
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
},

async deleteUserBooking(context, { userId, bookingId }) {
  try {
    const response = await axios.delete(`${cUrl}/user/${userId}/booking/${bookingId}`);
    context.dispatch("setUserBooking");
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
},

  },


  modules: {},
});
