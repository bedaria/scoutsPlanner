const initialState = {
  isFetching: false,
  errorFetching: false,
  events: []
}

export const events = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_EVENTS':
      return { ...state, ...action.payload }
    case 'RECEIVE_EVENTS':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
