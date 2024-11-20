import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
const Register = () => {
    const [validated, setValidated] = useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data)

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 '>
                <h2 className='font-semibold mb-4 text-xl flex justify-center'>Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className='text-sm pb-2 font-bold block text-gray-700 '>Email</label>
                        <input {...register("email", { required: true })} className='shadow appearance-none border rounded py-3 px-2 leading-tight focus:outline-none focus:shadow' placeholder='Enter your Email' type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password" className='text-sm pb-2 font-bold block text-gray-700 '>Password</label>
                        <input {...register("password", { required: true })} className='shadow appearance-none border rounded py-3 px-2 leading-tight focus:outline-none focus:shadow' placeholder='Enter your Email' type="password" name="password" id="password" />
                    </div>
                    {
                        validated && <p className='mt-2 text-red-500 mb-2 italic text-xs'>{validated}</p>
                    }
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 px-4 py-2 rounded focus:outline-none'>Sign Up</button>
                </form>
                <p className='text-sm font-medium mt-4 align-baseline'>Do have an account? Please <Link className='text-blue-300 hover:text-blue-500' to="/login">Login</Link></p>
                <div className='mt-4'>
                    <button className='w-full flex flex-wrap items-center justify-center gap-1 py-2 px-4 text-white font-bold bg-black hover:bg-blue-500 rounded'>
                        Sign up with Google
                        <FaGoogle />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register
