import { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'

import { Outlet } from 'react-router-dom'

 export default () => {

  return (
    <>
      <Header/> 
      <div className='body bg-black' >
        <Outlet/>
      </div>
      <Footer/>
    </>
  )

}
