const initialState = {
  friends: [],
  isFetching: false,
  errorFetching: false
}

export const friends = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_FRIENDS':
      return {...state, isFetching: action.isFetching}
    case 'RECEIVE_FRIENDS':
      return {...state, ...action.payload}
    default:
      return state
  }
}
