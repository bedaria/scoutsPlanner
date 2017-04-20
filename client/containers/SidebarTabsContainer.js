import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { redirectTo } from '../actions/tabs'

class SidebarTabsContainer extends Component {

  changeTab = (event) => {
    this.props.redirectTo(event.target.id, this.props.location.pathname)
  }

  render = () => {
    const { redirectToPath, redirectError, selectedInSidebar, currentPath } = this.props
    const darker = { background: 'grey' }
    const lighter = { background: 'white' }

    return (
      <div className="tabs">
        { redirectToPath && redirectToPath !== this.props.location.pathname  ?  <Redirect push to={redirectToPath} /> : null }
        { redirectError ? "Hmm.... error redirecting..." : null }
        <button id="invites"
                style={selectedInSidebar === "invites" ? darker : lighter}
                onClick={this.changeTab}> Invites </button>
        <button id="myEvents"
                style={selectedInSidebar === "myEvents" ? darker : lighter}
                onClick={this.changeTab}> My Events </button>
      </div>
    )
  }
}

const mapStateToProps = ({tabs}) => {
  return {
    redirectToPath: tabs.redirectToPath,
    redirectError: tabs.redirectError,
    selectedInSidebar: tabs.selectedInSidebar,
  }
}

export default connect(
  mapStateToProps,
  { redirectTo }
)(SidebarTabsContainer)
