import React from 'react'
// import EventInput from './EventInput'

function SpeakerInfo({ setEventData, number, handleInputChange, handleImageChange }) {
  return (
    <div>
        <div className="flex flex-col mt-3">
              <div className="flex gap-4 mt-3">
                <input onChange={handleInputChange} className='input-events' placeholder="Full Name" name={`speaker${number}`} />
                <input onChange={handleInputChange} className='input-events' placeholder="LinkedIn Profile" name={`speaker${number}LinkedIn`} />
                <label htmlFor={`speaker${number}Photo`} className="cursor-pointer rounded-lg bg-inputGrey w-full flex justify-center items-center">
                  <p className="font-GothamL">Upload Photo</p>
                  <input onChange={handleImageChange} type="file" accept='image/*' name={`speaker${number}Photo`} id={`speaker${number}Photo`} className="hidden"/>
                </label>
              </div>
              <textarea onChange={handleInputChange} name={`speaker${number}Details`} placeholder='Enter details of speaker' id="" cols="30" rows="2" className='mt-3 resize-none bg-inputGrey font-GothamL text-base pl-4 py-3 px-2 w-full focus:outline-none rounded-lg'></textarea> 
            </div>
    </div>
  )
}

export default SpeakerInfo