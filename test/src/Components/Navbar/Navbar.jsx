import React, { useState } from 'react';
import Logo from '../../assets/Logo.jpg';
import ListCar from '../../assets/ListCar.png';
// import "../../Font/Poppins/Poppins-SemiBold.ttf";
import { ChevronDown,  Search, Menu,LogIn ,CircleUserRound ,  Home, User2, Briefcase,TableOfContents , MessageCircle, ChevronRight, Car } from 'lucide-react';
import { X, Mail, Lock, User , KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const closePanel = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="navbar-container font-[Poppins] w-[100%] h-[10rem] bg-[black] flex items-center justify-center gap-[17.5rem]">
        <div>
          <img src={Logo} alt="Logo" className="w-[20rem] logo" />
        </div>


        <div className=''>
            <ul className="navigate-link text-[#ffffff] flex gap-[2.2rem] items-center justify-center font-semibold text-[1.5rem] ml-[12rem]">
              <li className="relative flex gap-[0rem] group">
                <span className="relative hover:cursor-pointer">
                  <Link to="/">Home</Link>
                  <span className="absolute left-1/2 top-[2.2rem] transform -translate-x-1/2 w-0 h-[4px] bg-[#ffe73a] group-hover:w-full transition-all  duration-300 ease-in-out"></span>
                </span>
              </li>
              <li className="relative flex gap-[0.2rem] group">
                <span className="relative hover:cursor-pointer">
                <Link to="/about">About</Link>

                  <span className="absolute top-[2.2rem] left-1/2 bottom-0 transform -translate-x-1/2 w-0 h-[4px] bg-[#ffe73a] mb-[3rem] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </span>
              </li>

              <li className="relative flex gap-[0.2rem] group">
                <span className="relative hover:cursor-pointer">
                <Link to="/vault">Vault</Link>

                  <span className="absolute top-[2.2rem] left-1/2 bottom-0 transform -translate-x-1/2 w-0 h-[4px] bg-[#ffe73a] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </span>
              </li>

              
              <li className="relative flex gap-[0.2rem] group">
                <span className="relative hover:cursor-pointer">
                <Link to="/faq">Faq</Link>

                  <span className="absolute top-[2.2rem] left-1/2 bottom-0 transform -translate-x-1/2 w-0 h-[4px] bg-[#ffe73a] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </span>
              </li>

              <li className="relative flex gap-[0.2rem] group">
                <span className="relative hover:cursor-pointer">
                <Link to="/contact">Contact</Link>

                  <span className="absolute top-[2.2rem] left-1/2 bottom-0 transform -translate-x-1/2 w-0 h-[4px] bg-[#ffe73a] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </span>
              </li>
              
            </ul>
          </div>
   

        <div className="flex items-center gap-[1.5rem]">


          <div className="flex items-center gap-[0.5rem]">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="login px-6 py-2 bg-transparent text-white font-medium rounded-lg border-2 border-[#ffe73a] relative overflow-hidden group transition-all duration-500 text-[1.5rem]"
          >
            <span className="absolute left-0 top-0 w-full h-full text[1.5rem] bg-gradient-to-r from-red-500 to-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left"></span>
            <span className="relative group-hover:text-white">Login</span>
          </button>

  {/* Login Panel */}
  <div
    className={`fixed top-0 right-0 h-full bg-black text-white z-50 transform transition-all duration-500 ${
   isLoginOpen ? 'translate-x-0 w-[325px] login-panel' : 'translate-x-full w-0 opacity-0'
 }`}
  >


    <button onClick={closePanel} className="absolute top-4 right-4 text-white hover:text-red-500">
      <X size={24} />
    </button>
    <div className="p-8  h-[100%] flex justify-center items-center flex-col">
      <h2 className="text-5xl font-bold mb-8 signin-title">Login</h2>
      <div className="relative w-[100%] mb-4">
  <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
  <input
    type="email"
    placeholder="Email"
    className="signin-fields w-full p-[1rem] pl-[3.3rem] bg-gray-800 text-white rounded text-[1.2rem] focus:outline-none"
  />
</div>
<div className="relative w-[100%] mb-4">

<KeyRound  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20}/>
      <input
        type="password"
        placeholder="Password"
        className="signin-fields w-full p-[1rem] pl-[3.3rem] bg-gray-800 text-white rounded text-[1.2rem] focus:outline-none"
      />
      </div>
      <button className="w-[80%] bg-red-600 py-2 py-[1rem]  rounded hover:bg-red-700 transition-all text-[1.9rem] signin-btn">
        Login
      </button>
      <h1 className='text-white text-2xl mt-[3rem]' onClick={() =>{ setIsForgotPasswordOpen(true) ; setIsLoginOpen(false);}}>
  <Link to="#">Forgot Password?</Link>
</h1>

      
      <h1 className='text-white text-2xl mt-[1rem]' onClick={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}><Link to="#">Don't have an account?</Link></h1>



    </div>
  </div>





  <button
    onClick={() => setIsSignupOpen(true)}
    className="register px-6 py-2 bg-transparent text-white font-medium rounded-lg border-2 border-[#ffe73a] relative overflow-hidden group transition-all duration-500 text-[1.5rem] hover:bg-black"
  >
    <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-red-500 to-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left"></span>
    <span className="relative group-hover:text-white">Register</span>
  </button>

  <div
    className={`fixed top-0 right-0 h-full bg-black text-white z-50 transform transition-all duration-500 ${
   isSignupOpen ? 'translate-x-0 w-[325px] login-panel' : 'translate-x-full w-0 opacity-0'
 }`}
  >
    <button onClick={closePanel} className="absolute top-4 right-4 text-white hover:text-red-500">
      <X size={24} />
    </button>
    <div className="p-8  h-[100%] flex justify-center items-center flex-col" >
      <h2 className=" text-5xl font-bold mb-8 signin-title">Sign Up</h2>

      



      <div className="relative w-[100%] mb-4">

<User  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20}/>
      <input
        type="text"
        placeholder="Username"
        className="signin-fields w-full p-[1rem] pl-[3.3rem] bg-gray-800 text-white rounded text-[1.2rem] focus:outline-none"
      />
      </div>
      <div className="relative w-[100%] mb-4">
  <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
  <input
    type="email"
    placeholder="Email"
    className="signin-fields w-full p-[1rem] pl-[3.3rem] bg-gray-800 text-white rounded text-[1.2rem] focus:outline-none"
  />
</div>
     <div className="relative w-[100%] mb-4">

<KeyRound  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20}/>
      <input
        type="password"
        placeholder="Password"
        className="signin-fields w-full p-[1rem] pl-[3.3rem] bg-gray-800 text-white rounded text-[1.2rem] focus:outline-none"
      />
      </div>
      <div className="relative w-[100%] mb-4">

<KeyRound  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20}/>
      <input
        type="password"
        placeholder="Confirm Password"
        className="signin-fields w-full p-[1rem] pl-[3.3rem] bg-gray-800 text-white rounded text-[1.2rem] focus:outline-none"
      />
      </div>
      <button className="w-[80%] bg-red-600 py-[1rem] rounded hover:bg-red-700 transition-all text-[1.2rem] signin-btn">
        Sign Up Now
      </button>

    
      <h1 className='text-white text-2xl mt-[1rem]'  onClick={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}><Link to="#">Already have an account?</Link></h1>






        </div>
      </div>

      <div
        className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-all duration-500 ${isForgotPasswordOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className="w-[325px] bg-black text-white p-8 rounded-lg transform transition-all duration-500"
        >
          <button onClick={closePanel} className="absolute top-4 right-4 text-white hover:text-red-500">
            <X size={24} />
          </button>
          <h2 className="text-5xl font-bold mb-8">Forgot Password</h2>
          <div className="relative w-[100%] mb-4">
            <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Enter your Email"
              className="signin-fields w-full p-[1rem] pl-[3.3rem] bg-gray-800 text-white rounded text-[1.2rem] focus:outline-none"
            />
          </div>
          <button className="w-[80%] bg-red-600 py-[1rem] ml-[3rem] rounded hover:bg-red-700 transition-all text-[1.2rem]">
            Verify Email
          </button>
          <button className="w-[80%] bg-blue-600 py-[1rem] mt-4  ml-[3rem] rounded hover:bg-blue-700 transition-all text-[1.2rem]">
            Verify Phone Number
          </button>
        </div>
      </div>


            <button className="navbar-btn listing-btn flex items-center justify-center px-3 py-[0.8rem] bg-transparent text-white font-semibold border-2 border-transparent rounded-lg relative overflow-hidden group transition-all duration-500">
              <span className="absolute inset-0 bg-gradient-to-r from-[#ffe73a] to-yellow-400 group-hover:from-yellow-400 group-hover:to-red-500 transition-all duration-700"></span>
              <span className="relative z-10 text-[1.5rem] listing">Add Listing</span>
            </button>
          </div>
          
          <div className="md:hidden  ">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? 
                <X size={24} /> : 
                <Menu size={20} className='' />
              }
            </button>
          </div>
          
        </div>

        <div className={`md:hidden absolute w-full bg-black transform transition-all duration-300 mt-[60rem] ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`} style={{zIndex: 9999}}>
          <div className="flex flex-col space-y-4 gap-[2rem] p-4 pl-[6.7rem]">
        <Link to="/">
        
        <a href="#" className="group flex items-center space-x-2   menu-bottom text-white hover:text-red-500 transition-all duration-300 transform hover:translate-x-2">
              <span className='text-[2rem]'>Home</span>
              <ChevronRight size={20} className="ml-auto opacity-0 group-hover:opacity-100" />
            </a>
        
        </Link>
     <Link to="/about">
     
     <a href="#" className="group flex items-center space-x-2 left-0  ml-[-0.3rem] text-white menu-bottom hover:text-[#ffe73a] transition-all duration-300 transform hover:translate-x-2">
              <span className='text-[2rem]'>About</span>
              <ChevronRight size={20} className="ml-auto opacity-0 group-hover:opacity-100" />
            </a>
     </Link>


     <Link to="/vault">
     
     <a href="#" className="group flex items-center space-x-2 left-0  ml-[-0.3rem] text-white menu-bottom hover:text-[#ffe73a] transition-all duration-300 transform hover:translate-x-2">
              <span className='text-[2rem]'>Vault</span>
              <ChevronRight size={20} className="ml-auto opacity-0 group-hover:opacity-100" />
            </a>
     </Link>
    <Link to="/faq">
    
    <a href="#" className="group flex items-center  space-x-2 text-white menu-bottom ml-[-0.3rem] hover:text-[#ffe73a] transition-all duration-300 transform hover:translate-x-2">
              <span className='text-[2rem]'>Faq</span>
              <ChevronRight size={20} className="ml-auto opacity-0 group-hover:opacity-100" />
            </a>
    
    </Link>
<Link to="/contact">

<a href="#" className="group flex items-center space-x-2 text-white menu-bottom ml-[-0.5rem]  hover:text-[#ffe73a] transition-all duration-300 transform hover:translate-x-2">
              <span className='text-[2rem]'>Contact</span>
              <ChevronRight size={20} className="ml-auto opacity-0 group-hover:opacity-100" />
            </a>
</Link>
            <a
  href="#"
  className="group flex items-center space-x-2 ml-[-0.5rem]  text-white menu-bottom hover:text-red-500 transition-all duration-300 transform hover:translate-x-2"
  onClick={() => {
    setIsOpen(false); 
    setIsLoginOpen(true); 
  }}
>
              <span className='text-[2rem]'>Login</span>
              <ChevronRight size={20} className="ml-auto opacity-0 group-hover:opacity-100" />
            </a>
            <a href="#" className="group flex ml-[-0.6rem] items-center menu-bottom space-x-2 text-white hover:text-[#ffe73a] transition-all duration-300 transform hover:translate-x-2"   onClick={() => {
    setIsOpen(false); 
    setIsSignupOpen(true); 
  }}>
              <span className='text-[2rem]'>Register</span>
              <ChevronRight size={20} className="ml-auto opacity-0 group-hover:opacity-100" />
            </a>
                
    <a href="#" className="group flex items-center list-toggle  space-x-2 text-white menu-bottom ml-[-0.3rem] hover:text-[#ffe73a] transition-all duration-300 transform hover:translate-x-2">
              <span className='text-[2rem] list-text'>Add Listing</span>
            </a>
    

    
    

          </div>
        </div>

      </div>








    </header>





  );
}











export default Navbar;





































// className={`fixed top-0 right-0 h-full bg-black text-white z-50 transform transition-all duration-500 ${
//   isLoginOpen ? 'translate-x-0 w-[400px]' : 'translate-x-full w-0'
// }`}
// >
// <button onClick={closePanel} className="absolute top-4 right-4 text-white hover:text-red-500">
//   <X size={24} />
// </button>
// <div className="p-8">
//   <h2 className="text-3xl font-bold mb-8">Login</h2>
//   <input
//     type="email"
//     placeholder="Email"
//     className="w-full mb-4 p-2 bg-gray-800 text-white rounded"
//   />
//   <input
//     type="password"
//     placeholder="Password"
//     className="w-full mb-6 p-2 bg-gray-800 text-white rounded"
//   />
//   <button className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition-all">
//     Login
//   </button>
// </div>
// </div>


//     <button  onClick={() => setIsSignupOpen(true) } className="register px-6 py-2 bg-transparent text-white font-medium rounded-lg border-2 border-[#E63946] relative overflow-hidden group transition-all duration-500 text-[1.7rem] hover:bg-black">
//       <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-red-500 to-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left"></span>
//       <span className="relative group-hover:text-white" >Register</span>
//     </button>



//  {/* Signup  */}



//  <div
// className={`fixed top-0 right-0 h-full bg-black text-white z-50 transform transition-all duration-500 ${
//   isSignupOpen ? 'translate-x-0 w-[400px]' : 'translate-x-full w-0'
// }`}
// >
// <button onClick={closePanel} className="absolute top-4 right-4 text-white hover:text-red-500">
//   <X size={24} />
// </button>
// <div className="p-8">
//   <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
//   <input
//     type="text"
//     placeholder="Username"
//     className="w-full mb-4 p-2 bg-gray-800 text-white rounded"
//   />
//   <input
//     type="email"
//     placeholder="Email"
//     className="w-full mb-4 p-2 bg-gray-800 text-white rounded"
//   />
//   <input
//     type="password"
//     placeholder="Password"
//     className="w-full mb-4 p-2 bg-gray-800 text-white rounded"
//   />
//   <button className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition-all">
//     Sign Up
//   </button>
// </div>
// </div>








