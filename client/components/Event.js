import React, { Component } from 'react'
import AnswerWindow from './AnswerWindow'

export const Event = ({openId, isAttending, eventInfo, updateAttendance, volunteeringFrom, volunteeringTill}) => {
  if(openId == eventInfo.id)
    return (
      <div className="container">
      <hr/>
        <div>
          <button id={eventInfo.mainAdminId}> Contact Admin! </button>
        </div>
        <div> Date: {eventInfo.startDate }</div>
        <div> Time: {eventInfo.startTime} - {eventInfo.endTime}</div>
        <AnswerWindow eventId={eventInfo.id}
                      startTime={eventInfo.startTime}
                      endTime={eventInfo.endTime}
                      isAttending={isAttending}
                      volunteeringFrom={volunteeringFrom}
                      volunteeringTill={volunteeringTill}
                      updateAttendance={updateAttendance}/>
      </div>
    )
  else return <div> </div>

}
