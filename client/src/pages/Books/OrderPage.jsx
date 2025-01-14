import React, { useEffect } from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/Oder/ordersAPI';
import { useAuth } from '../../Context/authContext';
import CircleLoader from "react-spinners/ClipLoader";
import { getURL } from '../../utils/getURLImg';

const OrderPage = () => {
    const { currentUser, loading } = useAuth() //lấy user hiện tại 
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    }
    //lấy đơn hàng của user hiện tại
    const { data: orders = [], isLoading, refetch } = useGetOrderByEmailQuery(currentUser?.email);

    useEffect(() => {
        refetch()
    }, [refetch])

    if (loading) return (
        <div style={containerStyle}>
            <CircleLoader color="#80C4E9" size={100} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className='text-2xl font-bold text-center mb-8'>Đơn hàng của bạn</h1>
            {orders.length === 0 ? (
                <h2 className='text-xl font-bold text-center mb-4'>Không tìm thấy đơn hàng nào</h2>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="border-b pb-4 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-red-600">
                                        {order?.status}
                                    </h3>
                                    <span className="text-gray-500">
                                        {new Date(order?.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>Người nhận: {order.name}</p>
                                    <p>Địa chỉ: {order?.address?.addressDetail}, {order?.address?.ward}, {order?.address?.district}, {order?.address?.city}</p>
                                    <p>Số điện thoại: {order?.phone}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.products.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={`${getURL(item?.productId?.coverImage)}`} 
                                                alt={item?.productId?.title} 
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div>
                                                <h4 className="font-medium">{item?.productId?.title}</h4>
                                                <p className="text-gray-500">Số lượng: {item?.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">
                                                {Number(item?.price).toFixed(3)} VNĐ
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Thành tiền:</span>
                                    <span className="font-bold text-xl text-orange-500">
                                    {Number(order?.totalPrice).toFixed(3)} VNĐ
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrderPage
