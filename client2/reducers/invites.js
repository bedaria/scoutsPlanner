const initialState = {
  isFetching: false,
  invites: [],
  errorFetching: false,
  inviteButtons: [],
  invitesById: {},
  redirect: false,
  redirectToId: ''
}

export const invites = (state = initialState, action) => {
  switch(action.type) {
    case 'REQUEST_INVITES':
      return { ...state, isFetching: action.isFetching }
    case 'RECEIVE_INVITES':
      return { ...state, ...action.payload }
    case 'FILTER_BUTTON_TEXT':
      return {...state, inviteButtons: action.inviteButtons }
    case 'ARRANGE_INIVTES_BY_ID':
     return { ...state, invitesById: action.invitesById }
    case 'REDIRECT':
      return { ...state, redirect: action.redirect, redirectToId: action.inviteId }
    case 'REDIRECTED':
      return { ...state, redirect: action.redirect, redirectToId: action.inviteId }
    default:
      return state
  }
}
