import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getURL from '../../../utils/baseURL'

//create request: Một wrapper của fetch API để dễ dàng tạo requests
const baseQuery = fetchBaseQuery({
     baseUrl: `${getURL()}/api/books` , //URL gốc cho API endpoints
     credentials: 'include', //Gửi cookies với request
     prepareHeaders: (headers) => {{
        const token = localStorage.getItem('token')
        if(token){
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
     }
    }})

const booksAPI = createApi({
    reducerPath: 'booksAPI',
    baseQuery,
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/show',
            providesTags: ['Books'] //Tag để định danh các endpoints
        }),
        getBookById: builder.query({
            query: (id) => `/findById/${id}`,
            providesTags: ['Books']
        }),
        updateBook: builder.mutation({
            query: ({id, ...data}) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Books'] //Xóa cache khi có sự thay đổi trong data
        }),
        addBook: builder.mutation({
            query: (data) => ({
                url: `/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Books']
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Books']
        })
    })
})

export const { useGetBooksQuery, useGetBookByIdQuery, useUpdateBookMutation, useAddBookMutation, useDeleteBookMutation } = booksAPI
export default booksAPI
