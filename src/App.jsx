import React from 'react'
import Navbar from './Components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import './index.css'

const App = () => {
  return (
    <div className='w-screen h-screen'>
      <Navbar/>
      
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="/patients" element={<Patients/>} />
        <Route path="/bookappointment" element={<Appointments/>} />

      </Routes>

    </div>
  )
}

export default App