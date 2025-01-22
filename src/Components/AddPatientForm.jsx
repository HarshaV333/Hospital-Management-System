import React, { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../BaseUrl'
import { toast } from 'react-toastify'

const AddPatientForm = () => {

  const [formData, setFormData] = useState({
    pat_name: "", pat_age: "", pat_gender: ""
  })

  function changeHandler(event){
    const {name, value} = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pat_age" ? Number(value) : value // converting age to a number
    }))
  }

  async function submitHandler(event){
    event.preventDefault();
    try{
      const response = await axios.post(`${baseUrl}/addPatient`, formData);
      console.log("Form Submitted Successfully", response)
      toast.success("Patient Added Successfully");
    }
    catch(error){
      console.log("Error Submitting Form", error);
      toast.error("Failed to Add Patient");
    }

    setFormData({
      pat_name: "", pat_age:"", pat_gender:""
    })
    
  }

  return (
    <div>

      <form onSubmit={submitHandler}>

        <label htmlFor='name'
          className=' text-lg font-poppinsm500 text-violetBlue'
        >Enter Name</label>
        <br/>
        <input 
          type='text'
          name='pat_name'
          id='name'
          placeholder='Enter Patient Name'
          onChange={changeHandler}
          value={formData.pat_name}
          required
          className=' border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
        />

        <br/>

        <label htmlFor='age'
          className=' text-lg font-poppinsm500 text-violetBlue'
        >Enter Age</label>
        <br/>
        <input 
          type='number'
          name='pat_age'
          id='age'
          placeholder='Enter Patient Age'
          onChange={changeHandler}
          value={formData.pat_age}
          required
          className=' border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
        />

        <br/>

        <label htmlFor='gender'
          className=' text-lg font-poppinsm500 text-violetBlue'
        >Select Gender</label>
        <br/>
        <select
          id='gender'
          name='pat_gender'
          value={formData.pat_gender}
          required
          onChange={changeHandler}
          className=' border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
        >
          <option value="" disabled>Select</option>

          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button className=' p-3 hover:bg-violetBlue text-white rounded-lg px-5 font-poppinsr400 mt-4 bg-federalBlue'>
          Submit
        </button>

      </form>

    </div>
  )
}

export default AddPatientForm