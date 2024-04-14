import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export async function fetchCart(userId, token) {
  userId = localStorage.getItem('token'.userId)
  const response = await axios.get(`${BASE_URL}/cart/cart/${userId}`, {
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