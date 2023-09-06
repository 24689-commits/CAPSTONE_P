<template>
    <div class="container-fluid">
        <!-- ==============BOOKS================= -->
        <h2>BOOKS</h2>
        <button class="btn btn-primary" @click="showAddBookModal = true">Add Book</button>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.bookID">
                    <td>{{ book.bookID }}</td>
                    <td>{{ book.bookName }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.category }}</td>
                    <td>
                        <img class="img-top img-fluid" style="height: 100px; width: 100px" :src="book.bookUrl"
                            alt="Book Image">
                    </td>
                    <td>
                        <button class="btn btn-primary" @click="deleteBook(book.bookID)">Delete</button>
                        <button class="btn btn-secondary" @click="editBook(book)">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Add Book Modal -->
        <div v-if="showAddBookModal" class="modal-over">
            <div class="modal-content">
                <h3>Add Book</h3>
                <form @submit.prevent="addBook">
                    <div>
                        <spinner-comp v-if="isLoadingAddBook" />
                    </div>
                    <div class="mb-3">
                        <label for="bookName">Name:</label>
                        <input type="text" id="bookName" v-model="newBook.bookName" required>
                    </div>
                    <div class="mb-3">
                        <label for="author">Author:</label>
                        <input type="text" id="author" v-model="newBook.author" required>
                    </div>
                    <div class="mb-3">
                        <label for="category">Category:</label>
                        <input type="text" id="category" v-model="newBook.category" required>
                    </div>
                    <div class="mb-3">
                        <label for="bookUrl">Image URL:</label>
                        <input type="text" id="bookUrl" v-model="newBook.bookUrl" required>
                    </div>
                    <!-- Submit and Cancel buttons -->
                    <button class="btn btn-primary" type="submit" :disabled="isLoadingAddBook">Add</button>
                    <button class="btn btn-secondary" @click="showAddBookModal = false"
                        :disabled="isLoadingAddBook">Cancel</button>
                </form>
            </div>
        </div>

        <!-- Edit Book Modal -->
        <div v-if="showEditBookModal" class="modal-over">
            <div class="modal-content">
                <h3>Edit Book</h3>
                <form @submit.prevent="updateBook">
                    <div>
                        <spinner-comp v-if="isLoadingUpdateBook" />
                    </div>
                    <!-- Input fields for editing a book -->
                    <div class="mb-3">
                        <label for="editBookName">Name:</label>
                        <input type="text" id="editBookName" v-model="editBookData.bookName" required>
                    </div>
                    <div class="mb-3">
                        <label for="editAuthor">Author:</label>
                        <input type="text" id="editAuthor" v-model="editBookData.author" required>
                    </div>
                    <div class="mb-3">
                        <label for="editCategory">Category:</label>
                        <input type="text" id="editCategory" v-model="editBookData.category" required>
                    </div>
                    <div class="mb-3">
                        <label for="editBookUrl">Image URL:</label>
                        <input type="text" id="editBookUrl" v-model="editBookData.bookUrl" required>
                    </div>
                    <!-- Submit and Cancel buttons -->
                    <button class="btn btn-primary" type="submit" :disabled="isLoadingUpdateBook">Update</button>
                    <button class="btn btn-secondary" @click="showEditBookModal = false"
                        :disabled="isLoadingUpdateBook">Cancel</button>
                </form>
            </div>
        </div>

        <!-- ==============USERS================= -->
        <h2>USERS</h2>
        <button class="btn btn-primary" @click="showAddUserModal = true">Add User</button>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Cellphone number</th>
                    <th>Profile Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.userID">
                    <td>{{ user.userID }}</td>
                    <td>{{ user.userName }}</td>
                    <td>{{ user.userSurname }} </td>
                    <td>{{ user.userRole }}</td>
                    <td>{{ user.emailAdd }}</td>
                    <td>{{ user.cellNumber }}</td>
                    <td>
                        <img class="img-top img-fluid" style="height: 100px; width: 100px" :src="user.userImage"
                            alt="User Image">
                    </td>
                    <td>
                        <!-- Buttons for actions -->
                        <button class="btn btn-primary" @click="deleteUser(user.userID)">Delete</button>
                        <button class="btn btn-secondary" @click="editUser(user)">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Add User Modal -->
        <div v-if="showAddUserModal" class="modal-over">
            <div class="modal-content">
                <h3>Add User</h3>
                <form @submit.prevent="addUser">
                    <div>
                        <spinner-comp v-if="isLoadingAddUser" />
                    </div>
                    <div class="mb-3">
                        <label for="userFirstName">First Name:</label>
                        <input type="text" id="userFirstName" v-model="newUser.userName" required>
                    </div>
                    <div class="mb-3">
                        <label for="userLastName">Last Name:</label>
                        <input type="text" id="userLastName" v-model="newUser.userSurname" required>
                    </div>
                    <div class="mb-3">
                        <label for="userGender">Role:</label>
                        <input type="text" id="userRole" v-model="newUser.userRole" required>
                    </div>
                    <div class="mb-3">
                        <label for="userDOB">Date of Birth:</label>
                        <input type="date" id="userDOB" v-model="newUser.userDOB" required>
                    </div>
                    <div class="mb-3">
                        <label for="userEmail">Email:</label>
                        <input type="text" id="userEmail" v-model="newUser.emailAdd" required>
                    </div>
                    <div class="mb-3">
                        <label for="userEmail">Cellphone number:</label>
                        <input type="text" id="cellNumber" v-model="newUser.cellNumber" required>
                    </div>
                    <div class="mb-3">
                        <label for="userImage">Profile Image URL:</label>
                        <input type="text" id="userImage" v-model="newUser.userImage" required>
                    </div>
                    <!-- Submit and Cancel buttons -->
                    <button class="btn btn-primary" type="submit" :disabled="isLoadingAddUser">Add</button>
                    <button class="btn btn-secondary" @click="showAddUserModal = false"
                        :disabled="isLoadingAddUser">Cancel</button>
                </form>
            </div>
        </div>

        <!-- Edit User Modal -->
        <div v-if="showEditUserModal" class="modal-over">
            <div class="modal-content">
                <h3>Edit User</h3>
                <form @submit.prevent="updateUser">
                    <div>
                        <spinner-comp v-if="isLoadingUpdateUser" />
                    </div>
                    <div class="mb-3">
                        <label for="editUserFirstName">First Name:</label>
                        <input type="text" id="editUserFirstName" v-model="editUserData.userName" required>
                    </div>
                    <div class="mb-3">
                        <label for="editUserLastName">Last Name:</label>
                        <input type="text" id="editUserLastName" v-model="editUserData.userSurname" required>
                    </div>
                    <div class="mb-3">
                        <label for="editUserGender">Gender:</label>
                        <input type="text" id="editUserRole" v-model="editUserData.userRole" required>
                    </div>
                    <div class="mb-3">
                        <label for="editCellnumber">Date of Birth:</label>
                        <input type="date" id="editCellnumber" v-model="editUserData.cellNumber" required>
                    </div>
                    <div class="mb-3">
                        <label for="editUserEmail">Email:</label>
                        <input type="text" id="editUserEmail" v-model="editUserData.emailAdd" required>
                    </div>
                    <div class="mb-3">
                        <label for="editUserProfileUrl">Profile Image URL:</label>
                        <input type="text" id="editUserProfileUrl" v-model="editUserData.userImage" required>
                    </div>
                    <!-- Submit and Cancel buttons -->
                    <button class="btn btn-primary" type="submit" :disabled="isLoadingUpdateUser">Update</button>
                    <button class="btn btn-secondary" @click="showEditUserModal = false"
                        :disabled="isLoadingUpdateUser">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import SpinnerCompVue from '@/components/SpinnerComp.vue'

export default {
    components: {
        SpinnerCompVue
    },
    data() {
        return {
            showAddBookModal: false,
            showEditBookModal: false,
            isLoadingAddBook: false,
            isLoadingUpdateBook: false,
            newBook: {
                bookName: '',
                author: '',
                category: '',
                bookUrl: '',
            },
            editBookData: {
                bookID: null,
                bookName: '',
                author: '',
                category: '',
                bookUrl: '',
            },
            showAddUserModal: false,
            showEditUserModal: false,
            isLoadingAddUser: false,
            isLoadingUpdateUser: false,
            newUser: {
                userName: '',
                userSurname: '',
                userRole: '',
                cellNumber: null,
                emailAdd: '',
                userImage: '',
            },
            editUserData: {
                userID: null,
                userName: '',
                userSurname: '',
                userRole: '',
                cellNumber: null,
                emailAdd: '',
                userImage: '',
            },
        };
    },
    computed: {
        books() {
            return this.$store.getters.getBooks;
        },
        users() {
            return this.$store.getters.getUsers;
        },
    },
    methods: {
        editBook(book) {
            this.editBookData = { ...book };
            this.showEditBookModal = true;
        },
        async addBook() {
            this.isLoadingAdd = true;

            try {
                await this.$store.dispatch('addBook', this.newProduct);
                this.isLoadingAdd = false;
                this.showAddModal = false;
                this.newProduct = {
                    bookName: '',
                    author: 0,
                    category: '',
                    image: '',
                };
            } catch (error) {
                console.error('Error adding book:', error);
                this.isLoadingAdd = false;
            }
        },
       async updateBook() {
            this.isLoadingUpdate = true;
      try {
        await this.$store.dispatch('updateBook', this.editBookData);
        this.isLoadingUpdate = false;
        this.showEditModal = false;
        this.editProductData = {
          bookID: null,
          bookName: '',
          author: '',
          category: '',
          image:''
        };
      } catch (error) {
        console.error('Error updating book:', error);
        this.isLoadingUpdate = false;
      }
    },
       async deleteBook(id) {
            await this.$store.dispatch('deleteBook', id);
        },
        editUser(user) {
            this.editUserData = { ...user };
            this.showEditUserModal = true;
        },
        addUser() {
            this.isLoading = true;
            this.$store.dispatch('register', this.newUser);
            this.isLoading = false;
            this.showAddModal = false;
        },
        async updateUser() {
          this.isLoadingUpdate = true; 
      try {
        await this.$store.dispatch('updateUser', this.editUserData);
      } catch (error) {
        console.error('Update user error:', error);
      }
      this.isLoadingUpdate = false; 
      this.showEditModal = false;
    },
      async deleteUser(id) {
      await this.$store.dispatch('deleteUser', id);
    },
  },
    created() {
        this.$store.dispatch('fetchBooks');
        this.$store.dispatch('fetchUsers');
    },
};
</script>
  
<style scoped>
.modal-over {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-content {
    background-color: white;
    width: 39%;
    padding: 20px;
    border-radius: 8px;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}</style>
  