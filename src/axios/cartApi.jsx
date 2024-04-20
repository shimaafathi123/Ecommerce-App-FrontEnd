import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';



const BASE_URL = 'https://ecommerce-app-backend-ol18.onrender.com';

// useState {cart_items}
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
    const response = await axios.delete(`${BASE_URL}/cart/delete-cart-item/${productId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data);
    
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
}

export async function increaseItemQuantity(cartItemId, productId, token) {
   token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
    return;
  }
  try {
    const x= { action: 'INCREASE',product: productId };
console.log(x);
    const response = await axios.put(
      `${BASE_URL}/cart/update-cart/${cartItemId}/`,
      { action: 'INCREASE',product: productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error increasing item quantity:', error);
    throw error;
  }
}

export async function decreaseItemQuantity(cartItemId, productId, token) {
   token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
    return;
  }
  try {
    const response = await axios.put(
      `${BASE_URL}/cart/update-cart/${cartItemId}/`,
      { action: 'DECREASE',product: productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
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