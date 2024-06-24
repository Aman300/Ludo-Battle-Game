import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { loginRoute } from '../../utils/APIRoutes';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const validate = values => {
  const errors = {};

  if(!values.name){
    errors.name = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Phone no must be 6 digit';
  }

  return errors;
};
function Signup() {

  
  const [showPassword, setShowPassword] = useState();


  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password:'',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        const response = await axios.post(loginRoute, {
          name: values.name,
          email: values.email,
          password: values.password,
        });

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
        console.error('Signup failed:', error);
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
            name: res.name,
            email: res.email,
            password: res.sub,
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
          console.error('Signup failed:', error);
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
            <h1 className=' text-xl font-semibold'>Create your account ✌</h1>
          </div>

        <form onSubmit={formik.handleSubmit}>

        <input id="name" name='name' onChange={formik.handleChange}
          className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.name ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
          type="text"
          placeholder="Enter your name"
          />
        {/*  */}
          <input id="email" name='email' onChange={formik.handleChange}
          className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.email ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
          type="email"
          placeholder="Enter your email id"
          />
          {/* {formik.errors.userPassword && <div className="text-red-500 ">{formik.errors.userPassword}</div>} */}

          <div className="relative">
            <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.password ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 pr-12`}
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              value={formik.values.password} // Ensure value is controlled
              placeholder="Enter your password"
            />
            {
              showPassword ? (<>

              <svg xmlns="http://www.w3.org/2000/svg"  onClick={() => setShowPassword(!showPassword)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute m-2 right-3 top-1/2 transform -translate-y-1/2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
                    
              </>) : (
              <>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 absolute m-2 right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </>
            )
            }
            
          </div>
          {/* {formik.errors.password && <div className="text-red-500 ">{formik.errors.password}</div>} */}

          {/* Submit button */}
          <button
              type='submit'
              className="mt-5 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-4 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              disabled={formik.isSubmitting} // Disable the button while submitting
          >
              {formik.isSubmitting ? (
                  // Show loading spinner if submitting
                  <span>Loading...</span>
              ) : (
                  // Show "Signup" text if not submitting
                  <span className=' uppercase'>Create Account</span>
              )}
          </button>
        </form>
         <div className="my-6 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                sign in with
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

            <div className='text-center mt-5 text-sm hover:text-rose-600'>
              <Link to="/signin" >Have an accout? Signin</Link>
            </div>
              
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Signup