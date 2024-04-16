import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import interceptorInstance from "../../axios/cartApi";
import axios from 'axios';
import CustomNavbar from '../Navbar/Navbar';
import * as Yup from 'yup';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { productId } = useParams(); // Use useParams to get the product ID
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
      console.log("Form submitted with values:", values); // Check if the form submission is triggered
      payWithStripe(productId, token); // Pass the productId and token to the payWithStripe function
    },
  });

  const payWithStripe = async (productId, token) => {
    
    try {
      const response = await  axios.post(`http://localhost:8000/orders/checkout/`, {
        // Pass the necessary data to the backend
        product: productId, // Use the productId obtained from the URL
        token: token, // Assuming `token` is the user token
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      // Check if the response is successful
      if (response && response.data && response.data.url) {
        // Redirect to Stripe payment page
        window.location.href = response.data.url;
      } else {
        console.error("Error during checkout: Unexpected response format");
      }
    } catch (error) {
      // Handle errors gracefully
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="mt-5 d-flex justify-content-center align-items-center vh-100">
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
            type="submit" 
            className="btn btn-danger font-semibold hover:bg-green-700 text-sm text-white uppercase w-full"
            disabled={formik.isSubmitting} // Disable button during form submission
          >
            {formik.isSubmitting ? "Processing..." : "Checkout"}
          </button>
        </form>
      </div>
    </>
  );
  
};

export default CheckoutForm;
