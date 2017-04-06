import React, { Component } from 'react'

const Checkbox = () => (
      <div>
        <label> {this.props.label} </label>
        <input type="checkbox" value={this.props.label} onChange={this.props.toggleCheckBox}/>
      </div>
)

export default Checkbox
