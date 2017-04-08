import React from 'react'
import Event from './Event'

export const EventList = (props) => (
    <div className="container">
      <div className="item">
        <div className="profile">
          <div className ="hello">
          {props.eventList.map(event => (
            <Event
              volunteerInfo={event.volunteerInfo}
              eventInfo={event.eventInfo} />
            )
          )}
          </div>
        </div>
      </div>
    </div>
)
