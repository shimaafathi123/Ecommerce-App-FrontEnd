import  { useState, useEffect } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';
import ProductList from '../ProductList/productList';
import CategoryProductList from '../ProductList/CategoryProductList';
import './category.css';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [products, setProducts] = useState([]);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state

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
        if (selectedCategoryId !== null) {
            const fetchProductsByCategory = async () => {
                try {
                    let apiUrl = `http://127.0.0.1:8000/products/category/${selectedCategoryId}/`;
                    const response = await axios.get(apiUrl);
                    setProducts(response.data);
                    setLoading(false); // Update loading state
                } catch (error) {
                    console.error('Error fetching products by category:', error);
                }
            };

            fetchProductsByCategory();
        }
    }, [selectedCategoryId]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setShowAllProducts(false);
        setLoading(true); // Set loading to true when a category is selected
    };

    const handleShowAllProducts = () => {
        setSelectedCategoryId(null);
        setShowAllProducts(true);
        setLoading(false); // Set loading to false when all products are displayed
    };

    return (
        <div className="category-container">
            <NavDropdown title="Categories" id="basic-nav-dropdown" className="text-white">
                <NavDropdown.Item key={null} onClick={handleShowAllProducts}>
                    All
                </NavDropdown.Item>
                {categories.map(category => (
                    <NavDropdown.Item key={category.id} onClick={() => handleCategorySelect(category.id)}>
                        {category.name}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
            <div className="category-content">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {!showAllProducts && selectedCategoryId !== null && (
                            <CategoryProductList categoryId={selectedCategoryId} />
                        )}
                        {showAllProducts && (
                            <ProductList products={products} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Category;
