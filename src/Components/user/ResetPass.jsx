import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetpassword } from '../../store/profileSlice';
import { useNavigate } from 'react-router-dom'; 
import { Container ,Form, Button, Alert } from 'react-bootstrap';  

const ResetPass = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        old_password: '',
        new_password1: '',
        new_password2: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { new_password1, new_password2 } = formData;  
        if (new_password1 !== new_password2) { 
            setError('New password and confirm password do not match.');
            return;
        }
        console.log(formData)
        dispatch(resetpassword(formData))
        .then(() => {
            localStorage.removeItem('token');
            navigate('/login');
          })
        
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
        <Form.Group className='mb-3' controlId="old_password">
            <Form.Label>Old Password:</Form.Label>
            <Form.Control type="password" name="old_password" value={formData.old_password} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className='mb-3' controlId="new_password1">
            <Form.Label>New Password:</Form.Label>
            <Form.Control type="password" name="new_password1" value={formData.new_password1} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className='mb-3' controlId="new_password2">
            <Form.Label>Confirm New Password:</Form.Label>
            <Form.Control type="password" name="new_password2" value={formData.new_password2} onChange={handleChange} required />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">Change Password</Button>
    </Form>


    </div>
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

export default ResetPass;
