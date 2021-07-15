const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
        ISBN : {
                type : String,
                required : true,
                minLength : 8,
                maxLenght : 10,
        },
        title : {
                type : String,
                required : true,     
        },
        author : [Number],
        language : {
                type : String,
                required : true,
        },
        pubDate : String,
        numPage : Number,
        category : {
                type : [String],
                required : true,
        },
        publication : Number
})
const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;