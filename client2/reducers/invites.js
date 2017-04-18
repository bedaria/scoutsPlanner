const initialState = {
  isFetching: false,
  invites: [],
  errorFetching: false,
  inviteButtons: []
}

export const invites = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_INVITES':
      return { ...state, isFetching: action.isFetching }
    case 'RECEIVE_INVITES':
      return { ...state, ...action.payload }
    case 'FILTER_BUTTON_TEXT':
      return {...state, inviteButtons: action.inviteButtons}
    default:
      return state
  }
}
