const db = require("../config")
class Bookings{
    fetchBookings(req, res) {
       
        const query = `
        SELECT bookingID, userID, bookID, collection_date, return_date, bstatus AS status
        FROM bookings 
        `;
        db.query(query, (err, results) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                results
            });
        });
    }
    fetchBooking(req, res) {
       
        const query = `
        SELECT b.bookingID,u.userID, bk.bookID, u.userName,u.cellNumber, u.emailAdd, b.collection_date, b.return_date, bstatus AS status
        FROM bookings AS b
        INNER JOIN users AS u ON b.userID = u.userID
        INNER JOIN books AS bk ON b.bookID = bk.bookID;
        WHERE u.userID = ${req.params.id};
        `
        db.query(query, (err, results) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                results
            });
        });
    }
    addBooking(req, res) {
        const bookingData = {
            userID : req.body.userID,
            bookID : req.body.bookID,
            collection_date: req.body.collection_date,return_date: req.body.return_date,
            bStatus:req.body.bStatus
          
        };
      
        const query = `
          INSERT INTO bookings
          SET ?;
        `;
      
        db.query(query, [bookingData], (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({
              error: "An error occurred while adding the booking.",
            });
          } else {
            res.json({
              status: res.statusCode,
              msg: "The booking has been added successfully.",
            });
          }
        });
      }
      
    updateBooking(req,res){
        const query =`
        UPDATE bookings
        SET ?
        WHERE userID=?
        `
        db.query(query, [req.body, req.params.id],(err)=>{
           if (err) throw err
           res.json({
            status: statusCode,
            msg: "The record has been updated successfully."

           })
     
        })
    }
    deleteBooking(req,res){
        const query = `
        DELETE FROM bookings
        WHERE userID =${req.params.id}
        `
        db.query(query,(err)=>{
            if (err) throw err
            res.json({
                status:res.statusCode,
                msg: "The record has been successfully deleted"
            })
        })
    }


}
module.exports = Bookings

