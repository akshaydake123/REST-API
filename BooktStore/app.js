// import the dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
// create objects of books and genre to access the functions
Genre = require('./models/genre.js');
Book = require('./models/book.js');

// connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

// handles GET request here parameter '/' denotes home page
app.get('/',function(req,res){

 res.send('Hello Word');
});


//API for getting genres from mongo collection genres
app.get('/api/genres',function(req,res){

  Genre.getGenres(function(err,genres){

        if(err)
         {
             throw err;
         }
         res.json(genres);

  });

});

//API for inserting genres to mongo collection genres
app.post('/api/genres',function(req,res){

// this allows to access whatever is comming into the form
 var genre = req.body;

  Genre.addGenre(genre,function(err,genre){

        if(err)
         {
             throw err;
         }
         res.json(genre);

  });

});


//API for updating genres to mongo collection genres
app.put('/api/genres/:_id',function(req,res){

  var id = req.params._id;

// this allows to access whatever is comming into the form
 var genre = req.body;

  Genre.updateGenre(id, genre, {},function(err,genre){

        if(err)
         {
             throw err;
         }
         res.json(genre);

  });

});


//API for deleting genre from mongo collection genres
app.delete('/api/genres/:_id',function(req,res){

  var id = req.params._id;

// this allows to access whatever is comming into the form
 //var genre = req.body;

  Genre.removeGenre(id,function(err,genre){

        if(err)
         {
             throw err;
         }
         res.json(genre);

  });

});






// API for getting all api form mongodb
app.get('/api/books',function(req,res){

  Book.getBooks(function(err,books){

        if(err)
         {
             throw err;
         }
         res.json(books);

  });

});

// APT for getting a perticular book from mongodb
app.get('/api/book/:_id',function(req,res){

  Book.getBookById(req.params._id,function(err,book){

        if(err)
         {
             throw err;
         }
         res.json(book);

  });

});

// API for insert  book  into mongodb
app.post('/api/books',function(req,res){

// this allows to access whatever is comming into the form
 var book = req.body;

  Book.addBook(book,function(err,book){

        if(err)
         {
             throw err;
         }
         res.json(book);

  });

});


//  to show where to connect
app.listen(3000);

//to print on console
console.log('Starting...');
