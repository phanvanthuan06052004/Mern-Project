import React, { useEffect, useState } from 'react'
import BooksCart from '../Books/BooksCart';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useGetBooksQuery } from '../../redux/features/Book/booksAPI';


const Recomment = () => {
    
    const {data: books =[]} = useGetBooksQuery();
    const booksList = books?.book || [];
    const trendingBooks = booksList.filter(book => book.trending === true);
    console.log(trendingBooks);
    return (
        <div className='py-16 ml-10'>
            <h2 className='text-3xl font-semibold mb-6'>Đề xuất cho bạn</h2>
            <div >
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
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >

                    {
                        trendingBooks?.map((books, index) => (
                            <SwiperSlide key={index}>
                                <BooksCart books={books} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </div>
        </div>
    )
}

export default Recomment
