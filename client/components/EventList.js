import React from 'react'
import Event from './Event'

export const EventList = (props) => {
  if(props.events.length > 0)
    return (
      <div>
        {props.events.map(event => (
          <Event
            volunteerInfo={event.volunteerInfo}
            eventInfo={event.eventInfo}
             />))
        }
      </div>
    )
  else return <div> You have no invites. </div>
}
