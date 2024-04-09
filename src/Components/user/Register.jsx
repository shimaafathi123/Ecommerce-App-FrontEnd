 

import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/registerSlice';
import { Link } from 'react-router-dom';

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

    <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
    <div className="container">
      <section className="">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-5 col-md-8">
            <div className="card rounded-5">
              <div className="card-body p-4">
                <h3 className="text-center">Register</h3>
                <br />
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="pills-login"
                    role="tabpanel"
                    aria-labelledby="tab-login"
                  >


 
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId="full_name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control className='w-100' type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
          {formErrors.full_name && <Alert variant="danger">{formErrors.full_name}</Alert>}
        </Form.Group>

        <Form.Group className='mb-3' controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control className='w-100' type="email" name="email" value={formData.email} onChange={handleChange} />
          {formErrors.email && <Alert variant="danger">{formErrors.email}</Alert>}
        </Form.Group>

        <Form.Group className='mb-3' controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control className='w-100' type="text" name="phone" value={formData.phone} onChange={handleChange} />
          {formErrors.phone && <Alert variant="danger">{formErrors.phone}</Alert>}
        </Form.Group>

        <Form.Group className='mb-3' controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control className='w-100' type="password" name="password" value={formData.password} onChange={handleChange} />
          {formErrors.password && <Alert variant="danger">{formErrors.password}</Alert>}
        </Form.Group>

        <Form.Group className='mb-3' controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control className='w-100' type="password" name="password2" value={formData.password2} onChange={handleChange} />
          {formErrors.password2 && <Alert variant="danger">{formErrors.password2}</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>


      
      </div>
      </div>
      <div className="text-center">
        <p className='mt-4'>
          do you have an account? <Link to="/login">Login</Link>
        </p>
       
      </div>
    </div>
  </div>
</div>
</div>
</section>
</div>
</main>
    </Container>
  );
};

export default Register;
