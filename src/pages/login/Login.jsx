import "./Login.css";
import React from "react";

export default function Login() {
  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/login`, "_self");
  };

  return (
    <div className="login">
      <div className="container">
        <span>Xin chào !!</span>
        <br />
        <p>Hệ thống quản lý sức khỏe nhi khoa Cenica CRM</p>
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </div>
  );
}