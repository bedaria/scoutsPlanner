import React, { Component } from 'react'
import NewEvent from './NewEvent.js'
import EventInvite from './EventInvite'

export default class App extends Component {
  render() {
    return (
      <div>
        <NewEvent> </NewEvent>
        <EventInvite> </EventInvite>
      </div>
    )
  }
}
