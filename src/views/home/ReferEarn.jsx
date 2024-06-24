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

function ReferEarn() {
  
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
                    <h2><span className='text-rose-600'>Refer & Earn</span></h2>
                  </Link>
              </div>
              
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow mb-10 animate__animated animate__fadeInLeft animate__faster">
         
          <ul className="flex flex-col py-4 space-y-1 p-3 ">
            <div className='w-full py-4 border rounded-xl px-5 mb-4'>
                <div className='flex justify-between items-center gap-4 p-1 mb-2'>
                  <div className='flex justify-start items-center gap-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                      <div>
                        <p className='text-md'>Referred Players</p>                         
                      </div>
                  </div>
                  <div>
                    3
                  </div>
                </div>
                <hr />
                <div className='flex justify-between items-center gap-4 p-1 mb-2 mt-3'>
                  <div className='flex justify-start items-center gap-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                  </svg>

                    <div>
                      <p className='text-md'>Referral Earning</p>
                    </div>
                  </div>
                  <div>
                  ₹ 100
                  </div>
                </div>
               
            </div>
          </ul>
          <ul className="flex flex-col py-1 space-y-1 p-3">
            <div className='w-full py-4 border rounded-xl px-5 mb-4'>
                <div>
                  <img className='w-full' src="https://kd124.com/Images/refer/refer1.png" alt="" />
                </div>
                <div className='w-full items-center mb-2'> 
                  <label
                    className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 focus-within:border-gray-300"
                    htmlFor="search-bar"
                  >
                    <input
                      id="search-bar"
                      placeholder="Enter amount"
                      value={"419744"}
                      className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                    />
                    <button className="w-full md:w-auto px-6 py-3 bg-rose-600 border-rose text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
                      <div className="relative">
                        {/* Loading animation change opacity to display */}
                        <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                          <svg
                            className="opacity-0 animate-spin w-full h-full"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx={12}
                              cy={12}
                              r={10}
                              stroke="currentColor"
                              strokeWidth={4}
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex items-center transition-all opacity-1 valid:">
                          <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                            COPY
                          </span>
                        </div>
                      </div>
                    </button>
                  </label>
                </div>
                <div className='text-center p-2'>
                  <p className='text-gray-700 font-semibold text-xl mb-3'>OR</p>
                  <button
                  type='submit'
                  className="mb-2 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-3 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >      
                    <span className=' uppercase flex  justify-center items-center gap-2'>
                      <img className=' size-6' src="https://www.svgrepo.com/show/452133/whatsapp.svg" alt="" />
                      Share on Whatsapp</span>   
                  </button>
                  <button
                  type='submit'
                  className="mb-2 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-3 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >      
                    <span className=' uppercase flex  justify-center items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>

                      Copy to Clipboard</span>   
                  </button>
                </div>
            </div>
          </ul>
          <ul className="flex flex-col py-1 space-y-1 p-3">
            <div className='w-full py-4 border rounded-xl px-5 mb-4'>
            <div className='text-center text-gray-700 mb-2 text-sm'>
              <p>You can refer and Earn 1% of your referral winning, every time</p>
             </div>
             <div className='border-b font-bold bg-gray-400 text-xl p-0.5 mb-4 mt-3 rounded-full'>
             </div>
             <div className='text-center text-gray-700 mb-2 text-sm'>
              <p>Like if your player plays for ₹10000 and wins, You will get ₹100 as referral amount.</p>
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

export default ReferEarn