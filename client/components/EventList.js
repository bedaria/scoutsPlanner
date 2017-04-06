import React, { Component } from 'react'
import Event from './Event.js'

export default class EventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventList: ['Eat', 'Sleep', 'Hunt']
    }
  }

  render() {
    return (
      <div className="container">
        <div className="item">
          <div className="profile">
            <div className="hello">
            <div> {localStorage.username}'s Events</div>
              {this.state.eventList.map( event => (<Event eventName={event}/>))}
            </div>
          </div>
         </div>
      </div>
    )
  }
}
