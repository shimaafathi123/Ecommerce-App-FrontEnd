// Category.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';
import ProductList from '../ProductList/productList';
import CategoryProductList from '../ProductList/CategoryProductList';
import './category.css'; // Import a CSS file specifically for styling the Category component

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let apiUrl = 'http://127.0.0.1:8000/products/';
                if (selectedCategoryId) {
                    apiUrl += `category/${selectedCategoryId}/`;
                }

                const response = await axios.get(apiUrl);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [selectedCategoryId]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    return (
        <div className="category-container">
            <NavDropdown title="Categories" id="basic-nav-dropdown" className="text-white">
                <NavDropdown.Item key={null} onClick={() => handleCategorySelect(null)}>
                    All
                </NavDropdown.Item>
                {categories.map(category => (
                    <NavDropdown.Item key={category.id} onClick={() => handleCategorySelect(category.id)}>
                        {category.name}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
            <div className="category-content">
                {selectedCategoryId === null ? (
                    <ProductList products={products} />
                ) : (
                    <CategoryProductList categoryId={selectedCategoryId} products={products} />
                )}
            </div>
        </div>
    );
};

export default Category;
