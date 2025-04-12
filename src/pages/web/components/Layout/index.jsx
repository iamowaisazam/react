import { useState } from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'

 export default () => {

  return (
    <>
      <Header/> 
      <div className='body' >
        <Outlet/>
      </div>
    </>
  )

}
