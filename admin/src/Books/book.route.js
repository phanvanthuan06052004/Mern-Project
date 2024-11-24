import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from './book.controller.js';
import verifyToken from '../Middleware/VerifyToken.js';
const routesBook = express.Router();

//map
// FE -> BE server -> controller -> book schema -> database -> send to server -> back to FE
//handle create Book , have to verify token
routesBook.post("/create", verifyToken,createBook)

//handle get all books
routesBook.get("/show", getAllBooks)

//handle get Book by id
routesBook.get("/findById/:id", getBookById);

//handle Update Book by id, have to verify token
routesBook.put("/update/:id",verifyToken, updateBook);


//handel delete books by id, have to verify token
routesBook.delete("/delete/:id",verifyToken, deleteBook);
export default routesBook;