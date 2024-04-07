import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBRipple } from 'mdb-react-ui-kit';

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

    const renderProducts = () => {
        const rows = [];

        products.forEach((product, index) => {
            rows.push(
                <MDBCol key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <MDBCard className="h-100">
                        <MDBRipple rippleColor="light" rippleTag="div" className="bg-image rounded hover-zoom">
                            <MDBCardImage variant="top" src={product.image} alt={product.name} fluid style={{ maxHeight: '200px', objectFit: 'cover' }} />
                        </MDBRipple>
                        <MDBCardBody className="d-flex flex-column">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text">Price: {product.price}$</p>
                            <p className="card-text">Rating: {product.rating}</p>
                            <p className="card-text">Quantity: {product.quantity}</p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            );
        });

        return rows;
    };

    return (
        <MDBContainer fluid className="my-5 text-center">
            <h1 className="text-center mb-4">Product List</h1>
            <MDBRow className="g-4">{renderProducts()}</MDBRow>
        </MDBContainer>
    );
};

export default ProductList;
