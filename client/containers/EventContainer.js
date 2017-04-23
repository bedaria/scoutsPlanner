import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Admin } from '../components/Admin'
import { Invite } from '../components/Invite'

class EventContainer extends Component {


  render = () => {
    const { eventsById } = this.props
    const event = eventsById[this.props.match.params.event]

    return (
      <div className="event">
      {
        event.isAdmin ? <Admin event={event} /> : <Invite event={event} />
      }
      </div>
    )
  }
}

const mapStateToProps = ({events: {eventsById }}) => {
  return {
    eventsById
  }
}

export default connect(
  mapStateToProps,
  null
)(EventContainer)
