import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/Book/booksAPI';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import InputField from './AddBook/InputField'
import SelectField from './AddBook/SelectField'
import { getURL } from '../../../utils/getURLImg';
import { CircleLoader } from 'react-spinners';

const EditBook = () => {
  const {id} = useParams();
  const { data: books, isLoading: isLoadingBook, isError: isErrorBook, refetch } = useGetBookByIdQuery(id);
  const book = books?.book || {};
  // console.log(book?.title);
  const [updateBook, {isLoading: isLoadingUpdate, isError: isErrorUpdate}] = useUpdateBookMutation();
  const {register, handleSubmit, setValue} = useForm();
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('') 

  useEffect(() => {
    if(book){
      setValue("title", book.title)
      setValue("description", book.description)
      setValue("category", book.category)
      setValue("trending", book.trending)
      setValue("oldPrice", book.oldPrice)
      setValue("newPrice", book.newPrice)
      setPreviewUrl(`${getURL(book?.coverImage)}`)
    }
  }, [book, setValue, setPreviewUrl])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }

  const onSubmit = async(data) => {
    try {
      let coverImage = book.coverImage;

      if (selectedFile) {
        const formData = new FormData()
        formData.append('image', selectedFile)

        const uploadResponse = await axios.post('http://localhost:3000/api/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        coverImage = uploadResponse.data.filename
      }

      const updatedBook = {
        ...data,
        coverImage,
        _id: id
      }

      await updateBook(updatedBook).unwrap()
      toast.success("Cập nhật sách thành công!")

    } catch (error) {
      console.error('Error:', error)
      toast.error(error.message || 'Có lỗi xảy ra khi cập nhật sách!')
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [])

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh' 
  }

  if(isLoadingBook) return (<div style={containerStyle}>
    <CircleLoader color="#80C4E9" size={100} aria-label="Loading Spinner" data-testid="loader" />
</div>)

  if(isErrorBook) return <div>Error loading book</div>

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

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

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

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

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          {isLoadingUpdate ? <span>Updating...</span> : <span>Update Book</span>}
        </button>
      </form>
    </div>
  )
}

export default EditBook
