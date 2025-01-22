import React from 'react'
import { Link } from 'react-router-dom'
import lakeside from '../images/LakeSide2.png'

const Navbar = () => {
  return (
    <div className='w-11/12 max-w-[1100px] flex mx-auto items-center justify-between bg-white font-poppinsr400'>

        <Link to="/">
            <img src={lakeside} alt='logo' width={150} />
        </Link>

        <div className='flex gap-x-5 text-lg items-center'>
            <Link to="/doctors">
                <p className=' p-2'>Doctors</p>
            </Link>
            <Link to="/patients">
                <p className=' p-2'>Patients</p>
            </Link>
            <Link to="/bookappointment">
                <p className=' p-2'>Book Appointment</p>
            </Link>
        </div>

    </div>
  )
}

export default Navbar