import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <img src={product.image} alt={product.name} />
                        <p>{product.description}</p>
                        <p>Price: {product.price}$</p>
                        <p>Rating: {product.rating}</p>
                        <p>Quantity: {product.quantity}</p> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
