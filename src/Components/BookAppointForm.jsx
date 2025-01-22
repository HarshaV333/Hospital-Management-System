import React, { useEffect, useState } from 'react'
import {baseUrl} from '../BaseUrl'
import axios from 'axios'
import { toast } from 'react-toastify'

const doctorsUrl = `${baseUrl}/getDoctors`

const patientsUrl = `${baseUrl}/getPatients`

const BookAppointForm = () => {

  const [doctorsData, setDoctorsData] = useState([])

  const [patientsData, setPatientsData] = useState([])

  const [formData, setFormData] = useState({
    selectedDoctor:"", selectedPatient:"", date:""
  })

  const [loading, setLoading] = useState(false)

  async function fetchDoctors(){
    setLoading(true);
    const response = await axios.get(doctorsUrl);
    console.log(response.data.allDoctors);
    setDoctorsData(response.data.allDoctors)
    setLoading(false);
  }
  
  async function fetchPatients(){
    setLoading(true);
    const response = await axios.get(patientsUrl);
    console.log(response.data.patients);
    setPatientsData(response.data.patients)
    setLoading(false);
  }

  useEffect(() => {
    fetchDoctors()
    fetchPatients()
  }, [])

  function changeHandler(event){
    const {name, value} = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "selectedDoctor" || name === "selectedPatient" ? Number(value) : value
    }))
  }

  async function submitHandler(event){
    event.preventDefault();
    try {
      const result = await axios.post(`${baseUrl}/bookAppointment/${formData.selectedDoctor}/${formData.selectedPatient}`, formData)
      console.log("Appointment Booked Successfully", result)
      toast.success("Appointment Booked Successfully")
    } catch (error) {
      console.log("Error Booking Appointment", error)
      toast.error("Failed to Book Appointment")
    }
    setFormData({
      selectedDoctor:"", selectedPatient:"", date:""
    })
  }

  return (

    <div>

      <form onSubmit={submitHandler}>

        <label htmlFor='doctor'
          className=' text-lg font-poppinsm500 text-violetBlue'
        >
          Select Doctor
        </label>
        <br/>
        <select
          name='selectedDoctor'
          id='doctor'
          value={formData.selectedDoctor}
          onChange={changeHandler}
          required
          className='border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
        >
          <option value="" disabled>Select</option>
          {
            doctorsData.map((doc) => (
              <option key={doc.doc_id} value={doc.doc_id}>
                {doc.doc_name}
              </option>
            ))
          }
        </select>

        <br/>

        <label htmlFor='patient'
          className=' text-lg font-poppinsm500 text-violetBlue'
        >
          Select Patient
        </label>
        <br/>
        <select
          name='selectedPatient'
          id='patient'
          value={formData.selectedPatient}
          onChange={changeHandler}
          required
          className='border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
        >
          <option value="" disabled>Select</option>
          {
            patientsData.map((pat) => (
              <option key={pat.pat_id} value={pat.pat_id}>
                {pat.pat_name}
              </option>
            ))
          }
        </select>

        <br/>

        <label htmlFor='date'
          className=' text-lg font-poppinsm500 text-violetBlue'
        >
          Select Date
        </label>
        <br/>
        <input
          type='date'
          name='date'
          id='date'
          value={formData.date}
          placeholder='Select Date'
          onChange={changeHandler}
          required
          className=' border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
        />

        <br/>

        <button className=' p-3 hover:bg-violetBlue text-white rounded-lg px-5 font-poppinsr400 mt-4 bg-federalBlue transition-all
           duration-200'>
          Book Appointment
        </button>


      </form>

      

    </div>
  )
}

export default BookAppointForm