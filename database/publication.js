const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({
  id: {
    type : Number,
    required : true,
  },
  name: {
    required : true,
    type : String,
  },
  books: [String]
});
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;