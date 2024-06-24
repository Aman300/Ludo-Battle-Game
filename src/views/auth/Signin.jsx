import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { loginRoute } from '../../utils/APIRoutes';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const validate = values => {
  const errors = {};

  if(!values.phone){
    errors.phone = 'Required';
  }

  return errors;
};
function Signin() {


  const [showPassword, setShowPassword] = useState();
  const [isOTP, setOTP] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        // const response = await axios.post(loginRoute, {
        //   phone: values.phone,
        // });

        setOTP(true)
        navigate("/")

        console.log(response.data)
        const token = response.data.data.token ? true : false;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));
        // localStorage.setItem("room", 99)

        // Display success message
        toast.success(response.data.message);

        navigate("/")

      } catch (error) {
        // Handle any errors
        console.error('Signin failed:', error);
        toast.error(error.response.data.message);
      } finally {
        // Reset the form's submitting state
        setSubmitting(false);
      }
    },
  });

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try{

        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
          headers:{
            Authorization: `Bearer ${response.access_token}`
          }
        })
        try {
          // Send a request to the server to authenticate the user
          const resPonse = await axios.post(loginRoute, {
            phone: res.phone,
            otp: res.sub,
            profile: req.picture
          });
  
          console.log(resPonse.data)
          const token = resPonse.data.data.token ? true : false;
  
          // Store the token in localStorage
          localStorage.setItem('token', token);
  
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(resPonse.data.data));
  
          // Display success message
          toast.success(resPonse.data.message);
  
          navigate("/")
  
        } catch (error) {
          // Handle any errors
          console.error('Signin failed:', error);
          toast.error(error.resPonse.data.message);
        }

      }catch(e){
        console.log(e)
      }
    }
  });

  return (
    <>
    <div className='h-screen'>
     <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
      <div className="w-full">
        <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
          <div className='flex justify-between ' onClick={() => setShowModal(false)}>
            <p className=' text-bold font-semibold'></p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          <div className='flex justify-center items-center h-[50px]'>
            <h1 className=' text-xl font-semibold'>Login In ✌</h1>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <input id="phone" name='phone' onChange={formik.handleChange}
            className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.phone ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
            type="number"
            placeholder="Enter your phone no"
            />
            {/* {formik.errors.userPassword && <div className="text-red-500 ">{formik.errors.userPassword}</div>} */}

      
      {
        isOTP ? (<>
          <div className="relative">
              <input
                id="otp"
                name="otp"
                onChange={formik.handleChange}
                className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.otp ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 pr-12`}
                type={showPassword ? "text" : "otp"} // Toggle between text and otp type
                value={formik.values.otp} // Ensure value is controlled
                placeholder="Enter your otp"
              />           
              
              
            </div>
        </>) : (null)
      }
            <button
                type='submit'
                className="mt-5 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-4 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                disabled={formik.isSubmitting} // Disable the button while submitting
            >
                {formik.isSubmitting ? (
                    // Show loading spinner if submitting
                    <span>Loading...</span>
                ) : (
                    // Show "Signin" text if not submitting
                    <span className=' uppercase'>GET OTP</span>
                )}
            </button>
          </form>
          <div className="my-6 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                login in with
              </div>
          </div>

            <div className='flex justify-around items-center'>
              <div className='py-2 px-8 border rounded-xl'>
                <img className=' size-8' src="https://www.svgrepo.com/show/223041/google.svg" alt="" />
              </div>
              <div className='py-2 px-8 border rounded-xl'>
                <img className=' size-8' src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="" />
              </div>

              <div className='py-2 px-8 border rounded-xl'>
                <img className=' size-8' src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="" />
              </div>
            </div>              
        </div>
      </div>
     </div>
    </div>
    </>
  )
}

export default Signin