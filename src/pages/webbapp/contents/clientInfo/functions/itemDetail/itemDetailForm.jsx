import React, { useState, useEffect } from 'react';
import './style.css';
import { useForm, Controller, useWatch } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="dialog-modal">
            <div className="modal-content">
                <p>Xác nhận xóa đơn</p>
                <div className="modal-actions">
                    <button type="button" className="cancel-button" onClick={onCancel}>Hủy</button>
                    <button type="button" className="confirm-button" onClick={onConfirm}>Xóa</button>
                </div>
            </div>
        </div>
    );
};

const ItemDetailPopup = ({ item, onClose, table, updateRow, hideRow, getData }) => {
    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm();
    const [selectedClients, setSelectedClients] = useState([]);
    const [userApply, setUserApply] = useState(item.userApply || []);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const formValues = useWatch({ control });

    const logFormData = async () => {
        const { id, ...formDataWithoutId } = formValues;
        formDataWithoutId.userApply = selectedClients;
        await updateRow(item.id, formDataWithoutId, table);
        onClose();
        getData();
    };
    
    const onSubmit = (data) => {
        submitForm(data);
    };

    const hideItem = async() => {
        onClose();
        await hideRow(item.id, table);
        getData()
    }

    const toggleClientApply = (value) => {
        setSelectedClients((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );

        setUserApply((prev) =>
            selectedClients.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    useEffect(() => {
        setValue('date', new Date(item.date));
        setValue('name', item.name);
        setValue('phoneNumber', item.phoneNumber);
        setValue('gender', item.gender);
        setValue('userApply', item.userApply);
        setValue('billPrice', item.billPrice);
        setValue('pathologicalGroup', item.pathologicalGroup);
        setValue('clientNote', item.clientNote);
        setSelectedClients(item.userApply || []);
        setUserApply(item.userApply || []);
    }, [item, setValue]);

    const clientOptions = ["Trẻ nhỏ", "Vị thành niên", "Thanh niên", "Trung niên", "Người già"];

    return (
        <div className="item-detail-popup">
            <div className="popup-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="popup-header">
                        <button type="button" className="back-button" onClick={onClose}>Quay lại</button>
                        <button type="submit" className="save-button" onClick={logFormData}>Lưu thay đổi</button>
                    </div>
                    <h2>Chi tiết mục</h2>
                    <div className="form-group">
                        <label htmlFor="id">ID:</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            defaultValue={'HD_' + item.id}
                            {...register('id', { required: true })}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Tên:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={item.name}
                            {...register('name', { required: true })}
                        />
                    </div>
                    <div className="form-group" style={{ display: 'flex' }}>
                        <div style={{ flex: '70%' }}>
                            <label htmlFor="date">Ngày:</label>
                            <Controller
                                control={control}
                                name="date"
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Select date"
                                        onChange={(date) => field.onChange(date)}
                                        selected={new Date(item.date)}
                                        dateFormat="dd/MM/yyyy"
                                        style={{ width: '100%' }}
                                    />
                                )}
                            />
                        </div>
                        <div style={{ flex: '30%' }}>
                            <div>
                                <label>Giới tính:</label>
                                <select {...register('gender', { required: true })} style={{ width: '100%' }}>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Đối tượng sử dụng:</label>
                        <div className="client-buttons">
                            {clientOptions.map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    onClick={() => toggleClientApply(option)}
                                    className={selectedClients.includes(option) ? 'selected' : ''}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="billPrice">Giá trị đơn hàng:</label>
                        <input
                            type="text"
                            id="billPrice"
                            name="billPrice"
                            defaultValue={item.billPrice}
                            {...register('billPrice', { required: true })}
                        />
                        <span>đ</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pathologicalGroup">Nhóm bệnh lý:</label>
                        <input
                            type="text"
                            id="pathologicalGroup"
                            name="pathologicalGroup"
                            defaultValue={item.pathologicalGroup}
                            {...register('pathologicalGroup', { required: true })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="clientNote">Tin nhắn cho người mua:</label>
                        <input
                            type="text"
                            id="clientNote"
                            name="clientNote"
                            defaultValue={item.clientNote}
                            {...register('clientNote', { required: true })}
                        />
                    </div>
                </form>
                <div className="form-actions">
                    <div></div>
                    <button type="button" className="action-button reject" onClick={() => setShowConfirmationModal(true)}>Xóa</button>
                </div>
            </div>
            <ConfirmationModal
                show={showConfirmationModal}
                onConfirm={() => {
                    hideItem();
                    setShowConfirmationModal(false);
                }}
                onCancel={() => setShowConfirmationModal(false)}
            />
        </div>
    );
};

export default ItemDetailPopup;