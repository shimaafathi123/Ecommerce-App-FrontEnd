import axios from 'axios';
import axiosInstance from './axiosInstance'

const BASE_URL = 'https://ecommerce-app-backend-ol18.onrender.com';

export async function fetchCart(token) {
    try {
        const response = await axios.get(`${BASE_URL}/cart/cart/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
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
    await axios.delete(`${BASE_URL}/cart/delete-cart-item/${productId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}

export async function increaseItemQuantity(cartItemId, productId) {
  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) {
    console.error('Token not found');
    return;
  }

  try {
    await axios.put(`${BASE_URL}/cart/update-cart/${cartItemId}/`, { action: 'INCREMENT', productId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error increasing item quantity:', error);
    throw error;
  }
}

export async function decreaseItemQuantity(cartItemId, productId) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
    return;
  }

  try {
    await axios.put(`${BASE_URL}/cart/update-cart/${cartItemId}/`, { action: 'DECREMENT', productId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error decreasing item quantity:', error);
    throw error;
  }
}




export async function payment(token) {
  token = localStorage.getItem(token)
   await axios.post(`${BASE_URL}/orders/checkout/`),
  { headers: 
    {
    Authorization: `Bearer ${token}`,
  },};
}
const interceptorInstance = axios.create({
  baseURL: BASE_URL,
  // You can add other configurations here
});
const token = localStorage.getItem('token')
export default interceptorInstance;