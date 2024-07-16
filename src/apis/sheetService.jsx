import instance from "./axiosInterceptors";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api/sheet`;

export const getAllData = (table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await instance.get(`${baseURL}/${table}`);
			resolve(response.data.response);
		} catch (error) {
			toast.error("Axios error:", error);
			reject(error);
		}
	});

export const getValueData = (column, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await instance.get(`${baseURL}/${table}/${column}`);
			resolve(response);
		} catch (error) {
			toast.error("Axios error:", error);
			reject(error);
		}
	});

export const getUserData = (phoneNumber, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await instance.get(`${baseURL}/price/${table}/${phoneNumber}`);
			resolve(response);
		} catch (error) {
			toast.error("Axios error:", error);
			reject(error);
		}
	});

export const createNewRow = (newRowData, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let data = { newRowData, table };
			let response = await instance.post(baseURL, data);
			resolve(response);
		} catch (error) {
			reject(error);
		}
	});

export const updateRowData = (id, updatedData, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await instance.put(
				`${baseURL}/${id}/${table}`,
				updatedData
			);
			resolve(response);
		} catch (error) {
			reject(error);
		}
	});

export const hideRowData = (id, table) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await instance.delete(`${baseURL}/${id}/${table}`);
			resolve(response);
		} catch (error) {
			reject(error);
		}
	});

export const getTableNames = () =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await instance.get(`${baseURL}/table-names`);
			resolve(response.data);
		} catch (error) {
			toast.error("Axios error:", error);
			reject(error);
		}
	});

export const getReportData = (table, dateRange) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await instance.get(`${baseURL}/report/${table}/${dateRange}`);
			resolve(response.data);
		} catch (error) {
			toast.error("Axios error:", error);
			reject(error);
		}
	})


