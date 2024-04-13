import   { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/loginSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          console.log(response.payload.access)
          localStorage.setItem('token', response.payload.access);
          navigate('/home');
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
    <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
    <div className="container">
      <section className="">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-5 col-md-8">
            <div className="card rounded-5">
              <div className="card-body p-4">
                <h3 className="text-center">Login</h3>
                <br />
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="pills-login"
                    role="tabpanel"
                    aria-labelledby="tab-login"
                  >



      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control className='w-100' type="email" name="email" value={formData.email} onChange={handleChange} />
          {formErrors.email && <Alert variant="danger">{formErrors.email}</Alert>}
        </Form.Group>

        <Form.Group className='mb-3' controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control  className='w-100' type="password" name="password" value={formData.password} onChange={handleChange} />
          {formErrors.password && <Alert variant="danger">{formErrors.password}</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>



      </div>
      </div>
      <div className="text-center">
        <p className='mt-4'>
          do not have an account? <Link to="/register">Register</Link>
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

export default Login;
