import React, { useState, useEffect } from 'react';
import './style.css';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatISO } from 'date-fns';
import { getZaloData, sendTemplate } from '../../../../../../apis/zaloService';

const NewInfoForm = ({ onClose, createData, getData, getUserData, updateRow, getAllData, table}) => {
    const [selectedClients, setSelectedClients] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [clients, setClients] = useState([])
    const [userApply, setUserApply] = useState([]);
    const [formattedBillPrice, setFormattedBillPrice] = useState('');
    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            date: new Date(),
        }
    });

    useEffect(() => {
        getZaloData().then((data) => setAccessToken(data[1].token))
    }, [])

    useEffect(() => {
        register('billPrice');
    }, [register]);

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

    const submitForm = async (data) => {
        const newClient = {
            name: data.name,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            date: data.date ? formatISO(data.date) : null,
            userApply: userApply,
            billPrice: data.billPrice.replace(/[.,đd]/g, ''),
            pathologicalGroup: data.pathologicalGroup,
            clientNote: data.clientNote,
            show: true
        };

        const respone = await getUserData(data.phoneNumber, 'client');

        const userData = respone.data.response[0]

        if(userData.name) {
            userData.totalCost = parseFloat(userData.totalCost || 0);
            newClient.billPrice = parseFloat(newClient.billPrice || 0);
            userData.totalCost += newClient.billPrice;
            const { id,...userDataWithoutId } = userData;
            await updateRow(userData.id, userDataWithoutId, 'client');        
            await createData(newClient, table);
        } else {
            userData.name = newClient.name;
            userData.totalCost = newClient.billPrice;
            userData.firstDate = newClient.date;
            userData.point = 0;
            const { id, ...userDataWithoutId } = userData;
            await updateRow(userData.id, userDataWithoutId, 'client');        
            await createData(newClient, table);
        }

        // await sendTemplate(accessToken, newClient.phoneNumber, 'ChuaSendCode', newClient.date, newClient.billPrice, newClient.name);
        reset();
        setSelectedClients([]);
        setUserApply([]);
        console.log("RUn here")
        getData();
        onClose();
    };

    const clientOptions = ["Trẻ nhỏ", "Vị thành niên", "Thanh niên", "Trung niên", "Người già"];

    const formatNumberWithCommas = (value) => {
        const numericValue = value.replace(/\D/g, '');
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleBillPriceChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatNumberWithCommas(value);
        setFormattedBillPrice(formattedValue);
        setValue('billPrice', value);
    };

    return (
        <div className="new-item-form-container">
            <div className="new-item-form">
                <h2>Thông tin khách hàng</h2>
                <form onSubmit={handleSubmit(submitForm)}>
                    <label>Tên:</label>
                    <input type="text" {...register('name', { required: true })} />
                    {errors.name && <span className="error">Hãy nhập tên khách hàng</span>}

                    <label>Số điện thoại:</label>
                    <input
                        type="number"
                        {...register('phoneNumber', {
                            required: true,
                            pattern: /^[0-9]*$/,
                            maxLength: 10
                        })}
                    />
                    {errors.phoneNumber && <span className="error">Hãy nhập số điện thoại mua hàng</span>}

                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: '70%' }}>
                            <label>Ngày:</label>
                            <Controller
                                control={control}
                                name="date"
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Select date"
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        dateFormat="dd/MM/yyyy"
                                        style={{ width: '100%' }}
                                    />
                                )}
                            />
                        </div>
                        <div style={{ flex: '30%', paddingLeft: '10px' }}>
                            <label>Giới tính:</label>
                            <select {...register('gender', { required: true })} style={{ width: '100%' }}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                    </div>

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

                    <label>Giá trị đơn hàng:</label>
                    <input
                        type="text"
                        className="billPrice-input"
                        value={formattedBillPrice}
                        onChange={handleBillPriceChange}
                    />
                    <span>đ</span>
                    {errors.billPrice && <span className="error">Hãy nhập giá trị đơn hàng</span>}

                    <label>Nhóm bệnh lý:</label>
                    <textarea {...register('pathologicalGroup', { required: false })} rows={4} />

                    <label>Tin nhắn cho người mua:</label>
                    <textarea {...register('clientNote', { required: false })} rows={4} />

                    <div className="form-buttons">
                        <button type="submit">Lưu</button>
                        <button type="button" onClick={onClose}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewInfoForm;