import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import Category from '../Category/category';
import '../Navbar/Navbar.css';

function UserNavbar() {
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
            <Category />
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav>
            <Nav.Link href="/profile" className="text-white"> {/* Link to user profile */}
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
            <Nav.Link href="/cart" className="text-white">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Nav.Link>
            <Nav.Link href="/wishlist" className="text-white">
              <FontAwesomeIcon icon={faHeart} />
            </Nav.Link>
          </Nav>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
}

export default UserNavbar;