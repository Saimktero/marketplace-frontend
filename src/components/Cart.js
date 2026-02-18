function Cart({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  handleCheckout
}) {

  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
   <div className="cart-container">
  <h2>Корзина</h2>

  {cartItems.length === 0 ? (
    <p>Ваша корзина пуста.</p>
  ) : (
    <>
      <div className="cart-header">
        <span>Товар</span>
        <span>Цена</span>
        <span>Количество</span>
        <span>Сумма</span>
        <span></span>
      </div>

      {cartItems.map(item => (
        <div key={item.id} className="cart-row">
          <span>{item.name}</span>
          <span>{item.price} ₽</span>

          <div className="quantity-controls">
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>

          <span>{item.price * item.quantity} ₽</span>

          <button
            className="remove-btn"
            onClick={() => removeItem(item.id)}
          >
            Удалить
          </button>
        </div>
      ))}

      <div className="cart-total">
        Общая сумма: {totalSum} ₽
      </div>

      <button
        className="checkout-btn"
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        Оформить заказ
      </button>
    </>
  )}
</div>
  );
}

export default Cart;