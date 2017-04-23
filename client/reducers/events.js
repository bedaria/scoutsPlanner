const initialState = {
  isFetching: false,
  errorFetching: false,
  events: [],
  eventsById: {}
}

export const events = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_EVENTS':
      return { ...state, ...action.payload }
    case 'RECEIVE_EVENTS':
      return { ...state, ...action.payload }
    case 'MAKE_EVENTS_OBJECT':
      return { ...state, eventsById: action.eventsById }
    default:
      return state
  }
}
