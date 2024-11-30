import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {  useGetAllOrdersQuery, useDeleteOrderMutation } from '../../../../redux/features/Oder/ordersAPI'
import { CircleLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
const Order = () => {
    const navigate = useNavigate()
    const {data: ordersList=[], isLoading, isError, refetch} = useGetAllOrdersQuery()
    const [deleteOrder] = useDeleteOrderMutation()
    console.log("Raw API response:", ordersList)
    
    
    const handleDelete = async (id) => {
      try {
        if(window.confirm("Bạn có muốn xóa đơn hàng này không?")) {
          await deleteOrder(id).unwrap()
          toast.success("Xóa đơn hàng thành công!")
          refetch()
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh' 
  }
    const [searchTerm, setSearchTerm] = useState('')
    
    const filteredOrders = searchTerm === '' ? ordersList : ordersList.filter(order => 
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log(filteredOrders)
  
  
    if(isLoading) return ( <div style={containerStyle}>
      <CircleLoader color="#80C4E9" size={100} aria-label="Loading Spinner" data-testid="loader" />
    </div>)

  return (
    <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="relative px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">Tất cả đơn hàng</h3>
                        </div>
                        <div className="relative px-4 max-w-full">
                            <input
                                type="text" 
                                placeholder="Tìm kiếm đơn hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    STT
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Email
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Phone
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Total Price
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Status
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            { filteredOrders.map((order, index) => (
                                <tr key={index}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                        {index + 1}
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {order.email}
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {order.phone}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {order.status}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
                                        <Link 
                                            to={`/admin/edit-order/${order._id}`}
                                            className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(order._id)}
                                            className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Order
