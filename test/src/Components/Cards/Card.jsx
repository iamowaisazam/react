import React from 'react'
import { useState } from 'react'
import owner from '../../assets/owner.jpg'
import { Camera, Fuel, Gauge,  Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
const Card = (props) => {
  return (
<div className="w-[31rem] cards-container cards-container-two text-[1.7rem] bg-white rounded-3xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#f9df29] text-black px-4 py-1 rounded-full text-xl">
            Featured
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-[#f9df29] text-black px-4 py-1 rounded-full text-xl">
            2024
          </span>
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-gray-500 text-white px-4 py-1 rounded-full flex items-center gap-2 text-xl">
            <Camera size={16} />
            <span>6</span>
          </span>
        </div>
        
        <img 
          src={props.src}
          alt="2017 BMW X1"
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <p className="text-[#ffe73a] font-medium">{props.model}</p>
          <h3 className="text-[2rem] font-bold text-gray-800">
            {props.name}
          </h3>
        </div>

        <div className="flex gap-4 text-gray-600 text-[1.3rem] info-cards">
          <span className="flex items-center gap-2">
          <Gauge className="w-6 h-6"/>
            {props.km}
          </span>
          <span className="flex items-center gap-2">
          <Fuel  className="w-6 h-6"/>

            Diesel
          </span>
          <span className="flex items-center gap-2">
          <Workflow className="w-6 h-6"/>
            Automatic
          </span>
        </div>

        <p className="text-[1.8rem] font-bold text-[black]">{props.price}</p>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <img 
              src={owner} 
              alt="Kathryn Murphy"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium text-gray-700 text-[1.6rem]">{props.owner}</span>
          </div>
          <button className="relative px-4 py-2 border-2 text-black border-[#f9df29]  rounded-full text-[1.6rem] overflow-hidden group">
  <span className="absolute inset-0 bg-[#f9df29] transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out origin-left h-full"></span>
  <span className="relative group-hover:text-black transition-colors duration-500 ease-in-out">
  <Link to="/singlepage">View More</Link>
  </span>
</button>

        </div>
      </div>
    </div>
  )
}

export default Card