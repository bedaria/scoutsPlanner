import React from 'react'
import { Link } from 'react-router-dom'

export const TopBar = () => (
  <div className="topbar">
    <Link id="profile" to="/"> Profile </Link>
    <Link id="newEvent" to="/newEvent"> newEvent </Link>
  </div>
)
