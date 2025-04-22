import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItemStyle = {
    padding: "12px 18px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.2s",
    color: "#333",
    fontWeight: 500
  };

  const menuItemHover = {
    backgroundColor: "#f5f5f5"
  };

  return (
    <header style={{
      backgroundColor: "#1f2d3d",
      color: "white",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
    }}>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: "24px" }}>
          <img src="/src/assets/logo.png" alt="Logo"
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              objectFit: "cover",
              marginRight: "10px",
              border: "2px solid #fff"
            }}
          />
          <span style={{ fontWeight: 600, fontSize: "20px", letterSpacing: "0.5px" }}>
            elite<span style={{ fontWeight: "normal", color: "#bbb" }}>admin</span>
          </span>
        </div>

        <button
          style={{ background: "none", border: "none", color: "white", fontSize: "22px", marginLeft: "20px", cursor: "pointer" }}
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>


      <div style={{ position: "relative" }} ref={dropdownRef}>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          <img src="/src/assets/profile.jpg" alt="Profile"
            style={{
              borderRadius: "50%",
              width: "38px",
              height: "38px",
              objectFit: "cover",
              marginRight: "8px",
              border: "2px solid #fff"
            }}
          />
          <span style={{ marginRight: "6px", fontWeight: 500 }}>Muhammad Shakeeb Raza</span>
          <FaChevronDown style={{ fontSize: "12px" }} />
        </div>

        {open && (
          <div style={{
            position: "absolute",
            right: 0,
            marginTop: "12px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            minWidth: "200px",
            zIndex: 1000
          }}>
            {["👤 Edit Profile", "🔒 Change Password", "🎨 Change Theme"].map((item, idx) => (
              <div
                key={idx}
                style={menuItemStyle}
                onMouseEnter={e => Object.assign(e.currentTarget.style, menuItemHover)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: "transparent" })}
                onClick={() => alert(item)}
              >
                {item}
              </div>
            ))}
            <div
              style={{ ...menuItemStyle, color: "#dc3545" }}
              onMouseEnter={e => Object.assign(e.currentTarget.style, menuItemHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, { backgroundColor: "transparent" })}
              onClick={() => alert("🚪 Logged out")}
            >
              🚪 Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
