import React, { useState, useEffect } from 'react';
import './style.css';
import { getAllData } from '../../../../apis/sheetService.jsx';


const ClientListComponent = () => {
    const table = 'client'
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const getData = () => {
        getAllData(table).then((data) => setData(data));
    }

    useEffect(() => {
        getData()
    }, []);

    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    const filteredData = data.filter((item) => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return Object.values(item).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(lowercasedSearchTerm)
        );
    });

    return (
        <div>
            <div className="content-main">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="total-clients">
                    Tổng: {filteredData.length} Khách hàng
                </div>
            </div>
            <div className="client-details">
                {filteredData.map((item, index) => (
                    <div key={index} className="item" onClick={() => handleShowDetailPopup(item)}>
                        <div>
                            <strong>Khách hàng:</strong> {item.name}
                        </div>
                        <div>
                            <strong>Số điện thoại:</strong> {item.phoneNumber}
                        </div>
                        <div>
                            <strong>Tổng GT giao dịch:</strong> {formatNumber(parseInt(item.totalCost))} đ
                        </div>
                        <div>
                            <strong>Điểm C-point:</strong> {item.point ? item.point : 0}
                        </div>
                        <div>
                            <strong>Ngày GD đầu tiên:</strong> {item.firstDate}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientListComponent;