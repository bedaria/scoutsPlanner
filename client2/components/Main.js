import React from 'react'

export const Main = ({ fetchFriends }) => {
  const handleSubmit = (event) => {
    fetchFriends()
  }

  return (
    <div className="activity">
      <button onClick={handleSubmit}> Create New Event </button>
    </div>
  )
}
