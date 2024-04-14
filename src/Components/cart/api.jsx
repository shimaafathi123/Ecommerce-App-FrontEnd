// api.js

const API_BASE_URL = 'http://127.0.0.1:8000/cart/';

export const addToCart = async (productId,token, quantity = 1) => {
  const response = await fetch(`${API_BASE_URL}add-to-cart/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      product_id: productId,
      quantity: quantity,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateCartItem = async (itemId,token, quantity) => {
  const response = await fetch(`${API_BASE_URL}update-cart/${itemId}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  });
  const data = await response.json();
  return data;
};

export const fetchCartDetail = async (cartId, token) => {
    const response = await fetch(`${API_BASE_URL}cart/${cartId}/`, {
      method: 'GET', // Use GET method to fetch cart details
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
  return data;
};
export const deleteCartItem = async (itemId,token) => {
  const response = await fetch(`${API_BASE_URL}delete-cart-item/${itemId}/`, {
    method: 'POST',
    hraders:{
        'Authorization': `Bearer ${token}`,
    }
  });
  const data = await response.json();
  return data;
};
