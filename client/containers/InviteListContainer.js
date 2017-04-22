import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getInvites } from '../actions/invites'

class InviteListContainer extends Component {
  componentWillMount = () => {
    // this.props.getInvites()
  }

  inviteClick = (event) => {
    console.log("clicked on invite ")
  }

  render = () => {
    const { invites, fetchingInvites, errorFetchingInvites } = this.props

    return (
      <div>
        { fetchingInvites ? "Loading your invites... " : ''}
        { errorFetchingInvites ? "Ooops, please reload... " : ''}
        { invites.length ?
          <InviteList invites={invites} inviteClick={this.inviteClick} /> :
          "No invites yet..."
        }
      </div>
    )
  }
}

const InviteList = ({invites, inviteClick}) => (
  <div className="eventButtons">
    {
      invites.map(invite => (
        <button key={invite.id} id={invite.id} onClick={inviteClick}>
          {invite.name} | {invite.isAttending || "Please answer"}
        </button>
      ))
    }
  </div>
)

const mapStateToProps = ({invites}) => {
  return {
    invites: invites.inviteButtons,
    fetchingInvites: invites.isFetching,
    errorFetchingInvites: invites.errorFetching
  }
}

export default connect(
  mapStateToProps,
  { getInvites }
)(InviteListContainer)
