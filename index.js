require("dotenv").config();

//Frameworks
const express = require("express");
const mongoose = require("mongoose");

//intailizing
const booky = express();
booky.use(express.json());

//MicroServcies
const Books = require("./API/Book");
const Author = require("./API/Author");
const Publication = require("./API/Publication");

//Connecting To Mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useUnifiedopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connection established!!!!!!!"));

//Initializing Microservices
booky.use("/book", Books);
booky.use("/author", Author);
booky.use("/publication", Publication);

booky.listen(3000);