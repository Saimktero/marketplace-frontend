import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Catalog from './pages/Catalog';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import MyOrders from './components/MyOrders'
import Products from './pages/Products'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './axiosInstance';

const API = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [productsData, setProductsData] = useState({ results: [], count: 0, next: null, previous: null });
  const DEFAULT_PAGE_SIZE = 12;
  const [reloadOrders, setReloadOrders] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  async function handleCheckout() {
    try {
      const orderData = {
        items: cartItems.map(item =>  ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      const response = await axiosInstance.post(`${API}/orders/`, orderData);

      if (response.status === 201) {
        toast.success('Заказ успешно создан');
        setCartItems([]);
        setReloadOrders(prev => !prev);
      } else {
        toast.success('Ошибка при оформлении заказа');
      }

    } catch (error) {
      console.error('Ошибка при оформлении заказа', error);
      toast.error('Ошибка при оформлении заказа');
    }
  }

    function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === product.id
            ?  { ...item, quantity: item.quantity + 1}
            : item
        )
      );
    } else {
      setCartItems(prevItems => [ ...prevItems, { ...product, quantity: 1 }]);
    }
  }

  const loadPage = async (page = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    try {
      const url = `${API}/products/?page=${page}&page_size=${pageSize}`;
      const { data } = await axiosInstance.get(url);
      // Оставляем полный объект DRF: { count, results, next, previous, ... }
      setProductsData(data);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    }
  };

  useEffect(() => {
    loadPage(1, DEFAULT_PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Router>
      <NavBar />
      <div>
        <header>
          <h1>Маркетплейс</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/login" element={<Login loadProducts={() => loadPage(1)} />} />
            <Route
              path="/products"
              element={
                 <Products
                  products={productsData}
                  addToCart={addToCart}
                  loadPage={loadPage}
                />
              }
            />
            <Route path='/cart' element={<Cart cartItems={cartItems} handleCheckout={handleCheckout} />} />
            <Route path='/my-orders' element={<MyOrders reloadTrigger={reloadOrders} />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2025 Онлайн-маркетплейс</p>
        </footer>
      </div>
      <ToastContainer position='top-right' autoClose={3000} />
    </Router>
  );
}

export default App;

