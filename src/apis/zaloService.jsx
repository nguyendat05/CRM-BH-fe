import instance from "./axiosInterceptors";
import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BASE_URL}/api/zalo`;
const baseURLV3 = `https://openapi.zalo.me/v3.0/oa`;
const baseURLV4 = `https://oauth.zaloapp.com/v4/oa`;

import.meta.env.VITE_APP_ID;
import.meta.env.VITE_ZALO_TEMPLATE_ID;

export const getZaloData = () =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await instance.get(`${baseURL}`);
            resolve(response.data.response);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin Zalo:", error);
            reject(error);
        }
    })

export const getAccessToken = (refreshToken) =>
    new Promise(async (resolve, reject) => {
        try {

            resolve(response.data);
        } catch (error) {
            toast.error("Axios error:", error);
            reject(error);
        }
    });

export const sendTemplate = (accessToken, phone, order_code, date, price, name) =>
    new Promise(async (resolve, reject) => {
        try {
            const formattedPhone = formatPhoneNumber(phone);
            const [year, month, day] = date.split('T')[0].split('-');
            const formattedDate = `${day}/${month}/${year}`;
            const body = {
                phone: formattedPhone,
                template_id: import.meta.env.VITE_ZALO_TEMPLATE_ID,
                template_data: {
                    order_code: order_code,
                    date: formattedDate,
                    price: price,
                    name: name,
                    phone_number: phone,
                },
            };
            const url = `https://business.openapi.zalo.me/message/template`;
            const response = await axios.post(url, body, {
                headers: {
                    access_token: accessToken,
                },
            });

            resolve(response.data);
        } catch (error) {
            console.error(error)
            reject(error);
        }
    });

function formatPhoneNumber(phone) {
    const formattedPhone = '84' + phone.slice(1);

    return formattedPhone;
}