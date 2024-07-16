import React from 'react';
import './style.css';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ItemDetailPopup = ({ item, onClose }) => {
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = (data) => {
        console.log(data); // Handle form submission
    };

    const handleBack = () => {
        onClose(); // Handle closing the popup
    };

    // Set default values for form fields
    React.useEffect(() => {
        setValue('date', new Date(item.date)); // Convert item.date to Date object
        setValue('content', item.content);
        setValue('amount', item.amount);
    }, [item, setValue]);

    return (
        <div className="item-detail-popup">
            <div className="popup-header">
                <button className="back-button" onClick={handleBack}>Quay lại</button>
                <button type="submit" className="save-button">Lưu thay đổi</button>
            </div>
            <div className="popup-content">
                <h2>Chi tiết mục</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                        <label htmlFor="id">ID:</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            defaultValue={item.id}
                            {...register('amount', { required: true })}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Ngày:</label>
                        <DatePicker
                            id="date"
                            name="date"
                            selected={new Date(item.date)} // Convert item.date to Date object
                            onChange={(date) => setValue('date', date)}
                            dateFormat="dd/MM/yyyy"
                            className="date-picker"
                            wrapperClassName="date-picker-wrapper"
                            {...register('date', { required: true })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Nội dung:</label>
                        <textarea
                            id="content"
                            name="content"
                            defaultValue={item.content}
                            {...register('content', { required: true })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Số tiền:</label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            defaultValue={item.amount}
                            {...register('amount', { required: true })}
                        />
                    </div>
                </form>
            </div>
            <div className="form-actions">
                <button className="action-button approve">Duyệt</button>
                <button className="action-button clear-cmt">Clear cmt</button>
                <button className="action-button reject">Từ chối</button>
            </div>
        </div>
    );
};

export default ItemDetailPopup;
