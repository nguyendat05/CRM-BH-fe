import React, { useState, useEffect } from 'react';
import './Webapp.css';
import { MdOutlineMenuOpen } from "react-icons/md";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import TemplateContent from './contents/templateContent';
import ClientInfoForm from './contents/clientInfo/clientInfoContent';
import ReportComponent from './contents/report/reportComponent';
import TransactionComponent from './contents/transactionTemplate/transactionComponent';
import PromotionComponent from './contents/promotionTemplate/promotionComponent';
import ClientListComponent from './contents/clientList/clientListComponent';

const cenicaItems = [
    { key: "order", name: "Dữ liệu đơn giao dịch" },
    { key: "report", name: "Báo cáo thống kê" },
    { key: "order_template", name: "Template tin giao dịch" },
    { key: "promotion_template", name: "Template tin truyền thông" },
    { key: "client", name: "DS khách hàng và điểm" }
];

const Webapp = ({ searchTerm }) => {
    const [selectedItem, setSelectedItem] = useState(cenicaItems[0].name); // Default to the first item
    const [showNewItemPopup, setShowNewItemPopup] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleAddNewItem = () => {
        setShowNewItemPopup(true);
    };

    const handleCloseNewItemPopup = () => {
        setShowNewItemPopup(false);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item.name);
        setSidebarOpen(false);
    };


    return (
        <div className="main-webapp">
            <div>
                <Sidebar className="side-bar" onBackdropClick={() => setSidebarOpen(false)} toggled={sidebarOpen} breakPoint="always">
                    <Menu>
                        {cenicaItems.map(item => (
                            <MenuItem 
                                key={item.key} 
                                onClick={() => handleItemClick(item)}
                                className={selectedItem === item.name ? 'selected-menu-item' : ''}
                            >
                                {item.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Sidebar>
            </div>
            <div className="content">
                <div className="header-webapp">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="tab-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <MdOutlineMenuOpen className="menu-icon" />
                        </div>
                        <span className="tab-text">{selectedItem}</span>
                    </div>
                    {selectedItem === "Dữ liệu đơn giao dịch" && (
                        <button className="new" onClick={handleAddNewItem}>+ mới</button>
                    )}
                </div>
                {selectedItem === "Dữ liệu đơn giao dịch" ? (
                    <ClientInfoForm                       
                        showNewItemPopup={showNewItemPopup}
                        handleCloseNewItemPopup={handleCloseNewItemPopup}
                        searchTerm={searchTerm}
                    />
                ) : selectedItem === "Báo cáo thống kê" ? (
                    <ReportComponent />
                ) : selectedItem === "Template tin giao dịch" ? (
                    <TransactionComponent />
                ) : selectedItem === "Template tin truyền thông" ? (
                    <PromotionComponent />
                ) : selectedItem === "DS khách hàng và điểm" ? (
                    <ClientListComponent />
                ) : (
                    <TemplateContent 
                        showNewItemPopup={showNewItemPopup}
                        handleCloseNewItemPopup={handleCloseNewItemPopup}
                        searchTerm={searchTerm}
                    />
                )}
            </div>
        </div>
    );
};

export default Webapp;