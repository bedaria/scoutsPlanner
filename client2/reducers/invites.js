const initialState = {
  isFetching: false,
  invites: [],
  errorFetching: false
}

export const invites = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_INVITES':
      return { ...state, isFetching: action.isFetching }
    case 'RECEIVE_INVITES':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
