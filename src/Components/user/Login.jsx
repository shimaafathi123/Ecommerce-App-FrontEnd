import   { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/loginSlice';

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear previous error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(formData))
      .then((response) => {
        if(response.payload.access!=undefined){
          localStorage.setItem('token', response.payload.access);
        }
      })
    }
  };

  const validateForm = () => {
    let isValid = true;

    const errors = {
      email: formData.email.trim() ? (/^\S+@\S+\.\S+$/.test(formData.email) ? '' : 'Email should be in email format') : 'Email is required',
      password: formData.password ? '' : 'Password is required',
    };

    setFormErrors(errors);

    for (const error in errors) {
      if (errors[error]) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  return (
    <Container>
      <h3>Login Page</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          {formErrors.email && <Alert variant="danger">{formErrors.email}</Alert>}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
          {formErrors.password && <Alert variant="danger">{formErrors.password}</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
