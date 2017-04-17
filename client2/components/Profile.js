import React from 'react'

export const Profile = ({fetchFriends, errorFetchingFriends, isFetchingFriends }) => {
  if(isFetchingFriends)
    return (<div> Loading... </div>)
  else if(errorFetchingFriends)
    return (
      <div className="activity">
        <div> Please try again:...</div>
        <button onClick={fetchFriends}> Create New Event </button>
      </div>
    )
  else
    return (
      <div className="activity">
        <button onClick={fetchFriends}> Create New Event </button>
      </div>
    )
}
