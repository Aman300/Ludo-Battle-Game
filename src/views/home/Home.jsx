import React, { useState, useEffect } from 'react';
import { openGameRoute, sendMessageRoute, userListRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { createGameRoute, deleteGameRoute } from '../../utils/APIRoutes';
// import socket from "../../utils/Socket";
import 'animate.css';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import RightSideView from '../../components/RightSideView';


const validate = values => {
  const errors = {};

  if (!values.amount) {
    errors.amount = 'Required';
  } 

  return errors;
};


function Home() {

  let userId = JSON.parse(localStorage.getItem("user"))

  const [showModal, setShowModal] = useState(false);
  const [data,setData] = useState([])
  const [userData,setUserData] = useState([])

  const [amount, setAmount] = useState('');

  const handleButtonClick = (value) => {
    if (value === '.') {
      // If the dot (.) button is clicked, hide the number
      setAmount(amount + value);
    } else if (value === 'clear') {
      // If the clear button is clicked, clear the last character
      setAmount(amount.slice(0, -1));
    } else {
      // For other buttons, append the value to the input
      setAmount(amount + value);
    }
  };

async function fetchUserList(){
  try{
    let response = await axios.get(userListRoute)
    if(response.data.status){
      setUserData(response.data.data) 
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




  function generateRoomCode(id) {
    // Ensure userId is a string
    const senderId = String(userId._id);
    
    // Ensure id is a string
    const receiverId = String(id);
  
    // Combine senderId and receiverId
    const roomCode = senderId < receiverId ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;
  
    localStorage.setItem("room", roomCode);
    
    return roomCode;
  }
  
  



  return (
    <>

  <div className='flex'>
    <div className='w-full xl:w-2/6  xl:border-r-4 border-gray-300'>
      <div className='bg-black h-48 rounded-3xl ml-4 mr-4'>
        <img className='object-cover h-48 w-full rounded-3xl' src="https://mir-s3-cdn-cf.behance.net/projects/404/f3d5bf95825899.Y3JvcCwxMzcwLDEwNzIsNTQ2LDA.jpg" alt="" />
      </div>
      <div className="flex animate__animated animate__fadeInUp animate__faster w-full outline-none focus:outline-none mb-6">
        <div className="w-full">
          <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none  p-5 mb-5">
            <div className='flex justify-start items-center mb-3'>
              <h1 className=' text-xl font-semibold'>Games</h1>
            </div>

            <div className='grid grid-cols-2 gap-0 mb-2'>

              <Link to={"/game/classic"} className=''>
                 <img className='w-full rounded-3xl' src="/game/ludo_classic. (1).png" alt="" />
              </Link>
              <Link to={"#"} className=''>
                 <img className='w-full rounded-3xl' src="/game/ludo_classic. (2).png" alt="" />
              </Link>
              <Link to={"#"} className=''>
                 <img className='w-full rounded-3xl' src="/game/ludo_classic. (4).png" alt="" />
              </Link>
              <Link to={"#"} className=''>
                 <img className='w-full rounded-3xl' src="/game/ludo_classic. (3).png" alt="" />
              </Link>                       

            </div>
          </div>
        </div>
      </div>   
    </div>
    <RightSideView/>
  </div>
    </>
  )
}

export default Home