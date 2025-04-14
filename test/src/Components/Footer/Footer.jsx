import React from 'react'
import { Facebook , Instagram, Linkedin, Twitter } from 'lucide-react'
const Footer = () => {
  return (
<>

<div className='w-[100%] h-[9rem] p-[1.3rem] bg-[black] text-[white] flex font-[Poppins]  items-center justify-center gap-[44rem] footer-main-container  bottom-0'>


<div className='flex justify-center items-center '>
    <h1 className='text-[1.5rem] designer'>Copyright 2023 <span className='text-[#ffe73a]'>DRIVCO </span>| Design By <span className='text-[#ffe73a]'> Egens Lab</span></h1>

</div>

<div className='flex items-center justify-center gap-[2rem]'>


<h1 className='text-[1.5rem] designer'>Follow Us On :</h1>
<Facebook className=' rounded-[100%] p-[1rem] w-[4rem] h-[4rem] bg-[transparent] footer-icon designer' /> <Instagram className='footer-icon rounded-[100%] p-[1rem] w-[4rem] h-[4rem] bg-[transparent] '  />  <Twitter className='footer-icon rounded-[100%] p-[1rem] w-[4rem] h-[4rem] bg-[transparent]'  />
</div>
</div>

</>  

)


  
}

export default Footer