import React from 'react'
import { useState } from 'react';

function ReminderCard({ reminder }) {
    const { title, type, time, timeRemaining, status, date  } = reminder;

  return (
    <div className={`min-h-[104.66px] bg-ongoing rounded-lg flex items-center justify-center font-GothamM shadow-[0px_3px_6px_#00000029]`}>
        <div className="w-10/12 h-5/6">
            <div className="flex justify-between leading-5"> 
               <div className="">{ title } <br /> { type }</div> 
                <div className=" text-sm text-right leading-4"> {timeRemaining} <br /> <span className="font-GothamL text-xs"> days to go </span> </div>
            </div>
             <div className="text-loginBlue text-[9px] "> Ongoing </div>
            <div className="text-time text-[7px]"> { time } </div>
            <div className="flex justify-end">
                <button className="bg-loginBlue text-white h-6 text-xs w-1/3 rounded-md opacity-70 hover:opacity-100">  Join Now</button>
            </div>
        </div>
    </div>
  )
}

export default ReminderCard