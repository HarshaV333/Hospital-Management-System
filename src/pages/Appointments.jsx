import React, { useState } from 'react'
import appointImg from '../images/appointmentPage.png'
import BookAppointForm from '../Components/BookAppointForm'
import CancelAppointForm from '../Components/CancelAppointForm'
import Template from '../Components/Template'

const Appointments = () => {

  const [formType, setFormType] = useState("bookAppointment")

  return (
    <div>
      <Template
        btn1text = "Book Appointment"
        btn2text = "Cancel Appointment"
        image = {appointImg}
        formType={formType}
        setFormType={setFormType}
        btntype1 = "bookAppointment"
        btntype2 = "cancelAppointment"
        form1 = <BookAppointForm/>
        form2 = <CancelAppointForm/>
        imgAlt = "AppointmentPageImage"
      />
    </div>
  )
}

export default Appointments