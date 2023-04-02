import React, { useState } from 'react'
import { useEffect } from 'react';

function EventInput({ placeholder, name, type, handleInputChange}) {
  const [ InputHTML, setInputHTML ] = useState('input');

  useEffect(() => {
    if(type === 'textarea') {
      setInputHTML('textarea');
    }

    if(type === 'datetime') {
      setInputHTML('datetime');
    }
  });

  return (
    <div className="w-full">
      <InputHTML placeholder={ placeholder } rows="3" c name={ name } type={ type || "text" } className='bg-inputGrey font-GothamL text-base pl-4 px-1 w-full h-11 focus:outline-none rounded-lg'/> 
    </div>
  )
}

export default EventInput;