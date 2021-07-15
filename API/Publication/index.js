const Router = require("express").Router();
const PublicationModel = require("../../database/publication");
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/publications", async (req, res) => {
  try{
  const getPublications = await PublicationModel.find();
  return res.json({ publications: getPublications });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /publications/id
  Description     get specific publication based on a id
  Access          PUBLIC
  Parameters      id
  Method          GET
  */
Router.get("/publications/id/:id", async (req, res) => {
  try{
  const getSpecificPublication = await PublicationModel.findOne({
    id: parseInt(req.params.id),
  });
  if (!getSpecificPublication) {
    return res.json({
      error: `No author found for the id : ${req.params.id}`,
    });
  }
  return res.json({ author: getSpecificPublication });

  }catch(error){
    res.json({error : error})
  }
});
/*
  Route           /publication/book
  Description     get lsit publication based on a book isbn
  Access          PUBLIC
  Parameters      isbn
  Method          GET
  */
Router.get("/book/:isbn", async (req, res) => {
  try{
  const getSpecificPublication = await PublicationModel.find({
    books: { $all: [req.params.isbn] },
  });

  if (!getSpecificPublication) {
    return res.json({
      error: `No publication found for the book ${req.params.isbn}`,
    });
  }
  return res.json({ author: getSpecificPublication });

  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {
  try{
  const { newPublication } = req.body;
  await PublicationModel.create(newPublication);
  return res.json({ publications: newPublication });

  }catch(error){
    res.json({error : error})
  }
});
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /publication/update/name
Description     update book author
Access          PUBLIC
Parameter       name,id
Methods         PUT
*/
Router.put("/update/name/:id/:name", async (req, res) => {
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
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
// _____________________________________________________________________________
/*
Route           /publication/delete/book
Description     delete  publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
Router.delete("/delete/:pubId", async (req, res) => {
  
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
module.exports = Router;