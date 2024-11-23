import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from './book.controller.js';
const routesBook = express.Router();

//map
// FE -> BE server -> controller -> book schema -> database -> send to server -> back to FE
//handle create Book
routesBook.post("/create", createBook)

//handle get all books
routesBook.get("/show", getAllBooks)

//handle get Book by id
routesBook.get("/findById/:id", getBookById);

//handle Update Book by id
routesBook.put("/update/:id", updateBook);


//handel delete books by id
routesBook.delete("/delete/:id", deleteBook);
export default routesBook;