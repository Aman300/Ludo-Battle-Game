import React from 'react'
import { deleteGameRoute, openGameRoute } from '../utils/APIRoutes';
import 'animate.css';


function OpenBattle(game) {

  
  


  return (
    <>
     <div className='flex justify-around items-center border rounded-xl py-1 mt-2 bg-white shadow animate__animated animate__fadeInLeft animate__faster'>
          <div className=' flex justify-around items-center gap-2'>
            <img className='size-10' src="https://avatar.iran.liara.run/public/12" alt="" />
            <p>mqoqVv</p>
          </div>
          <div className='text-center'>
            <img className='size-8' src="/game/vs.png" alt="" />
            <p>500</p>
          </div>
          <div className='text-center flex justify-center items-center'>            
            <button className='text-center py-2 px-5 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl'>
              Play
            </button>
          </div>
        </div>

        <div className='flex justify-around items-center border rounded-xl py-1 mt-2  bg-white shadow animate__animated animate__fadeInLeft animate__faster'>
          <div className=' flex justify-around items-center gap-2'>
            <img className='size-10' src="https://avatar.iran.liara.run/public/12" alt="" />
            <p>mqoqVv</p>
          </div>
          <div className='text-center'>
            <img className='size-8' src="/game/vs.png" alt="" />
            <p>500</p>
          </div>
          <div className='text-center flex justify-center items-center'>            
            <button className='text-center py-2 px-5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl'>
              Start
            </button>
          </div>
        </div>

       
           
         
       
    </>
  )
}

export default OpenBattle