import React from 'react';
import './modalStyle.css';

const PreviewModal = ({ isOpen, onClose, selectedImage, headerText, description, applyNote, voucherCode, expiryDate }) => {
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
                                    <td>Voucher:</td>
                                    <td>{voucherCode}</td>
                                </tr>
                                <tr>
                                    <td>Hạn sử dụng:</td>
                                    <td>{expiryDate}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="preview-note">
                            <p>{applyNote}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;