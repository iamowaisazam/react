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

// category
import Addcategory from './pages/admin/pages/category/addcategory.jsx';
import Category from './pages/admin/pages/category/index.jsx';


// Make
import Addmake from './pages/admin/pages/make/add.jsx';
import Make from './pages/admin/pages/make/index.jsx';

// Model
import Addmodel from './pages/admin/pages/model/add.jsx';
import Model from './pages/admin/pages/model/index.jsx';

// Version
import Addversion from './pages/admin/pages/version/add.jsx';
import Version from './pages/admin/pages/version/index.jsx';

// car
import Addcar from './pages/admin/pages/car/add.jsx';
import Car from './pages/admin/pages/car/index.jsx';

// Setting
import General from './pages/admin/pages/setting/index.jsx';


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
      { path: "add-category", element: <Addcategory /> },
      { path: "view-categories", element: <Category /> },
      { path: "view-make", element: <Make /> },
      { path: "add-make", element: <Addmake /> },
      { path: "view-model", element: <Model /> },
      { path: "add-model", element: <Addmodel /> },
      { path: "view-version", element: <Version /> },
      { path: "add-version", element: <Addversion /> },
      { path: "view-cars", element: <Car /> },
      { path: "add-car", element: <Addcar /> },
      { path: "settings/general", element: <General /> },
    ]
  }
],
  {
    basename: path,
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

