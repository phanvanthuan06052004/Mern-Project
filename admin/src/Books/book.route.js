import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from './book.controller.js';
const routes = express.Router();

//map
// FE -> BE server -> controller -> book schema -> database -> send to server -> back to FE
//handle create Book
routes.post("/create", createBook)

//handle get all books
routes.get("/show", getAllBooks)

//handle get Book by id
routes.get("/findById/:id", getBookById);

//handle Update Book by id
routes.put("/update/:id", updateBook);


//handel delete books by id
routes.delete("/delete/:id", deleteBook);
export default routes;