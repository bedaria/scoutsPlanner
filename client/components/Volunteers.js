import React from 'react'

export const Volunteers = ({volunteers}) => {
  return (
    <div>
      {
        volunteers.map(volunteer => (
          <div> {volunteer.name} </div>
        ))
      }
    </div>
  )
}
