const mangoose =  require("mongoose");

//creating a schema
const BookSchema = mangoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

//Book Model
const BookModel = mangoose.model(BookSchema);

module.exports = BookModel;
