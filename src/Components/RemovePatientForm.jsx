import React, { useEffect, useState } from 'react'
import {baseUrl} from '../BaseUrl'
import Spinner from './Spinner'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = `${baseUrl}/getPatients`

const RemovePatientForm = () => {

  const [allPatients, setAllPatients] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    selectedPatient: ""
  })

  function changeHandler(event){
    const {name, value} = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "selectedPatient" ? Number(value) : value
    }))
  }

  async function fetchPatients(){
    setLoading(true);
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.patients)
    setAllPatients(result.patients)
    setLoading(false);
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  async function submitHandler(event){
    event.preventDefault();
    try {
      const response = await axios.delete(`${baseUrl}/deletePatient/${formData.selectedPatient}`);
      console.log("Deleted Patient Successfully", response);
      toast.success("Patient Deleted Successfully");
    } catch (error) {
      console.log("Error occured while Deleting Patient");
      toast.error("Failed to Delete User");
    }

    setFormData({
      selectedPatient:""
    })
    
  }

  return (
    <div>

      <form onSubmit={submitHandler}>
        <label htmlFor='patient'
          className='text-lg font-poppinsm500 text-violetBlue'  
        >
          Select Patient
        </label>
        {
          loading ? 

          (<Spinner/>) :
        
          (
            allPatients.length === 0 ? 
            
            (
              <div className='text-lg font-poppinsr400 text-federalBlue ml-6 p-3'>
                No Patients Found
              </div>
            ) 

            : 

            (
              <select 
                name='selectedPatient'
                id='patient'
                value={formData.selectedPatient}
                onChange={changeHandler}
                required
                className='border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
              >
                <option value="" disabled >
                  Select
                </option>
                {
                  allPatients.map((pat) => (
                    <option key={pat.pat_id} value={pat.pat_id}
                    >
                      {pat.pat_name}
                    </option>
                  ))
                }
              </select>
            )
          )
        }


        <button className=' p-3 hover:bg-violetBlue text-white rounded-lg px-5 font-poppinsr400 mt-4 bg-federalBlue transition-all
           duration-200'>
          Delete
        </button>

      </form>

    </div>
  )
}

export default RemovePatientForm