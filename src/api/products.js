import axiosInstance from '../axiosInstance';

const API = process.env.REACT_APP_API_BASE_URL;


// Получаем список товаров
export const getProducts = async (page = 1) => {
  const response = await axiosInstance.get(`${API}/products/?page=${page}`);

  return {
    results: response.data.results,
    count: response.data.count,
    nextPage: response.data.next,
    prevPage: response.data.previous,
  };
};