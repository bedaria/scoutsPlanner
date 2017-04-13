import React, { Component } from 'react'
import { Attendance } from './Attendance'
import { TimeBlocks } from './TimeBlocks'
import { Volunteers } from './Volunteers'
import { getAdminEvent } from '../helpers'

export default class AdminEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attendance: {},
      timeBlocks: [],
      volunteers: {},
      gotInfo: false
    }
  }

  componentWillMount = () => {
    const eventId = this.props.match.params.event
    getAdminEvent(eventId, this.getEventInfo)
  }

  getEventInfo = ({attendance, timeBlocks, volunteers}) => {
    this.setState({attendance, timeBlocks, volunteers, gotInfo: true})
  }

  render() {
    if(this.state.gotInfo)
     return (
       <div>
         <Attendance attendance={this.state.attendance} />
         <TimeBlocks timeBlocks={this.state.timeBlocks} />
         <Volunteers volunteers={this.state.volunteers} />
       </div>
     )
    else
      return (<div> spinner. spinning. </div>)
  }
}
