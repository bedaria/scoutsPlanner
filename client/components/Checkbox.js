import React, { Component } from 'react'

export default class Checkbox extends Component {
  render() {
    return (
      <div>
        <label> {this.props.label} </label>
        <input type="checkbox" value={this.props.label} onChange={this.props.toggleCheckBox}/>
      </div>
    )
  }
}
