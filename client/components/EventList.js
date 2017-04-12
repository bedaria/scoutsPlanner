import React, { Component } from 'react'
import EventButton from './EventButton'

export default class EventList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openEventId: ''
    }
  }

  openEventInfo = (event) => {
    const openEventId = this.state.openEventId == event.target.id ? '': event.target.id
    this.setState({openEventId })
  }

  render() {
    if(this.props.events.length > 0)
      return (
        <div>
          {
            this.props.events.map(({eventInfo, volunteerInfo}) => {
              return <EventButton openEventId={this.state.openEventId}
                                  openEventInfo={this.openEventInfo}
                                  eventInfo={eventInfo}
                                  volunteerInfo={volunteerInfo} />
            })
          }
        </div>
      )
    else return <div></div>
  }
}
