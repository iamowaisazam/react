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
import Dashboard from './pages/admin/dashboard';

// Users
import Userindex from './pages/admin/user';
import Adduser from './pages/admin/user/add.jsx';
import EditUser from './pages/admin/user/edit.jsx';

// Menu
import Menuindex from './pages/admin/menu';
import Addmenu from './pages/admin/menu/add.jsx';

// category
import Addcategory from './pages/admin/category/addcategory.jsx';
import Category from './pages/admin/category/index.jsx';
import EditCategory from './pages/admin/category/edit.jsx';


// Make
import Make from './pages/admin/make/index.jsx';
import Addmake from './pages/admin/make/add.jsx';
import EditMake from './pages/admin/make/edit.jsx';

// Model
import Model from './pages/admin/model/index.jsx';
import Addmodel from './pages/admin/model/add.jsx';
import EditModel from './pages/admin/model/edit.jsx';

// Version
import Addversion from './pages/admin/version/add.jsx';
import Version from './pages/admin/version/index.jsx';

// car
import Addcar from './pages/admin/car/add.jsx';
import Car from './pages/admin/car/index.jsx';

// Setting
import General from './pages/admin/setting/index.jsx';


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
      { path: "edit-user/:id", element: <EditUser /> },
      { path: "view-menus", element: <Menuindex /> },
      { path: "add-menu", element: <Addmenu /> },
      { path: "view-categories", element: <Category /> },
      { path: "add-category", element: <Addcategory /> },
      { path: "edit-category/:id", element: <EditCategory /> },
      { path: "view-make", element: <Make /> },
      { path: "add-make", element: <Addmake /> },
      { path: "edit-make/:id", element: <EditMake /> },
      { path: "view-model", element: <Model /> },
      { path: "add-model", element: <Addmodel /> },
      { path: "edit-model/:id", element: <EditModel /> },
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

