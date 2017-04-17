const initialState = {
  isSubmitting: false,
  updateAdminList: false,
  errorCreating: false,
  redirect: false
}

export const newEvent = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_NEW_EVENT':
      return { ...state, isSubmitting: action.isSubmitting }
    case 'NEW_EVENT_CREATED':
      return { ...state, ...action.payload }
    case 'RESET_REDIRECT':
      return { ...state, redirect: action.redirect}
    default:
      return state
  }
}
