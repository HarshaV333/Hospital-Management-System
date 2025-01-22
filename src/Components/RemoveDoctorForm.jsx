import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import axios from 'axios'
import {baseUrl} from '../BaseUrl'
import { toast } from 'react-toastify'

const url = `${baseUrl}/getDoctors`

const RemoveDoctorForm = () => {

  const [loading, setLoading] = useState(false)
  const [alldoctors, setAllDoctors] = useState([])
  const [formData, setFormData] = useState({
    selectedDoctor: ""
  })

  async function fetchAllDoctors(){
    setLoading(true);
    const doctors_list = await fetch(url);
    const result = await doctors_list.json();
    console.log(result)
    console.log(result.allDoctors);
    setAllDoctors(result.allDoctors);
    setLoading(false);
  }

  useEffect(() => {
    fetchAllDoctors()
  }, [])

  async function submitHandler(event){
    event.preventDefault()
    try{
      const response = await axios.delete(`${baseUrl}/deleteDoctor/${formData.selectedDoctor}`)
      console.log("Response", response)
      toast.success("Doctor Removed Successfully")
    }
    catch(error){
      console.log("Error Submitting Data", error)
      toast.error("Error while removing Doctor")
    }

    setFormData({
      selectedDoctor: ""
    })

  }

  function changeHandler(event){
    const {name, value} = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "selectedDoctor" ? Number(value) : value
    }))
  }

  return (
    <div>

      <form onSubmit={submitHandler}>
        <label htmlFor='selectdoctor'
          className='text-lg font-poppinsm500 text-violetBlue'
        >Select Doctor
        </label>
        {
          loading ? 

          (<Spinner/>) : 

          (
            alldoctors.length === 0 ? 

            (
              <div className='text-lg font-poppinsr400 text-federalBlue ml-6 p-3'>
                No Doctors Found
              </div>
            ) 

            :

            (
              <select
                name='selectedDoctor'
                id='selectdoctor'
                onChange={changeHandler}
                value={formData.selectedDoctor}
                required
                className='border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
              >
                <option value="" disabled>Select</option>
                {
                  alldoctors.map((doc) => (
                    <option key={doc.doc_id} value={doc.doc_id}>
                      {doc.doc_name}
                    </option>
                  ))
                }
              </select>
            )
          )
          
        }

        <br/>

        <button className=' p-3 hover:bg-violetBlue text-white rounded-lg px-5 font-poppinsr400 mt-4 bg-federalBlue transition-all
           duration-200'>
          Delete
        </button>


      </form>

      

      

    </div>
  )
}

export default RemoveDoctorForm