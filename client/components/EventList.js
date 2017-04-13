import React, { Component } from 'react'
import EventButton from './EventButton'
import PropTypes from 'prop-types'

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


EventList.propTypes = {
  enventInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    message: PropTypes.string,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    mainAdminId: PropTypes.number.isRequired
  }),
  volunteerInfo: PropTypes.shape({
    isAttending: PropTypes.oneOf(['Yes', 'No', 'Maybe']).isRequired,
    volunteeringTill: PropTypes.string.isRequired,
    volunteeringFrom: PropTypes.string.isRequired
  })
}
