import React, { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../BaseUrl'
import { toast } from 'react-toastify'

const AddDoctorForm = () => {

    const [formdata, setFormData] = useState({
        doc_name: "", doc_specialization: ""
    })

    function changeHandler(event){
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    async function submitHandler(event){
        event.preventDefault();
        console.log(formdata)
        try {
           const response = await axios.post(`${baseUrl}/addDoctor`, formdata)
           console.log("form Submitted Successfully", response)
           toast.success("Doctor added Successfully")
        } catch (error) {
            console.log("Error in Submitting Form", error)
            toast.error("Failed to Add Doctor")
        }

        setFormData({
            doc_name: "", doc_specialization: ""
        })

    }

  return (
    <div>

        <form onSubmit={submitHandler}>
            <label htmlFor='docName'
                className=' text-lg font-poppinsm500 text-violetBlue'
            >Doctor Name</label>
            <br/>
            <input
                type='text'
                name='doc_name'
                id='docName'
                value={formdata.doc_name}
                placeholder='Enter Doctor Name'
                onChange={changeHandler}
                required
                className=' border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
            />

            <br/>

            <label htmlFor='docSpecialization'
                className=' text-lg font-poppinsm500 text-violetBlue'
            >Doctor Specialization</label>
            <br/>
            <input
                type='text'
                name='doc_specialization'
                id='docSpecialization'
                value={formdata.doc_specialization}
                placeholder='Enter Doctor Specialization'
                onChange={changeHandler}
                required
                className=' border-2 border-federalBlue w-full p-3 text-base my-4 rounded-lg text-navyBlue'
            />

            <br/>

            <button className=' p-3 hover:bg-violetBlue text-white rounded-lg px-5 font-poppinsr400 mt-4 bg-federalBlue'>
                Submit
            </button>

        </form>

    </div>
  )
}

export default AddDoctorForm