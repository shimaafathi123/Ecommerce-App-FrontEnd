import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import interceptorInstance from "../../axios/cartApi";
import * as Yup from 'yup';

const payWithStripe = () => {
  interceptorInstance
    .post(`orders/checkout/`)
    .then((response) => {
      // Redirect to stripe payment page
      window.location.href = response.data.url;
    })
    .catch((error) => {
      // Handle errors gracefully
      console.error("Error during checkout:", error);
    });
};

const CheckoutForm = () => {
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
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true); // Prevent multiple form submissions
      // dispatch(addUserInfo(values)); // If you need to dispatch any action before redirection
      payWithStripe(); // Redirect to Stripe payment page
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <form onSubmit={formik.handleSubmit} className='w-75 m-5 border p-5 rounded-2 shadow mx-auto text-center'>
      <h2 className='mb-3 text-danger fw-bold fs-2'>Checkout</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder='Checkout Details'
          className="form-control w-75 mx-auto"
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
          className="form-control w-75 mx-auto"
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
          className="form-control w-75 mx-auto"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        {formik.errors.city && <div className="text-danger">{formik.errors.city}</div>}
      </div>
      <button
        type="button"
        className="btn btn-danger font-semibold hover:bg-green-700 text-sm text-white uppercase w-full"
        onClick={() => payWithStripe()}
        disabled={formik.isSubmitting} // Disable button during form submission
      >
        {formik.isSubmitting ? "Processing..." : "Checkout"}
      </button>
    </form>
    </div>
  );
};

export default CheckoutForm;

