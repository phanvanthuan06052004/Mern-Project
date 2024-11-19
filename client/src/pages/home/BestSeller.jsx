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

const categories = ["choose a genre", "Business", "Fiction", "Horror", "Adventure"]
const BestSeller = () => {
    const [books, setBooks] = useState([]);
    const [cateOption, setCateOption] = useState("choose a genre");

    useEffect(
        () => {
            fetch("books.json")
                .then(res => res.json())
                .then((data) => setBooks(data))
        }, []
    );


    const filter = cateOption === "choose a genre" ? books : books.filter(x => x.category === cateOption.toLowerCase());


    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Best Seller</h2>
            <div className='flex items-center mb-8'>
                <select
                    onChange={(e) => setCateOption(e.target.value)}
                    name="category" id="category" className='border bg-[#EAEAEA] border-gray-100 rounded-md px-4 py-2 focus:outline-none'>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
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
                        filter.length > 0 && filter.map((books, index) => (
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

export default BestSeller
