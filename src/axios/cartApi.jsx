import axios from 'axios';

const BASE_URL = 'https://ecommerce-app-backend-ol18.onrender.com';
let jwtDecode;

import('jwt-decode')
  .then((module) => {
    jwtDecode = module.default;
  })
  .catch((error) => {
    console.error('Error loading jwt-decode:', error);
  });

export async function fetchCart(id, token) {
  if (!jwtDecode) {
    console.error('jwt-decode is not loaded yet');
    return;
  }

  token = localStorage.getItem('token');
  id = jwtDecode(token).user_id;
  console.log(id);
  const response = await axios.get(`${BASE_URL}/cart/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
export async function removeFromCart(productId,token) {
  await axios.delete(`${BASE_URL}/cart/delete-cart-item/${productId}/`),{ headers: {
    Authorization: `Bearer ${token}`,
  },};
}

export async function increaseItemQuantity(productId,token) {
  await axios.patch(`${BASE_URL}/cart/update-cart/${productId}/`),{ headers: {
    Authorization: `Bearer ${token}`,
  },};
}

export async function decreaseItemQuantity(productId,token) {
  await axios.patch(`${BASE_URL}/cart/update-cart/${productId}/`),{ headers: {
    Authorization: `Bearer ${token}`,
  },};
}
export async function payment(token) {
  token = localStorage.getItem(token)
  await axios.patch(`${BASE_URL}/orders/checkout`),{ headers: {
    Authorization: `Bearer ${token}`,
  },};
}
const interceptorInstance = axios.create({
  baseURL: BASE_URL,
  // You can add other configurations here
});
const token = localStorage.getItem('token')
export default interceptorInstance;