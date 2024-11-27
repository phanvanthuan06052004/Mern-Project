import React, { useEffect, useState } from 'react'
import InputField from './InputField.jsx'
import SelectField from './SelectField.jsx'
import { useForm } from 'react-hook-form'
import { useAddBookMutation } from '../../../../redux/features/Book/booksAPI.js'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddBook = () => {
  const {register, handleSubmit, formState: {error}, reset } =useForm()
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('') // Để preview ảnh
  const [addBook, {isLoading, isError}] = useAddBookMutation()

  const onSubmit = async(data) => {
    try {
      if (!selectedFile) {
        toast.error('Vui lòng chọn ảnh bìa sách!')
        return
      }

      // Upload ảnh khi submit form
      const formData = new FormData()
      formData.append('image', selectedFile)

      const uploadResponse = await axios.post('http://localhost:3000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Tạo sách mới với tên file ảnh đã upload
      const newBook = {
        ...data,
        coverImage: uploadResponse.data.filename
      }

      await addBook(newBook).unwrap()
      toast.success("Thêm sách thành công!")
      
      // Reset form
      reset()
      setSelectedFile(null)
      setPreviewUrl('')
      
      // Xóa preview URL để tránh memory leak
      URL.revokeObjectURL(previewUrl)

    } catch (error) {
      console.error('Error:', error)
      toast.error(error.message || 'Có lỗi xảy ra khi thêm sách!')
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Chỉ lưu file tạm thời và tạo preview
      setSelectedFile(file)
      // Tạo preview URL
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

   // Cleanup preview URL khi component unmount
   useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [])

  return (
    <>
      <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}

        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
            { value: 'marketing', label: 'Marketing' },
            
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
         
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
        

        {previewUrl && (
            <div className="mt-2">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-w-[200px] rounded-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
          }
        </button>
      </form>
    </div>
    </>
  )
}

export default AddBook
