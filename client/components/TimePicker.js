import React from 'react'

export const TimePicker = ({startTime, PMorAM, handleStartTime}) => {
  return (
    <div>
      <input type="text" placeholder="00:00" value={startTime} onChange={handleStartTime} />
      <select value={PMorAM}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  )
}
