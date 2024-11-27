import React, { useState } from 'react'
import InputField from './InputField.jsx'
import SelectField from './SelectField.jsx'
import { useForm } from 'react-hook-form'
import { useAddBookMutation } from '../../../../redux/features/Book/booksAPI.js'
import { toast } from 'react-toastify'

const AddBook = () => {
  const {register, handleSubmit, formState: {error}, reset } =useForm()
  const [img, setImg] = useState(null)
  const [imgName, setImgName] = useState('')
  const [addBook, {isLoading, isError}] = useAddBookMutation()

  const onSubmit = async(data) => {
    console.log(data)
    console.log(imgName)
    const newBook = {
      ...data,
      coverImage: imgName
    }
    try {
      console.log(newBook)
      await addBook(newBook).unwrap()
      toast.success("Add book Success!");
      reset()
      setImg(null)
      setImgName('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = (e) => {
    console.log(e.target.files[0].name)
    const imgFile = e.target.files[0];
    if(imgFile) {
      setImg(imgFile)
      setImgName(imgFile.name)
    }
  }

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
            // Add more options as needed
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
          {imgName && <p className="text-sm text-gray-500">Selected: {imgName}</p>}
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
