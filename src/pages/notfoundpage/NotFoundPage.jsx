import React from 'react';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-message">Oops! Trang bạn tìm kiếm không tồn tại.</h2>
      <a href="/crossroads" className="not-found-link">Quay lại</a>
    </div>
  );
}