import React from 'react'

export const Main = ({fetchFriends, errorFetchingFriends, isFetchingFriends, redirectToNewEvent }) => {
  if(isFetchingFriends)
    return (<div> Loading... </div>)
  else if(errorFetchingFriends)
    return (
      <div className="activity">
        <div> Please try again:...</div>
        <button onClick={fetchFriends}> Create New Event </button>
      </div>
    )
  else if(redirectToNewEvent)
   return (<div> Redirecting to new events..</div>)
  else
    return (
      <div className="activity">
        <button onClick={fetchFriends}> Create New Event </button>
      </div>
    )
}
