import React from 'react'
import { getURL } from '../../utils/getURLImg';
import { useParams } from 'react-router-dom'
import { useGetBookByIdQuery } from '../../redux/features/Book/booksAPI'
import { FiShoppingCart } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlide'


const BookDetail = () => {
    const {id} = useParams();
    const {data: books, isLoading, isError} = useGetBookByIdQuery(id);
    const book = books?.book || [];

    const dispatch = useDispatch();
    const handleAddBookToCart = (book) => {
        dispatch(addToCart(book))
    }

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error</div>
  return (
    <div className="max-w-lg shadow-md p-5">
    <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

    <div className=''>
        <div>
            <img
                src={`${getURL(book.coverImage)}`}
                alt={book.title}
                className="mb-8"
            />
        </div>

        <div className='mb-5'>
            <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
            <p className="text-gray-700 mb-4">
                <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4 capitalize">
                <strong>Category:</strong> {book?.category}
            </p>
            <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
        </div>

        <button onClick={() => handleAddBookToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
            <FiShoppingCart className="" />
            <span>Add to Cart</span>

        </button>
    </div>
</div>
  )
}

export default BookDetail
