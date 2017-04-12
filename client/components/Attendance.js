import React from 'react'

export const Attendance = ({attendance}) => {
  return (
    <div>
      <button id="attending"> Attending: {attendance.attending.count} </button>
      <button id="no"> Not Attending: {attendance.no.count} </button>
      <button id="maybe"> Maybe: {attendance.maybe.count} </button>
      <button id="noAnswer"> No Answer: {attendance.noAnswer.count} </button>
    </div>
  )
}
