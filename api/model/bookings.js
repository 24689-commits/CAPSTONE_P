const db = require("../config")
class Bookings{
    fetchBookings(req, res) {
       
        const query = `
        SELECT b.bookingID, u.userID, bk.bookID, u.userName, bk.bookName, bk.author, bk.category, bk.quantity, bk.bookUrl,  b.collection_date, b.return_date, b.bStatus AS status
        FROM bookings AS b
        INNER JOIN users AS u ON b.userID = u.userID
        INNER JOIN books AS bk ON b.bookID = bk.bookID;
        WHERE u.userID = ?
        `
        db.query(query,  [req.params.id], (err, result) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                result
            });
        });
    }
    addBooking(req, res) {
        const query = `
          INSERT INTO bookings
          SET ?
        `;
      
        db.query(query, [req.body], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({
              error: "An error occurred while adding the booking.",
            });
          } else {
            res.json({
              status: res.statusCode,
              msg: "The booking has been added successfully.",
              result
            });
          }
        });
      }
      updateBooking(req,res){
        const query =`
        UPDATE bookings
        SET ?
        WHERE bookingID= ? ;
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
        WHERE bookingID = ?
        `
        db.query(query, [req.params.id], (err)=>{
            if (err) throw err
            res.json({
                status:res.statusCode,
                msg: "The record has been successfully deleted"
            })
        })
    }
    


}
module.exports = Bookings

