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
routes.get('/Books',(req,res)=>{
  Books.fetchBooks(req,res)
})
routes.get('/Book/:id',(req,res)=>{
    Books.fetchBook(req,res)
})
routes.post('/addBook', bodyParser.json(),
(req,res)=>{
    Books.addBook(req,res)
})
routes.put('/Book/:id',bodyParser.json(),
(req,res)=>{
    Books.updateBook(req,res)
})
routes.patch('/Book/:id',bodyParser.json(),
(req,res)=>{
    Books.updateBook(req,res)
})
routes.delete('/Book/:id',(req,res)=>{
    Books.deleteBooks(req,res)
})


//====================================Bookings===============================
module.exports ={
    express,
    routes
}