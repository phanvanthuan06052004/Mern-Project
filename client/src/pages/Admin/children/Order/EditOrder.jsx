import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from '../AddBook/InputField'
import SelectField from '../AddBook/SelectField'
import { CircleLoader } from 'react-spinners';
import { useGetOrderByIdQuery, useUpdateOrderMutation } from '../../../../redux/features/Oder/ordersAPI';

const EditOrder = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  console.log(id)
  const { data: order, isLoading: isLoadingOrder, isError: isErrorOrder } = useGetOrderByIdQuery(id);
  console.log(order)
  const orderData = order || {};
  console.log(orderData.name)
  const [updateOrder, {isLoading: isLoadingUpdate, isError: isErrorUpdate}] = useUpdateOrderMutation();
  const {register, handleSubmit, setValue} = useForm();

  useEffect(() => {
    if(orderData) {
      setValue("name", orderData.name)
      setValue("email", orderData.email) 
      setValue("phone", orderData.phone)
      setValue("totalPrice", orderData.totalPrice)
      setValue("createdAt", new Date(orderData.createdAt).toLocaleString())
      setValue("status", orderData.status)
    }
  }, [orderData, setValue])

  const onSubmit = async(data) => {
    try {
      const updateData = {
        id: id,
        status: data.status
      }

      await updateOrder(updateData).unwrap()
      toast.success("Cập nhật trạng thái đơn hàng thành công!")
      navigate("/admin/orders")
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.message || 'Có lỗi xảy ra khi cập nhật đơn hàng!')
    }
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh' 
  }

  if(isLoadingOrder) return (<div style={containerStyle}>
    <CircleLoader color="#80C4E9" size={100} aria-label="Loading Spinner" data-testid="loader" />
  </div>)

  if(isErrorOrder) return <div>Error loading order</div>

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Chi tiết đơn hàng</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Tên khách hàng"
          name="name"
          register={register}
          readOnly={true}
        />

        <InputField
          label="Email"
          name="email"
          register={register}
          readOnly={true}
        />

        <InputField
          label="Số điện thoại"
          name="phone"
          register={register}
          readOnly={true}
        />

        <InputField
          label="Tổng tiền"
          name="totalPrice"
          register={register}
          readOnly={true}
        />

        <InputField
          label="Ngày đặt hàng"
          name="createdAt"
          register={register}
          readOnly={true}
        />

        <SelectField
          label="Trạng thái"
          name="status"
          options={[
            { value: '', label: 'Chọn trạng thái' },
            { value: 'CHỜ XỬ LÝ', label: 'CHỜ XỬ LÝ' },
            { value: 'ĐANG GIAO', label: 'ĐANG GIAO' },
            { value: 'ĐÃ GIAO', label: 'ĐÃ GIAO' },
            { value: 'ĐÃ HỦY', label: 'ĐÃ HỦY' },
          ]}
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          {isLoadingUpdate ? <span>Đang cập nhật...</span> : <span>Cập nhật trạng thái</span>}
        </button>
      </form>
    </div>
  )
}

export default EditOrder
