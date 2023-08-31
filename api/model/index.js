const Users = require('./users')
const Bookings =require('./bookings')
const Books = require('./books')
module.exports = {
    Users: new Users(),
    Books : new Books(),
    Bookings : new Bookings()
}