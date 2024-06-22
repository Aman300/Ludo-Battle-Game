import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';

import 'animate.css';
import RunningBattle from '../../components/RunningBattle';
import OpenBattle from '../../components/OpenBattle';
import { Link } from 'react-router-dom';
import RightSideView from '../../components/RightSideView';

const validate = values => {
    const errors = {};
  
    if (!values.amount) {
      errors.amount = 'Required';
    } 
  
    return errors;
  };


function Classic() {

    const [showModal, setShowModal] = useState(false);
    const [data,setData] = useState([])

    const formik = useFormik({
        initialValues: {
          amount: '',
        },
        validate,
        onSubmit: async (values, { setSubmitting }) => {
          try {
            // Send a request to the server to authenticate the user
            const response = await axios.post(createGameRoute + `/${userId._id}`, {
              amount: values.amount,
            });
    
            toast.success(response.data.message);
            setShowModal(false)
            socket.emit("send-message", {
              room: 101
            });
    
          } catch (error) {
            // Handle any errors
            console.error('Login failed:', error);
            toast.error(error.response.data.message);
          } finally {
            // Reset the form's submitting state
            setSubmitting(false);
          }
        },
      });

  return (
    <>

    <div className='flex'>
      <div className='w-full xl:w-2/6  xl:border-r-4 border-gray-300'>
        <div className='flex justify-between items-center px-4'>

        
          <div></div>    
    
          

            {showModal ? (
            <>
              <div className="flex animate__animated animate__fadeInDown animate__faster justify-center items-center overflow-x-hidden xl:w-2/6 overflow-y-auto fixed bottom-0 inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full h-screen">
                  <div className="border-0 rounded-b-[15px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
                  <div className='flex justify-between ' onClick={() => setShowModal(false)}>
                      <p className=' text-bold font-semibold'></p>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                  <form  onSubmit={formik.handleSubmit}>
                    
                      <input id="amount" name='amount' onChange={formik.handleChange}
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.amount ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
                      type="number"
                      placeholder="Enter battle amount 50 to 25000"
                      />

                      {/* {formik.errors.otp && <div className="text-red-500 ">{formik.errors.otp}</div>} */}

                      
                      {/* Submit button */}
                        <button
                            type='submit'
                            className="mt-5 tracking-wide font-semibold bg-rose-600 text-gray-100 w-full py-3 rounded-lg hover:bg-rose-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            disabled={formik.isSubmitting} // Disable the button while submitting
                        >
                            {formik.isSubmitting ? (
                                // Show loading spinner if submitting
                                <span>Loading...</span>
                            ) : (
                                // Show "Login" text if not submitting
                                <span>Create</span>
                            )}
                        </button>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : null}

        <div onClick={() => setShowModal(true)} className=' cursor-pointer py-2 border px-2 bg-rose-50 rounded-xl text-rose-600 font-semibold flex gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
              <p className='uppercase font-bold'>Create battle</p>
          </div>
        </div>

        <div className='grid grid-cols-1 p-5 gap-2'>

          <div>

            <div className=' flex  justify-between items-center font-bold  text-rose-600'>
              <p className='flex justify-center items-center gap-2'>
                <img className=' size-4' src="https://www.svgrepo.com/show/477236/battle.svg" alt="" /> Open Battles</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
              </svg>


            </div>


          
            {/* {data &&  data.map((item, index)=>(
                  <div className=' animate__animated animate__bounceInLeft animate__faster flex justify-around items-center border rounded-lg xl:py-4 py-1 mt-2'>
                  <div className=' flex justify-around items-center gap-2'>
                    <img className='xl:size-12 size-10' src={item.user_id.profile} alt="" />
                    <p>{item.user_id.name}</p>
                  </div>
                  <div className='text-center'>
                    <img className='xl:size-10 size-8' src="https://static.vecteezy.com/system/resources/previews/022/949/509/non_2x/vs-versus-letters-logo-icon-isolated-on-white-background-vs-versus-symbol-for-confrontation-or-opposition-design-concept-vector.jpg" alt="" />
                    <p>{item.game_amount}</p>
                  </div>
                  <div className='text-center flex justify-center items-center'>            
                  {
                    item.user_id._id === userId._id ? (<button onClick={() => deleteGame(item._id)} className='text-center xl:py-2 py-1 xl:px-5 p-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>    
                    </button>)  : (<button className='text-center xl:py-2 py-1 xl:px-5 p-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg'>
                      Play
                    </button>)
                  }
                    
                  </div>
                </div>
              ))} */}

              <OpenBattle/>
        

          </div>

          <div>

              <div className='border-b font-bold bg-rose-600 text-xl p-0.5 mb-4 mt-3 rounded-full'>

              </div>

            <div className=' flex  justify-between items-center font-bold  text-rose-600'>
            <p className='flex justify-center items-center gap-2'>
            <img className=' size-4' src="https://www.svgrepo.com/show/477236/battle.svg" alt="" /> Running Battles </p>
              
              <picture>
              <source
                srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b2/512.webp"
                type="image/webp"
              />
              <img
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b2/512.gif"
                alt="🎲"
                width={28}
                height={28}
              />
            </picture>


            </div>

            <RunningBattle/>

          </div>
        

        </div>
      </div>
      <RightSideView/>
    </div>

    </>
  )
}

export default Classic