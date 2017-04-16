const initialState = {
  friends: [],
  isFetchingFriends: false,
  errorFetchingFriends: false,
  redirectToNewEvent: false
}

export const friends = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_FRIENDS':
      return {...state, isFetchingFriends: action.isFetchingFriends}
    case 'RECEIVE_FRIENDS':
      return {...state, ...action.payload}
    default:
      return state
  }
}
