import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/Oder/ordersAPI';
import { useAuth } from '../../Context/authContext';
import { useState, CSSProperties } from "react";
import CircleLoader from "react-spinners/ClipLoader";


const OrderPage = () => {
    const { currentUser} = useAuth() //get email from currentUser in authContext
    //style for loading
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh' // chiều cao tối thiểu bằng viewport
    }
    // console.log(currentUser)
    //handle get order by email
    const {data: orders, isLoading, isError} = useGetOrderByEmailQuery(currentUser?.email);
    console.log(orders)

    if(isLoading) return (
        <div style={containerStyle}>
            <CircleLoader color="#80C4E9" size={100} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    )
  return (
    <div>
      <h1>Order</h1>
    </div>
  )
}

export default OrderPage
