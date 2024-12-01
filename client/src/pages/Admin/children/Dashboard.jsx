import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getURL from '../../../utils/baseURL'
import { MdIncompleteCircle } from 'react-icons/md'
import CircleLoader from "react-spinners/ClipLoader";
import RevenueChart from './RevenueChart';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data,setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const res = await axios.get(`${getURL()}/api/dashboard`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application" ,
          },
        })
        console.log(res.data)
        setData(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchStatsData()
  },[])

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh' 
  }
  if(loading) return (
    <div style={containerStyle}>
        <CircleLoader color="#80C4E9" size={100} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  )

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <Link to="/admin/manage-books">
            <div>
              <span className="block text-2xl font-bold">{data?.totalBooks}</span>
              <span className="block text-gray-500">Số sản phẩm</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{Number(data?.totalSales).toFixed(3)} VNĐ</span>
            <span className="block text-gray-500">Doanh thu</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">{data?.trendingBooks}</span>
            <span className="inline-block text-xl text-gray-500 font-semibold">(13%)</span>
            <span className="block text-gray-500">Sản phẩm bán chạy</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className='size-6'/>
          </div>
         <Link to="/admin/orders">
            <div>
              <span className="block text-2xl font-bold">{data?.totalOrders}</span>
              <span className="block text-gray-500">Số đơn hàng</span>
            </div>
         </Link>
        </div>
      </section>
      <section >
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">Số đơn hàng theo tháng</div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
            <RevenueChart />
            </div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default Dashboard
