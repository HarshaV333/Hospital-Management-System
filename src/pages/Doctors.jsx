import React from 'react'
import docImg from '../images/doctorsPage.svg'
import Template from '../Components/Template'
import {useState} from 'react'
import AddDoctorForm from '../Components/AddDoctorForm'
import RemoveDoctorForm from '../Components/RemoveDoctorForm'

const Doctors = () => {

  const [formType, setFormType] = useState("addDoctor");

  return (
    <div>
      <Template
        btn1text = "Add Doctor"
        btn2text = "Remove Doctor"
        image = {docImg}
        formType={formType}
        setFormType={setFormType}
        btntype1 = "addDoctor"
        btntype2 = "removeDoctor"
        form1 = <AddDoctorForm/>
        form2 = <RemoveDoctorForm/>
        imgAlt = "doctorPageImage"
      />
    </div>
  )
}

export default Doctors