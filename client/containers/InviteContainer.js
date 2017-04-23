import React, { Component } from 'react'
import { connect } from 'react-redux'

class InviteContainer extends Component {
  componentWillMount = () => {
  }

  render = () => {
    const id = this.props.match.params.id
    const invite = this.props.invitesById[id]

    return (
      <div className="invite">
        <div> {invite.info.name} </div>
        <div> From: {invite.info.startTime} - {invite.info.endTime} </div>
        <div> On: {invite.info.startDate} {invite.info.endDate === invite.info.startDate ? '': '-' +  invite.info.endDate } </div>
        <div> You said: {invite.answer.isAttending ? invite.answer.isAttending : 'Please Answer'}</div>
        <div> {invite.answer.startTime && invite.answer.endTime ?
                "Your time: " + invite.answer.startTime + "-" +invite.answer.endTime : '' } </div>

      </div>
    )
  }
}

const mapStateToProps = ({invites}) => {
  return {
    invitesById: invites.invitesById
  }
}

export default connect(
  mapStateToProps
)(InviteContainer)
