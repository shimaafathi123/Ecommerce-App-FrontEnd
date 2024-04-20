
import { useLocation } from 'react-router-dom';
import { Card,  Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const {  results } = location.state; // Access query and results from location state

  return (
    
    <Container className="mt-5">
    <h1 className="display-4 text-center my-4">Search Results</h1>
      <Row>
        {results.map((result) => (
          <Col md={4} key={result.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{result.name}</Card.Title>
                 
                <Link to={`/products/${result.id}`} className="btn btn-primary">Go To Details</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

  );
}

export default Search;
