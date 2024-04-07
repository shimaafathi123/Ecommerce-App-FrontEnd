 

import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/registerSlice';

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  });

  const [formErrors, setFormErrors] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(registerUser(formData))
      .then((response) => {
        console.log(response)
        if(response.payload.access!=undefined){
          localStorage.setItem('token', response.payload.access);
        }
         
      })
    }
  };

  const validateForm = () => {
    let isValid = true;

    const errors = {
      full_name: formData.full_name.trim() ? '' : 'Full Name is required',
      email: formData.email.trim() ? (/^\S+@\S+\.\S+$/.test(formData.email) ? '' : 'Email should be in email format') : 'Email is required',
      phone: formData.phone.trim() ? '' : 'Phone is required',
      password: formData.password.length >= 8 && formData.password.length <= 12 ? '' : 'Password should be between 8 and 12 characters',
      password2: formData.password2 === formData.password ? '' : 'Passwords do not match',
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
      <h3>Register Page</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="full_name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
          {formErrors.full_name && <Alert variant="danger">{formErrors.full_name}</Alert>}
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          {formErrors.email && <Alert variant="danger">{formErrors.email}</Alert>}
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
          {formErrors.phone && <Alert variant="danger">{formErrors.phone}</Alert>}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
          {formErrors.password && <Alert variant="danger">{formErrors.password}</Alert>}
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" name="password2" value={formData.password2} onChange={handleChange} />
          {formErrors.password2 && <Alert variant="danger">{formErrors.password2}</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
