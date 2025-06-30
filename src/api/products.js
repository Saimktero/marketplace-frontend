import axiosInstance from '../axiosInstance';

const API = process.env.REACT_APP_API_BASE_URL;


// Получаем список товаров
export const getProducts = async (page = 1) => {
  const response = await axiosInstance.get(`${API}/products/?page=${page}`);

  // Достаём нужные данные из ответа
  const { count, next, previous, results } = response.data;

  // Возвращаем красивый объект
  return {
    products: results,
    count: count,
    nextPage: next,
    prevPage: previous,
  };
};