import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from '../../utils/APIRoutes';
import { useGoogleLogin } from '@react-oauth/google';
import RightSideView from '../../components/RightSideView';

const validate = values => {
  const errors = {};

  if(!values.phone){
    errors.phone = 'Required';
  }

  return errors;
};

function Signin({ data }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isOTP, setOTP] = useState(false);
  const [isLogin, setIsLogin] = useState(data); // Initialize with the data prop passed from parent
  const [secretCode, setSecretCode] = useState(null);
  const [otp, setOTPValue] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: '',
      referral: '',
      otp: ''
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let response;
        if (isOTP) {
          // Handle OTP verification
          response = await axios.post(baseUrl + "login/finish", {
            phone: values.phone,
            twofactor_code: otp,
            referral: values.referral,
            secretCode,
          });
          
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
          navigate("/");
        } else {
          // Handle sending OTP
          response = await axios.post(baseUrl + "login", {
            phone: values.phone,
            referral: values.referral,
          });
          setOTP(true); // Switch to OTP input
          setSecretCode(response.data.secret);
          toast.success(response.data.message);
          console.log(response.data)
        }

        
      } catch (error) {
        console.error('Signin failed:', error);
        toast.error(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });



  return (
    <div className='flex'>
      <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 xl:border-r-4 border-gray-300 w-full outline-none focus:outline-none">
        <div className="w-full">
          <div className="h-screen relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
            <div className='flex justify-between '>
              <p className=' text-bold font-semibold'></p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <div className='flex justify-center items-center h-[50px]'>
              <h1 className=' text-xl font-semibold'>Login In ✌</h1>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                id="phone"
                name='phone'
                onChange={formik.handleChange}
                className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.phone ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
                type="number"
                placeholder="Enter your phone no"
              />

              {isOTP && (
                <div className="relative">
                  <input
                    id="otp"
                    name="otp"
                    onChange={(e) => setOTPValue(e.target.value)}
                    className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border "border-gray-300" placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 pr-12`}
                    type={"text"} // Toggle between text and password type
                    value={otp} // Ensure value is controlled
                    placeholder="Enter your OTP"
                  />
                </div>
              )}

              <button
                type='submit'
                className="mt-3 mb-3 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-4 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                disabled={formik.isSubmitting} // Disable the button while submitting
              >
                {formik.isSubmitting ? (
                  // Show loading spinner if submitting
                  <span>Loading...</span>
                ) : (
                  // Show "GET OTP" text if not submitting
                  <span className='uppercase'>{ isOTP ? "Verify OTP" : "GET OTP" }</span>
                )}
              </button>
            </form>
            <div className='text-center text-gray-500 mb-2 text-sm'>
                <p>By Continuing, you agree to our <span className='text-blue-500 underline hover:text-blue-700 cursor-pointer font-semibold'> Legal Terms</span> and you are 18 years or older.</p>
              </div>
            
          </div>
        </div>
      </div>
      <RightSideView/>
    </div>
  );
}

export default Signin;
