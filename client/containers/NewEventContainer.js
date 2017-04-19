import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import NewEvent from '../components/NewEvent'
import NewEventForm from './NewEventForm'
import { createEvent, resetRedirect } from '../actions/newEvent'
import { fetchFriends } from '../actions/friends'

class NewEventContainer extends Component {
  componentWillMount = () => {
    this.props.fetchFriends()
  }

  render = () => {
    if(this.props.isFetchingFriends)
      return <div> Loading ... </div>
    else if(this.props.errorFetchingFriends)
      return <Redirect to="/newEvent" />
    else
      return <NewEventForm friends={this.props.friends} onSubmit={(value) => {console.log(value)}}/>
      // return <NewEvent isSubmitting={this.props.isSubmitting}
      //                  redirect={this.props.redirect}
      //                  errorCreating={this.props.errorCreating}
      //                  friends={this.props.friends}
      //                  createEvent={(eventInfo) => this.props.createEvent(eventInfo)}
      //                  resetRedirect={this.props.resetRedirect}/>
  }
}

const mapStateToProps = ({newEvent, friends}) => {
  return {
    isSubmitting: newEvent.isSubmitting,
    redirect: newEvent.redirect,
    errorCreating: newEvent.errorCreating,
    friends: friends.friends,
    isFetchingFriends: friends.isFetching,
    errorFetchingFriends: friends.errorFetching
  }
}

export default connect(
  mapStateToProps,
  { createEvent,
    fetchFriends,
    resetRedirect }
)(NewEventContainer)
