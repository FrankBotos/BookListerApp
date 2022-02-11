var express = require('express');
var router = express();




//allows us to parse our post data
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//support for cors
const cors = require("cors");
router.use(cors());



var books = [
  {
    "id": 9780441172719,
    "author": "Frank Herbert",
    "title": "Dune",
    "year": 1990
  },
  {
    "id": 9781500450021,
    "author": "Hans Christian Andersen",
    "title": "Fairy Tales",
    "year": 2014
  },
  {
    "id": 9780007487295,
    "author": "J.R.R Tolkien",
    "title": "The Hobbit",
    "year": 1937
  },
  {
    "id": 9780316029186,
    "author": "Andrzej Sapkowski",
    "title": "The Last Wish",
    "year": 2008
  },
]


  

  



//Get All
//eg. http://localhost:4000/books/getall
router.get('/getall', function(req, res, next) {
  try {
    res.send(JSON.stringify(books));
  }
  catch(err) {
    res.status(404).json({ "Error": err }).end();
  }
  
});

//Get 1 book, by id
//eg http://localhost:4000/books/getall/2
router.get('/getall/:id', function(req, res, next) {
  books.map((obj) => {
    if (obj.id == req.params.id)
    {
      try {
        return res.send(JSON.stringify(obj));
      }
      catch(err) {
        return res.status(404).json({ "Error": err }).end();
      }
    }
  });
});

//Create New Book
//eg. http://localhost:4000/books/getall/
//send this using method post, with some request body containing book data
router.post("/getall/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

  var idExists = false;

  //basic validation, we make sure the correct fields exist
  if (req.body.id && req.body.author && req.body.title && req.body.year) {
    //console.log("valid!");
    //const newBook = req.body;
    //books.push(newBook);
    //res.status(201).send('Created new book!');

    //if correct fields do exist, we make sure id is not duplicate
    books.map((obj) => {
      if (obj.id == req.body.id) {
        idExists = true;
      }
    });

    
    if (idExists) {
      res.status(500).send('Could not create book! ID already exists!');
    } else {
      const newBook = req.body;
      books.push(newBook);
      res.status(200).send('Created new book!');
    }
  } else {
    res.status(500).send('Could not create book! Incorrect fields!');
  }

});


//update book info

router.put("/getall/:id", (req, res) => {
  var updateSuccess = false;
  if (req.body.id && req.body.author && req.body.title && req.body.year){//if we have all required fields, we find by id and update
    books.map((obj) => {
      
      if (obj.id == req.body.id && updateSuccess== false) {//if we find a matching id, we update
        obj.author = req.body.author;
        obj.title = req.body.title;
        obj.year = req.body.year;
        updateSuccess = true;
        
      } 
      //console.log(updateSuccess);
    });
    
  }

  if (updateSuccess == false) {
    res.status(500).send("Could not update!")
    
  }
  else {res.status(200).send("sucess!")}

});

//delete book by id
router.delete("/getall/:id", (req, res) => {
  var idExists = false;

  var index = 0;
  var indexToDelete = 0;

  books.map((obj) => {
    //console.log(req.body);
    
    if (obj.id == req.body.id) {
      idExists = true;
      indexToDelete = index;
    }
    index++;
  });



  if (idExists) {
    //console.log("book is at index: " + (indexToDelete));
    books.splice(indexToDelete, 1);
    res.status(200).send("Successful delete!");
  }
  else {res.status(500).send("Could not delete! Book does not exist!")}

});

//handle incorrect routes
router.get('*', function(req, res){
  res.status(404).send("Requested route does not exist!");
});


module.exports = router;