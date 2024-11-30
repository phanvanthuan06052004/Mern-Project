import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getURL from '../../../utils/baseURL'

const ordersAPI = createApi({
    reducerPath: "ordersAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getURL()}/api/order`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if(token){
                headers.set("Authorization", `Bearer ${token}`);
            }
        }
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: "/create",
                method: "POST",
                body: order,
                credentials: 'include'
            })
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/${email}`,
                method: "GET",
            }),
            providesTags: ["Orders"]
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: "/getall/showOrders",
                method: "GET",
            }),
            providesTags: ["Orders"]
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            })
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `/get/${id}`,
                method: "GET",
            })
        }),
        updateOrder: builder.mutation({
            query: ({id, ...order}) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: order,
            }),
            invalidatesTags: ["Orders"]
        })
    })
})

export const {useCreateOrderMutation, useGetOrderByEmailQuery, useGetAllOrdersQuery, useDeleteOrderMutation, useGetOrderByIdQuery, useUpdateOrderMutation} = ordersAPI;
export default ordersAPI;   
