import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class AdminEventList extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false,
      eventId: null
    }
  }

  getEventInfo = (event) => {
     this.setState({eventId: event.target.id, redirect: true})
   }

   render() {
     if(this.state.redirect)
      return <Redirect push to={'/events/' + this.state.eventId} />

      if(this.props.events.length > 0)
        return (
          <div className="container">
            {
              this.props.events.map(event =>
              (<button onClick={this.getEventInfo} id={event.id}> {event.name} </button>))
            }
          </div>
        )
      else
        return <div> You are not an admin of any event. </div>
    }
}
