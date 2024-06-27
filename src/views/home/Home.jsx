import React, { useState, useEffect } from 'react';
import { baseUrl, openGameRoute, sendMessageRoute, userListRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { createGameRoute, deleteGameRoute } from '../../utils/APIRoutes';
// import socket from "../../utils/Socket";
import 'animate.css';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import RightSideView from '../../components/RightSideView';
import useFetch from '../../hooks/useFetch';


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
  const [userData,setUserData] = useState([])
  const [showGameInfo, setGameInfo] = useState(false)

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




  const {data,error,loading} = useFetch(baseUrl + `settings/data`, {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })

  console.log(data)
  
  



  return (
    <>

  <div className='flex'>
    <div className='w-full xl:w-2/6  xl:border-r-4 border-gray-300'>
    <ul className="flex flex-col py-1 space-y-1 p-3 mb-4">
      {
        loading ? null : <div className='w-full py-2 border rounded-xl'>
          <div className='text-center text-gray-800 text-sm font-semibold'>
            <p>Commission: {data?.adminPercentage50To400} % ◉ Referral: {data?.referPercentage}% For All Games</p>
          </div>          
        </div>
      }
      
      <div className='w-full py-5 border rounded-xl px-3 mb-4'>
        <div className='text-center text-gray-600 mb-2 text-sm font-semibold'>
          <p>Notice:- 1st निकासी 200 रूपए से ज्यादा नहीं होनी चाहिए अन्यथा आप की निकासी फेल्ड हो जायेगा। Important:- शाम 4-7pmकमिशन 0% रहेगा।</p>
        </div>          
      </div>
    </ul>
      <div className="flex animate__animated animate__fadeInUp animate__faster w-full outline-none focus:outline-none mb-6">
        <div className="w-full">
          <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none  p-5 xl:mb-0 mb-5">
          <div className=' flex  justify-between items-center font-bold  text-rose-600 px-4 mb-3'>
              <p className='flex justify-center items-center gap-2 text-2xl '>
                Games<img className=' size-8' src="https://www.svgrepo.com/show/396546/game-die.svg" alt="" /></p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6 cursor-pointer" onClick={() => setGameInfo(true)}>
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
              </svg>
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
      { showGameInfo ? (<>
        <div className="flex animate__animated animate__fadeInUp animate__faster fixed bottom-0 xl:w-1/3 w-full outline-none focus:outline-none">
          <div className="w-full">
            <div className="rounded-t-[30px] shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none xl:p-6 p-5">
              <div className='flex justify-between ' onClick={() => setGameInfo(false)}>
                <p className=' text-bold font-semibold'></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer hover:text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <div className='flex justify-center items-center mb-3'>
                <h1 className=' text-xl font-semibold'>How To Play Games & Earn? ✌</h1>
              </div>

          
             
             <div className='text-center text-gray-500 mb-8 text-xs'>
              <p>Guide to Responsible Play Sometimes, players may find it hard to recognize that their online play is getting out of control.</p>
             </div>

               
                  
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

export default Home