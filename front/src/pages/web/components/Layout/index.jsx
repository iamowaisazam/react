import { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'

import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

 export default () => {

  return (
    <>
      <Header/> 
      <div className='body bg-black' >
        <Outlet/>
      </div>
      <Footer/>

        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )

}
