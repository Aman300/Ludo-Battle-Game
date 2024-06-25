// Sidebar.js
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import 'animate.css';
import RightSideView from '../../../components/RightSideView';

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

function Game() {
  
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
                    <h2><span className='text-rose-600'>History / Game</span></h2>
                  </Link>
              </div>
              
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow mb-10 animate__animated animate__fadeInLeft animate__faster">
          <ul className="flex flex-col py-1 space-y-1 p-4 ">
            <div className='w-full py-2 border rounded-xl px-1'>
               <div className='flex justify-between items-center px-2'>
                  <div className='text-start'>
                    <p className='text-xs'>Won against: <span className='text-black font-semibold'>RwPaD</span></p>
                    <p className='text-xs mt-1'>Room code: <span className='text-black font-semibold'>07244930</span></p>
                  </div>
                  <div className='text-end'>
                  <span className="bg-green-100 text-white text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-600">
                    + 250 ₹
                  </span>
                    <p className='text-xs mt-1'>closing balance: <span className='text-black font-semibold'>1347.5</span></p>
                  </div>
               </div>
            </div>
            <div className='w-full py-2 border rounded-xl px-1 mb-1'>
               <div className='flex justify-between items-center px-2'>
                  <div className='text-start'>
                    <p className='text-xs'>Lost against: <span className='text-black font-semibold'>RwPaD</span></p>
                    <p className='text-xs mt-1'>Room code: <span className='text-black font-semibold'>07244930</span></p>
                  </div>
                  <div className='text-end'>
                  <span className="bg-green-100 text-white text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-600">
                    + 250 ₹
                  </span>
                    <p className='text-xs mt-1'>closing balance: <span className='text-black font-semibold'>1347.5</span></p>
                  </div>
               </div>
            </div>
            <div className='w-full py-2 border rounded-xl px-1 mb-1'>
               <div className='flex justify-between items-center px-2'>
                  <div className='text-start'>
                    <p className='text-xs'>Cancelled: <span className='text-black font-semibold'>RwPaD</span></p>
                    <p className='text-xs mt-1'>Room code: <span className='text-black font-semibold'>07244930</span></p>
                  </div>
                  <div className='text-end'>
                  <span className="bg-green-100 text-white text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-600">
                  00.0 ₹
                  </span>
                    <p className='text-xs mt-1'>closing balance: <span className='text-black font-semibold'>1347.5</span></p>
                  </div>
               </div>
            </div>
          </ul>
          
         
        </div>

      
      </div>
      <RightSideView/>
    </div>
    
    </>
  )
}

export default Game