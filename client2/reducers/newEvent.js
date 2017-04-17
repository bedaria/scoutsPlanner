const initialState = {
  isSubmitting: false,
  updateAdminList: false,
  redirectToProfile: false,
  errorCreating: false
}

export const newEvent = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_NEW_EVENT':
      return { ...state, isSubmitting: action.isSubmitting }
    case 'NEW_EVENT_CREATED':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
