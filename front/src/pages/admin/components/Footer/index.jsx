import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "#fff",
      borderTop: "1px solid #eaeaea",
      padding: "10px 20px",
      textAlign: "center",
      fontSize: "13px",
      color: "#6c757d",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <span>
        © {new Date().getFullYear()} <strong style={{ color: "#2c3e50" }}>Eliteadmin</strong> by
        <a
          href="https://www.themedesigner.in"
          target="_blank"
          rel="noreferrer"
          style={{ margin: "0 5px", color: "#2c3e50", textDecoration: "none", fontWeight: 500 }}
        >
          themedesigner.in
        </a>
        <span style={{ color: "#f86c6b", fontWeight: "bold" }}>WrapPixel</span>
      </span>
    </footer>
  );
}

