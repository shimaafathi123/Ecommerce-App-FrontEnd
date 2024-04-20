import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import Category from '../Category/category';
import   { useState } from 'react';
//import Search from './Search'
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';

function CustomNavbar() {

  const [query, setQuery] = useState('');
  const navigate = useNavigate();  

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/search/?query=${query}`);
      const results = response.data.results;
       
      navigate('/search', { state: { query, results } });
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
  return (
    <NavbarBootstrap expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <NavbarBootstrap.Brand href="/" className="text-white">
          FASHMART
        </NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBootstrap.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link href="/login" className="text-white">Sign in</Nav.Link>

            {/* Replace NavDropdown with Category component */}
            <Category />
          </Nav>
          <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
           value={query} 
           onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="outline-success" onClick={handleSearch}>Search</Button>
        </Form>
          
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
}

export default CustomNavbar;
