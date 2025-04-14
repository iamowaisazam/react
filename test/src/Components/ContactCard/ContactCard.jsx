import { MapPin, Phone } from 'lucide-react'
import React from 'react'

const ContactCard = (props) => {
  return (
<>

<div className='w-[36rem] h-[22.5rem] bg-[white] rounded-[1rem] about-card-container border-[1rem] font-[Poppins] py-[2rem] pl-[2rem] flex flex-col gap-[2rem] '>


<h1 className='text-white text-[2.4rem]'>{props.country}</h1>
<div className='flex gap-[1rem]'>
<Phone className='text-[#ffe73a] w-[3rem] h-[3rem]'/> <div className='mt-[-0.9rem]'><h1 className='text-white text-[1.6rem]'>{props.num1}</h1>  <h1 className='text-white text-[1.6rem]'>{props.num2}</h1></div>
</div>
<div className='flex gap-[1rem]'>
<MapPin  className='text-[#ffe73a] w-[5rem] h-[4.5rem] mt-[-1rem]'/> <div className='mt-[-0.9rem]'><h1 className='text-white text-[1.6rem]'>{props.location}</h1></div>
</div>


</div>
</>
  )
}

export default ContactCard