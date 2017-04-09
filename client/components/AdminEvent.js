import React, { Component } from 'react'
import EventInfo from './EventInfo'
import { updateInvite } from '../helpers'

export const AdminEvent = (props) => (
  <div>
    <button id={props.id}> {props.name} (Admin)</button>
  </div>
)
