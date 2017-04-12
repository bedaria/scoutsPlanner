import React, { Component } from 'react'
import AnswerWindow from './AnswerWindow'

export const Event = ({openId, volunteerInfo, eventInfo, updateAttendance}) => {

  if(openId == eventInfo.id)
    return (
      <div className="container">
      <hr/>
        <div> Date: {eventInfo.startDate }</div>
        <div> Time: {eventInfo.startTime} - {eventInfo.endTime}</div>
        <AnswerWindow eventId={eventInfo.id}
                      startTime={eventInfo.startTime}
                      endTime={eventInfo.endTime}
                      isAttending={volunteerInfo.isAttending}
                      volunteeringFrom={volunteerInfo.volunteeringFrom}
                      volunteeringTill={volunteerInfo.volunteeringTill}
                      updateAttendance={updateAttendance}/>
      </div>
    )
  else return <div> </div>

}
