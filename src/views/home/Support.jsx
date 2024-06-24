// Sidebar.js
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { loginRoute } from '../../utils/APIRoutes';
import { useState } from 'react';
import 'animate.css';
import RightSideView from '../../components/RightSideView';

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
  if (!values.aadhar) {
    errors.aadhar = 'Required';
  } else if (values.aadhar.length < 12 || values.aadhar.length > 12) {
    errors.aadhar = 'Aadhar no must be 12 digit';
  }

  return errors;
};

function Support() {
  
  const [showKyc, setShowKyc] = useState(false);

  const [showPassword, setShowPassword] = useState();


  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      aadhar: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        const response = await axios.post(loginRoute, {
          name: values.name,
          email: values.email,
          aadhar: values.aadhar,
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

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setImage(reader.result); // Store the base64 encoded image data
    };

    if (file) {
      reader.readAsDataURL(file); // Read file as data URL for preview
    }
  };

  return (
    <>
    <div className='flex'>
      <div className='w-full xl:w-2/6  xl:border-r-4 border-gray-300'>
        <div className="flex items-center ml-5 gap-3 h-14 ">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate("/")}  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </div>
              <div className=" font-bold text-xl items-center">
                  <Link to="/">
                    <h2><span className='text-rose-600'>Support</span></h2>
                  </Link>
              </div>
              
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow mb-10 animate__animated animate__fadeInLeft animate__faster">
          <ul className="flex flex-col py-1 space-y-1 p-3">
            <div className='w-full py-4 border rounded-xl px-5 mb-4'>
                <div>
                  <img className='w-full' src="https://kd124.com/Images/contact_us.webp" alt="" />
                </div>
               
                <div className='text-center p-2 xl:mb-0 mb-10'>
                 
                  
                  <button
                  type='submit'
                  className="mb-2 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-3 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >      
                    <span className=' uppercase flex  justify-center items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                      Live Chat</span>   
                  </button>
                  <button
                  type='submit'
                  className="mb-2 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-3 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >      
                    <span className=' uppercase flex  justify-center items-center gap-2'>
                      <img className=' size-6' src="https://www.svgrepo.com/show/452133/whatsapp.svg" alt="" />
                      Connect on Whatsapp</span>   
                  </button>
                </div>
            </div>
          </ul>
          
        </div>

      { showKyc ? (<>
        <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
          <div className="w-full">
            <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
              <div className='flex justify-between ' onClick={() => setShowKyc(false)}>
                <p className=' text-bold font-semibold'></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <div className='flex justify-center items-center mb-3'>
                <h1 className=' text-xl font-semibold'>KYC ✌</h1>
              </div>

            <form onSubmit={formik.handleSubmit}>

            <input id="name" name='name' onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.name ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
              type="text"
              placeholder="Enter your name"
              />
            {/*  */}
              <input id="aadhar" name='aadhar' onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.aadhar ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
              type="number"
              placeholder="Enter your aadhar number"
              />
              {/* {formik.errors.aadhar && <div className="text-red-500 ">{formik.errors.aadhar}</div>} */}

            {/*  */}
              <input id="email" name='email' onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.email ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
              type="email"
              placeholder="Enter your email id"
              />
              {/* {formik.errors.userPassword && <div className="text-red-500 ">{formik.errors.userPassword}</div>} */}
              <div className='flex justify-between items-center mb-2 gap-2'>
                <div className="w-full px-4 py-3 rounded-xl font-medium bg-gray-100 border border-gray-300">
                  <label
                    htmlFor="uploadFront"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 fill-white stroke-rose-500"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-gray-600 font-medium text-center">Upload Aadhar Front</span>
                  </label>
                  <input
                    id="uploadFront"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setFrontImage)}
                  />
                  {frontImage && (
                    <img src={frontImage} alt="Aadhar Front" className="mt-2 rounded-lg" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  )}
                </div>

                <div className="w-full px-4 py-3 rounded-xl font-medium bg-gray-100 border border-gray-300">
                  <label
                    htmlFor="uploadBack"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 fill-white stroke-rose-500"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-gray-600 font-medium text-center">Upload Aadhar Back</span>
                  </label>
                  <input
                    id="uploadBack"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setBackImage)}
                  />
                  {backImage && (
                    <img src={backImage} alt="Aadhar Back" className="mt-2 rounded-lg" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  )}
                </div>
              </div>


              <div className='text-center text-gray-500 mb-8 text-sm'>
              <p>By Continuing, you agree to our <span className='text-blue-500 underline hover:text-blue-700 cursor-pointer font-semibold'> Legal Terms</span> and you are 18 years or older.</p>
             </div>
              {/* Submit button */}
              <button
                  type='submit'
                  className="mb-2 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-4 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  disabled={formik.isSubmitting} // Disable the button while submitting
              >
                  {formik.isSubmitting ? (
                      // Show loading spinner if submitting
                      <span>Loading...</span>
                  ) : (
                      // Show "Signup" text if not submitting
                      <span className=' uppercase'>Submit KYC</span>
                  )}
              </button>
            </form>
             
            

               
                  
            </div>
          </div>
        </div>
      </>) : null       
      }
      </div>
      <RightSideView/>
    </div>
    
    </>
  )
}

export default Support
