import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
 
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../../store/profileSlice';

 

 

const Profile = () => {
  const dispatch = useDispatch();
 
 
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const userProfile= useSelector((state) => state.profile)
   
   

  const [formData, setFormData] = useState({
    image: null,
    full_name: '',
    email: '',
    phone: '',
    about: '',
    gender: '',
    country: '',
    city: '',
    state: '',
    address: '',
    
    newPassword: '',
    confirmPassword: '',
  });

   
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        about: userProfile.about || '',
        gender: userProfile.gender || '',
        country: userProfile.country || '',
        city: userProfile.city || '',
        state: userProfile.state || '',
        address: userProfile.address || '',
        image: null,
      });
    }
  }, [userProfile]);


  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
   

  const handleChange = (e) => {
     
        setFormData({ ...formData, [e.target.name]: e.target.value });
      
  };


  //-----------------------------------------------
 {/**const handleImageChange = async (e) => {
    console.log('file is uploading');
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setFormData({ ...formData, image: selectedImage, imageUrl: imageUrl });
  }; */} 
   
//------------------------------------------------------------------

 

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate full name
    if (!formData.full_name.trim()) {
      errors.full_name = 'Full Name is required';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email should be in email format';
      isValid = false;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
      isValid = false;
    }

    // Validate about
    if (!formData.about.trim()) {
      errors.about = 'About is required';
      isValid = false;
    }

    // Validate gender
    if (!formData.gender) {
      errors.gender = 'Gender is required';
      isValid = false;
    }

    // Validate country
    if (!formData.country) {
      errors.country = 'Country is required';
      isValid = false;
    }

    // Validate city
    if (!formData.city.trim()) {
      errors.city = 'City is required';
      isValid = false;
    }

    // Validate state
    if (!formData.state.trim()) {
      errors.state = 'State is required';
      isValid = false;
    }

    // Validate address
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    }
 

    // Validate new password
    if (formData.newPassword && (formData.newPassword.length < 8 || formData.newPassword.length > 12)) {
      errors.newPassword = 'Password should be between 8 and 12 characters';
      isValid = false;
    }

    // Validate confirm password
    if (formData.confirmPassword !== formData.newPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validateForm()) {
      dispatch(updateProfile(formData))
        .then(() => {
          setIsSubmitting(false);
          setShowAlert(false); 
        
        })
        .catch((error) => {
          setIsSubmitting(false);
          setShowAlert(true);
          setFormErrors(error.payload);
        });
    } else {
      setIsSubmitting(false);
      setShowAlert(true);
    }
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
                <h3 className="text-center">edit your info</h3>
                <br />
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="pills-login"
                    role="tabpanel"
                    aria-labelledby="tab-login"
                  >


       
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Please fix the errors before submitting the form.
        </Alert>
      )}

        <Form onSubmit={handleSubmit} method="post" enctype="multipart/form-data" >
      
      {/*image
      <Form.Group className='mb-3' controlId="formFile">
      <Form.Label >Profile Image</Form.Label>
      <Form.Control className='w-100' type="file" name="image" accept="image/*"  onChange={handleImageChange}  />
          
    </Form.Group> 
    */}
    
        {/* Full Name */}
        <Form.Group className='mb-3' controlId="full_name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
          className='w-100'
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            isInvalid={!!formErrors.full_name}
          />
          <Form.Control.Feedback type="invalid">{formErrors.full_name}</Form.Control.Feedback>

        </Form.Group>

        {/* Email */}
        <Form.Group className='mb-3' controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
          className='w-100'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!formErrors.email}
          />
          <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
        </Form.Group>

        {/* Phone */}
        <Form.Group className='mb-3' controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
          className='w-100'
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!formErrors.phone}
          />
          <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
        </Form.Group>

        {/* About */}
        <Form.Group className='mb-3' controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control
          className='w-100'
            as="textarea"
            name="about"
            value={formData.about}
            onChange={handleChange}
            isInvalid={!!formErrors.about}
          />
          <Form.Control.Feedback type="invalid">{formErrors.about}</Form.Control.Feedback>
        </Form.Group>

        {/* Gender */}
        <Form.Group className='mb-3' controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
          className='w-100'
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            isInvalid={!!formErrors.gender}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formErrors.gender}</Form.Control.Feedback>
        </Form.Group>

        {/* Country */}
        <Form.Group className='mb-3' controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
          className='w-100'
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            isInvalid={!!formErrors.country}
          />
          <Form.Control.Feedback type="invalid">{formErrors.country}</Form.Control.Feedback>
        </Form.Group>

        {/* City */}
        <Form.Group className='mb-3' controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
          className='w-100'
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            isInvalid={!!formErrors.city}
          />
          <Form.Control.Feedback type="invalid">{formErrors.city}</Form.Control.Feedback>
        </Form.Group>

        {/* State */}
        <Form.Group className='mb-3' controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
          className='w-100'
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            isInvalid={!!formErrors.state}
          />
          <Form.Control.Feedback type="invalid">{formErrors.state}</Form.Control.Feedback>
        </Form.Group>

        {/* Address */}
        <Form.Group className='mb-3' controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
          className='w-100'
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            isInvalid={!!formErrors.address}
          />
          <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
        </Form.Group>
 

        <Button variant="primary" type="submit"  disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save Changes'}
        </Button>
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
}


export default Profile;
