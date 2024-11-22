import Book from './book.model.js';

const createBook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body }); //"..." spread operator allows copy all data when get data from request body 
        await newBook.save();
        res.status(200).send({ message: 'Book saved successfully', book: newBook });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'failed to save book', error: error });
    }
}

const getAllBooks = async (req, res) => {
    try {
        const newBook = await Book.find();
        if (!newBook) {
            res.status(404).send({ message: 'Not Found!' });
        }
        res.status(200).send({ message: 'Get All Book Successfully', book: newBook });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'failed to get book', error: error });
    }
}

const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const newBook = await Book.findById(id);
        if (!newBook) {
            return res.status(404).send({ message: 'Not Found!' });
        }
        res.status(200).send({ message: 'Get Book By Id Successfully', book: newBook });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Failed to get book by ID', error: error });
    }
}

const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const newBook = await Book.findByIdAndUpdate(id, req.body, { new: true }); //new: true -> return new data after Update
        if (!newBook) {
            return res.status(404).send({ message: 'Not Found!' });
        }
        res.status(200).send({ message: 'Update Successfully', book: newBook });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Failed to Update Books', error: error });
    }
}


const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const newBook = await Book.findByIdAndDelete(id);
        if (!newBook) {
            return res.status(404).send({ message: 'Not Found!' });
        }
        res.status(200).send({ message: 'Delete Successfully', book: newBook });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Failed to Delete Books', error: error });
    }
}

export {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
} 