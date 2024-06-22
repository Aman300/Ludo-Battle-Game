import React, { useState, useEffect } from 'react';
import { openGameRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { createGameRoute, deleteGameRoute } from '../../utils/APIRoutes';
// import socket from "../../utils/Socket";
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';


const validate = values => {
  const errors = {};

  if (!values.amount) {
    errors.amount = 'Required';
  } 

  return errors;
};


function Transaction() {

  const navigate = useNavigate();

  let userId = JSON.parse(localStorage.getItem("user"))

  const [showModal, setShowModal] = useState(false);
  const [data,setData] = useState([])

async function fetchOpenGame(){
  try{
    let response = await axios.get(openGameRoute)
    if(response.data.status){
      setData(response.data.data) 
    }
  }catch(e){
    console.log(e)
  }
}

  
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



  async function deleteGame(id){
    try{
      let response = await axios.delete(deleteGameRoute + `/${id}`,{
      })

      if(response.data.status){
        toast.success(response.data.message);
       
      }

    }catch(e){
      console.log(e)
      toast.success(e.response.data.message);
    }
  }





  return (
    <>

    <div className='h-screen p-5'>

    <div className='flex justify-between mb-3'>                   
        
    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => (navigate("/"))}  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
        
     <p className='text-center font-semibold text-black mb-6'>Chat</p>

     <p className='text-center font-semibold text-black mb-6'></p>
      
        
    </div>  
      <div>
        <div className='flex justify-between items-center mb-4'>
        <div className='flex justify-center items-center gap-2'>
            <div>
              <img className=' size-12' src="https://avatar.iran.liara.run/username?username=Aman+Sharma" alt="" />
            </div>
            <div>
              <p className='text-black font-semibold'>Aman Sharma</p>
              <p className='text-sm font-semibold text-rose-600'>Online..</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>

        <div className=' flex justify-between items-start bg-white w-full h-[450px] px-5 rounded-2xl mb-3'>

        
        <div className='flex justify-center items-center'>

            <div>
              <input id="msg" name='msg' 
              className={`w-full px-8 py-4 rounded-full font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
              type="text"
              placeholder="Message..."
              />
            </div>

            <div className=''>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </div>

        </div>
         
        </div>

       
      </div>

    </div>
    


    </>
  )
}

export default Transaction
