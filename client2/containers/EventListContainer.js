import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getInvites } from '../actions/invites'

class EventListContainer extends Component {
  render = () => {
    if(this.props.invites.length)
      return (
        <div className="eventButtons">
          {
            this.props.invites.map(invite => <Invite key={invite.id} invite={invite} /> )
          }
        </div>
      )
    else if(this.props.fetchingInvites)
      return <div className="eventButtons"> Loading... </div>
    else
      return <div className="eventButtons"> None ... </div>
  }
}

const Invite = ({invite}) => (
  <button id={invite.id}> {invite.name} </button>
)

const mapStateToProps = ({invites}) => {
  return {
    invites: invites.invites,
    fetchingInvites: invites.isFetching
  }
}

export default connect(
  mapStateToProps,
  { getInvites }
)(EventListContainer)
