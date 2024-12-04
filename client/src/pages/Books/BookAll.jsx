import React, { useState } from 'react'
import { useGetBooksQuery } from '../../redux/features/Book/booksAPI'
import BooksCart from './BooksCart'
import { useLocation } from 'react-router-dom';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
const BookAll = () => {
  const { data: books = [] } = useGetBooksQuery();
  const booksList = books?.book || [];
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get("search")

  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all', 
    sortBy: 'newest'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  // Lọc và sắp xếp sách
  const filteredBooks = booksList.filter(book => {
    //handel search query
    if(searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase())) return false

    if (filters.category !== 'all' && book.category !== filters.category) {
      return false;
    }
    if (filters.priceRange !== 'all') {
      const price = book.newPrice;
      switch (filters.priceRange) {
        case 'under20':
          return price < 20;
        case '20to50':
          return price >= 20 && price <= 50;
        case 'over50':
          return price > 50;
        default:
          return true;
      }
    }
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'priceAsc':
        return a.newPrice - b.newPrice;
      case 'priceDesc':
        return b.newPrice - a.newPrice;
      default:
        return 0;
    }
  });

  // Tính toán phân trang
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {
        searchQuery && <h2 className='text-2xl font-bold text-center my-8'>Kết quả tìm kiếm cho: "{searchQuery}"</h2>
      }
      <div className="mb-8 flex flex-wrap gap-4">
        <select 
          className="px-4 py-2 border rounded-md"
          value={filters.category}
          onChange={(e) => {
            setFilters({...filters, category: e.target.value});
            setCurrentPage(1);
          }}
        >
          <option value="all">Tất cả thể loại</option>
          <option value="business">Business</option>
          <option value="fiction">Fiction</option>
          <option value="horror">Horror</option>
          <option value="adventure">Adventure</option>
          <option value="marketing">Marketing</option>
          <option value="technology">Technology</option>
        </select>

        <select
          className="px-4 py-2 border rounded-md"
          value={filters.priceRange}
          onChange={(e) => {
            setFilters({...filters, priceRange: e.target.value});
            setCurrentPage(1);
          }}
        >
          <option value="all">Tất cả giá</option>
          <option value="under20">Dưới 20.000đ</option>
          <option value="20to50">20.000đ - 50.000đ</option>
          <option value="over50">Trên 50.000đ</option>
        </select>

        <select
          className="px-4 py-2 border rounded-md"
          value={filters.sortBy}
          onChange={(e) => {
            setFilters({...filters, sortBy: e.target.value});
            setCurrentPage(1);
          }}
        >
          <option value="newest">Mới nhất</option>
          <option value="priceAsc">Giá tăng dần</option>
          <option value="priceDesc">Giá giảm dần</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {currentBooks.map((book) => (
          <BooksCart key={book._id} books={book} />
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            <GrFormPrevious />
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1 
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            <GrFormNext />
          </button>
        </div>
      )}
    </div>
  )
}

export default BookAll
