import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getURL } from '../../utils/getURLImg';
import { removeItems, clearCart, increaseQuantity, decreaseQuantity } from "../../redux/features/cart/cartSlide"
import { useDispatch } from 'react-redux'
const CartPage = () => {
    //handle get data 
    const carts = useSelector((state) => state.cart.cartItem)


    const dispatch = useDispatch();
    //handle remove one item    
    const handleRemoveItem = (book) => {
        dispatch(removeItems(book))
    }

    //handle remove all items
    const handleRemoveAll = () => {
        dispatch(clearCart())
    }

    //handle quantity
    const handleIncreaseQuantity = (book) => {
        dispatch(increaseQuantity(book))
    }

    const handleDecreaseQuantity = (book) => {
        dispatch(decreaseQuantity(book))
    }

    // Sửa cách tính totalPrice để nhân với quantity
    const totalPrice = carts.reduce((accumulator, currentValue) => 
        accumulator + (currentValue.newPrice * currentValue.quantity), 0
    ).toFixed(2);

    return (
        <>
            {
                carts.length > 0 ?
                    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                                <div className="ml-3 flex h-7 items-center ">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveAll()}
                                        className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
                                    >
                                        <span className="">Clear Cart</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {
                                            carts.map((book, index) => (
                                                <li className="flex py-6" key={index}>
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            alt=""
                                                            src={`${getURL(book?.coverImage)}`}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <Link to='/'>{book?.title}</Link>
                                                                </h3>
                                                                <p className="sm:ml-4">${book?.newPrice}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Category:</strong> {book?.category}</p>
                                                        </div>
                                                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                                            <div className="flex items-center">
                                                                <span className="mr-3 text-gray-500"><strong>Qty:</strong></span>
                                                                <div className="flex items-center border border-gray-200 rounded">
                                                                    <button 
                                                                        onClick={() => handleDecreaseQuantity(book)}
                                                                        className="px-3 py-1 border-r hover:bg-gray-100"
                                                                        disabled={book.quantity <= 1}
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <span className="px-3 py-1">{book.quantity}</span>
                                                                    <button 
                                                                        onClick={() => handleIncreaseQuantity(book)}
                                                                        className="px-3 py-1 border-l hover:bg-gray-100"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="flex">
                                                                <button 
                                                                    onClick={() => handleRemoveItem(book)} 
                                                                    type="button" 
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${totalPrice ? totalPrice : 0}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <Link
                                    to="/checkout"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Checkout
                                </Link>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <Link to="/">
                                    or
                                    <button
                                        type="button"

                                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div> :
                    <div className=' mt-12 h-full flex flex-col  items-center  overflow-hidden bg-white  '>
                        <img src={`${getURL("cartEmpty.jpg")}`} alt="" className='h-[200px]' />
                        <div className='my-3 text-center '>
                            <h2 className='text-2xl mb-2'>Your Cart Is <span className='text-red-500'>Empty</span></h2>
                            <p>Must add items on the cart before you process to checkout.</p>
                        </div>
                        <Link to="/" className='bg-red-400 hover:bg-red-700 text-white px-5 py-2 rounded-md'><button>RETURN TO SHOP</button></Link>
                    </div>
            }
        </>

    )
}

export default CartPage
