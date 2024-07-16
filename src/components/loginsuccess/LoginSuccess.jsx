import './LoginSuccess.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function LoginSuccess () {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prevLoading) => {
        if (prevLoading >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/powersheet'); 
          }, 500);
        }
        return Math.min(prevLoading + 5, 100);
      });
    }, 30);

    return () => clearInterval(interval); 
  }, [navigate]); 

  return (
    <div className="auth-callback-container">
      <h1>Đăng nhập thành công! Đang chuyển hướng...</h1>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${loading}%` }}></div>
      </div>
    </div>
  );
};