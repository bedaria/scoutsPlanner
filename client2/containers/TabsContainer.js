import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { darkenTab } from '../actions/tabs'

class TabsContainer extends Component {

  handleInviteClick = (event) => {
    this.props.darkenTab(event.target.id)
    this.props.getInvites()
  }

  handleMyEventClick = (event) => {
    this.props.darkenTab(event.target.id)
  }

  render = () => {
    const darker = { background: 'grey' }
    const lighter = { background: 'white' }
    if(this.props.errorFetchingInvites)
      return (
        <div className="tabs">
          <button id="adminEventsTab" onClick={this.handleMyEventClick} >My Events</button>
          <button id="invitesTab" onClick={this.handleInviteClick} >My Invites</button>
          <div> Couldnt get invites, please try again.. </div>
        </div>
      )
    else if(this.props.onInvites){
      return (
        <div className="tabs">
          <button id="adminEventsTab" style={lighter} onClick={this.handleMyEventClick}>My Events</button>
          <button id="invitesTab" style={darker} onClick={this.handleInviteClick}>My Invites</button>
        </div>
      )
    }
    else {
      return (
        <div className="tabs">
          <button id="adminEventsTab" style={darker} onClick={this.handleMyEventClick}>My Events</button>
          <button id="invitesTab" style={lighter} onClick={this.handleInviteClick} >My Invites</button>
        </div>
      )
    }
  }
}

const mapStateToProps = ({invites, tabs}) => {
  return {
    errorFetchingInvites: invites.errorFetching,
    onInvites: tabs.onInvites
  }
}

export default connect(
  mapStateToProps,
  { darkenTab }
)(TabsContainer)
