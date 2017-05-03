const initialState = {
  isCreating: false,
  errorCreating: false,
  eventId: '',
  successCreating: false
}

export const newEvent = (state = initialState, action) => {
  switch(action.type) {
    case 'SUBMIT_NEW_EVENT':
      return { ...state, ...action.payload }
    case 'NEW_EVENT_CREATED':
      return { ...state, ...action.payload }
    case 'RESET':
      return { ...state, successCreating: action.successCreating}
    default:
      return state
  }
}
