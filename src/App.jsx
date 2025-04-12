import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './pages/web/components/Layout';

import Home from './pages/web/Home';
import About from './pages/web/About';



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (<Home/>),
      },
      {
        path: "/about",
        element: (<About/>),
      },
    ]
  }]

);


function App() {
  
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );

}


export default App

