import React, { Component } from 'react'

export default class Autocomplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finalAddress: ''
    }
  }

  wrapInput = (inputTag) => {
    var autocomplete = new google.maps.places.Autocomplete(inputTag)
    autocomplete.addListener('place_changed', () => {fillInAddress()})

    const fillInAddress = () => {
      const place = autocomplete.getPlace()
      this.setState({finalAddress: place.formatted_address})
    }
  }

  render = () => (<input ref={this.wrapInput} type="text"  placeholder="Enter an address"/>)
}
