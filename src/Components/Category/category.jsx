import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';
import ProductList from '../ProductList/productList';
import CategoryProductList from '../productBycat/CategoryProductList';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State to store selected category ID
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
                    apiUrl += `category/${selectedCategoryId}/`; // Include category ID in the URL path
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
        <div>
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
            {selectedCategoryId === null ? (
                <ProductList products={products} />
            ) : (
                <CategoryProductList categoryId={selectedCategoryId} products={products} />
            )}
        </div>
    );
};

export default Category;
