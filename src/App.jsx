import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './pages/web/components/Layout';

import Home from './pages/web/pages/home';

import About from './pages/web/pages/about';
import Vault from './pages/web/pages/vault';
import Faq from './pages/web/pages/faq';
import Contact from './pages/web/pages/contact';



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
      {
        path: "/services",
        element: (<Vault/>),
      },
      {
        path: "/faq",
        element: (<Faq/>),
      },
      {
        path:"/contact",
        element: (<Contact/>)
      }
    ]
  },
]);



function App() {
  
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );

}


export default App

