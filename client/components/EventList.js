import React from 'react'
import Event from './Event'
import { AdminEvent } from './AdminEvent'

export const EventList = (props) => {

  const showEvents = () => {
    if(props.eventList.length > 0)
      return (
        <div>
          {props.eventList.map(event => (
            <Event
              volunteerInfo={event.volunteerInfo}
              eventInfo={event.eventInfo}
               />))
          }
        </div>
      )
    else return <div> You have no invites. </div>
  }

  const showAdminEvents = () => {
    if(props.adminEventList.length > 0)
      return (
        <div>
          {props.adminEventList.map(event =>
            (<AdminEvent name={event.name} id={event.id} />))
          }
        </div>
      )
     else
      return <div> You are not an admin of any event. </div>
  }

  return (
    <div className="container">
      <div className="item">
        <div className="profile">
          {showEvents()}
          {showAdminEvents()}
        </div>
      </div>
    </div>
  )
}
