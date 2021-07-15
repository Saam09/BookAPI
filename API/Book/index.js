const Router = require("express").Router();

const BookModel = require('../../database/books');

// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async (req, res) => {
  try{
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /is
  Description     get a specific book based on isbn
  Access          PUBLIC
  Parameters      isbn
  Method          GET
  */
Router.get("/is/:isbn", async (req, res) => {
  try{
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
  if (!getSpecificBook) {
    return res.json({
      error: `No book found for ISBN of ${req.params.isbn}`,
    });
  }
  return res.json({ books: getSpecificBook });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /c
  Description     get specific books based on a category
  Access          PUBLIC
  Parameters      category
  Method          GET
  */
Router.get("/c/:category", async (req, res) => {
  try{
  const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }
  return res.json({ books: getSpecificBooks });


  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /lang
  Description     get specific books based on a language
  Access          PUBLIC
  Parameters      lang
  Method          GET
  */
Router.get("/lang/:lang", async (req, res) => {
  try{
  const getSpecificBooks = await BookModel.findOne({ language: req.params.id });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the language of ${req.params.lang}`,
    });
  }

  return res.json({ books: getSpecificBooks });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /book/author/
  Description     get specific books based on a author id
  Access          PUBLIC
  Parameters      id
  Method          GET
  */
Router.get("/author/:id", async (req, res) => {
  try{
  const authorId = req.params.id;
  const getSpecificBook = await BookModel.findOne({
    author: { $all: [authorId] },
  });

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the author of id : ${req.params.id}`,
    });
  }

  return res.json({ books: getSpecificBook });

  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
  try{
  const { newBook } = req.body;
  BookModel.create(newBook);
  return res.json({ books: newBook });

  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /book/update/title
Description     update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
Router.put("/update/title/:isbn", async (req, res) => {
  try{
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.newBookTitle,
    },
    {
      new: true,
    }
  );

  res.json({ books: updatedBook });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /book/update/author
  Description     update book author
  Access          PUBLIC
  Parameter       isbn
  Methods         PUT
  */
Router.put("/update/author/:isbn", async (req, res) => {
  try{
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $addToSet: {
        author: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );
  res.json({ books: updatedBook, author: updatedAuthor });

  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
Router.delete("/delete/:isbn", async (req, res) => {
  try{
  const updatedBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });

  return res.json({ books: updatedBookDatabase });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /book/delete/author
  Description     delete a author from a book
  Access          PUBLIC
  Parameters      isbn, author id
  Method          DELETE
  */
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
  try{
  // update the book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $pull: {
        author: parseInt(req.params.authorId),
      },
    },
    {
      new: true,
    }
  );

  // update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: parseInt(req.params.authorId),
    },
    {
      $pull: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );

  return res.json({
    message: "author was deleted!!!!!!😪",
    book: updatedBook,
    author: updatedAuthor,
  });

  }catch(error){
    res.json({error : error})
  }
});
module.exports = Router;