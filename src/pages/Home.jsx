import React from 'react'
import doctorHome from '../images/7741851_3712332.svg'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-11/12 max-w-[1100px] flex mx-auto justify-between'>
        <div className='w-11/12 max-w-[450px] flex flex-col justify-center gap-y-2 font-poppinsm500'>
          <h1 
              className=' text-5xl py-4 font-bold text-violetBlue font-poppinsm500'
          >Your Health, Our Priority.</h1>
          <p
            className=' text-lg py-4 font-poppinsr400 text-federalBlue'
          >Providing comprehensive healthcare solutions with a dedicated team of experienced doctors and advanced facilities.</p>
          <Link to="/bookappointment" >
            <button 
              className=' p-3 hover:bg-violetBlue text-white rounded-lg px-5 font-poppinsr400 mt-2 bg-federalBlue'  
            >
              Book an Appointment
            </button>
          </Link>
        </div>
        <div>
            <img src={doctorHome} width={500} alt='homeImage' />
        </div>
    </div>
  )
}

export default Home