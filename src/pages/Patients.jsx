import React, { useState } from 'react'
import Template from '../Components/Template'
import image from '../images/patientsPage.png'
import AddPatientForm from '../Components/AddPatientForm'
import RemovePatientForm from '../Components/RemovePatientForm'

const Patients = () => {

  const [formType, setFormType] = useState('addPatient')

  return (
    <div>
      <Template
        btn1text = "Add Patient"
        btn2text = "Remove Patient"
        image = {image}
        formType={formType}
        setFormType={setFormType}
        btntype1 = "addPatient"
        btntype2 = "removePatient"
        form1 = <AddPatientForm/>
        form2 = <RemovePatientForm/>
        imgAlt = "patientPageImage"
      />
    </div>
  )
}

export default Patients