const initialState = {
  isFetching: false,
  myEvents: [],
  errorFetching: false,
  isFetchingEvent: false,
  redirectToEvent: false,
  eventVolunteers: [],
  errorFetchingEvent: false,
  redirectToId: '',
  eventTasks: [],
  invited: [],
  yes: [],
  maybe: [],
  no: [],
  notAnswered: []
}

export const myEvents = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_MY_EVENTS':
      return { ...state, isFetching: true }
    case 'RECEIVE_MY_EVENTS':
      return { ...state, isFetching: false, ...action.payload }
    case 'REQUEST_MY_EVENT':
      return { ...state, isFetchingEvent: true, redirectToId: action.redirectToId }
    case 'RECEIVE_MY_EVENT':
      return { ...state, isFetchingEvent: false, redirectToEvent: true, ...action.payload }
    case 'REDIRECTED':
      return { ...state, redirectToEvent: false, redirectToId: ''}
    case 'SEPARATED_ATTENDANCE':
      return { ...state, ...action.payload}
    default:
      return state
  }
}
