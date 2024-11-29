import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form" //get value from input
import { useAuth } from '../../Context/authContext';
import { useCreateOrderMutation } from '../../redux/features/Oder/ordersAPI';
import { toast } from 'react-toastify';
const CheckoutPage = () => {
    const [isChecked, setIschecked] = useState(false)
    const { currentUser } = useAuth()
    const [createOrder] = useCreateOrderMutation();
    const navigate = useNavigate();
    //handle get data 
    const carts = useSelector((state) => state.cart.cartItem)

    //tính tổng giá trị và tổng số lượng
    const totalPrice = carts.reduce((accumulator, currentValue) => 
        accumulator + (currentValue.newPrice * currentValue.quantity), 0).toFixed(2);
    const totalQuantity = carts.reduce((accumulator, currentValue) => 
        accumulator + currentValue.quantity, 0);

    //get data from UI checkout
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    //handle submit event
    const onSubmit = async (data) => {
        
        if (!isChecked) {
            toast.warning("Vui lòng đồng ý với điều khoản và điều kiện!");
            return;
        }

        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                addressDetail: data.address,
                ward: data.ward,
                district: data.district,
                city: data.city,
            },
            phone: data.phone,
            product: carts.map(item => item?._id),
            totalPrice: totalPrice,
        }
        try {
            const response = await createOrder(newOrder).unwrap(); //unwrap() giúp lấy dữ liệu từ response va nem ra loi
            if (response) {
                toast.success("Đặt hàng thành công!");
                // dispatch(clearCart()); // Xóa giỏ hàng sau khi đặt hàng
                navigate('/orders'); 
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi đặt hàng!");
            console.error("Error creating order:", error);
        }

    }
    return (
        <>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delevary</h2>
                            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                            <p className="text-gray-500 mb-6">Items: ${totalQuantity}</p>
                        </div>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                                        <div className="md:col-span-6">
                                            <label htmlFor="full_name">Full Name</label>
                                            <input
                                                {...register("name", { required: true })}
                                                type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-6">
                                            <label html="email">Email Address</label>
                                            <input
                                                {...register("email", { required: false })}
                                                type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                disabled
                                                defaultValue={currentUser?.email}
                                                placeholder="email@gmail.com" />
                                        </div>
                                        <div className="md:col-span-6">
                                            <label html="phone">Phone</label>
                                            <input
                                                {...register("phone", { required: true })}
                                                type="number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890" />
                                        </div>

                                        <div className="md:col-span-6">
                                            <label htmlFor="address">Address / Street</label>
                                            <input
                                                {...register("address", { required: true })}
                                                type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="ward">Ward  / Commune</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    {...register("ward", { required: true })}
                                                    name="ward" id="ward" placeholder="ward" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                                                <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="district">District / Rural District</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    {...register("district", { required: true })}
                                                    name="district" id="district" placeholder="district" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                                                <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="city">City / province</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    {...register("city", { required: true })}
                                                    name="city" id="city" placeholder="City" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                                                <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>


                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input
                                                    type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" onChange={() => setIschecked(!isChecked)} />
                                                <label htmlFor="billing_same" className="ml-2 ">I am aggree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link></label>
                                            </div>
                                        </div>



                                        <div className="md:col-span-6 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    type='submit'
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place an Order</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage
