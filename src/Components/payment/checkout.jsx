import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUserInfo } from '../../store/slices/profileSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    checkoutTitle: Yup.string().required('Checkout Title is required'),
    checkoutDetails: Yup.string().required('Checkout Details are required'),
    phone: Yup.string().required('Phone number is required'),
    city: Yup.string().required('City is required'),
  });

  const formik = useFormik({
    initialValues: {
      checkoutTitle: '',
      checkoutDetails: '',
      phone: '',
      city: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addUserInfo(values));
      navigate('/checkout'); 
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='w-75 m-5 border p-5 rounded-2 shadow mx-auto'>
      <h2>Checkout</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder='Checkout Details'
          className="form-control"
          name="checkoutDetails"
          value={formik.values.checkoutDetails}
          onChange={formik.handleChange}
        />
        {formik.errors.checkoutDetails && <div className="text-danger">{formik.errors.checkoutDetails}</div>}
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder='Phone'
          className="form-control"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.errors.phone && <div className="text-danger">{formik.errors.phone}</div>}
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder='City'
          className="form-control"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        {formik.errors.city && <div className="text-danger">{formik.errors.city}</div>}
      </div>
      <Link to="/payment">
      <button type="submit" className="btn btn-success">Checkout</button>
      </Link>
    </form>
  );
};

export default CheckoutForm;
