const db = require("../config");

class Books {
    fetchBooks(req, res) {
        const query = `
        SELECT bookID, bookName, author, category, quantity, bookUrl
        FROM books;
        `;

        db.query(query, (err, results) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                results
            });
        });
    }

    fetchBook(req, res) {
        const query = `
        SELECT bookID, bookName, author, category, quantity, bookUrl
        FROM books
        WHERE bookID = ${req.params.id};
        `;
        
        db.query(query, (err, result) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                result
            });
        });
    }

    addBook(req, res) {
        const query = `
        INSERT INTO books
        SET ?;
        `;

        db.query(query, [req.body], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "The book has been successfully added."
            });
        });
    }

    updateBook(req, res) {
        const query = `
        UPDATE books
        SET ?
        WHERE bookID = ?;
        `;

        db.query(query, [req.body, req.params.id], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "The book has been successfully updated."
            });
        });
    }

    deleteBook(req, res) {
        const query = `
        DELETE FROM books
        WHERE bookID = ${req.params.id};
        `;

        db.query(query, (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "The book was successfully deleted."
            });
        });
    }
}

module.exports = Books;