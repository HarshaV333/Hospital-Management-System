import React, { useEffect, useState } from 'react'
import {baseUrl} from '../BaseUrl'
import axios from 'axios';
import Spinner from '../Components/Spinner'
import { toast } from 'react-toastify';

const url = `${baseUrl}/getAppointments`

const CancelAppointForm = () => {

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    selectedAppointment:""
  })

  async function getAppointments() {
    setLoading(true);
    try {
      const response = await axios.get(url);
      // console.log(response)
      setAppointments(response.data.appointments)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    
  }

  useEffect(() => {
    getAppointments()
  }, [])

  function changeHandler(event){
    const {name, value} = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "selectedAppointment" ? Number(value) : value
    }))
  }

  async function submitHandler(event){
    event.preventDefault();
    try {
      const response = await axios.delete(`${baseUrl}/deleteAppointment/${formData.selectedAppointment}`)
      console.log("Appointment Deleted Successfully", response)
      toast.success("Appointment Cancelled")
    } catch (error) {
      console.log("Error Cancelling Appointment")
      toast.error("Failed to Cancel Appointment");
    }
    console.log(formData)
    setFormData({
      selectedAppointment:""
    });
  }

  return (
    <div>
      <form onSubmit={submitHandler}>

        <label htmlFor='appointment'
          className='text-lg font-poppinsm500 text-violetBlue'
        >
          Select Appointment
        </label>
        {
          loading ? 
          (<Spinner/>) :
          (
            appointments.length === 0 ?
            (
              <div className='text-lg font-poppinsr400 text-federalBlue ml-6 p-3'>
                No Appointments Available
              </div>
            )
            :
            (
              <select
                name='selectedAppointment'
                id='appointment'
                value={formData.selectedAppointment}
                onChange={changeHandler}
                required
                className='border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
              >
                <option value="" disabled
                >
                  Select
                </option>
                {
                  appointments.map((appoint) => (
                    <option key={appoint.appoint_id} value={appoint.appoint_id}>
                      {appoint.doctor_name} - {appoint.patient_name} - {appoint.appoint_date}
                    </option>
                  ))
                }
              </select>
            )
          )
        }

        <button className=' p-3 hover:bg-violetBlue text-white rounded-lg px-5 font-poppinsr400 mt-4 bg-federalBlue transition-all
           duration-200'>
          Cancel Appointment
        </button>

      </form>
    </div>
  )
}

export default CancelAppointForm