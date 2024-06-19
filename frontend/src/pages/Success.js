import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Success = () => {
  return (
    <div className='text-center bg-green-200 w-full max-w-md m-auto h-48 flex-col justify-center items-center font-semibold text-lg'>
        <p className='text-red-600 py-8 text-2xl sm:text-4xl'>Payment  Successful</p>
        <Link to={"/"} className='max-w-[192px] m-auto py-4 px-4 rounded overflow-hidden bg-blue-900 hover:bg-blue-950 text-base text-white sm:text-md'>Return to Home Page</Link>
    </div>

  )
}

export default Success