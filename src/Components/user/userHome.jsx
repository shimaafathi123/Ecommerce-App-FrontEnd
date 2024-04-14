import UserNavbar from './userNavbar';
import { Container, Row, Col } from 'react-bootstrap'; // Import Container, Row, Col from react-bootstrap
import '../Home/Home.css'; // Import custom CSS for Home component

// Define the Home component
function UserHome() {
  return (
    <div className="home-background">
      <UserNavbar />
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="welcome-section">
              <h1>Welcome to FASHMART</h1>
              <p>
              Welcome to our website! Here, you'll discover a diverse range of products spanning various categories such as fashion, electronics, books, and more. Whether you're shopping for yourself, your family, or friends, we cater to different genders and ages, ensuring there's something for everyone.

With our seamless checkout process, you can conveniently use your credit card to purchase your desired items. Plus, with our swift delivery service, your orders will be delivered right to your doorstep in less than three days.

Thank you for choosing us for your shopping needs. Happy shopping!              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div className="about-section">
              <h2>About Us</h2>
              <p>
              We are four girls: Fatma, Shimaa, Alaa, and Mona, the founders of this website. As friends, we embarked on this journey together, fueled by our passion for providing an exceptional online shopping experience.

Our aspiration is for our website to resonate with you, our valued customers. Just like us, we want it to be welcoming, intuitive, and filled with delightful surprises.

Thank you for joining us on this adventure. Together, let's make our website a place you love to visit and explore!              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserHome;
