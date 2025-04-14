"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CircleCheck } from 'lucide-react';
import { Send, Phone, Mail, MessageSquareWarning } from 'lucide-react';
import { Gauge,  Fuel, Car } from 'lucide-react';
import audi from '../../assets/audi.jpg'
import bmw from '../../assets/bmw.jpg'
import porsche from '../../assets/porsche.jpg'
import yaudi from '../../assets/yAudi.jpeg'
import PagesBanner from '../../Components/PagesBanner/PagesBanner';
import Navbar from '../../Components/Navbar/Navbar';
import carone from '../../assets/car-one.jpg'
import cartwo from '../../assets/car-two.jpg'
import carthree from '../../assets/car-three.jpg'
import carfour from '../../assets/car-four.jpg'
import Card from '../../Components/Cards/Card';
import Footer from '../../Components/Footer/Footer';
const SinglePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cars = [
    {
      image: audi,
      name: "Porsche 911 GT3 (Silver)",
    },
    {
      image: bmw,
      name: "Audi RS5 (Yellow)",
    },
    {
      image: porsche,
      name: "BMW M3 (White)",
    },
    {
      image: yaudi,
      name: "Mercedes-AMG C63 (Black)",
    }
  ];

  const features = [
    {
      col1: { icon: <CircleCheck size={30} />, text: "Premium Wheel" },
      col2: { icon: <CircleCheck size={30} />, text: "Front Heated Seats" },
      col3: { icon: <CircleCheck size={30} />, text: "Front Heated Seats" }
    },
    {
      col1: { icon: <CircleCheck size={30} />, text: "Moonroof" },
      col2: { icon: <CircleCheck size={30} />, text: "Premium Seat Material" },
      col3: { icon: <CircleCheck size={30} />, text: "Remote Engine Start" }
    },
    {
      col1: { icon: <CircleCheck size={30} />, text: "Premium Audio" },
      col2: { icon: <CircleCheck size={30} />, text: "Bluetooth" },
      col3: { icon: <CircleCheck size={30} />, text: "Blind Spot System" }
    },

  ];

  const infoItems = [
    {
      icon: <Gauge size={32} />,
      value: "25,100 miles",
      label: "Mileage"
    },
    {
      icon: <Fuel size={32}  />,
      value: "22,231 cc",
      label: "Engine"
    },
    {
      icon: <Fuel size={32}  />,
      value: "Petrol + Gas",
      label: "Fuel Type"
    },
    {
      icon: <Car  size={32}  />,
      value: "Used Car",
      label: "Condition"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === cars.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? cars.length - 1 : prevIndex - 1
    );
  };

    const carsCard = [
      {
        name: "2017 BMW X1 xDrive 20",
        model: "Sedan",
        kms: "72,491 kms",
        fuel: "Diesel",
        transmission: "Automatic",
        price: "$73,000",
        owner: "Kathryn Murphy",
        image: carone
      },
      {
        name: "2018 Audi A4 Premium",
        model: "Sedan",
        kms: "45,000 kms",
        fuel: "Petrol",
        transmission: "Automatic",
        price: "$32,000",
        owner: "John Doe",
        image: cartwo
      },
      {
        name: "2020 Mercedes-Benz",
        model: "Coupe",
        kms: "30,000 kms",
        fuel: "Electric",
        transmission: "Automatic",
        price: "$55,000",
        owner: "Alice Smith",
        image: carthree
      },
      {
        name: "2019 Toyota Camry Hybrid",
        model: "Sedan",
        kms: "60,000 kms",
        fuel: "Hybrid",
        transmission: "Automatic",
        price: "$28,000",
        owner: "David Johnson",
        image: carfour
      },
    
    ];

  return (
<>
<Navbar/>
<PagesBanner 
  one="Vehicle" 
  two="Details" 
  para="Discover the performance, features, and luxury of your dream car." 
  btn="Explore More Cars" 
/>
<div className='w-[100%] flex gap-[4rem] px-[1.3rem] font-[Poppins] mt-[5rem] main-single-page-container'>
      <div className="flex w-[65%] for-car-width flex-col   ml-[4.6rem] space-y-8 first-container">
        <div className="relative w-full single-page-car-container">
  <div className="relative h-[38rem] md:h-[38rem] sm:h-[28rem] car-for-height overflow-hidden rounded-lg">
    {cars.map((car, index) => (
      <div
        key={index}
        className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${
          index === currentIndex
            ? 'translate-x-0'
            : index < currentIndex
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
      >
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>

  <button
    onClick={prevSlide}
    className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#1f1f1f] hover:bg-[#333333] text-[#ffe73a] p-2 rounded-full shadow-lg transition-all"
    aria-label="Previous slide"
  >
    <ChevronLeft size={44} className="pre" />
  </button>

  <button
    onClick={nextSlide}
    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1f1f1f] hover:bg-[#333333] text-[#ffe73a] p-2 rounded-full shadow-lg transition-all"
    aria-label="Next slide"
  >
    <ChevronRight size={44} className="pre" />
  </button>
</div>


       


        <div>
        <div className="bg-transparent rounded-lg shadow-md w-[100%] ">
        <div className="mb-6 flex items-center gap-2">
          <h2 className="text-[2rem]  font-semibold text-[#ffe73a]">Car Info</h2>
          <div className="h-px bg-white/90 flex-grow ml-2 w-6"></div>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {infoItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover: hover:shadow-lg cursor-pointer group"
                >
                  <div className= " text-gray-300 group-hover: transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[1.5rem] text-[#ffe37a] ">{item.value}</div>
                    <div className="text-[1.4rem] text-gray-400 ">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mb-6 flex items-center gap-2">
            <h2 className="text-[2rem] font-semibold text-[#ffe73a]">Key Features</h2>
            <div className="h-px bg-white/90 flex-grow ml-2 w-6" ></div>
          </div>

          <div className="grid grid-cols-3 gap-x-8 feature-container  mt-[3rem]">
            <div className="space-y-[2rem]">
              {features.map((row, idx) => (
                <div
                  key={`col1-${idx}`}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className="text-gray-400  group-hover:text-[#ffe73a] transition-colors duration-200">
                    {row.col1.icon}
                  </div>
                  <span className="text-white text-[1.5rem] group-hover:text-[#ffe73a] transition-colors duration-200">
                    {row.col1.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-[2rem]">
              {features.map((row, idx) => (
                <div
                  key={`col2-${idx}`}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className="text-gray-400 group-hover:text-[#ffe73a] transition-colors duration-200">
                    {row.col2.icon}
                  </div>
                  <span className="text-white  text-[1.5rem] group-hover:text-[#ffe73a] transition-colors duration-200">
                    {row.col2.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-[2rem]">
              {features.map((row, idx) => (
                <div
                  key={`col3-${idx}`}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <div className="text-gray-400 group-hover:text-[#ffe73a] transition-colors duration-200">
                    {row.col3.icon}
                  </div>
                  <span className="text-white  text-[1.5rem] group-hover:text-[#ffe37a] transition-colors duration-200">
                    {row.col3.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>


        


        <div className="rounded-lg shadow-md">
        <div className="mb-6 flex items-center gap-2">
          <h2 className="text-[2rem] font-semibold text-[#ffe73a]">Overview</h2>
          <div className="h-px bg-white/90 flex-grow ml-2 w-6"></div>
        </div>
        <div className="grid grid-cols-3 overview-container gap-x-[1rem] gap-y-[1rem] text-white p-2">
          <div className="flex justify-between overview px-[1.5rem] py-[1.5rem]">
            <span className="font-medium text-[1.5rem]">Make:</span>
            <span className='text-[1.5rem]'>Lamborghini</span>
          </div>
          <div className="flex justify-between overview px-[1.5rem] py-[1.5rem]">
            <span className="font-medium text-[1.5rem]">Repair:</span>
            <span className='text-[1.5rem]'>No</span>
          </div>
          <div className="flex justify-between overview px-[1.5rem] py-[1.5rem]">
            <span className="font-medium text-[1.5rem]" >Model:</span>
            <span className='text-[1.5rem]'>Lamborghini ave11</span>
          </div>
          <div className="flex justify-between text-[1.5rem] overview px-[1.5rem] py-[1.5rem]">
            <span className="font-medium">Steering:</span>
            <span>Right</span>
          </div>
          <div className="flex justify-between text-[1.5rem] overview px-[1.5rem] py-[1.5rem]">
            <span className="font-medium">Year/Month:</span>
            <span>2023</span>
          </div>
          <div className="flex justify-between text-[1.5rem] overview px-[1.5rem] py-[1.5rem]">
            <span className="font-medium">Seating Capacity:</span>
            <span>08</span>
          </div> 
          <div className="flex justify-between text-[1.5rem] overview px-[1.5rem] py-[1.5rem]">
            <span className="font-medium">Mileage:</span>
            <span>25,100 miles</span>
          </div>
          <div className="flex justify-between text-[1.5rem] overview px-[1.5rem] py-[1.5rem]">
            <span className="font-medium">Fuel Type:</span>
            <span>Petrol + Gas</span>
          </div>
        


          <div className="flex justify-between text-[1.5rem] overview px-[1.5rem] py-[1.5rem]">
            <span className="font-medium">No. of Cylinders:</span>
            <span>03</span>
          </div>
        </div>
      </div>
    


        <div className="rounded-lg shadow-md">
        <div className="mb-6 flex items-center gap-2">
          <h2 className="text-[2rem] font-semibold text-[#ffe73a]">Contact Us</h2>
          <div className="h-px bg-white/90 flex-grow ml-2 w-6"></div>

  </div>

  <p className=' text-[1.5rem] text-[#D3D3D3] font-[LightPoppins] tracking-[0.2rem]'> accusamus corrupti eius assumenda, pariatur nihil deserunt repellat tenetur. Atque corporis doloribus aperiam, est asperiores id. Quos voluptates a accusantium distinctio, et cum explicabo quam asperiores nostrum. At distinctio dolor earum veritatis voluptas.</p>

      </div>


      </div>





      <div className='w-[25%] second-page-container'>
      <div className=" right-14 top-4 flex flex-col gap-4 p-6  border-gray-300 border-opacity-40 border-2 rounded-lg shadow-lg">
          <button className="w-full bg-[#ffe73a] text-[1.5rem] hover:bg-[#ffe73a]/80 text-black py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
            <Phone size={20} />
            Show Number
          </button>

          <button className="w-full bg-black text-[1.5rem] border-white/70 border-2 hover:bg-gray-800 text-white py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
            <Mail size={20} />
            Email Now
          </button>

          <button className="w-full bg-red-500 text-[1.5rem] hover:bg-red-600 text-white py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
            <MessageSquareWarning size={20} />
            Report Now
          </button>

          <div className="mt-8 bg-transparent border-white/80 border-2 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h2 className="text-[1.7rem] text-[#ffe37a] font-semibold mb-2">To More inquiry</h2>
            <p className="text-gray-300 text-[1.5rem] mb-6">If choose this car to contact easily with us.</p>

            <form className="space-y-4">
              <div>
                <label className="block  font-medium mb-1 mt-[1rem] text-white text-[1.4rem]">Name*</label>
                <input
                  type="text"
                  placeholder="Ex: Jhon Numan"
                  className="w-full px-4 py-4 border border-gray-300 bg-transparent text-[1.4rem] text-white rounded-md focus:ring-2 focus:ring-[#ffe73a] focus:border-transparent transition-all duration-300"
                />
              </div>

              <div className='mt-[2rem]'>
                <label className="block mt-[3rem] font-medium mb-1 text-white   text-[1.4rem]">Email*</label>
                <input
                  type="email"
                  placeholder="Ex: info@gmail.com"
                  className="w-full px-4 py-4 border border-gray-300 rounded-md bg-transparent text-[1.4rem] text-white focus:ring-2 focus:ring-[#ffe73a] focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block mt-[3rem]  font-medium mb-1 text-white  text-[1.4rem]">Phone*</label>
                <div className="flex ">
                  <select className="px-2 py-2 border border-gray-300 text-[1.4rem] rounded-l-md bg-transparent text-white focus:ring-2 focus:ring-[#ffe73a] focus:border-transparent">
                    <option className='bg-black text-white'>🇺🇸 +1</option>
                    <option className='bg-black text-white'>🇬🇧 +44</option>
                    <option className='bg-black text-white'>🇯🇵 +81</option>
                    <option className='bg-black text-white'>🇫🇷 +33</option>
                    <option className='bg-black text-white'>🇩🇰 +45</option>
                    <option className='bg-black text-white'>🇨🇦 +1</option>
                    <option className='bg-black text-white'>🇦🇺 +61</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="(201) 555-0123"
                    className="w-full px-4 py-4 border border-gray-300 rounded-r-md bg-transparent text-[1.5rem] text-white focus:ring-2 focus:ring-[#ffe37a] focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[1.4rem] mt-[3rem] text-white font-medium mb-1">Message*</label>
                <textarea
                  placeholder="Write your message"
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-md text-[1.4rem] bg-transparent text-white focus:ring-2 focus:ring-[#ffe73a] focus:border-transparent transition-all duration-300"
                />
              </div>

              <button className="w-full py-3 px-4 bg-[#ffe73a] text-[1.5rem] text-black font-semibold rounded-md transition-all duration-300 hover:bg-[#ffe73a]/80 transform hover:scale-105">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="w-full mt-8 flex items-center justify-center">
          <div className="relative w-full" style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.190155314036!2d-122.4312976846813!3d37.77397217975992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858065cc973983%3A0x49f20e9f5d5fdb9!2sGiant%20Camera%20Parking%20Station!5e0!3m2!1sen!2sus!4v1615334643183!5m2!1sen!2sus"
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </div>




    
    <div className="suggested-container mt-[10rem] flex flex-col items-center gap-[3rem] mb-[3rem] font-[Poppins]">
  <div className="flex items-center w-full justify-center">
    <div className="flex-grow h-[2px] bg-white/90 mr-4"></div>
    <h1 className="text-white text-[3rem]">Suggested for you</h1>
    <div className="flex-grow h-[2px] bg-white/90 ml-4"></div>
  </div>

<div className='w-[100%] h-full flex flex-wrap gap-[4rem]   px-[2rem] justify-center'>


{carsCard.map((car, index) => (
        <Card
          key={index}
          name={car.name}
          model={car.model}
          km={car.kms}
          fuel={car.fuel}
          transmission={car.transmission}
          price={car.price}
          owner={car.owner}
          src={car.image}
        />
      ))}

</div>

</div>
<Footer/>
    </>
  );
};

export default SinglePage;
