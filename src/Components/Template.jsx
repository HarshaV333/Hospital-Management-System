import React from 'react'
// import AddDoctorForm from './AddDoctorForm' // these imports were used before making single components
// import RemoveDoctorForm from './RemoveDoctorForm'
// import {useState} from 'react'
import TopButton from './common/TopButton'

const Template = ({btn1text, btn2text, image, formType, setFormType, btntype1, btntype2, form1, form2, imgAlt}) => {
    
    // const [formType, setFormType] = useState("addDoctor");


  return (

    <div className={`w-11/12 max-w-[1100px] flex mx-auto justify-between mt-[50px] items-center 
        ${btntype1 === "addDoctor" || btntype1 === "bookAppointment" ? ("flex-row-reverse") : ("flex")}`}>

        <div className='w-11/12 max-w-[450px]'>
            <div className='w-fit bg-federalBlue rounded-full p-1 flex'>
                {/* <button onClick={() => setFormType("addDoctor")}
                    className={`px-4 py-3 
                        ${formType === 'addDoctor' ? 
                        (' bg-violetBlue navyBlue text-white') : 
                        ('bg-transparent text-gray-400')} rounded-full transition-all duration-200`}
                >
                    {btn1text}
                </button> */}

                <TopButton btntext={btn1text} formType={formType} setFormType={setFormType} btntype={btntype1} />
                <TopButton btntext={btn2text} formType={formType} setFormType={setFormType} btntype={btntype2} />

                {/* <button onClick={() => setFormType("removeDoctor")}
                    className={`px-4 py-3 
                        ${formType === 'removeDoctor' ? 
                        (' bg-violetBlue navyBlue text-white') : 
                        ('bg-transparent text-gray-400')} rounded-full transition-all duration-200`}
                >
                    {btn2text}
                </button> */}

                
            </div>

            <div className=' mt-8'>
                {
                    formType === btntype1 ? (form1) : (form2)
                }
            </div>

        </div>

        <div>
            <img src={image} width={500} alt={imgAlt} />
        </div>
        

    </div>
  )
}

export default Template