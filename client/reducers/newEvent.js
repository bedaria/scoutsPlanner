const initialState = {
  isSubmitting: false,
  errorCreating: false
}

export const newEvent = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_NEW_EVENT':
      return { ...state, isSubmitting: true }
    case 'NEW_EVENT_CREATED':
      return { ...state, isSubmitting: false, errorCreating: action.errorCreating }
    default:
      return state
  }
}
