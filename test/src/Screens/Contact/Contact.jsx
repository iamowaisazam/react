import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import PagesBanner from '../../Components/PagesBanner/PagesBanner'
import ContactCard from '../../Components/ContactCard/ContactCard'
import Footer from '../../Components/Footer/Footer'

const Contact = () => {
    const data = [
        {country: 'Dhaka, Bangladesh', num1: '+880 566 1111 985', num2: '+880 657 1111 576', location: 'Canada City, Office-02, Road-11, House-3B/B, Section-H'},
        {country: 'New York, USA', num1: '+1 212 555 1234', num2: '+1 718 555 5678', location: 'Canada City, Office-02, Road-11, House-3B/B, Section-H'},
        {country: 'Berlin, Germany', num1: '+49 30 1234 5678', num2: '+49 176 9876 5432', location: 'Canada City, Office-02, Road-11, House-3B/B, Section-H'}
    ];
    
  return (
    <>
 <div className="max-w-[133rem] mx-auto px-[2rem]">

    <Navbar/>
    <PagesBanner one="For" two="Any" three="Information" para="Reach out to us directly for further assistance." btn="Contact Us"/>
   
    <div className='w-[100%] h-full flex justify-center items-center gap-[3rem] flex-wrap mt-[4rem]'>
  {data.map((item) => {
    return (
      <ContactCard 
        key={item.country}  
        country={item.country} 
        num1={item.num1} 
        num2={item.num2} 
        location={item.location} 
      />
    );
  })}
</div>


<div className="w-full h-auto contact-field-container font-[Poppins] flex items-center justify-center gap-[10rem] mt-[11rem] flex-wrap mb-[4rem]">

  <div className="w-full md:w-[30%] h-full">

    <h1 className="text-[2.3rem] text-white">Contact Us With Support Line</h1>

    <fieldset className="border p-[3rem] rounded-[1rem] mt-[2rem]">
      <legend className="ml-[0rem] text-[#ffe73a] text-[2.1rem]">To know more</legend>
      <h1 className="text-white text-[2.3rem]">Email Now : <br />
        <span>info@example.com</span>
      </h1>
    </fieldset>

    <fieldset className="border p-[3rem] rounded-[1rem] mt-[4rem]">
      <legend className="ml-[0rem] text-[#ffe73a] text-[2.1rem]">Shop Address</legend>
      <h1 className="text-white text-[2.3rem]">Location <br />
        <span>Road-03, House-123/124, New York.</span>
      </h1>
    </fieldset>

    <h2 className="text-[1.5rem] mt-[2rem] text-white timing">
      <span className="text-[#ffe73a]">N:B:</span> Customer support always open at 9 am to 6 pm.
    </h2>
  </div>

  <div className="w-full md:w-[50%] h-full flex flex-col gap-[2rem] items-center border-2 border-solid border-white rounded-[2rem] py-[5rem]">

    <div className="w-full flex flex-col items-center">
      <div className="w-[80%] flex justify-start items-end">
        <label className="text-white text-[2.3rem] mb-[-1rem]">Full Name</label>
      </div> <br />
      <input 
        type="text" 
        placeholder="Your name" 
        className="contact-field placeholder-white  focus:outline-none focus:border-2 focus:border-[#ffe73a] py-[1.5rem] text-[1.8rem]" 
      />
    </div>

    <div className="w-full flex flex-col items-center">
      <div className="w-[80%] flex justify-start items-end">
        <label className="text-white text-[2.3rem] mb-[-1rem]">Phone No</label>
      </div> <br />
      <input 
        type="text" 
        placeholder="Your contact" 
        className="contact-field placeholder-white focus:outline-none focus:border-2 focus:border-[#ffe73a] py-[1.5rem] text-[1.8rem]" 
      />
    </div>

    <div className="w-full flex flex-col items-center">
      <div className="w-[80%] flex justify-start items-end">
        <label className="text-white text-[2.3rem] mb-[-1rem]">Email</label>
      </div> <br />
      <input 
        type="text" 
        placeholder="Your Email Address" 
        className="contact-field placeholder-white focus:outline-none focus:border-2 focus:border-[#ffe73a] py-[1.5rem] text-[1.8rem]" 
      />
    </div>

    <div className="w-full flex flex-col items-center">
      <div className="w-[80%] flex justify-start items-end">
        <label className="text-white text-[2.3rem] mb-[-1rem]">Subject</label>
      </div> <br />
      <input 
        type="text" 
        placeholder="Subject" 
        className="contact-field placeholder-white focus:outline-none focus:border-2 focus:border-[#ffe73a] py-[1.5rem] text-[1.8rem]" 
      />
    </div>

    <div className="w-full flex flex-col items-center">
      <div className="w-[80%] flex justify-start items-end">
        <label className="text-white text-[2.3rem] mb-[-1rem]">Short Note</label>
      </div> <br />
      <textarea 
        placeholder="Short Note" 
        className="contact-field h-[18rem] placeholder-white focus:outline-none focus:border-2 focus:border-[#ffe73a] py-[1.5rem] text-[1.8rem]"
      ></textarea>
    </div>

    <button className="relative text-[1.8rem] text-white p-[1.5rem] rounded-[0.7rem] border-2 border-solid border-[#ffe73a] overflow-hidden group">
  <span className="absolute inset-0 bg-[#ffe73a] transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out origin-left h-full"></span>
  <span className="relative group-hover:text-black transition-colors duration-500 ease-in-out">
    Submit
  </span>
</button>

  </div>

</div>

<Footer/>
</div>

    </>
  )
}

export default Contact