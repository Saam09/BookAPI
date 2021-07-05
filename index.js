//dot env 
require("dotenv").config();

// Frame work
const express = require("express");
const mongoose = require("mongoose");

// Database
const database = require("./database/index");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initializing express
const shapeAI = express();

// Configurations
shapeAI.use(express.json());

console.log(process.env.MONGO_URL);

// Establish Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("connection established!!!!!!!"));

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/is/:isbn", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
  // value -> true

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /c
Description     get specific books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/
shapeAI.get("/c/:category", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});

/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/author", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json({ authors: getAllAuthors });
});

/*
Route           /author
Description     get a list of authors based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/:isbn", async (req, res) => {
  try {
    const getSpecificAuthors = await AuthorModel.find({
      books: { $all: [req.params.isbn] },
    });

    if (!getSpecificAuthors) {
      return res.json({
        error: `No author found for the book ${req.params.isbn}`,
      });
    }
    return res.json({ author: getSpecificAuthors });

  } catch (error) {
    res.json({ error: error })
  }
});

/*
  Route           /author
  Description     get list of authors based on a book isbn
  Access          PUBLIC
  Parameters      isbn
  Method          GET
  */
shapeAI.get("/:isbn", async (req, res) => {
  try {
    const getSpecificAuthors = await AuthorModel.find({
      books: { $all: [req.params.isbn] },
    });

    if (!getSpecificAuthors) {
      return res.json({
        error: `No author found for the book ${req.params.isbn}`,
      });
    }
    return res.json({ author: getSpecificAuthors });

  } catch (error) {
    res.json({ error: error })
  }
});

/*
Route           /author/id
Description     get specific author based on a id
Access          PUBLIC
Parameters      id
Method          GET
*/
shapeAI.get("/id/:id", async (req, res) => {
  try {
    const getSpecificAuthor = AuhtorModel.findOne({
      id: parseInt(req.params.id),
    });
    if (!getSpecificAuthor) {
      return res.json({
        error: `No author found for the id : ${req.params.id}`,
      });
    }
    return res.json({ author: getSpecificAuthor });

  } catch (error) {
    res.json({ error: error })
  }
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/publications", async (req, res) => {
  try {
    const getPublications = await PublicationModel.find();
    return res.json({ publications: getPublications });

  } catch (error) {
    res.json({ error: error })
  }
});
/*
  Route           /publications/id
  Description     get specific publication based on a id
  Access          PUBLIC
  Parameters      id
  Method          GET
  */
shapeAI.get("/publications/id/:id", async (req, res) => {
  try {
    const getSpecificPublication = await PublicationModel.findOne({
      id: parseInt(req.params.id),
    });
    if (!getSpecificPublication) {
      return res.json({
        error: `No author found for the id : ${req.params.id}`,
      });
    }
    return res.json({ author: getSpecificPublication });

  } catch (error) {
    res.json({ error: error })
  }
});

/*
  Route           /publication/book
  Description     get list publication based on a book isbn
  Access          PUBLIC
  Parameters      isbn
  Method          GET
  */
shapeAI.get("/book/:isbn", async (req, res) => {
  try {
    const getSpecificPublication = await PublicationModel.find({
      books: { $all: [req.params.isbn] },
    });

    if (!getSpecificPublication) {
      return res.json({
        error: `No publication found for the book ${req.params.isbn}`,
      });
    }
    return res.json({ author: getSpecificPublication });

  } catch (error) {
    res.json({ error: error })
  }
});

/*
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
shapeAI.post("/book/new", async (req, res) => {
  const { newBook } = req.body;

  BookModel.create(newBook);

  return res.json({ message: "book was added!" });
});
/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
shapeAI.post("/add", async (req, res) => {
  try {
    const { newPublication } = req.body;
    await PublicationModel.create(newPublication);
    return res.json({ publications: newPublication });

  } catch (error) {
    res.json({ error: error })
  }
});

/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
shapeAI.post("/author/new", (req, res) => {
  const { newAuthor } = req.body;

  AuthorModel.create(newAuthor);

  return res.json({ message: "author was added!" });
});

/*
Route           /book/update
Description     update title of a book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put("/book/update/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.bookTitle;
      return;
    }
  });

  return res.json({ books: database.books });
});
/*
Route           /publication/update/name
Description     update publication
Access          PUBLIC
Parameter       name,id
Methods         PUT
*/
shapeAI.put("/update/name/:id/:name", async (req, res) => {
  try {
    const updatedPublication = await PublicationModel.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        name: req.params.name,
      },
      {
        new: true,
      }
    );
    res.json({ publications: updatedPublication });

  } catch (error) {
    res.json({ error: error })
  }
});

/*
Route           /author/update/name
Description     update book author
Access          PUBLIC
Parameter       name,id
Methods         PUT
*/
shapeAI.put("/update/name/:id/:name", async (req, res) => {
  try {
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        name: req.params.name,
      },
      {
        new: true
      }
    )
    res.json({ author: updatedAuthor });

  } catch (error) {
    res.json({ error: error })
  }
});

/*
Route           /publication/update/name
Description     update book author
Access          PUBLIC
Parameter       name,id
Methods         PUT
*/
shapeAI.put("/update/name/:id/:name", async (req, res) => {
  try{
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
      id: req.params.id,
    },
    {
      name: req.params.name,
    },
    {
      new: true,
    }
  );
  res.json({ publications: updatedPublication });

  }catch(error){
    res.json({error : error})
  }
});

/*
Route           /author/delete/
Description     delete a author from a book
Access          PUBLIC
Parameters       author id
Method          DELETE
*/
shapeAI.delete("/delete/:id", async (req, res) => {
  try {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
      {
        id: req.params.id,
      }
    )
    await BookModel.findOneAndDelete(
      {
        author: req.params.id,
      }
    )
    return res.json({ author: updatedAuthorDatabase });
  }
  catch (error) {
    res.json({ error: error })
  }
})
module.exports = shapeAI;

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
shapeAI.delete("/book/delete/:isbn", (req, res) => {
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );

  database.books = updatedBookDatabase;
  return res.json({ books: database.books });
});
/*
Route           /publication/delete/book
Description     delete  publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
shapeAI.delete("/delete/:pubId", async (req, res) => {
  
  try{
  const updatedPublication = await PublicationModel.findOneAndDelete({
    id: req.params.pubId,
  });
  return res.json({
    publication: updatedPublication,
  });


  }catch(error){
    res.json({error : error})
  }
});

/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
shapeAI.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
  // update publication database
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.pubId)) {
      const newBooksList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBooksList;
      return;
    }
  });

  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = 0; // no publication available
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
  });
});

shapeAI.listen(3000, () => console.log("Server running!!😎"));