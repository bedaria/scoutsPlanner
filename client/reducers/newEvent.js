const initialState = {
  isSubmitting: false,
  errorCreating: false
}

export const newEvent = (state = initialState, action) => {
  switch(action.type) {
    case 'SUBMIT_NEW_EVENT':
      return { ...state, ...action.payload }
    case 'NEW_EVENT_CREATED':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
