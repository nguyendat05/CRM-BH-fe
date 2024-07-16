import React from 'react';
import './modalStyle.css';

const PreviewModal = ({ isOpen, onClose, selectedImage, headerText, description }) => {
    if (!isOpen) return null;

    const formattedDescription = description.replace(/\n/g, '<br>');

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <div className="modal-header">
                    <h2>TIN GIAO DỊCH</h2>
                </div>
                <div className="modal-body">
                    <div className="image-section">
                        {selectedImage && (
                            <img src={selectedImage} alt="Preview" className="preview-image" />
                        )}
                    </div>
                    <div className="info-section">
                        <div className="preview-header">
                            <h3>{headerText}</h3>
                        </div>
                        <div className="preview-content">
                            <span dangerouslySetInnerHTML={{ __html: formattedDescription }} />
                        </div>
                        <div className="preview-detail">
                            <table>
                                <tr>
                                    <td>Mã khách hàng:</td>
                                    <td>F-01332973223</td>
                                </tr>
                                <tr>
                                    <td>Loại tin:</td>
                                    <td><strong>Đơn hàng</strong></td>
                                </tr>
                                <tr>
                                    <td>Giá tiền:</td>
                                    <td><span className="price">250.000đ</span></td>
                                </tr>
                            </table>
                        </div>
                        <div className="preview-note">
                            <p className="note">Hệ thống tự lấy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;