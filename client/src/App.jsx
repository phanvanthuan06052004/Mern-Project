import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <nav>nav</nav>
      <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App
