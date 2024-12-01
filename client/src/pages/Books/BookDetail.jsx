import React from 'react'
import { getURL } from '../../utils/getURLImg';
import { Link, useParams } from 'react-router-dom'
import { useGetBookByIdQuery, useGetBooksQuery } from '../../redux/features/Book/booksAPI'
import { FiShoppingCart } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlide'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BookDetail = () => {
    const {id} = useParams();
    const {data: books, isLoading, isError} = useGetBookByIdQuery(id);
    const {data: allBooks = []} = useGetBooksQuery();
    const book = books?.book || [];
    const booksList = allBooks?.book || [];
    
    // Lọc sách cùng thể loại để hiển thị sản phẩm liên quan
    const relatedBooks = booksList.filter(b => 
        b.category === book.category && b._id !== book._id
    );

    console.log(relatedBooks)

    const dispatch = useDispatch();
    const handleAddBookToCart = (book) => {
        dispatch(addToCart(book))
    }

    if(isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    if(isError) return <div className="flex justify-center items-center min-h-screen">Error</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Phần hình ảnh */}
                <div className="sticky top-4">
                    <div className="bg-white rounded-xl shadow-xl p-6">
                        <img
                            src={`${getURL(book.coverImage)}`}
                            alt={book.title}
                            className="w-full h-[400px] object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Phần thông tin chi tiết */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                    
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-red-600">{Number(book?.newPrice).toFixed(3)} VNĐ</span>
                        <span className="text-lg text-gray-500 line-through">{Number(book?.oldPrice).toFixed(3)} VNĐ</span>
                    </div>

                    <div className="space-y-4 text-gray-700">
                        <p><span className="font-semibold">Ngày phát hành:</span> {new Date(book?.createdAt).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Thể loại:</span> <span className="capitalize">{book?.category}</span></p>
                    </div>

                    <div className="border-t border-b py-4">
                        <h3 className="font-semibold mb-2">Mô tả sản phẩm:</h3>
                        <p className="text-gray-600 leading-relaxed">{book.description}</p>
                    </div>

                    <button 
                        onClick={() => handleAddBookToCart(book)} 
                        className="w-full md:w-auto btn-primary px-8 py-3 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
                    >
                        <FiShoppingCart className="text-xl" />
                        <span>Thêm vào giỏ hàng</span>
                    </button>
                </div>
            </div>

            {/* Phần sản phẩm liên quan */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    navigation={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                        1180: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    >

                    {relatedBooks.map((relatedBook) => (
                        <SwiperSlide key={relatedBook._id}>
                            <div className="p-4">
                                <Link to={`/book/${relatedBook._id}`}>
                                    <img 
                                        src={`${getURL(relatedBook.coverImage)}`}
                                        alt={relatedBook.title}
                                        className="w-full h-56 object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                                    />
                                </Link>
                                <Link to={`/book/${relatedBook._id}`}>
                                    <h3 className="font-semibold text-lg mt-4 mb-2 truncate">{relatedBook.title}</h3>
                                </Link>
                                <p className="text-red-600 font-bold">{Number(relatedBook.newPrice).toFixed(3)} VNĐ</p>
                                <button 
                                    onClick={() => handleAddBookToCart(relatedBook)}
                                    className="mt-3 w-full btn-primary px-4 py-2 rounded-lg flex items-center justify-center space-x-1 hover:opacity-90 transition-opacity"
                                >
                                    <FiShoppingCart />
                                    <span>Thêm vào giỏ</span>
                                </button>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    )
}

export default BookDetail
