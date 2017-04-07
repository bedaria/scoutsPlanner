import React, { Component } from 'react'

export const EventList = (props) => (
      <div className="container">
        <div className="item">
          <div className="profile">
            <div className="hello">
              {props.eventList.map( event => {
                if(event.EventVolunteer.seen)
                  return (
                      <div>
                        {event.name} on {event.startDate} at {event.startTime} - {event.endTime }
                        <span> :{event.EventVolunteer.isAttending}</span>
                      </div>
                  )
                else
                  return (
                      <div>
                        {event.name} on {event.startDate} at {event.startTime} - {event.endTime }
                        <span> Answer Invite</span>
                      </div>
                  )
                }
              )}
            </div>
          </div>
         </div>
      </div>
    )
