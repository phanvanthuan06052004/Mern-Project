import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlide';
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
    const dispatch = useDispatch();
    //tính tổng giá trị và tổng số lượng
    const totalPrice = carts.reduce((accumulator, currentValue) => 
        accumulator + (currentValue.newPrice * currentValue.quantity), 0).toFixed(3);
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
            products: carts.map(item => ({
                productId: item._id,
                quantity: item.quantity,
                price: item.newPrice
            })),
            status: "CHỜ XỬ LÝ",
            totalPrice: totalPrice,
        }
        console.log(newOrder.products)
        try {
            const response = await createOrder(newOrder).unwrap(); //unwrap() giúp lấy dữ liệu từ response va nem ra loi
            if (response) {
                toast.success("Đặt hàng thành công!");
                dispatch(clearCart()); // Xóa giỏ hàng sau khi đặt hàng
                navigate('/orders'); 
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi đặt hàng!");
            console.error("Error creating order:", error);
        }

    }
    //lưu trữ dữ liệu địa chỉ
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // fetch dữ liệu
    useEffect(() => {
        // Fetch tỉnh,thành phố
        const fetchProvinces = async () => {
            const response = await fetch('https://provinces.open-api.vn/api/p/');
            const data = await response.json();
            setProvinces(data);
        };
        fetchProvinces();
    }, []);

    // Sửa lại hàm xử lý khi chọn tỉnh, thành phố
    const handleProvinceChange = async (e) => {
        const selectedProvince = provinces.find(p => p.name === e.target.value);
        if (selectedProvince) {
            const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`); //lấy quận theo tỉnh
            const data = await response.json();
            setDistricts(data.districts);
            setWards([]);
        }
    };

    // Sửa lại hàm xử lý khi chọn quận, huyện
    const handleDistrictChange = async (e) => {
        const selectedDistrict = districts.find(d => d.name === e.target.value);
        if (selectedDistrict) {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`); //lấy phường theo quận
            const data = await response.json();
            setWards(data.wards);
        }
    };

    return (
        <>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Thanh toán khi giao hàng</h2>
                            <p className="text-gray-500 mb-2">Tổng tiền: {Number(totalPrice).toFixed(3)} VNĐ</p>
                            <p className="text-gray-500 mb-6">Số lượng: {totalQuantity}</p>
                        </div>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Thông tin cá nhân</p>
                                    <p>Vui lòng điền đẩy đủ các thông tin.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                                        <div className="md:col-span-6">
                                            <label htmlFor="full_name">Họ và tên người nhận</label>
                                            <input
                                                {...register("name", { required: true })}
                                                type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-6">
                                            <label html="email">Email</label>
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
                                                type="number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+84909090909" />
                                        </div>

                                        <div className="md:col-span-6">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input
                                                {...register("address", { required: true })}
                                                type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="city">Thành phố / Tỉnh</label>
                                            <select
                                                {...register("city", { required: true })}
                                                onChange={handleProvinceChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            >
                                                <option value="">Chọn tỉnh/thành phố</option>
                                                {provinces.map((province) => (
                                                    <option key={province.code} value={province.name}>
                                                        {province.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="district">Quận / Huyện</label>
                                            <select
                                                {...register("district", { required: true })}
                                                onChange={handleDistrictChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            >
                                                <option value="">Chọn quận/huyện</option>
                                                {districts.map((district) => (
                                                    <option key={district.code} value={district.name}>
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="ward">Phường / Xã</label>
                                            <select
                                                {...register("ward", { required: true })}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            >
                                                <option value="">Chọn phường/xã</option>
                                                {wards.map((ward) => (
                                                    <option key={ward.code} value={ward.name}>
                                                        {ward.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input
                                                    type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" onChange={() => setIschecked(!isChecked)} />
                                                <label htmlFor="billing_same" className="ml-2 ">Tôi đồng ý với <Link className='underline underline-offset-2 text-blue-600'>Điều khoản và điều kiện</Link> và <Link className='underline underline-offset-2 text-blue-600'>Chính sách mua hàng.</Link></label>
                                            </div>
                                        </div>



                                        <div className="md:col-span-6 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    type='submit'
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Đặt hàng</button>
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
