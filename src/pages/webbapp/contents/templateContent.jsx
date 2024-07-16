import React, {useState, useEffect} from 'react';
import NewItemForm from '../functions/newItem/newItemForm';
import ItemDetailPopup from '../functions/itemDetail/itemDetailForm';

const data = [
    { id: "LEAD001", date: "2/4/2024", content: "dsaasdasasd", amount: 556562, status: 'waiting' },
    { id: "LEAD002", date: "2/4/2024", content: "sample text", amount: 123456, status: 'pending' },
    { id: "LEAD002", date: "2/4/2024", content: "sample text", amount: 123456, status: 'waiting' },
    { id: "LEAD002", date: "2/4/2024", content: "sample text", amount: 123456, status: 'waiting' },
    { id: "LEAD002", date: "2/4/2024", content: "sample text", amount: 123456, status: 'pending' }
];

const TemplateContent = ({
    showNewItemPopup,
    handleCloseNewItemPopup,
    searchTerm
}) => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDetailPopup, setShowDetailPopup] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [counts, setCounts] = useState({ waiting: 0, pending: 0, all: 0 });

    const normalizeString = (str) => {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, '');
    };

    // CALCULATING SEARCH RESULTS
    useEffect(() => {
        const normalizedSearchTerm = normalizeString(searchTerm);

        const searchResults = data.filter(item => {
            const normalizedId = normalizeString(item.id);
            const normalizedContent = normalizeString(item.content);

            return normalizedId.includes(normalizedSearchTerm) || normalizedContent.includes(normalizedSearchTerm);
        });

        setSearchResult(searchResults);
    }, [searchTerm]);

    // APPLYING STATUS FILTER
    useEffect(() => {
        const filtered = searchResult.filter(item => statusFilter === 'all' || item.status === statusFilter);

        setFilteredData(filtered);

        const newCounts = searchResult.reduce((acc, { status }) => {
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, { waiting: 0, pending: 0, all: searchResult.length });

        setCounts(newCounts);
    }, [searchResult, statusFilter]);


    const handleShowDetailPopup = (item) => {
        setSelectedItem(item);
        setShowDetailPopup(true);
    };

    const handleCloseDetailPopup = () => {
        setShowDetailPopup(false);
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'waiting':
                return 'Chờ duyệt';
            case 'pending':
                return 'Pending';
            default:
                return 'Tất cả';
        }
    };

    return (
        <div className="content-main">
            <div className="filters">
                {['waiting', 'pending', 'all'].map(status => (
                    <button
                        key={status}
                        className={statusFilter === status ? 'active' : ''}
                        onClick={() => setStatusFilter(status)}
                    >
                        {getStatusLabel(status === 'all' ? 'all' : status)} ({counts[status]})
                    </button>
                ))}
            </div>
            <div className="list">
                {filteredData.map((item, index) => (
                    <div key={index} className="item" onClick={() => handleShowDetailPopup(item)}>
                        <div className="status-tag">
                            {getStatusLabel(item.status)}
                        </div>
                        <p>ID: {item.id}</p>
                        <p>Date: {item.date}</p>
                        <p>Nội dung: {item.content}</p>
                        <p>Số tiền: {item.amount}</p>
                    </div>
                ))}
            </div>

            {showNewItemPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <NewItemForm onClose={handleCloseNewItemPopup} />
                    </div>
                </div>
            )}

            {showDetailPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <ItemDetailPopup item={selectedItem} onClose={handleCloseDetailPopup} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateContent;