import React, { useEffect } from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/Oder/ordersAPI';
import { useAuth } from '../../Context/authContext';
import CircleLoader from "react-spinners/ClipLoader";
import OrderItem from '../../components/OrderItem';


const OrderPage = () => {
    const { currentUser, loading} = useAuth() //get email from currentUser in authContext
    //style for loading
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh' // chiều cao tối thiểu bằng viewport
    }
    // console.log(currentUser)
    //handle get order by email
    const {data: orders = [], isLoading, isError, refetch} = useGetOrderByEmailQuery(currentUser?.email);
    console.log(orders)
    useEffect(() => {
        refetch()
    }, [refetch])
    if(loading) return (
        <div style={containerStyle}>
            <CircleLoader color="#80C4E9" size={100} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    )
  return (
    <div>
      <h1 className='text-2xl font-bold text-center mb-4'>Your Orders</h1>
      {orders.length === 0 ? <h2 className='text-xl font-bold text-center mb-4'>No orders found</h2> 
      : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {orders.map((order, index) => (
          <OrderItem key={index} order={order} index={index} />
          
        ))}
      </div>
      }
    </div>
  )
}

export default OrderPage
