import React from 'react'

const TopButton = ({btntext, formType, setFormType, btntype}) => {
  return (
    <div>
        <button onClick={() => setFormType(btntype)}
            className={`px-4 py-3 
                ${formType === btntype ? 
                (' bg-violetBlue navyBlue text-white') : 
                ('bg-transparent text-gray-400')} rounded-full transition-all duration-200`}
        >
            {btntext}
        </button>
    </div>
  )
}

export default TopButton