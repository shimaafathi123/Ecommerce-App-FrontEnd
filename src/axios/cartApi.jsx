import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';

export async function fetchCart() {
  const response = await axios.get(`${BASE_URL}/cart/`);
  return response.data;
}

export async function removeFromCart(productId) {
  await axios.delete(`${BASE_URL}/cart/item/${productId}/`);
}

export async function increaseItemQuantity(productId) {
  await axios.patch(`${BASE_URL}/cart/item/${productId}/increase/`);
}

export async function decreaseItemQuantity(productId) {
  await axios.patch(`${BASE_URL}/cart/item/${productId}/decrease/`);
}

const interceptorInstance = axios.create({
  baseURL: BASE_URL,
  // You can add other configurations here
});

export default interceptorInstance;