const initialState = {
  isFetching: false,
  myEvents: [],
  errorFetching: false
}

export const myEvents = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_MY_EVENTS':
      return { ...state, isFetching: action.isFetching }
    case 'RECEIVE_MY_EVENTS':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
