import React from 'react'
import ReactDOM from 'react-dom'

export const Autocomplete = ({where, handleChange}) => {
  function initAutocomplete() {
    autocomplete =  new google.maps.places.Autocomplete(ReactDOM.findDOMNode(this))
    autocomplete.addListener('place_changed', fillInAddress);
  }
  function fillInAddress() {
    console.log("fillInaddress called")
  }

 google.maps.event.addDomListener(window, 'load', initAutocomplete);
  return <input type="text" />
}
