import React from "react";

function Product({
  product,
  addToCart,
  cartItems,
  increaseQuantity,
  decreaseQuantity
}) {
  const cartItem = cartItems.find(item => item.id === product.id);

  return (
    <li className="product-card">
      <div className="product-content">
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price} ₽</p>
      </div>

      <div className="product-actions">
        {cartItem ? (
        <div className="quantity-controls">
          <button onClick={() => decreaseQuantity(product.id)}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => increaseQuantity(product.id)}>+</button>
      </div>
      ) : (
      <button onClick={() => addToCart(product)}>
        Добавить в корзину
      </button>
      )}
      </div>
    </li>
  );
}

export default Product;
