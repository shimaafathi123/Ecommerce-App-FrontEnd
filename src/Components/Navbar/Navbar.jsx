import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import'./Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

import Category from '../Category/category';

function CustomNavbar() {
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
          <Nav.Link href="#link" className="text-white">Sign in</Nav.Link>
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
          <Nav.Link href="#cart" className="text-white">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Nav.Link>
          <Nav.Link href="#wishlist" className="text-white">
            <FontAwesomeIcon icon={faHeart} />
          </Nav.Link>
        </Nav>
      </NavbarBootstrap.Collapse>
    </Container>
  </NavbarBootstrap>
);
}


export default CustomNavbar;
