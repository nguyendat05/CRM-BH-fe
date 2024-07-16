import React, { useState, useEffect } from 'react';
import NewInfoForm from './functions/newInfo/newInfoForm.jsx';
import './style.css';
import { getAllData, createNewRow, updateRowData, hideRowData, getUserData } from '../../../../apis/sheetService.jsx';
import ItemDetailPopup from './functions/itemDetail/itemDetailForm.jsx';

const ClientInfoForm = ({
    showNewItemPopup,
    handleCloseNewItemPopup,
    searchTerm,
}) => {
    const table = 'order'
    const [data, setData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortDirection, setSortDirection] = useState('desc');
    const [sortCriteria, setSortCriteria] = useState('id');
    const [showDetailPopup, setShowDetailPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const getData = () => {
        getAllData(table).then((data) => setData(data));
    }

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        const normalizedSearchTerm = normalizeString(searchTerm);

        const searchResults = data.filter(item => {
            const normalizedSHD = normalizeString(item.so_hop_dong);
            const normalizedMuaBan = normalizeString(item.mua_ban);
            const normalizeNgayKy = normalizeString(item.ngay_ky);

            return normalizedSHD.includes(normalizedSearchTerm) || normalizedMuaBan.includes(normalizedSearchTerm) || normalizeNgayKy.includes(normalizedSearchTerm);
        });

        setSearchResult(searchResults);
    }, [searchTerm, data]);


    useEffect(() => {
        const filtered = searchResult.slice();
        filtered.sort((a, b) => {
            if (sortCriteria === 'id') {
                return sortDirection === 'desc' ? b.id - a.id : a.id - b.id;
            } else if (sortCriteria === 'date') {
                return sortDirection === 'desc' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
            }
            return 0;
        });
        setFilteredData(filtered);
    }, [searchResult, sortDirection, sortCriteria]);

    const normalizeString = (str) => {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, '');
    };

    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    const handleShowDetailPopup = (item) => {
        setSelectedItem(item);
        setShowDetailPopup(true);
    };

    const handleCloseDetailPopup = () => {
        setShowDetailPopup(false);
    };

    return (
        <div>
            <div className="filters">
                <select className='filters-text' value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
                    <option value="id">ID</option>
                    <option value="date">Ngày tạo</option>
                </select>
                <button onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
                    Sort {sortDirection === 'asc' ? '↑' : '↓'}
                </button>
            </div>
            <div className="list-order">
                {filteredData.map((item, index) => (
                    <div key={index} className="item" onClick={() => handleShowDetailPopup(item)}>
                        <p>Mã hóa đơn: HD_{item.id}</p>
                        <p>Khách hàng: {item.name}</p>
                        <p>Ngày tạo: {item.date}</p>
                        <p>Giá đơn: {formatNumber(parseInt(item.billPrice))} đ</p>
                    </div>
                ))}
            </div>
            {showNewItemPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <NewInfoForm 
                            onClose={handleCloseNewItemPopup} 
                            createData={createNewRow}
                            getData={getData}
                            getUserData={getUserData}
                            updateRow = {updateRowData}
                            getAllData={getAllData}
                            table={table}
                        />
                    </div>
                </div>
            )}
            {showDetailPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <ItemDetailPopup 
                            item={selectedItem} 
                            onClose={handleCloseDetailPopup} 
                            table = {table}
                            updateRow = {updateRowData}
                            hideRow = {hideRowData}
                            getData={getData}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientInfoForm;