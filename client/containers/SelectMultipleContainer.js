import React, { Component } from 'react'
import { connect } from 'react-redux'
import SelectMultiple from '../components/SelectMultiple'
import axios from 'axios'
import { fetchFriends } from '../actions/friends.js'

class SelectMultipleContainer extends Component {
  componentWillMount = () => {
    this.props.fetchFriends()
  }

  render = () => {
    return (
      <SelectMultiple friends={this.props.friends} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    isFetchingFriends: state.isFetchingFriends
  }
}

export default connect(
  mapStateToProps,
  { fetchFriends }
)(SelectMultipleContainer)
