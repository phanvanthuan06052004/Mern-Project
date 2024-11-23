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
        })
    })
})

export const {useCreateOrderMutation, useGetOrderByEmailQuery} = ordersAPI;
export default ordersAPI;   
