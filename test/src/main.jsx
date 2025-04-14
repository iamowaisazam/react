import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faq from './Screens/Faq/Faq.jsx';
import About from './Screens/About/About.jsx';
import Cars from './Screens/Cars/Cars.jsx';
import SinglePage from './Screens/SinglePage/SinglePage.jsx';


import Contact from './Screens/Contact/Contact.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Router>
  <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='/faq' element={<Faq/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/vault' element={<Cars/>}/>
    <Route path='/singlepage' element={<SinglePage/>}/>



    </Routes>
</Router>
  </StrictMode>,
)
