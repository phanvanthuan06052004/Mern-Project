import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { getURL } from '../../utils/getURLImg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addToCart } from "../../redux/features/cart/cartSlide"
const BooksCart = ({ books }) => {
    const dispatch = useDispatch();
    const handleAddBookToCart = (book) => {
        dispatch(addToCart(book))
    }
    return (
        <div>
            <div className=" rounded-lg transition-shadow duration-300">
                <div
                    className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4"
                >
                    <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                        <Link to={`/book/${books._id}`}>
                            <img
                                src={`${getURL(books?.coverImage)}`}
                                alt=""
                                className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                            />
                        </Link>
                    </div>

                    <div>
                        <Link to={`/book/${books?._id}`} ><h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                        {books?.title.length > 18 ? `${books?.title.slice(0, 18)}...` : books?.title}
                            
                        </h3></Link>
                        <p className="text-gray-600 mb-5">{books?.description.length > 50 ? `${books?.description.slice(0, 50)}...` : books?.description} </p>
                        <p className="font-medium mb-5">
                            ${books?.newPrice} <span className="line-through font-normal ml-2">${books?.oldPrice}</span>
                        </p>
                        <button onClick={() => handleAddBookToCart(books)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                            <FiShoppingCart className="" />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BooksCart
