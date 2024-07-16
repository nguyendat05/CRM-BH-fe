import React, { useState, useEffect } from 'react';
import './style.css';
import { getReportData } from '../../../../apis/sheetService.jsx';

const dateRange = [
    { key: 'day', value: 'Hôm nay' },
    { key: 'week', value: 'Tuần này' },
    { key: 'month', value: 'Tháng này' }
];

const ReportComponent = ({
    searchTerm,
}) => {
    const table = 'order';

    const [reportData, setReportData] = useState({
        today: {},
        yesterday: {},
        thisWeek: {},
        lastWeek: {},
        thisMonth: {},
        lastMonth: {}
    });
    const [activeTab, setActiveTab] = useState(dateRange[0].key);

    const handleTabClick = (tabKey) => {
        setActiveTab(tabKey);
    };

    const getReport = () => {
        getReportData(table, activeTab).then((data) => setReportData(data));
    };

    useEffect(() => {
        getReport();
    }, [activeTab]);

    const getPeriodData = (period) => {
        const formatNumber = (number) => {
            return number.toLocaleString('en-US');
        };
    
        switch (activeTab) {
            case 'day':
                return {
                    current: reportData.today ? (reportData.today[period] ? formatNumber(reportData.today[period]) : '0') : '0',
                    previous: reportData.yesterday ? (reportData.yesterday[period] ? formatNumber(reportData.yesterday[period]) : '0') : '0'
                };
            case 'week':
                return {
                    current: reportData.thisWeek ? (reportData.thisWeek[period] ? formatNumber(reportData.thisWeek[period]) : '0') : '0',
                    previous: reportData.lastWeek ? (reportData.lastWeek[period] ? formatNumber(reportData.lastWeek[period]) : '0') : '0'
                };
            case 'month':
                return {
                    current: reportData.thisMonth ? (reportData.thisMonth[period] ? formatNumber(reportData.thisMonth[period]) : '0') : '0',
                    previous: reportData.lastMonth ? (reportData.lastMonth[period] ? formatNumber(reportData.lastMonth[period]) : '0') : '0'
                };
            default:
                return {
                    current: '',
                    previous: ''
                };
        }
    };

    return (
        <div className="content-main">
            <div className="date-buttons">
                {dateRange.map((item) => (
                    <button
                        key={item.key}
                        className={`date-button ${activeTab === item.key ? 'active' : ''}`}
                        onClick={() => handleTabClick(item.key)}
                    >
                        {item.value}
                    </button>
                ))}
            </div>
            <div className="report-table">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>{activeTab === 'day' ? 'Hôm nay' : (activeTab === 'week' ? 'Tuần này' : 'Tháng này')}</th>
                            <th>{activeTab === 'day' ? 'Hôm qua' : (activeTab === 'week' ? 'Tuần trước' : 'Tháng trước')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>GT Giao Dịch</td>
                            <td>{getPeriodData('sumPrice').current}</td>
                            <td>{getPeriodData('sumPrice').previous}</td>
                        </tr>
                        <tr>
                            <td>SL Giao Dịch</td>
                            <td>{getPeriodData('numOrder').current}</td>
                            <td>{getPeriodData('numOrder').previous}</td>
                        </tr>
                        <tr>
                            <td>SL KH</td>
                            <td>{getPeriodData('numPhoneNumbers').current}</td>
                            <td>{getPeriodData('numPhoneNumbers').previous}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportComponent;
