import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <>
      <div style={{ fontFamily: "'Poppins', sans-serif", display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div style={{ display: "flex", flex: 1, backgroundColor: "#eef5f9" }}>
          <Sidebar collapsed={sidebarCollapsed} />
          <div style={{ flex: 1, padding: '20px' }}>
            <Outlet />
            {/* <Footer /> */}
          </div>
        </div>
      </div>


      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
