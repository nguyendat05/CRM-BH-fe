import React, { useState, useEffect } from 'react';
import './style.css';
import { CiCircleRemove } from "react-icons/ci";
import PreviewModal from './previewModel/previewModal';
import { updateRowData, getAllData } from '../../../../apis/sheetService';

const TransactionComponent = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [headerText, setHeaderText] = useState('');
    const [description, setDescription] = useState('');
    const [switchOn, setSwitchOn] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [transaction, setTransaction] = useState({});

    useEffect(() => {
        getAllData('transaction').then((data) => {
            setTransaction(data[0]);
            setHeaderText(data[0].header);
            setDescription(data[0].content);
            setSwitchOn(data[0].send);
        });
    }, []);

    const Switch = ({ isOn, handleToggle }) => {
        return (
            <div className="switch-container">
                <input
                    type="checkbox"
                    checked={isOn}
                    onChange={handleToggle}
                    className="switch-checkbox"
                    id="switch"
                    disabled={!isEditing}
                />
                <label className="switch-label" htmlFor="switch">
                    <span className="switch-button" />
                    <span className="switch-text switch-text-off">OFF</span>
                    <span className="switch-text switch-text-on">ON</span>
                </label>
            </div>
        );
    };

    const handleSwitchToggle = () => {
        if (isEditing) {
            setSwitchOn(!switchOn);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = async () => {
        if (isEditing) {
            // Update the data
            try {
                const updatedData = {
                    banner: selectedImage,
                    header: headerText,
                    content: description,
                    send: switchOn
                };

                const response = await updateRowData(1, updatedData, 'transaction');

                if (response.data.err === 0) {
                    console.log('Data updated successfully:', response.msg);
                    setIsEditing(false);
                } else {
                    console.error('Failed to update data:', response.msg);
                }
            } catch (error) {
                console.error('Error updating data:', error);
            }
        } else {
            setIsEditing(true);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handlePreviewButtonClick = () => {
        setIsPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    return (
        <div className="content-main">
            <div className="header-line"></div>
            <div className="header-content">
                <label htmlFor="banner">Ảnh bìa:</label>
                <div className='show-image'>
                    {selectedImage && (
                        <img src={selectedImage} alt="Selected" style={{ maxWidth: '100px', maxHeight: '150px' }} />
                    )}
                </div>
                <input
                    type="file"
                    id="banner"
                    name="banner"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                {!selectedImage && (
                    <button className="select-image-button" onClick={() => document.getElementById('banner').click()}>
                        Select Image
                    </button>
                )}
                {selectedImage && (
                    <div className="selected-image-info">
                        <span>{selectedImage.name}</span>
                        <button className="remove-icon" onClick={handleRemoveImage}>
                            <CiCircleRemove />
                        </button>
                    </div>
                )}
            </div>
            <div className="header-content">
                <div className="input-field">
                    <label htmlFor="headerText">Tiêu đề:</label>
                    <input
                        type="text"
                        id="headerText"
                        value={headerText}
                        onChange={handleInputChange(setHeaderText)}
                        readOnly={!isEditing}
                        className={!isEditing ? 'read-only' : ''}
                    />
                </div>
            </div>
            <div className="header-content">
                <div className="input-field">
                    <label htmlFor="description">Mô tả:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleInputChange(setDescription)}
                        rows={5}
                        readOnly={!isEditing}
                        className={!isEditing ? 'read-only' : ''}
                    />
                </div>
            </div>
            <div className="header-content">
                <label> Giá trị:</label>
                <span className='static-span'>Tự động lấy theo dữ liệu</span>
            </div>
            <div className="header-content">
                <label> Ghi chú:</label>
                <span className='static-span'>Hệ thống tự lấy</span>
            </div>
            <div className="header-content" style={{ justifyContent: "space-between" }}>
                <button
                    className={`trans-button ${isEditing ? 'edit-mode' : ''}`}
                    onClick={handleButtonClick}
                >
                    {isEditing ? 'Chấp thuận' : 'Edit'}
                </button>
                <button className="trans-button" onClick={handlePreviewButtonClick}>
                    Xem thử
                </button>
                <Switch isOn={switchOn} handleToggle={handleSwitchToggle} />
            </div>

            <PreviewModal
                isOpen={isPreviewOpen}
                onClose={handleClosePreview}
                selectedImage={selectedImage}
                headerText={headerText}
                description={description}
            />
        </div>
    );
};

export default TransactionComponent;