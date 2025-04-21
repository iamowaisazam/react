import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './pages/web/components/Layout';

import Home from './pages/web/pages/home';

import About from './pages/web/pages/about';
import Vault from './pages/web/pages/vault';
import Faq from './pages/web/pages/faq';
import Contact from './pages/web/pages/contact';
import Detail from './pages/web/pages/detail';

const path = import.meta.env.VITE_PATH || "";

// Admin
import AdminLayout from './pages/admin/components/Layout';
import Login from './pages/admin/components/login';


// Dashboard
import Dashboard from './pages/admin/pages/dashboard';

// Users
import Userindex from './pages/admin/pages/user';
import Adduser from './pages/admin/pages/user/add.jsx';

// Menu
import Menuindex from './pages/admin/pages/menu';
import Addmenu from './pages/admin/pages/menu/add.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (<Home />),
      },
      {
        path: "/about",
        element: (<About />),
      },
      {
        path: "/services",
        element: (<Vault />),
      },
      {
        path: "/faq",
        element: (<Faq />),
      },
      {
        path: "/contact",
        element: (<Contact />)
      },
      {
        path: "/detail/:id",
        element: (<Detail />)
      }
    ]


  },
  {
    path: "/admin/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Userindex /> },
      { path: "add-user", element: <Adduser /> },
      { path: "view-menus", element: <Menuindex /> },
      { path: "add-menu", element: <Addmenu /> },
    ]
  }
],
{
    basename:path, 
}


);



function App() {

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );

}


export default App

