import React, { Component } from 'react'
import Event from './Event'

export default class EventList extends Component{
  constructor(props) {
    super(props)
    this.state = {
      selected: null
    }
  }

  handleClick = (event) => {
    this.setState({selected: event.target.id})
  }

  closeEvent = (event) => {
    event.preventDefault()
    this.setState({selected: null})
  }

  showEventInfo = (eventInfo) => {
    if(eventInfo.id == this.state.selected)
      return <Event event={eventInfo} closeEvent={this.closeEvent} />
    else
      return <div></div>
  }

  render() {
    return (
      <div className="container">
        <div className="item">
          <div className="profile">
            <div className="hello">
              {this.props.eventList.map( event => {
                if(event.EventVolunteer.seen)
                  return (
                    <div>
                        {event.name} <span> {event.EventVolunteer.isAttending}</span>
                      </div>
                    )
                else
                  return (
                    <div>
                      {event.name} <button id={event.id} onClick={this.handleClick}> answer invite </button>
                      {this.showEventInfo(event)}
                    </div>
                  )
              })}
            </div>
          </div>
         </div>
      </div>
    )
  }
}
