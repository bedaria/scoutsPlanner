import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getInvites } from '../actions/invites'

class TabsContainer extends Component {
  render = () => {
      if(this.props.errorFetchingInvites)
        return (
          <div className="tabs">
            <div> Couldnt get invites, please try again.. </div>
            <button id="adminEventsTab">My Events</button>
            <button id="invitesTab" onClick={this.props.getInvites} >My Invites</button>
          </div>
        )
      else
        return (
          <div className="tabs">
            <button id="adminEventsTab">My Events</button>
            <button id="invitesTab" onClick={this.props.getInvites} >My Invites</button>
          </div>
        )
  }
}

const mapStateToProps = ({invites}) => {
  return {
    errorFetchingInvites: invites.errorFetching
  }
}

export default connect(
  mapStateToProps,
  { getInvites }
)(TabsContainer)
