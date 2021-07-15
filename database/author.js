const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
  id: {
    type : Number,
    required : true,
  },
  name: {
    type : String,
    required : true,
  },
  books: [String]
});
const AuthorModel = mongoose.model("auhtors" ,AuthorSchema);

module.exports = AuthorModel;