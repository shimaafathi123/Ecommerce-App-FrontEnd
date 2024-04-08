import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavDropdown } from 'react-bootstrap';

const Category = () => {
    const [categories, setCategories] = useState([]);

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

    return (
        <NavDropdown title="Categories" id="basic-nav-dropdown" className="text-white">
            {categories.map(category => (
                <NavDropdown.Item key={category.id}>{category.name}</NavDropdown.Item>
            ))}
        </NavDropdown>
    );
};

export default Category;
