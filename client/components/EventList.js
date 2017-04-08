import React from 'react'
import Event from './Event'

export const EventList = (props) => (
    <div className="container">
      <div className="item">
        <div className="profile">
          <div className ="hello">
          {props.eventList.map(event => {
            const eventInfo = {
              name: event.name,
              id: event.id,
              startDate: event.startDate,
              endDate: event.endDate,
              message: event.message,
              startTime: event.startTime,
              endTime: event.endTime,
              eventSeen: event.EventVolunteer.seen }
              
            const volunteerInfo = {
              volunteerFrom: event.EventVolunteer.startTime,
              volunteerTill: event.EventVolunteer.endTime,
              isAttending: event.EventVolunteer.isAttending
            }

            return <Event volunteerInfo={volunteerInfo} eventInfo={eventInfo} />
          })}
          </div>
        </div>
      </div>
    </div>
)
