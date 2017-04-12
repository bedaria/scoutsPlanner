import React, { Component } from 'react'
import { getUsers } from  '../helpers'

export default class SelectMultiple extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      selectedUsers: [],
      selected: 'All',
      hasError: false
    }
  }

  componentWillMount = () => {
    getUsers(this.addUsersToState)
  }

  addUsersToState = (data) => {
    if(data.hasError)
      this.setState({hasError: true})
    else {
      const users = data.users.filter(user => user.name !== localStorage.getItem('username'))
      this.props.getSelectedUsers(users.map(user => user.id))
      this.setState({users})
    }
  }

  deleteFromSelected = (event) => {
    event.preventDefault()
    var selectedUsers = this.state.selectedUsers.slice()
    const idx = selectedUsers.indexOf(event.target.id)
    selectedUsers = selectedUsers.slice(0,idx).concat(selectedUsers.slice(idx+1))

    if(!selectedUsers.length)
      this.props.getSelectedUsers(this.state.users.map(user => user.id))
    else
      this.props.getSelectedUsers(selectedUsers.map(user => Number(user)))

    this.setState({selectedUsers})
  }

  addToSelected = (event) => {
    const selectedUsers = this.state.selectedUsers.slice()
    const found = selectedUsers.reduce((found, user) => (
      found || user === event.target.value
    ), false)

    if(!found){
      selectedUsers.push(event.target.value)
      this.props.getSelectedUsers(selectedUsers.map(user => Number(user)))
      this.setState({selectedUsers})
    }
  }

  render() {
    if(this.state.hasError)
      return <div>Please reload!!!</div>

    if(this.state.users.length)
      return (
        <div>
          <div>
            {
              this.state.selectedUsers.length ?
                this.state.selectedUsers.map(selected => (<Selected user={selected}
                                                         deleteFromSelected={this.deleteFromSelected} /> )) : ''
            }
          </div>
          <select value={this.state.selected} onChange={this.addToSelected} form="eventInfo">
            <option value='All'>All</option>
            {this.state.users.map(user => (<option value={user.id}>{user.id}</option>))}
          </select>
        </div>
      )
    else return <select></select>
  }
}

const Selected = ({user, deleteFromSelected}) =>
  (<button onClick={deleteFromSelected} id={user}>{user}</button>)
