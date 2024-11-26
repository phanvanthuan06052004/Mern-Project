import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form" //get value from input
import { toast } from 'react-toastify';
import getURL from '../utils/baseURL';
import axios from 'axios';

const AdminLogin = () => {
    const [validated, setValidated] = useState("")
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const res = await axios.post(`${getURL()}/api/users/verify`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(res.data.token){
                localStorage.setItem("token", res.data.token)
                setTimeout(() => {
                    localStorage.removeItem("token")
                    toast.warning("Token expired, please login again")
                    navigate("/admin/login")
                }, 1000 * 60 * 60 * 24)
                toast.success("Login success")
                navigate("/admin")
            }

        } catch (error) {
            setValidated(error.response.data.message)
            console.log(error.response.data.message)
        }
    }


  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 '>
            <h2 className='font-semibold mb-4 text-xl flex justify-center'>Please Login Admin</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="Username" className='text-sm pb-2 font-bold block text-gray-700 '>Username</label>
                    <input {...register("Username", { required: true })} className=' w-full shadow appearance-none border rounded py-3 px-2 leading-tight focus:outline-none focus:shadow' placeholder='Enter your Username' type="text" name="Username" id="Username" />
                </div>
                <div>
                    <label htmlFor="password" className='text-sm pb-2 font-bold block text-gray-700 '>Password</label>
                    <input {...register("password", { required: true })} className='w-full shadow appearance-none border rounded py-3 px-2 leading-tight focus:outline-none focus:shadow' placeholder='Enter your password' type="password" name="password" id="password" />
                </div>
                {
                    validated && <p className='mt-2 text-red-500 mb-2 italic text-xs'>{validated}</p>
                }
                <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 px-4 py-2 rounded focus:outline-none'>Login</button>
            </form>
            
        </div>
    </div>
  )
}

export default AdminLogin
