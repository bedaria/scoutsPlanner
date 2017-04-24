import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const EventList = ({events}) => {
  const atDate = ''

  return (
    <ListGroup>
      {
        events.map(event => {
          const startDate = new Date(event.startDateTime).toLocaleDateString()
          return (
            <div key={event.id}>
              <span style={{marginLeft: '5px', marginTop: '10px'}}>
                {atDate !== startDate ? startDate: null}
              </span>
              <ListGroupItem >
                  {event.name}
                  <span className="right">
                    <Link to={`/events/${event.id}`} >
                      {event.isAdmin ? "Admin": event.answer || "Volunteer!"}
                    </Link>
                  </span>
              </ListGroupItem>
            </div>
          )
        })
      }
    </ListGroup>
  )
}
