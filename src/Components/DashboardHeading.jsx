import React from 'react'

function DashboardHeading({ name, handleViewMore }) {
  return (
    <div>
        <div className="flex w-full justify-between  items-end text-loginBlue">
            <div className="font-GothamB text-2xl ">{ name }</div>
            <div className="font-GothamM cursor-pointer text-xs" onClick={handleViewMore}>View More</div>
        </div>
    </div>
  )
}

export default DashboardHeading