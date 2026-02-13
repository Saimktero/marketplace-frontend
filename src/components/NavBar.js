import { useNavigate, NavLink } from 'react-router-dom';

function NavBar({ cartItems }) {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access');
  const handeLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };
  const totalCount = cartItems.reduce(
  (sum, item) => sum + item.quantity,
  0
  );

  return (
    <nav>
      <div className="nav-left">

        <NavLink to='/' end className={({ isActive }) => isActive && "active"}>
          Главная
        </NavLink>

        <NavLink to="/products" className={({ isActive }) => isActive && "active"}>
          Каталог
        </NavLink>

        <NavLink to='/cart' className={({ isActive }) => isActive && "active"}>
          Корзина 
          {totalCount > 0 && (
            <span className="cart-badge">{totalCount}</span>
          )}
        </NavLink>

      </div>

      <div className="nav-right">
        {isAuthenticated ? (
        <>
          <NavLink to='/my-orders' className={({ isActive }) => isActive && "active"}>
            Мои заказы
          </NavLink>
          <button onClick={handeLogout}>Выйти</button>
        </>
        ) : (
          <NavLink to='/login' className={({ isActive }) => isActive && "active"}>
            Войти
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;