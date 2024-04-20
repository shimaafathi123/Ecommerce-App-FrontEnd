import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './category.css';

const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://ecommerce-app-backend-ol18.onrender.com/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="category-container">
            <NavDropdown title="Categories" id="basic-nav-dropdown" className="text-white">
                <NavDropdown.Item as={Link} to="/user/all">
                    All
                </NavDropdown.Item>
                {categories.map(category => (
                    <NavDropdown.Item key={category.id} as={Link} to={`/user/category/${category.id}`}>
                        {category.name}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        </div>
    );
};

export default Category;
