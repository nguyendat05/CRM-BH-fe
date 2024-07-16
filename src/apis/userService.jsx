import instance from "./axiosInterceptors";

const baseURL = import.meta.env.VITE_BASE_URL;

export const getCurrentUserLogin = async () => {
  try {
    const { data } = await instance.get(`${baseURL}/profile`);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await instance.post(`${baseURL}/logout`);
    localStorage.removeItem("appState");
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
    throw error;
  }
};

export const changeSchema = async (newSchema) => {
  try {
    const { data } = await instance.post(`${baseURL}/change-schema`, { newSchema });
    return data;
  } catch (error) {
    console.error("Lỗi khi thay đổi schema:", error);
    throw error;
  }
};
