const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const {verifyAToken} = require('../middleware/errorHandling')
const routes = express.Router()

const {Users, Books, Bookings}=require('../model')

routes.post('/login',
bodyParser.json(), (req, res)=>{
    Users.login(req, res)
})

// =====user router==========
routes.get('/users',(req,res)=>{
    Users.fetchUsers(req,res)
})
routes.get('/user/:id',(req,res)=>{
    Users.fetchUser(req,res)
})
routes.post('/register', bodyParser.json(),
(req,res)=>{
    Users.register(req,res)
})
routes.put('/user/:id',bodyParser.json(),
(req,res)=>{
    Users.updateUser(req,res)
})
routes.patch('/user/:id',bodyParser.json(),
(req,res)=>{
    Users.updateUser(req,res)
})
routes.delete('/user/:id',(req,res)=>{
    Users.deleteUser(req,res)
})
// ==================================Books====================--========
routes.get('/books',(req,res)=>{
  Books.fetchBooks(req,res)
})
routes.get('/book/:id',(req,res)=>{
    Books.fetchBook(req,res)
})
routes.post('/addBook', bodyParser.json(),
(req,res)=>{
    Books.addBook(req,res)
})
routes.put('/book/:id',bodyParser.json(),
(req,res)=>{
    Books.updateBook(req,res)
})
routes.patch('/book/:id',bodyParser.json(),
(req,res)=>{
    Books.updateBook(req,res)
})
routes.delete('/book/:id',(req,res)=>{
    Books.deleteBook(req,res)
})


//====================================Bookings===============================
routes.get('/user/:id/bookings',(req,res)=>{
    Bookings.fetchBookings(req,res)
  })
  routes.get('/user/:id/booking',(req,res)=>{
    Bookings.fetchBooking(req,res)
  })
  routes.post('/user/:id/booking',(req,res)=>{
    Bookings.addBooking(req,res)
  })
  routes.put('/user/:id/booking/:id',(req,res)=>{
    Bookings.updateBooking(req,res)
  })
  routes.patch('/user/:id/booking/:id',(req,res)=>{
    Bookings.updateBooking(req,res)
  })
  routes.delete('/user/:id/bookings',(req,res)=>{
    Bookings.deleteBooking(req,res)
})
routes.delete('/user/:id/booking/:id',(req,res)=>{
    Bookings.deleteBookingbyid(req,res)
})
module.exports ={
    express,
    routes
}