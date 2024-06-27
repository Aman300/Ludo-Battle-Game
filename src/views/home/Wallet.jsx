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

  if(!values.amount){
    errors.amount = 'Required';
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

function Wallet() {
  
  const [showKyc, setShowKyc] = useState(false);
  const [showDepositChipInfo, setDepositChipInfo] = useState(false);
  const [showWinChipInfo, setWinChipInfo] = useState(false);
  const [showDepositChipForm, setDepositChipsForm] = useState(false);
  const [showWinChipForm, setWinChipForm] = useState(false);

  const [showPassword, setShowPassword] = useState();


  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      amount: '',
      email: '',
      aadhar: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        const response = await axios.post(loginRoute, {
          amount: values.amount,
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

  return (
    <>
    <div className='flex'>
      <div className='w-full xl:w-2/6  xl:border-r-4 border-gray-300 h-screen'>
        <div className="flex items-center ml-5 gap-3 h-14 ">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate("/")}  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </div>
              <div className=" font-bold text-xl items-center">
                  <Link to="/">
                    <h2><span className='text-rose-600'>Wallet</span></h2>
                  </Link>
              </div>
              
        </div>
        {
          loading ? (<><Loader/></>) : (<><div className="overflow-y-auto overflow-x-hidden flex-grow mb-10 animate__animated animate__fadeInLeft animate__faster">
            <ul className="flex flex-col py-1 space-y-1 p-3 ">
              <div className='w-full py-4 border rounded-xl px-5 mb-4'>
                  <div className='flex justify-between items-center gap-4 p-1 mb-2'>
                     <div className='flex justify-start items-center gap-4'>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                       </svg>
                      <div>
                        <p className='text-md flex justify-center items-center gap-2 cursor-pointer' onClick={() => setDepositChipInfo(true)}>Deposit Chips<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-rose-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        </p>
                        <h1 className='text-sm text-gray-500'>₹ {data?.addChip}</h1>
                      </div>
                     </div>
                     <div className=' hover:text-rose-600 cursor-pointer' onClick={() => setDepositChipsForm(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                  <hr />
                  <div className='flex justify-between items-center gap-4 p-1 mt-2'>
                    <div className='flex justify-start items-center gap-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
  
                      <div>
                        <p className='text-md flex justify-center items-center gap-2 cursor-pointer' onClick={() => setWinChipInfo(true)}>Winning Chips<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:text-rose-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        </p>
                        <h1 className='text-sm text-gray-500'>₹ {data?.withdrawAmount}</h1>
                      </div>
                    </div>
                    <div className=' hover:text-rose-600 cursor-pointer' onClick={() => setWinChipForm(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
              </div>
            </ul>
          </div></>)
        }
        

      { showDepositChipInfo ? (<>
        <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
          <div className="w-full">
            <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
              <div className='flex justify-between ' onClick={() => setDepositChipInfo(false)}>
                <p className=' text-bold font-semibold'></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <div className='flex justify-center items-center mb-3'>
                <h1 className=' text-xl font-semibold'>Deposit Chips ✌</h1>
              </div>
             <div className='text-center text-gray-500 mb-8 text-sm'>
              <p>यह चिप्स Win एवं Buy की गई चिप्स है इनसे सिर्फ़ गेम खेले जा सकते है ॥ Bank या UPI में निकाला नहीं जा सकता है</p>
             </div>

               
                  
            </div>
          </div>
        </div>
      </>) : null       
      }
      { showWinChipInfo ? (<>
        <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
          <div className="w-full">
            <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
              <div className='flex justify-between ' onClick={() => setWinChipInfo(false)}>
                <p className=' text-bold font-semibold'></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <div className='flex justify-center items-center mb-3'>
                <h1 className=' text-xl font-semibold'>Winning Chips ✌</h1>
              </div>

          
             
             <div className='text-center text-gray-500 mb-8 text-sm'>
              <p>यह चिप्स गेम से जीती हुई एवं रेफरल से कमाई हुई है इन्हें Bank या UPI में निकाला जा सकता है ॥ इन चिप्स से गेम भी खेला जा सकता है</p>
             </div>

               
                  
            </div>
          </div>
        </div>
      </>) : null       
      }
      { showDepositChipForm ? (<>
        <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
          <div className="w-full">
            <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
              <div className='flex justify-between ' onClick={() => setDepositChipsForm(false)}>
                <p className=' text-bold font-semibold'></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <div className='flex justify-center items-center mb-3'>
                <h1 className=' text-xl font-semibold'>Deposit ✌</h1>
              </div>

              <div className='text-center text-gray-500 mb-8 text-sm'>
              <p>यदि आप किसी भी पेमेंट का बैंक से Complain डालते है तो आपके खाते को Block कर दिया जायेगा ! इसलिए किसी और से अपने Ludo ID में पैसे न डलवाये ! और यदि आप खुद जान भूझकर बैंक से रिफंड लेने के लिए Complain डालते है तो आपकी Ludo ID पूर्णतः बंद कर दी जाएगी !</p>
             </div>

            <form onSubmit={formik.handleSubmit}>

            <input id="amount" name='amount' onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.amount ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
              type="number"
              placeholder="Enter amount"
              />
            

              {/* Submit button */}
              <button
                  type='submit'
                  className="mb-3 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-4 rounded-xl hover:bg-rose-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  disabled={formik.isSubmitting} // Disable the button while submitting
              >
                  {formik.isSubmitting ? (
                      // Show loading spinner if submitting
                      <span>Loading...</span>
                  ) : (
                      // Show "Signup" text if not submitting
                      <span className=' uppercase'>process to pay</span>
                  )}
              </button>
            </form>

            <div className='text-center text-gray-500 mb-2 text-sm '>
              <p>Payments Secured By</p>
             </div>

             <div className='flex justify-evenly items-center mb-10 xl:mb-0'>
              <div className='py-0 px-4 '>
                <img className=' size-8 w-full' src="https://kd124.com/static/media/gpay.6b590d3e184638c40ac2.png" alt="" />
              </div>
              <div className='py-0 px-4 '>
                <img className=' size-8 w-full' src="https://kd124.com/static/media/paytm.f6dff5410e81e3729c93.png" alt="" />
              </div>

              <div className='py-0 px-4 '>
                <img className=' size-8 w-full' src="https://kd124.com/static/media/phonepe.09f703908dd52a295405.png" alt="" />
              </div>
              <div className='py-0 px-4 '>
                <img className=' size-8 w-full' src="https://kd124.com/static/media/upi.470d8836e65aaf2e3774.png" alt="" />
              </div>
            </div>    
                           
            </div>
          </div>
        </div>
      </>) : null       
      }
      { showWinChipForm ? (<>
        <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
          <div className="w-full">
            <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
              <div className='flex justify-between ' onClick={() => setWinChipForm(false)}>
                <p className=' text-bold font-semibold'></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <div className='flex justify-center items-center mb-3'>
                <h1 className=' text-xl font-semibold'>Withdrawal ✌</h1>
              </div>

              <div className='flex justify-between items-center mb-3'>
                  <p>Minimum: 200</p>
                  <p>Maximum: 200</p>
              </div>

            <form onSubmit={formik.handleSubmit}>

            <input id="accountHolderName" name='accountHolderName' onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.amount ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
              type="text"
              placeholder="Enter account holder name"
              />
            <input id="accountNumber" name='accountNumber' onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.amount ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
              type="number"
              placeholder="Enter account number"
              />
            <input id="ifscCode" name='ifscCode' onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.amount ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
              type="text"
              placeholder="Enter IFSC Code"
              />
            <input id="withdrawalAmount" name='withdrawalAmount' onChange={formik.handleChange}
              className={`w-full px-6 py-4 rounded-xl font-medium bg-gray-100 border ${formik.errors.amount ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2`}
              type="number"
              placeholder="Enter withdrawal amount"
              />
            

            <div className='text-center text-gray-500 mb-4 text-sm'>
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
                      <span className=' uppercase'>Submit request</span>
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

export default Wallet