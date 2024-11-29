import React from 'react'
import bannerImg from "../../assets/banner.png"
import bgBanner from "../../assets/bg-banner2.jpg"

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row-reverse py-16 mx-18 gap-12 justify-between items-center bg-cover bg-center bg-cover bg-center' 
             style={{backgroundImage: `url(${bgBanner})`}}
             >
            <div className='md:w-1/2 w-full flex items-center md:justify-end '>
                <img src={bannerImg} alt="" />
            </div>
            <div className='md:w-1/2 w-full pl-6'>
                <h1 className='md:text-5xl text-2xl font-medium mb-7 '>
                Sách Mới Hàng Tuần
                </h1>
                <p className='mb-10 text-gray-700'>
                Hãy cập nhật danh sách đọc của bạn với những cuốn sách mới nhất và hay nhất trong thế giới văn học. Từ những cuốn tiểu thuyết gay cấn đến hồi ký sâu sắc, những tựa sách mới trong tuần này sẽ đáp ứng mọi sở thích của độc giả.
                </p>
                <button className='bg-primary px-4 rounded-md'>Theo Dõi</button>
            </div>
        </div>
    )
}

export default Banner
