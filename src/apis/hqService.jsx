import instance from "./axiosInterceptors";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api/hq`;

export const getHqCountData = (dateRange) =>
	new Promise(async (resolve, reject) => {
		try {
			let response = await instance.get(`${baseURL}/${dateRange}`);
			resolve(response.data);
		} catch (error) {
			toast.error("Axios error:", error);
			reject(error);
		}
	});