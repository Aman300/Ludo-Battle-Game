// Sidebar.js
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl, loginRoute } from '../../utils/APIRoutes';
import { useState } from 'react';
import 'animate.css';
import RightSideView from '../../components/RightSideView';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';

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

function Profile() {
  
  const [showKyc, setShowKyc] = useState(false);
  const [showEditProfile, setEditProfile] = useState(false);

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


  const {data,error,loading} = useFetch(baseUrl + `me`, {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })

  console.log(data)

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
                    <h2><span className='text-rose-600'>Profile</span></h2>
                  </Link>
              </div>
              
        </div>
        {
          loading ? (<Loader/>) : (<>
              <div className="overflow-y-auto overflow-x-hidden flex-grow mb-10 animate__animated animate__fadeInLeft animate__faster">
          <ul className="flex flex-col py-1 space-y-1 p-3 ">
            <div className='w-full py-4 border rounded-xl px-5 mb-4'>
                <div className='flex justify-between items-center gap-4 p-1 mb-2'>
                <div className='flex justify-start items-center gap-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                    <div>
                      <p className='text-md'>Name</p>
                      <h1 className='text-sm text-gray-500'>{data?.name}</h1>
                    </div>
                </div>
                  <div onClick={() => setEditProfile(true) } className=' cursor-pointer hover:text-rose-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                </div>
                <hr />
                <div className='flex justify-between items-center gap-4 p-1 mt-2'>
                  <div className='flex justify-start items-center gap-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                    <div>
                      <p className='text-md'>Phone Number</p>
                      <h1 className='text-sm text-gray-500'>+91 {data?.phone}</h1>
                    </div>
                  </div>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
            </div>

            <div className='w-full py-2 border rounded-xl px-5 mb-4'>
                <div className='flex justify-between items-center gap-4 p-1 mb-2'>
                <div className='flex justify-start items-center gap-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                    <div>
                      <p className='text-md'>KYC</p>
                      <h1 className='text-sm text-rose-500'>Pending</h1>
                    </div>
                </div>
                  <div onClick={() => setShowKyc(true) } className=' cursor-pointer hover:text-rose-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                </div>
            </div>
          </ul>
          <ul className="flex flex-col py-4 space-y-1 p-3 ">
            <div className='w-full py-4 border rounded-xl px-5 mb-4'>
                <div className='flex justify-between items-center gap-4 p-1 mb-2'>
                  <div className='flex justify-start items-center gap-4'>
                  <img className=' size-4' src="https://www.svgrepo.com/show/477236/battle.svg" alt="" />
                      <div>
                        <p className='text-md'>Games Played</p>                         
                      </div>
                  </div>
                  <div>
                  ₹ 1254
                  </div>
                </div>
                <hr />
                <div className='flex justify-between items-center gap-4 p-1 mb-2 mt-3'>
                  <div className='flex justify-start items-center gap-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                  </svg>

                    <div>
                      <p className='text-md'>Chips Won</p>
                    </div>
                  </div>
                  <div>
                  ₹ {data?.wonAmount}
                  </div>
                </div>
                <hr />
                <div className='flex justify-between items-center gap-4 p-1 mb-2 mt-3'>
                  <div className='flex justify-start items-center gap-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>

                    <div>
                      <p className='text-md'>Referral Earning</p>
                    </div>
                  </div>
                  <div>
                  ₹ {data?.referralEarning}
                  </div>
                </div>
                <hr />
                <div className='flex justify-between items-center gap-4 p-1 mb-2 mt-3'>
                  <div className='flex justify-start items-center gap-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>

                    <div>
                      <p className='text-md'>Penalty</p>
                    </div>
                  </div>
                  <div>
                  ₹ 263
                  </div>
                </div>
            </div>
          </ul>
        </div>
          </>)
        }
        

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


              <div className='text-center text-gray-500 mb-2 text-sm'>
              <p>By Continuing, you agree to our <span className='text-blue-500 underline hover:text-blue-700 cursor-pointer font-semibold'> Legal Terms</span> and you are 18 years or older.</p>
             </div>
              {/* Submit button */}
              <button
                  type='submit'
                  className="xl:mb-0 mb-10 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-4 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
      { showEditProfile ? (<>
        <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
          <div className="w-full">
            <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
              <div className='flex justify-between ' onClick={() => setEditProfile(false)}>
                <p className=' text-bold font-semibold'></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <div className='flex justify-center items-center mb-3'>
                <h1 className=' text-xl font-semibold'>Update Name ✌</h1>
              </div>

            <form onSubmit={formik.handleSubmit}>

            <input id="name" name='name' onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.name ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
              type="text"
              value={data?.name}
              placeholder="Enter your name"
              />

              {/* Submit button */}
              <button
                  type='submit'
                  className="xl:mb-0 mb-10 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-4 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  disabled={formik.isSubmitting} // Disable the button while submitting
              >
                  {formik.isSubmitting ? (
                      // Show loading spinner if submitting
                      <span>Loading...</span>
                  ) : (
                      // Show "Signup" text if not submitting
                      <span className=' uppercase'>Update</span>
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

export default Profile