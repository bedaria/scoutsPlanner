import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { darkenTab } from '../actions/tabs'
import { getInvites } from '../actions/invites'
import { getMyEvents } from '../actions/myEvents'

class TabsContainer extends Component {

  handleInviteClick = (event) => {
    this.props.darkenTab(event.target.id)
    this.props.getInvites()
  }

  handleMyEventClick = (event) => {
    this.props.darkenTab(event.target.id)
    this.props.getMyEvents()
  }

  render = () => {
    const { onInvites, errorFetchingEvents, errorFetchingInvites } = this.props
    const darker = { background: 'grey' }
    const lighter = { background: 'white' }

    return (
      <div className="tabs">
        <button id="adminEventsTab" style={onInvites ? lighter : darker} onClick={this.handleMyEventClick}>My Events</button>
        <button id="invitesTab" style={onInvites ? darker : lighter} onClick={this.handleInviteClick}>My Invites</button>
        {
          errorFetchingInvites || errorFetchingEvents ? <div> Please try again.. </div>: <div></div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({invites, tabs, myEvents}) => {
  return {
    errorFetchingInvites: invites.errorFetching,
    errorFetchingEvents: myEvents.errorFetcing,
    onInvites: tabs.onInvites
  }
}

export default connect(
  mapStateToProps,
  { darkenTab, getInvites, getMyEvents }
)(TabsContainer)
