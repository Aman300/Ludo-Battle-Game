import React from 'react'

function RightSideView() {
  return (
    <>
        <div className=' hidden xl:block xl:w-3/5 fixed ml-[550px] mt-10'>
            <div className='flex justify-center items-center mb-6'>
                <img className='w-1/4' src="/android-icon-512x512.png" alt="" />
            </div>
            <div className='text-center '>
                <p className='text-3xl font-semibold'>PLAY LUDO & WIN REAL CASH !</p>
            </div>
            <div className='text-center bottom-0 mb-4 mt-[200px]'>
                <p className='text-2xl font-semibold'>For best experience, open <a href='' className='hover:text-blue-500 underline text-blue-600'> KD124.COM</a> on  chrome mobile</p>
            </div>
      </div>
    </>
  )
}

export default RightSideView