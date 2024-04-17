import axios from 'axios';

const BASE_URL = 'https://ecommerce-app-backend-ol18.onrender.com';

let jwtDecodePromise = import('jwt-decode');
let jwtDecode;

jwtDecodePromise
  .then((module) => {
    jwtDecode = module.default;
  })
  .catch((error) => {
    console.error('Error loading jwt-decode:', error);
  });

export async function fetchCart() {
  if (!jwtDecode) {
    console.error('jwt-decode is not loaded yet');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
    return;
  }

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user_id;

  try {
    const response = await axios.get(`${BASE_URL}/cart/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

export async function removeFromCart(productId) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
    return;
  }

  try {
    await axios.delete(`${BASE_URL}/cart/delete-cart-item/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
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