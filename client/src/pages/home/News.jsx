import React from 'react'
import { Link } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useGetBooksQuery } from '../../redux/features/Book/booksAPI';
import { getURL } from '../../utils/getURLImg';


const News = () => {

    const {data: books =[]} = useGetBooksQuery();
    
    const booksList = books?.book || [];
    
    //Sắp xếp sách theo ngày thêm mới nhất
    const sortedBooks = [...booksList].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    //Lấy 5 cuốn sách mới nhất
    const latestBooks = sortedBooks.slice(0, 5);

    return (
        <div className='py-10 ml-10'>
            <h2 className='text-3xl font-semibold mb-6'>New</h2>
            <div>
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
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >

                    {
                        latestBooks.length > 0 && latestBooks.map((books, index) => (
                            <SwiperSlide key={index}>
                                <div className='flex flex-col sm:flex-row sm:justify-between items-center'>
                                    <div>
                                        <Link to="/" className='text-lg font-medium hover:text-blue-500 mb-4'><h3>{books.title}</h3></Link>
                                        <div className='bg-primary w-12 h-[3px] mb-5'></div>
                                        <p>{books.description}</p>
                                    </div>
                                    <div className='flex-shrink-0'>
                                        <img src={`${getURL(books?.coverImage)}`} alt="" className='w-full object-cover ' />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default News
