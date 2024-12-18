import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Context/authContext'
function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
          <Outlet />
        </main>
        <Footer />
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
