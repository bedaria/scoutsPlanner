import React, { Component } from 'react'

export default class SelectFrom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendTo: this.props.sendTo,
      sendToArray: [],
      friends: this.props.friends,
      friendArray: this.props.friends.map(friend => friend.name)
    }
  }

  handleChange = (event) => {
    var sendTo = this.state.sendTo.slice()
    var sendToArray = []
    var friendArray = this.state.friendArray.slice()
    var friends = this.state.friends.slice()
    const index = friendArray.indexOf(event.target.id)

    sendTo.push(event.target.id)
    sendToArray.push(friends[index].id)
    friendArray.splice(index,1)
    friends.splice(index,1)

    this.setState({friends: friends, friendArray: friendArray, sendTo: sendTo, sendToArray: sendToArray})
  }

  render() {
    console.log("sendTo: ", this.state.sendTo)
    console.log("sendToArray: ", this.state.sendToArray)
    console.log("friends: ", this.state.friends)
    console.log("friendArray: ", this.state.friendArray)
    return (
      <div className="text">
        {this.state.sendTo.toString()}
        <ul className="scroll">
        {this.state.friends.map(friend => (<li onClick={this.handleChange} id={friend.name}>{friend.name}</li>))}
        </ul>
      </div>
    )
  }
}
