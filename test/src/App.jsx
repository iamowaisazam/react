import React , {useState} from 'react';
import Navbar from './Components/Navbar/Navbar';
import Selector from './Components/Selector/Selector';
import Crousel from './Components/CrouselBanner/Crousel';
import Drop from './Components/DropDown/Drop';



const App = () => {


  return (
    <div className=" h-auto w-auto  text-white">
    

  <section className="w-full">
<div className="max-w-[1300px] w-full mx-auto">
<Navbar/>
  </div>
  </section>   

  <section className="w-full">
<div className="max-w-[1300px] w-full mx-auto">
<Crousel/>
  </div>
  </section>   


  <section className="w-full">
<div className="max-w-[1300px] w-full mx-auto">
<Selector/>
  </div>
  </section>   

    </div>



  );
};

export default App;









