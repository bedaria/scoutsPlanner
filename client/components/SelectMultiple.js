import React, { Component } from 'react'
import Select from 'react-select'


export default class SelectMultiple extends Component {
  constructor(props){
    super(props)
    this.state = {
      friends: this.props.friends,
      value: []
    }
  }

  handleSelectChange = (value) => {
    console.log('you selected: ', value)
    this.setState({ value: value})
  }

  render() {
    return <Select multi simpleValue placeholder="Send To: " options={this.state.friends} value={this.state.value}
      disabled={false} onChange={this.handleSelectChange}/>
  }
}

SelectMultiple.propTypes = {
  friends: React.PropTypes.array
}
