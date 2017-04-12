import React from 'react'
import { Link } from 'react-router-dom'

export const TopBar = () => (
  <div>
    Hey, {localStorage.getItem('username')}
    <Link to='/logout'>Logout</Link>
  </div>
)
